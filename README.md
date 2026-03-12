# Disclaimer
**This Project is made with the use of AI and a bit of my brain...**

---

# 🚀 DCS Tactical MFD & Comms Link

A modular, interactive kneeboard and companion app for **DCS World**, built with React Native (Expo). 
This app serves as a tactical Multifunction Display (MFD) on your Android tablet or smartphone, providing direct, local access to checklists, target coordinates, and automated control of the DCS radio menu (F10).

## ✨ Features

* **[ RWR DATABASE ]:** Module for threat analysis and Radar Warning Receiver (RWR) data.
* **[ TARGET INDEX ]:** A robust document and image viewer with zoom functionality for mission maps, target images, and checklists.
* **[ COMMS LINK ]:** A tactile hardware interface that sends commands over your local Wi-Fi to DCS, executing complex F10 radio menu sequences (e.g., CSAR, Logistics, Mission Control) fully automatically and in fractions of a second in-game.

---

## 🛠️ System Requirements

* **App:** Android device (Tablet/Smartphone) connected to the same Wi-Fi network as the PC.
* **PC:** DCS World, installed on a Windows PC.
* **Development:** Node.js, Android Studio (for SDK), VSCode.

---

## 🔗 Links & Resources

* **[Download Node.js](https://nodejs.org/)**: The base runtime environment. Required to execute `npm` commands.
* **[Expo Installation & Setup](https://docs.expo.dev/get-started/installation/)**: Official documentation on how to start an Expo project.
* **[Android Studio](https://developer.android.com/studio)**: Required to set up the Android SDK for the local APK build and development.
* **[Visual Studio Code (VSCode)](https://code.visualstudio.com/)**: Highly recommended code editor for this project.

---

## 🖥️ Setting up your Workspace (Windows & VSCode)

To edit the code and compile local development builds on Windows (without using cloud-based EAS), you need to set up your environment carefully. 

**Step 1: Install Core Prerequisites**
1. Download and install **[Node.js](https://nodejs.org/)** (LTS version is recommended). This installs `npm`.
2. Download and install **[Git](https://git-scm.com/)**.

**Step 2: Android Studio & SDK Setup (Crucial for Local Builds)**

To build the app locally, your PC needs the Android build tools.

### *Refer to the [Expo Docs](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local)*
---

## 📱 App: Development & Building (Local, No EAS)

### 1. Running a Local Development Build
This compiles the app directly on your Windows machine and installs a dedicated development version on your connected device or emulator.

### *Refer to the [Expo Docs](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local#running-your-app-on-an-android-device)*

### 2. Building a Standalone Release APK
When you are done coding and want to create the final `.apk` to distribute to your tablet or squadmates, you compile a release build.

**Step 1: Compile the APK via Gradle**
1. Open your VSCode terminal.
2. Navigate into the native `android` directory:
   ```bash
   cd android
   ```
3. Clean the build environment to prevent caching issues:
   ```bash
   ./gradlew clean
   ```
4. Compile the release APK:
   ```bash
   ./gradlew assembleRelease
   ```

**Step 2: Locate and Install the APK**
Once successful, find your compiled app in the file explorer at:
`android/app/build/outputs/apk/release/app-release.apk`
Transfer this `.apk` file to your Android device and install it.

**⚠️ Important Info regarding App Signatures (Play Protect):**
If you run the build commands above without setting up a custom Keystore, Android will sign the app with a generic debug key (or leave it unsigned). When installing this on your phone, **Google Play Protect** will throw a red warning ("Unrecognized app" or "Unknown developer"). 
* This is completely normal for self-built apps! Simply tap **More details -> Install anyway**.
* *(Advanced: If you wish to sign it properly to remove the warning, you must generate your own Keystore and link it in the `android/app/build.gradle` file).*

---

## 💻 PC: DCS Server Installation (Comms Link)

For the app to be able to control the radio menu in-game, DCS needs a small, local receiver script. **This script communicates 100% locally (LAN) and does not send any data to the internet.**

### Step 1: Place the script
1. Download the `DCS_Uplink.lua` file from this repository.
2. Move it to your DCS Scripts folder:
   `C:\Users\[YOUR_NAME]\Saved Games\DCS\Scripts\` *(Use the `DCS.openbeta` folder if applicable)*.

### Step 2: Edit Export.lua
1. Open the `Export.lua` file in the same folder (create it if it doesn't exist).
2. Add the following line **at the very bottom** of the file:
   ```lua
   dofile(lfs.writedir()..[[Scripts\DCS_Uplink.lua]])
   ```
   *Note: If you are using DCS-BIOS, SRS, or Winwing scripts, make sure this script is truly called last and that there are no empty `LuaExportStart()` functions in the document that might overwrite the call.*

### Step 3: Find your IP
1. Press the Windows key, type `cmd`, and press Enter.
2. Type `ipconfig`.
3. Note your **IPv4 Address** (e.g., `192.168.178.20`). Enter this IP in the app's setup screen.

**Important for in-game usage:**
* The script is only active when you are in a **started, unpaused mission** (fullscreen / maximized).
* Pressing the app buttons while in the DCS main menu will do nothing.

---

## ⚙️ New Macros

### Create new Radio Macros (Comms Link)
If you play on different multiplayer servers, you often need to press different F-keys. Customizing this takes two steps:

**1. Create a new button in the App (`CommsLink.tsx`)**
Add a new `TouchableOpacity` block in the layout and give the command a unique name (e.g., `AWACS_BOGEY_DOPE`):
```tsx
<TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('AWACS_BOGEY_DOPE')}>
  <Text style={styles.macroBtnText}>REQ: BOGEY DOPE</Text>
</TouchableOpacity>
```

**2. Assign the keystrokes in the PC Script (`DCS_Uplink.lua`)**
Open the Lua file and find the `Uplink.PushMacro` function. Add a new `elseif` block with your chosen name. 

DCS uses fixed engine IDs for the menu. Here are the ones I used directly from the engine:
* **`179`** = Open Radio Menu (Always call this first!)
* **`966`** = F1
* **`967`** = F2
* **`968`** = F3
* **`969`** = F4
* **`970`** = F5
* **`971`** = F6
* **`972`** = F7
* **`973`** = F8
* **`974`** = F9
* **`975`** = F10
* **`976`** = F11
* **`977`** = F12

*Note: To use other codes look into the `command_defs.lua` included in the sourcecode.*

**Example for the new AWACS command (F10 -> F5 -> F1):**
```lua
elseif macro == "AWACS_BOGEY_DOPE" then
    -- Sequence: Menu > F10 > F5 > F1
    local seq = {179, 975, 970, 966}
    for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end
```

*Tip: If the DCS menu "swallows" keystrokes because it opens too slowly, slightly increase the variable `Uplink.nextTime = t + 0.25` at the bottom of the Lua file (e.g., to `0.3` or `0.4`).*

---
*Happy Flying & Check your Six!*
