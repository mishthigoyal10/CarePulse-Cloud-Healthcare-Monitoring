
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

// Your verified Admin account
const ADMIN_UID = "a877iloA2BTpXjIoZRfPGQDvfkO2";

// Rahul's Firebase Authentication UID
const RAHUL_UID = "sjeJQpJ1iocHZ5Dsa9xV1Q0wRLS2";

/*
 * ASSIGN RAHUL'S PATIENT ROLE
 * Only an existing Admin can call this function.
 */
exports.assignRahulPatientRole = onCall(
  { region: "asia-south1" },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "Please sign in first."
      );
    }

    // Verify the caller's role directly from Firebase Authentication.
    const caller = await admin.auth().getUser(request.auth.uid);

    if (
      caller.uid !== ADMIN_UID ||
      caller.customClaims?.role !== "admin"
    ) {
      throw new HttpsError(
        "permission-denied",
        "Only the authorised Admin can assign this role."
      );
    }

    // Confirm Rahul's UID is linked to exactly one patient document.
    const patientQuery = await db
      .collection("patients")
      .where("authUid", "==", RAHUL_UID)
      .limit(2)
      .get();

    if (patientQuery.size !== 1) {
      throw new HttpsError(
        "failed-precondition",
        "Rahul's UID must match exactly one patient document."
      );
    }

    const patientDoc = patientQuery.docs[0];

    // Preserve any existing custom claims.
    const patientUser = await admin.auth().getUser(RAHUL_UID);

    await admin.auth().setCustomUserClaims(RAHUL_UID, {
      ...(patientUser.customClaims || {}),
      role: "patient",
      patientId: patientDoc.id
    });

    console.log(
      `Patient role assigned to ${RAHUL_UID}, patient ${patientDoc.id}`
    );

    return {
      success: true,
      message: "Rahul's Patient role was assigned.",
      patientId: patientDoc.id
    };
  }
);

/*
 * EXISTING CLOUD FUNCTION
 * Processes new readings and creates abnormal-vital alerts.
 */
exports.processVitalReading = onDocumentCreated(
  {
    document: "patients/{patientId}/readings/{readingId}",
    region: "asia-south1"
  },
  async (event) => {
    const snapshot = event.data;

    if (!snapshot) {
      console.log("No reading data found.");
      return;
    }

    const reading = snapshot.data();
    const { patientId, readingId } = event.params;

    const patientRef = db.collection("patients").doc(patientId);
    const patientDoc = await patientRef.get();

    const patientData = patientDoc.exists ? patientDoc.data() : {};

    const patientName =
      patientData.patientName ||
      patientData.name ||
      "Unknown Patient";

    const alerts = [];

    // HEART RATE
    const heartRate = Number(reading.heartRate);

    if (Number.isFinite(heartRate)) {
      if (heartRate < 50) {
        alerts.push({
          type: "low_heart_rate",
          message: "Low heart rate detected",
          value: `${heartRate} BPM`,
          severity: heartRate < 40 ? "critical" : "warning"
        });
      } else if (heartRate > 120) {
        alerts.push({
          type: "high_heart_rate",
          message: "High heart rate detected",
          value: `${heartRate} BPM`,
          severity: heartRate > 130 ? "critical" : "warning"
        });
      }
    }

    // OXYGEN SATURATION
    const spo2 = Number(reading.spo2);

    if (Number.isFinite(spo2) && spo2 < 92) {
      alerts.push({
        type: "low_oxygen",
        message: "Low oxygen saturation detected",
        value: `${spo2}%`,
        severity: spo2 < 90 ? "critical" : "warning"
      });
    }

    // BODY TEMPERATURE
    const temperature = Number(reading.temperature);

    if (Number.isFinite(temperature)) {
      if (temperature >= 38) {
        alerts.push({
          type: "high_temperature",
          message: "High temperature detected",
          value: `${temperature} °C`,
          severity: temperature >= 39 ? "critical" : "warning"
        });
      } else if (temperature < 35) {
        alerts.push({
          type: "low_temperature",
          message: "Low temperature detected",
          value: `${temperature} °C`,
          severity: "critical"
        });
      }
    }

    // BLOOD PRESSURE
    if (typeof reading.bloodPressure === "string") {
      const parts = reading.bloodPressure.split("/");

      const systolic = Number(parts[0]);
      const diastolic = Number(parts[1]);

      if (
        parts.length === 2 &&
        Number.isFinite(systolic) &&
        Number.isFinite(diastolic)
      ) {
        if (systolic >= 140 || diastolic >= 90) {
          alerts.push({
            type: "high_blood_pressure",
            message: "High blood pressure detected",
            value: reading.bloodPressure,
            severity:
              systolic >= 180 || diastolic >= 120
                ? "critical"
                : "warning"
          });
        } else if (systolic < 90 || diastolic < 60) {
          alerts.push({
            type: "low_blood_pressure",
            message: "Low blood pressure detected",
            value: reading.bloodPressure,
            severity: "warning"
          });
        }
      }
    }

    // SAVE ALERTS TO FIRESTORE
    const alertWrites = alerts.map((alert) => {
      const alertRef = patientRef
        .collection("alerts")
        .doc(`${readingId}_${alert.type}`);

      return alertRef.set({
        ...alert,
        patientId,
        patientName,
        readingId,
        status: "unread",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    await Promise.all(alertWrites);

    console.log(
      `Checked reading ${readingId}. Generated ${alerts.length} alert(s).`
    );
  }
);
