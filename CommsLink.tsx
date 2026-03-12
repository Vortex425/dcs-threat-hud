// 🚀 CommsLink.tsx - Das taktische Macro-Interface
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Modal } from 'react-native';

// 🔥 NEU: Wir definieren, welche Daten die App.tsx uns übergeben muss
interface Props {
  ipAddress: string;
  setIpAddress: (ip: string) => void;
  isLinked: boolean;
  setIsLinked: (linked: boolean) => void;
}

// 🔥 NEU: Die Props in die Klammern einfügen
export default function CommsLink({ ipAddress, setIpAddress, isLinked, setIsLinked }: Props) {
  
  // Die IP und isLinked sind hier jetzt weg! Nur der Guide bleibt lokal.
  const [showGuide, setShowGuide] = useState(false);

  const handleEnableLink = () => {
    if (ipAddress.length < 9) {
      Alert.alert('UPLINK FAILED', 'Please enter a valid local IPv4 address.');
      return;
    }
    setIsLinked(true);
  };

  const handleMacroPress = async (macroName: string) => {
    console.log(`[UPLINK] Initiating transmission: ${macroName} to ${ipAddress}...`);

    // 🔥 NEU: Der React-Native kompatible Timeout-Zünder
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // Bricht nach 2 Sekunden ab

    try {
      const response = await fetch(`http://${ipAddress}:7777/${macroName}`, {
        method: 'GET',
        signal: controller.signal // Verbindet den Fetch mit unserem Controller
      });
      
      // Wenn die Anfrage erfolgreich war, entschärfen wir den Timer
      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`[UPLINK] ${macroName} SUCCESSFUL.`);
      }
    } catch (error) {
      // Auch bei einem Fehler müssen wir den Timer stoppen
      clearTimeout(timeoutId);
      console.error(`[UPLINK] FAILED:`, error);
      Alert.alert('TRANSMISSION FAILED', 'Could not reach DCS. Check IP and Export.lua.');
    }
  };

  // ==========================================
  // STATE 0: SETUP & OPT-IN SCREEN
  // ==========================================
  if (!isLinked) {
    return (
      <View style={styles.container}>
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>[ SYSTEM OFFLINE ]</Text>
          <Text style={styles.instructionText}>
            This module connects directly to your DCS client to automate Comms-Menu commands (F10).
          </Text>
          
          <TouchableOpacity style={styles.guideBtn} onPress={() => setShowGuide(true)}>
            <Text style={styles.guideBtnText}>[ OPEN INSTALLATION GUIDE ]</Text>
          </TouchableOpacity>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>TARGET IP:</Text>
            <TextInput 
              style={styles.ipInput}
              value={ipAddress}
              onChangeText={setIpAddress}
              keyboardType="numeric"
              placeholder="192.168.x.x"
              placeholderTextColor="#005500"
            />
          </View>

          <TouchableOpacity style={styles.enableBtn} onPress={handleEnableLink}>
            <Text style={styles.enableBtnText}>[ INITIALIZE UPLINK ]</Text>
          </TouchableOpacity>
        </View>

        {/* 🔥 NEU: Angepasstes Installations-Modal (Ohne Download-Button) */}
        <Modal transparent={true} visible={showGuide} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.guideModal}>
              <Text style={styles.warningTitle}>[ LUA SCRIPT SETUP ]</Text>
              
              <ScrollView style={styles.guideScroll}>
                <Text style={styles.guideStepTitle}>STEP 1: GET SCRIPT</Text>
                <Text style={styles.guideText}>On your DCS PC, open a browser and go to:</Text>
                <View style={styles.codeBlock}>
                  {/* 🔥 HIER TRÄGST DU DEINEN KURZLINK EIN */}
                  <Text style={styles.codeTextHighlight}>github.com/DEIN_NAME/REPO</Text>
                </View>
                <Text style={styles.guideText}>Download the "DCS_Uplink.lua" file.</Text>

                <Text style={styles.guideStepTitle}>STEP 2: INSTALL SCRIPT</Text>
                <Text style={styles.guideText}>
                  Move the downloaded file into your DCS Scripts folder:{'\n'}
                  <Text style={{color: '#FFA500'}}>C:\Users\YOUR_NAME\Saved Games\DCS\Scripts\</Text>
                </Text>

                <Text style={styles.guideStepTitle}>STEP 3: EDIT EXPORT.LUA</Text>
                <Text style={styles.guideText}>
                  Open the <Text style={{fontWeight: 'bold'}}>Export.lua</Text> file in the same folder (create it if it doesn't exist) and add this exact line at the very bottom:
                </Text>
                <View style={styles.codeBlock}>
                  <Text style={styles.codeText}>dofile(lfs.writedir()..[[Scripts\DCS_Uplink.lua]])</Text>
                </View>

                <Text style={styles.guideStepTitle}>STEP 4: FIND YOUR IP</Text>
                <Text style={styles.guideText}>
                  Open Windows CMD, type <Text style={{color: '#FFA500'}}>ipconfig</Text>, and find your IPv4 Address. Enter it in the App's Setup Screen.
                </Text>
              </ScrollView>

              <TouchableOpacity style={styles.closeGuideBtn} onPress={() => setShowGuide(false)}>
                <Text style={styles.closeGuideText}>[ CLOSE GUIDE ]</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // ==========================================
  // STATE 1: ACTIVE TACTICAL MACROS
  // ==========================================
  return (
    <View style={styles.container}>
      <View style={styles.activeHeader}>
        <Text style={styles.activeStatus}>UPLINK ESTABLISHED: {ipAddress}</Text>
        <TouchableOpacity onPress={() => setIsLinked(false)}>
          <Text style={styles.disconnectText}>[ DISCONNECT ]</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.macroScroll} contentContainerStyle={styles.macroGrid} showsVerticalScrollIndicator={false}>
        
        {/* ================= MISSIONS ================= */}
        <View style={styles.macroCategory}>
          <Text style={styles.categoryTitle}>--- MISSION CONTROL ---</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('MISSION_LIST')}>
              <Text style={styles.macroBtnText}>MISSION LIST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('MISSION_DIAL_CODE')}>
              <Text style={styles.macroBtnText}>DIAL CODE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('MISSION_STRIKE')}>
              <Text style={styles.macroBtnText}>REQ: STRIKE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('MISSION_CAS')}>
              <Text style={styles.macroBtnText}>REQ: CAS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('MISSION_SEAD')}>
              <Text style={styles.macroBtnText}>REQ: SEAD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('RECON_MAIN')}>
              <Text style={styles.macroBtnText}>RECON</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= LOGISTICS ================= */}
        <View style={styles.macroCategory}>
          <Text style={styles.categoryTitle}>--- LOGISTICS & CARGO ---</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('LOGISTICS_CRATES')}>
              <Text style={styles.macroBtnText}>CRATES MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('LOGISTICS_CRATE_2000')}>
              <Text style={styles.macroBtnText}>SPAWN: 2000 CRATE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('LOGISTICS_UNPACK_ALL')}>
              <Text style={styles.macroBtnText}>UNPACK ALL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('LOGISTICS_INFANTRY')}>
              <Text style={styles.macroBtnText}>LOAD INFANTRY</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= CSAR ================= */}
        <View style={styles.macroCategory}>
          <Text style={styles.categoryTitle}>--- CSAR & RESCUE ---</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('CSAR_MAIN')}>
              <Text style={styles.macroBtnText}>CSAR MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('CSAR_INFO')}>
              <Text style={styles.macroBtnText}>REQ: INFO</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('CSAR_SMOKE')}>
              <Text style={styles.macroBtnText}>REQ: SMOKE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macroBtn} onPress={() => handleMacroPress('CSAR_EXTRACT')}>
              <Text style={styles.macroBtnText}>EXTRACT</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#000000' },
  warningBox: { borderWidth: 2, borderColor: '#FF003C', padding: 20, backgroundColor: 'rgba(255, 0, 60, 0.05)', marginTop: 20 },
  warningTitle: { color: '#39FF14', fontFamily: 'monospace', fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  instructionText: { color: '#FFA500', fontFamily: 'monospace', fontSize: 14, marginBottom: 15, lineHeight: 20, textAlign: 'center' },
  guideBtn: { backgroundColor: 'rgba(57, 255, 20, 0.1)', borderWidth: 1, borderColor: '#39FF14', padding: 10, alignItems: 'center', marginBottom: 20 },
  guideBtnText: { color: '#39FF14', fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  inputLabel: { color: '#39FF14', fontFamily: 'monospace', fontSize: 16, marginRight: 10 },
  ipInput: { flex: 1, backgroundColor: '#001100', color: '#39FF14', fontFamily: 'monospace', fontSize: 18, padding: 10, borderWidth: 1, borderColor: '#39FF14' },
  enableBtn: { backgroundColor: '#001100', borderWidth: 2, borderColor: '#39FF14', padding: 15, alignItems: 'center' },
  enableBtnText: { color: '#39FF14', fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center', alignItems: 'center' },
  guideModal: { width: '90%', maxHeight: '80%', backgroundColor: '#001100', borderWidth: 2, borderColor: '#39FF14', padding: 20 },
  guideScroll: { marginBottom: 15 },
  guideStepTitle: { color: '#39FF14', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  guideText: { color: '#008855', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 },
  codeBlock: { backgroundColor: '#000000', borderWidth: 1, borderColor: '#005500', padding: 10, marginVertical: 10 },
  codeText: { color: '#FFA500', fontFamily: 'monospace', fontSize: 10 },
  codeTextHighlight: { color: '#39FF14', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  closeGuideBtn: { alignSelf: 'center', padding: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: '#005500', width: '100%', alignItems: 'center' },
  closeGuideText: { color: '#39FF14', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold' },

  // Active Styles
  activeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#005500' },
  activeStatus: { color: '#39FF14', fontFamily: 'monospace', fontSize: 12 },
  disconnectText: { color: '#FF003C', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bold' },
  macroScroll: { flex: 1 },
  macroGrid: { paddingBottom: 30 },
  macroCategory: { marginBottom: 25 },
  categoryTitle: { color: '#005500', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 15 },
  macroBtn: { flex: 1, backgroundColor: '#001100', borderWidth: 2, borderColor: '#39FF14', paddingVertical: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
  macroBtnText: { color: '#39FF14', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});