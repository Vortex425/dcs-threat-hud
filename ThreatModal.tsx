// 🎯 Vibe: MFD Tactical Readout - Mit pulsierendem Lock-On & CM-Colors
import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Threat } from './threatData';

interface Props {
  threat: Threat | null;
  visible: boolean;
  onClose: () => void;
}

const formatAltitude = (altStr: string) => {
  if (altStr === '++' || altStr === '+') return '> 50.000';
  if (altStr === 'N/A' || !altStr) return 'N/A';
  const parsedAlt = parseInt(altStr, 10);
  if (!isNaN(parsedAlt)) return (parsedAlt * 1000).toLocaleString('de-DE'); 
  return altStr;
};

// 🔥 Neue Hilfsfunktion für die exakten Cheat-Sheet Farben
const getCmColor = (cm: string) => {
  switch (cm) {
    case 'Chaff': return '#00BFFF'; // Taktisches Hellblau
    case 'Flares': return '#FFA500'; // Warn-Orange
    case 'Evade': return '#FF00FF'; // Magenta/Pink
    default: return '#39FF14'; // Fallback auf MFD-Grün
  }
};

export default function ThreatModal({ threat, visible, onClose }: Props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.2, 
            duration: 200, 
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1, 
            duration: 200,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      fadeAnim.setValue(1); 
    }
  }, [visible, fadeAnim]);

  if (!threat) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.mfdScreen}>
          
          <Animated.Text style={[styles.warningHeader, { opacity: fadeAnim }]}>
            <Text style={styles.blink}>[!]</Text> TARGET LOCKED: {threat.rwrSymbol}
          </Animated.Text>
          
          <View style={styles.divider} />

          <View style={styles.dataBlock}>
            <Text style={styles.infoLine}>SYS:  {threat.name}</Text>
            <Text style={styles.infoLine}>TYPE: {threat.category}</Text>
            <Text style={styles.infoLine}>RNG:  {threat.maxRangeNm} NM</Text>
            <Text style={styles.infoLine}>ALT:  {formatAltitude(threat.maxAltFt)} FT</Text>
            
            {/* 🔥 Hier wird die Farbe dynamisch angewendet */}
            <Text style={styles.infoLine}>
              CM:   <Text style={{ color: getCmColor(threat.countermeasure) }}>{threat.countermeasure}</Text>
            </Text>
            
            <View style={styles.harmBlock}>
              <Text style={styles.harmText}>HARM CODE: {threat.harmCode}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>[ BREAK LOCK ]</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', justifyContent: 'center', alignItems: 'center' },
  mfdScreen: { width: '85%', backgroundColor: '#001100', borderWidth: 2, borderColor: '#39FF14', padding: 20, shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 15, elevation: 10 },
  warningHeader: { color: '#FF003C', fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  blink: { color: '#FF003C' },
  divider: { height: 2, backgroundColor: '#005500', marginBottom: 15 },
  dataBlock: { marginBottom: 20 },
  infoLine: { color: '#39FF14', fontFamily: 'monospace', fontSize: 16, marginVertical: 4, letterSpacing: 1 },
  harmBlock: { marginTop: 15, padding: 10, borderWidth: 1, borderColor: '#39FF14', backgroundColor: 'rgba(57, 255, 20, 0.1)' },
  harmText: { color: '#39FF14', fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  closeBtn: { alignSelf: 'center', padding: 10 },
  closeText: { color: '#005500', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold' }
});