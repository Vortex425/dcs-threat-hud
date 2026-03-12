# 🚀 DCS Tactical MFD & Comms Link

Eine modulare, interaktive Kniebrett- und Companion-App für **DCS World**, gebaut mit React Native (Expo). 
Diese App dient als taktisches Multifunktionsdisplay (MFD) auf deinem Android-Tablet oder Smartphone und bietet direkten, lokalen Zugriff auf Checklisten, Zielkoordinaten und eine automatisierte Steuerung des DCS-Funkmenüs (F10).

## ✨ Features

* **[ RWR DATABASE ]:** Modul für Bedrohungsanalysen und Radarwarnempfänger-Daten.
* **[ TARGET INDEX ]:** Ein robuster Dokumenten- und Bildbetrachter mit Zoom-Funktion für Missionskarten, Zielbilder und Checklisten.
* **[ COMMS LINK ]:** Ein taktiles Hardware-Interface, das Befehle über das lokale WLAN an DCS sendet, um komplexe F10-Funkmenü-Befehle (z. B. CSAR, Logistik, Mission Control) vollautomatisch und in Sekundenbruchteilen im Spiel auszuführen.

---

## 🛠️ Systemvoraussetzungen

* **App:** Android-Gerät (Tablet/Smartphone) im selben WLAN wie der PC.
* **PC:** DCS World, installiert auf einem Windows-PC.
* **Entwicklung:** Node.js, Expo CLI, Android SDK (für manuelle Builds).
---

## 🔗 Links & Ressourcen

* **[Node.js herunterladen](https://nodejs.org/)**: Die Basis-Laufzeitumgebung. Wird benötigt, um `npm`-Befehle auszuführen.
* **[Expo Installation & Setup](https://docs.expo.dev/get-started/installation/)**: Offizielle Dokumentation, wie man ein Expo-Projekt startet.
* **[Expo Go App](https://expo.dev/client)**: Die Begleit-App für dein Smartphone, um den Code während der Entwicklung live zu testen.
* **[Android Studio](https://developer.android.com/studio)**: Wird benötigt, um das Android SDK für den lokalen APK-Build (`gradlew assembleRelease`) einzurichten.
* **[Notepad++](https://notepad-plus-plus.org/)** oder **[Visual Studio Code](https://code.visualstudio.com/)**: Empfohlene Code-Editoren, um die `DCS_Uplink.lua` oder die App-Dateien fehlerfrei zu bearbeiten.
---

## 📱 App: Installation & Build

### 1. Für die Entwicklung (Expo Go)
Wenn du den Code bearbeiten und live auf dem Handy testen möchtest:
```bash
# Repository klonen und in den Ordner wechseln
npm install
npx expo start -c
```
Scanne den QR-Code mit der Expo Go App auf deinem Handy.

### 2. Standalone APK bauen (Release Build)
Da die App lokale, unverschlüsselte HTTP-Netzwerk-Befehle an den PC sendet (`Cleartext Traffic`), ist der native Android-Build-Prozess erforderlich. Die Erlaubnis dafür ist bereits in der `AndroidManifest.xml` und `app.json` hinterlegt.

**Wichtige Info zur App-Signatur:**
Android verlangt grundsätzlich, dass jede installierte APK signiert ist. 
* **Quick & Dirty (Für dich & Freunde):** Wenn du den Build-Befehl einfach so ausführst, erstellt Android oft eine `app-release-unsigned.apk` oder signiert sie mit einem Standard-Debug-Schlüssel. Wenn du diese App installierst, wird **Google Play Protect** eine dicke, rote Warnung anzeigen ("App wurde nicht erkannt" oder "Unbekannter Entwickler"). Das ist völlig normal bei selbstgebauten Apps. Du kannst dort einfach auf *Weitere Details -> Trotzdem installieren* klicken.
* **Der saubere Weg (Eigener Keystore):** Wenn du die rote Warnung umgehen oder die App "offiziell" signieren willst, musst du einen eigenen Keystore generieren und in der `android/app/build.gradle` hinterlegen. 
  *(Terminal-Befehl zur Generierung: `keytool -genkey -v -keystore release.keystore -alias app-alias -keyalg RSA -keysize 2048 -validity 10000`)*

**Der Build-Prozess:**
Um die fertige `.apk` Datei zu generieren, öffne dein Terminal im Projektordner und führe diese Befehle aus:

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```
Die fertige App findest du unter: `android/app/build/outputs/apk/release/app-release.apk`. Übertrage diese Datei auf dein Android-Gerät und installiere sie.

---

## 💻 PC: Installation des DCS-Servers (Comms Link)

Damit die App das Funkmenü im Spiel steuern kann, benötigt DCS ein kleines, lokales Empfänger-Skript. **Dieses Skript kommuniziert zu 100 % lokal (LAN) und sendet keine Daten an das Internet.**

### Schritt 1: Skript ablegen
1. Lade die Datei `DCS_Uplink.lua` aus diesem Repository herunter.
2. Verschiebe sie in deinen DCS-Skript-Ordner:
   `C:\Benutzer\[DEIN_NAME]\Gespeicherte Spiele\DCS\Scripts\` *(Bei OpenBeta entsprechend in den `DCS.openbeta` Ordner)*.

### Schritt 2: Export.lua anpassen
1. Öffne die Datei `Export.lua` im selben Ordner (erstelle sie, falls sie nicht existiert).
2. Füge **ganz am Ende** der Datei folgende Zeile hinzu:
   ```lua
   dofile(lfs.writedir()..[[Scripts\DCS_Uplink.lua]])
   ```
   *Hinweis: Wenn du DCS-BIOS, SRS oder Winwing-Skripte nutzt, achte darauf, dass dieses Skript wirklich als Letztes aufgerufen wird und keine leeren `LuaExportStart()`-Funktionen im Dokument existieren, die den Aufruf überschreiben könnten.*

### Schritt 3: IP herausfinden
1. Drücke die Windows-Taste, tippe `cmd` und drücke Enter.
2. Tippe `ipconfig` ein.
3. Notiere dir deine **IPv4-Adresse** (z. B. `192.168.178.20`). Diese trägst du im Setup-Screen der App ein.

**Wichtig für die Nutzung im Spiel:**
* Das Skript ist nur aktiv, wenn du dich in einer **gestarteten, unpausierten Mission** (Vollbild / maximiert) befindest.
* Im DCS-Hauptmenü passiert beim Drücken der App-Buttons nichts.

---

## ⚙️ Customization: Wie du die App anpasst

### A. Target Index Bilder austauschen
Die Bilder für das Kniebrett liegen lokal in der App.
1. Navigiere zum Ordner `assets/targets/`.
2. Lege deine JPG-Bilder dort ab (z. B. aus PDFs exportiert).
3. Öffne die `TargetIndex.tsx` und passe das `pdfPages` Array oben in der Datei an, damit die Dateinamen und Endungen exakt übereinstimmen.

### B. Neue Funk-Makros (Comms Link) erstellen
Wenn du auf anderen Multiplayer-Servern spielst, musst du oft andere F-Tasten drücken. Dies anzupassen geht in zwei Schritten:

**1. Einen neuen Button in der App anlegen (`CommsLink.tsx`)**
Füge im Layout einen neuen `TouchableOpacity`-Block hinzu und gib dem Befehl einen eindeutigen Namen (z.B. `AWACS_BOGEY_DOPE`):
```tsx
<TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('AWACS_BOGEY_DOPE')}>
  <Text style={styles.macroBtnText}>REQ: BOGEY DOPE</Text>
</TouchableOpacity>
```

**2. Die Tastenschläge im PC-Skript hinterlegen (`DCS_Uplink.lua`)**
Öffne die Lua-Datei und suche die Funktion `Uplink.PushMacro`. Füge einen neuen `elseif`-Block mit deinem gewählten Namen hinzu. 

DCS nutzt feste Engine-IDs für das Menü. Hier ist der Spickzettel aus der Engine:
* **`179`** = Funkmenü öffnen (Immer als erstes aufrufen!)
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

**Beispiel für den neuen AWACS-Befehl (F10 -> F5 -> F1):**
```lua
elseif macro == "AWACS_BOGEY_DOPE" then
    -- # > F10 > F5 > F1
    local seq = {179, 975, 970, 966}
    for _, v in ipairs(seq) do table.insert(Uplink.queue, v) end
```

*Tipp: Sollte das DCS-Menü Tastendrücke verschlucken, weil es sich zu langsam aufbaut, erhöhe die Variable `Uplink.nextTime = t + 0.25` am Ende der Lua-Datei leicht (z.B. auf `0.3` oder `0.4`).*
