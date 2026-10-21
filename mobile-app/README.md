# OICS Institute - Official React Native Android App (Expo)

This is the official mobile application codebase for **Odisha Institute of Computer Studies (OICS)** built using React Native and Expo. It provides an identical experience to the web portal with native Android optimization, instant certificate verification, online admission & payments, offline error screens, and push/share capabilities.

---

## 🚀 Quick Start (Development & Testing)

### 1. Install Dependencies
Navigate into the mobile app folder and install dependencies:
```bash
cd mobile-app
npm install
```

### 2. Start the Expo Development Server
```bash
npx expo start
```
- Scan the displayed QR code with the **Expo Go** app on your Android smartphone (downloadable from Google Play Store).
- Or press `a` to launch in an Android Emulator.

---

## 📦 How to Build the Standalone APK (.apk file) using Expo EAS

We have configured `eas.json` with `"buildType": "apk"`. Follow these steps to build the installable `.apk` file:

### Step 1: Install EAS CLI globally
```bash
npm install -g eas-cli
```

### Step 2: Log in to your free Expo Account
```bash
eas login
```
*(If you do not have an Expo account yet, register for free at [expo.dev/signup](https://expo.dev/signup))*

### Step 3: Configure project (First time only)
```bash
eas build:configure
```

### Step 4: Build the Standalone APK file
Run the build command:
```bash
eas build -p android --profile preview
```
- Expo Cloud will compile the complete React Native project into an `.apk` file.
- When finished, EAS will print a direct download URL and a terminal QR code.
- Download the resulting `.apk` file and place it in the website's `public/oics-app.apk` path so visitors can download it directly from the site!

---

## 🌐 Publishing to Uptodown

See the root guide or the website's publishing documentation for step-by-step instructions on publishing this APK to the Uptodown App Store.
