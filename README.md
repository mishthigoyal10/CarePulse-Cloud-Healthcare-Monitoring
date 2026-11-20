# CarePulse – Cloud-Based Smart Healthcare Monitoring System

## Project Overview

CarePulse is a cloud-based smart healthcare monitoring system developed as part of our Cloud Computing project.

The system provides a platform to manage patient health records and monitor vital readings. It uses Firebase services to store patient information, authenticate users, host the web application, and process new health readings through a cloud function.

CarePulse includes separate patient and admin views to support different levels of access to the monitoring system.

## Project Objectives

- To develop a cloud-based healthcare monitoring application.
- To store patient information and health readings in a cloud database.
- To identify abnormal vital readings automatically.
- To generate alerts when readings cross configured thresholds.
- To provide separate patient and admin access.
- To demonstrate the use of cloud computing and serverless technology.

## Key Features

### 1. User Authentication
- Firebase Authentication is used to authenticate users.
- The application supports separate patient and admin roles.

### 2. Patient Dashboard
- Patients can view their own health information.
- Patients can view their recorded vital readings.
- Patients can view alerts associated with their records.

### 3. Admin Dashboard
- Admin users can access the patient monitoring dashboard.
- Admin users can view patient records and associated readings and alerts.

### 4. Health Reading Monitoring
The system monitors the following vital parameters:

- Heart rate
- Blood oxygen level (SpO2)
- Body temperature
- Blood pressure

### 5. Automated Alert Generation
- A Firebase Cloud Function processes newly created health readings.
- It checks readings against configured threshold values.
- When a reading crosses a configured threshold, the system generates an alert.
- Alerts are stored in the patient's Firestore alerts collection.

### 6. Cloud-Based Data Storage
- Patient records are stored in Cloud Firestore.
- Health readings and alerts are maintained in separate subcollections.
- The application uses Firebase services for cloud-based operation.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Web application structure |
| CSS3 | Styling and layout |
| JavaScript | Frontend functionality |
| Firebase Authentication | User authentication |
| Cloud Firestore | Cloud database |
| Firebase Cloud Functions | Server-side processing |
| Google Cloud Platform | Cloud infrastructure |
| Firebase Hosting | Website deployment |
| Node.js | Cloud Functions runtime |
| Firebase CLI | Project management and deployment |
| Git and GitHub | Version control and collaboration |

## System Architecture

The application follows a cloud-based architecture.

1. A user opens the CarePulse web application hosted on Firebase Hosting.
2. Firebase Authentication verifies the user's identity.
3. The application displays the appropriate patient or admin dashboard.
4. Patient information and health readings are stored in Cloud Firestore.
5. When a new reading is created, a Firebase Cloud Function is triggered.
6. The function checks the reading against configured thresholds.
7. If an abnormal reading is detected, an alert is created in Firestore.
8. The application retrieves and displays the relevant patient information and alerts.

## Firestore Database Structure

The project uses the following logical database structure:

```text
patients/
    patientId/
        patient details

        readings/
            readingId/

        alerts/
            alertId/
```

### Main Collections

- **patients:** Stores patient information.
- **readings:** Stores health readings associated with each patient.
- **alerts:** Stores alerts generated for abnormal readings.

## Project Folder Structure

```text
CarePulse-Cloud-Healthcare-Monitoring/
│
├── index.html
├── 404.html
├── firebase.json
├── .firebaserc
├── .gitignore
│
├── css/
│   └── style.css
│
├── js/
│   └── firebase.js
│
└── functions/
    ├── index.js
    ├── package.json
    ├── package-lock.json
    └── .gitignore
```

## Setup and Installation

Follow these steps to run the project locally.

### Prerequisites

Install the following:

- Node.js
- npm
- Firebase CLI
- Git

You also need a Google account to create and configure a Firebase project.

### Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/mishthigoyal10/CarePulse-Cloud-Healthcare-Monitoring.git
```

Move into the project directory:

```bash
cd CarePulse-Cloud-Healthcare-Monitoring
```

### Step 2: Configure Firebase

1. Create a Firebase project in the Firebase Console.
2. Enable Firebase Authentication and configure the sign-in method used by the application.
3. Create a Cloud Firestore database.
4. Configure the Firestore security rules for the application's patient and admin access requirements.
5. Register a web application in Firebase.
6. Copy its Firebase web configuration into `js/firebase.js`.
7. Configure Firebase Hosting and Cloud Functions for the project.

Use your own Firebase project configuration when setting up a separate copy of the application.

### Step 3: Install Firebase CLI

```bash
npm install -g firebase-tools
```

Log in to Firebase:

```bash
firebase login
```

Select or configure the Firebase project:

```bash
firebase use --add
```

Choose the Firebase project you created.

### Step 4: Install Cloud Function Dependencies

Open the project terminal and run:

```bash
cd functions
npm install
```

Return to the root project directory:

```bash
cd ..
```

### Step 5: Deploy the Application

To deploy Firebase Hosting:

```bash
firebase deploy --only hosting
```

To deploy Cloud Functions:

```bash
firebase deploy --only functions
```

To deploy both:

```bash
firebase deploy
```

After successful deployment, Firebase Hosting provides the website URL.

## Usage Guidelines

### Patient

1. Open the CarePulse website.
2. Sign in using the patient account.
3. Access the patient dashboard.
4. View the available health information, readings, and alerts.

### Admin

1. Open the CarePulse website.
2. Sign in using the admin account.
3. Access the admin dashboard.
4. View the available patient information, readings, and alerts.

### Testing Alert Generation

1. Add a new health reading for a patient using the application's supported reading-entry method or the configured Firestore data structure.
2. The Firestore document creation triggers the Cloud Function.
3. The function checks the reading against the configured thresholds.
4. If a threshold is crossed, an alert is generated and stored in the patient's alerts collection.
5. Check the application to verify that the alert is displayed.

## Cloud Computing Concepts Demonstrated

This project demonstrates several cloud computing concepts:

- **Cloud Database:** Cloud Firestore stores patient information, readings, and alerts.
- **Authentication:** Firebase Authentication manages user sign-in.
- **Serverless Computing:** Firebase Cloud Functions processes new readings without requiring a continuously running server.
- **Cloud Hosting:** Firebase Hosting makes the web application accessible online.
- **Event-Driven Architecture:** A new Firestore reading triggers the cloud function.
- **Role-Based Application Access:** Patient and admin users are shown different application views.

## Security Considerations

- Do not upload service account private keys, passwords, or other secret credentials to GitHub.
- Configure Firestore Security Rules to enforce the intended patient and admin permissions. Hiding records in the frontend alone is not sufficient security.
- Restrict access to Firebase project settings and administrative privileges.
- Use separate accounts for project collaborators.
- Review Firebase usage and billing regularly.

## Future Enhancements

Possible future improvements include:

- Integration with wearable health monitoring devices.
- Real-time health data collection.
- More detailed health analytics and visualizations.
- Additional alert delivery methods.
- Patient history reports.
- Improved monitoring and notification features.

## Disclaimer

CarePulse is an academic cloud computing project developed for demonstration and educational purposes. Its configured thresholds are illustrative and are not a substitute for professional medical evaluation, diagnosis, or treatment. The system should not be used for real clinical decisions.

## Contributors

This project was collaboratively developed by:

1. **[Your Name]** – Shivam Dalal
2. **[Partner Name]** – Mishti goyal

Both contributors worked on the development and implementation of the CarePulse project.

## GitHub Repository

[CarePulse – Cloud-Based Smart Healthcare Monitoring System](https://github.com/mishthigoyal10/CarePulse-Cloud-Healthcare-Monitoring)
