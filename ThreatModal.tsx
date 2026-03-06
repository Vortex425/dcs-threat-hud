// 🎯 Vibe: MFD Tactical Readout - Mit pulsierendem Lock-On & CM-Colors
import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import { Threat, fa18cThreats } from './threatData';

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

const getThreatLevelColor = (level?: string) => {
  switch (level) {
    case 'Low': return '#39FF14';    // Grün
    case 'Medium': return '#FFA500'; // Orange
    case 'High': return '#FF003C';   // Rot
    case 'Blue': return '#0088ff'
    default: return '#39FF14';
  }
};

export default function ThreatModal({ threat, visible, onClose }: Props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible && threat) {
      let duration = 200; // Standard: High (sehr schnell)
      if (threat.threatLevel === 'Medium') duration = 500; // Mittel (pulsierend)
      if (threat.threatLevel === 'Low') duration = 1000;   // Low (ruhiges Atmen)
      if (threat.threatLevel === 'Blue') duration = 0;

      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0.2, duration: duration, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1, duration: duration, useNativeDriver: true })
        ])
      ).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [visible, threat, fadeAnim]);

  if (!threat) return null;

  const headerColor = getThreatLevelColor(threat.threatLevel);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.mfdScreen}>

          <Animated.Text style={[styles.warningHeader, { opacity: fadeAnim, color: headerColor }]}>
            <Text style={{ color: headerColor }}>[!]</Text> THREAT LEVEL: {threat.threatLevel.toUpperCase()}
          </Animated.Text>

          <View style={styles.divider} />

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false} // Versteckt die Scrollbar für einen cleanen Look
          >
            <View style={styles.dataBlock}>
              {threat.image ? (
                <View style={styles.imageContainer}>
                  <Image source={threat.image} style={styles.threatImage} resizeMode="cover" />
                </View>
              ) : (
                <View style={[styles.imageContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={{ color: '#005500', fontFamily: 'monospace' }}>[ NO VISUAL DATA ]</Text>
                </View>
              )}

              <Text style={styles.infoLine}>SYS:  {threat.name}</Text>
              <Text style={styles.infoLine}>TYPE: {threat.category}</Text>
              <Text style={styles.infoLine}>RNG:  {threat.maxRangeNm} NM</Text>
              <Text style={styles.infoLine}>ALT:  {formatAltitude(threat.maxAltFt)} FT</Text>

              <Text style={styles.infoLine}>
                CM:   <Text style={{ color: getCmColor(threat.countermeasure) }}>{threat.countermeasure}</Text>
              </Text>

              {threat.linkedSystems && threat.linkedSystems.length > 0 && (
                <View style={styles.linkContainer}>
                  <Text style={styles.linkTitle}>ASSOCIATED SYSTEMS:</Text>
                  {threat.linkedSystems.map((symbol, idx) => {
                    const linkedThreat = fa18cThreats.find(t => t.rwrSymbol === symbol);
                    if (!linkedThreat) return null;

                    return (
                      <View key={idx} style={styles.linkRow}>
                        <View style={styles.linkSymbolCircle}>
                          <Text style={styles.linkSymbolText}>{linkedThreat.rwrSymbol}</Text>
                        </View>
                        <Text style={styles.linkNameText}>{linkedThreat.name}</Text>
                      </View>
                    );
                  })}
                </View>
              )}

              <View style={styles.harmBlock}>
                <Text style={styles.harmText}>HARM CODE: {threat.harmCode}</Text>
              </View>

            </View>
          </ScrollView>

          {/* 🔥 Fixierter Close-Button */}
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
  mfdScreen: { width: '85%', maxHeight: '85%', backgroundColor: '#001100', borderWidth: 2, borderColor: '#39FF14', padding: 20, shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 15, elevation: 10 },
  warningHeader: { color: '#FF003C', fontFamily: 'monospace', fontSize: 19, fontWeight: 'bold', marginBottom: 10 },
  blink: { color: '#FF003C' },
  divider: { height: 2, backgroundColor: '#005500', marginBottom: 15 },
  dataBlock: { marginBottom: 20 },
  infoLine: { color: '#39FF14', fontFamily: 'monospace', fontSize: 16, marginVertical: 4, letterSpacing: 1 },
  harmBlock: { marginTop: 15, padding: 10, borderWidth: 1, borderColor: '#39FF14', backgroundColor: 'rgba(57, 255, 20, 0.1)' },
  harmText: { color: '#39FF14', fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  closeBtn: { alignSelf: 'center', padding: 10 },
  closeText: { color: '#005500', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold' },
  scrollArea: {
    flexShrink: 1, // Stellt sicher, dass die ScrollView nur den verfügbaren Platz nutzt
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20, // Luft nach unten am Ende des Scroll-Bereichs
  },
  imageContainer: {
    width: '100%',
    height: 180, // Festgelegte Höhe für den Bilder-Bereich
    borderWidth: 2,
    borderColor: '#39FF14', // Dunkelgrüner Rahmen für den MFD-Look
    marginBottom: 15,
    overflow: 'hidden', // Wichtig, damit das Bild nicht über den Rahmen ragt
  },
  threatImage: {
    width: '100%',
    height: '100%'
  },
  linkContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#003300',
  },
  linkTitle: {
    color: '#005500',
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  linkSymbolCircle: {
    width: 32,
    height: 32,
    borderRadius: 16, // Macht die Box komplett rund
    borderWidth: 1.5,
    borderColor: '#39FF14',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#001100',
  },
  linkSymbolText: {
    color: '#39FF14',
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
  },
  linkNameText: {
    color: '#39FF14',
    fontFamily: 'monospace',
    fontSize: 14,
  }
});