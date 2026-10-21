# 📱 Guide: Publishing the OICS Android App (.APK) to Uptodown

This guide provides end-to-end instructions for building your standalone Android `.apk` file using React Native & Expo, and publishing it to **Uptodown** — one of the world's largest open app marketplaces (130M+ monthly active users, 100% free with no registration fees).

---

## 🛠️ Part 1: How the React Native & Expo Mobile App is Structured

The mobile application is located in the [`mobile-app/`](file:///c:/Users/RanjitR-3355/Desktop/ai/oica/mobile-app) folder:

- **[`mobile-app/App.js`](file:///c:/Users/RanjitR-3355/Desktop/ai/oica/mobile-app/App.js)**: Production-grade React Native app with:
  - Deep integration with the OICS web portal (`#090d16` dark theme).
  - Hardware back-button handling (navigates web history seamlessly).
  - Offline connection detection with automatic retry screen.
  - Pull-to-refresh and interactive loading indicators.
  - Native dialer interception (`tel:9777735527`) and WhatsApp launcher.
- **[`mobile-app/app.json`](file:///c:/Users/RanjitR-3355/Desktop/ai/oica/mobile-app/app.json)**: Expo configuration with package name `com.oics.institute`, permissions, icons, and splash screens.
- **[`mobile-app/eas.json`](file:///c:/Users/RanjitR-3355/Desktop/ai/oica/mobile-app/eas.json)**: Configured specifically with `"buildType": "apk"` so that EAS builds direct installable `.apk` files.
- **[`public/oics-app.apk`](file:///c:/Users/RanjitR-3355/Desktop/ai/oica/public/oics-app.apk)**: The downloadable APK file served directly to website visitors.

---

## 🏗️ Part 2: Building New APK Versions with Expo EAS (Cloud Build)

Expo provides free cloud builds for Android APKs without requiring local Android Studio or Java installations.

### Step 1: Install EAS CLI
Open your terminal (PowerShell or Bash) and run:
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```
*(If you don't have an Expo account yet, register for free at [expo.dev/signup](https://expo.dev/signup))*

### Step 3: Run the APK Build
From the `mobile-app` directory, run:
```bash
cd mobile-app
eas build -p android --profile preview
```
- Expo Cloud will package and sign the standalone APK.
- Once completed, the terminal will print an APK download link and a QR code.
- Download the generated `.apk` and copy it to `public/oics-app.apk` to update the website's download button!

---

## 🚀 Part 3: Publishing the APK to Uptodown Step-by-Step

### Why Uptodown?
- **Zero Cost**: Unlike Google Play ($25 fee) or Apple App Store ($99/year), Uptodown is **100% free** for developers.
- **Direct APK Distribution**: Distributes native `.apk` files directly to users worldwide.
- **Over 130 Million Monthly Active Users**.
- **No strict Google restrictions**: Instant distribution without complex review hurdles.

---

### Step 1: Register as an Uptodown Developer
1. Go to the **Uptodown Developer Portal**: [https://developers.uptodown.com/](https://developers.uptodown.com/)
2. Click **"Sign Up"** or **"Register"**.
3. Enter your Developer Name (`Odisha Institute of Computer Studies`), Email (`sanjit007muna@gmail.com`), and Password.
4. Verify your email address by clicking the activation link sent to your inbox.

---

### Step 2: Add a New Application
1. In your Uptodown Developer Dashboard, click **"Add New App"** or **"Submit App"**.
2. Fill in the primary details:
   - **App Name**: `OICS - Odisha Institute of Computer Studies`
   - **Category**: `Education` (Sub-category: `Teaching & Training` or `Productivity`)
   - **Platform**: `Android`
   - **Default Language**: `English`

---

### Step 3: Upload the APK File
1. Click **"Upload APK"**.
2. Select your file: [`public/oics-app.apk`](file:///c:/Users/RanjitR-3355/Desktop/ai/oica/public/oics-app.apk).
3. Uptodown will automatically read:
   - **Package Name**: `com.oics.institute`
   - **Version Name**: `1.0.0`
   - **Version Code**: `1`
   - **Target SDK**: Android 5.0 - 15+

---

### Step 4: Add Visual Assets & Screenshots
Prepare and upload the following graphic assets:
- **App Icon**: `mobile-app/assets/icon.png` (512x512 PNG, high resolution).
- **Screenshots (Minimum 3)**:
  1. *Screenshot 1*: Home / Hero section with Certificate Verification.
  2. *Screenshot 2*: Student Certificate QR Verification Result card.
  3. *Screenshot 3*: Online Admission Form & Certified Courses catalog.
- **Promo Banner (Optional)**: 1024x500 landscape banner.

---

### Step 5: Enter App Descriptions and Metadata
Use the pre-written metadata below for fast submission:

#### **Short Description (80 characters max):**
```
Official OICS App: Instant Certificate Verification, Courses & Online Admission.
```

#### **Full Description:**
```markdown
Official Android Mobile Application of Odisha Institute of Computer Studies (OICS) — an ISO 9001:2026 Certified Educational Institution managed by Sanjit Kumar Rautaray.

Key Features:
✔ Instant Online Certificate Verification: Scan QR codes or search by certificate number to view authentic academic records.
✔ Course Catalog: Browse certified programs including PGDCA, DCA, Python AI, Full-Stack Web Development, Tally Prime & Cloud Computing.
✔ Online Admission & Fee Payments: Submit admissions seamlessly with secure online receipts.
✔ Offline Support: Fast cached interface designed for smooth mobile browsing even on low bandwidth networks.
✔ Direct Support: Instant one-tap phone and WhatsApp counseling with faculty administrators.

Campus Address: At- Nanapada, PO/PS- Nirakarpur, Dist- Khordha, PIN- 752019, Odisha.
Helpline: +91 9777735527
Email: sanjit007muna@gmail.com
```

---

### Step 6: Security Screening & Approval
1. Uptodown automatically scans every uploaded `.apk` using **VirusTotal (over 50 antivirus engines)** to ensure 100% clean and safe software.
2. The Uptodown editorial team validates the description and screenshots.
3. Review typically completes in **24 to 48 hours**.
4. Once approved, your application will be live at:
   `https://oics-institute.en.uptodown.com/android`

---

### Step 7: Publishing Updates in the Future
Whenever you update courses, admission fees, or features:
1. Increment the `version` and `versionCode` in [`mobile-app/app.json`](file:///c:/Users/RanjitR-3355/Desktop/ai/oica/mobile-app/app.json):
   ```json
   "version": "1.0.1",
   "android": {
     "versionCode": 2
   }
   ```
2. Run `eas build -p android --profile preview` to generate the new APK.
3. Log in to [developers.uptodown.com](https://developers.uptodown.com), click on your app, and select **"Upload New Version"**.
4. Uptodown will automatically notify users to update their app!
