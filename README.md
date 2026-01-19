📱 Solar Maintenance Report App
📌 Overview

This is a mobile offline-first application built for solar maintenance technicians to report issues from field locations where internet connectivity may be poor or unavailable.

The app allows technicians to:

Submit maintenance issues

Attach images as evidence

Work completely offline

Automatically sync data when internet is restored

🎯 Problem Statement

Solar plants are often located in remote areas with unstable network connectivity.
Maintenance issues reported through calls or messages can be delayed, lost, or incomplete.

This app ensures:

No data loss
Structured reporting
Clear status tracking
Reliable offline operation

✨ Key Features

📄 Report Issue Form
Site name, asset type, issue type, severity
Comments and multiple image attachments
Field validations

📂 Offline Storage

Uses SQLite for local data persistence
Reports saved instantly even without internet

🔄 Auto Sync

Pending reports sync automatically when internet is available
Sync status shown in the UI

📋 My Reports

View all submitted reports
Status indicators: Pending / Submitted / Failed

🖼 Report Details

View full report information
Image evidence attached to each report

🛠 Tech Stack

Frontend: React Native (Expo)
UI Library: React Native Paper
Local Database: expo-sqlite (async API)
Image Handling: expo-image-picker
Network Detection: expo-network

🧠 Architecture Highlights

Offline-first design
Local SQLite as device cache
Separate tables for reports and images (one-to-many)
Sync logic decoupled from UI
Clean navigation flow

📂 Database Structure
reports

id

siteName

assetType

issueType

severity

comment

status

createdAt

report_images

id

reportId

imageUri

status

createdAt

🚀 How It Works (Flow)

User logs in
Submits a report (offline or online)
Data is saved locally in SQLite
Report appears in “My Reports” with Pending status
When internet is available:
App syncs pending reports
Status updates automatically

🧪 Offline Demo Flow

Turn off internet
Submit a report with images
See report marked as Pending
Turn internet back on
App syncs automatically → Submitted

-------------------------------------------------------- 📈 Future Enhancements / Improvement

Backend integration
Image upload retry
Barcode / QR scanning
Role-based access
Analytics dashboard for managers

👤 Author 
Anshu Kumar Rao
Full Stack Developer  
