// 🚀 App.tsx - Unser Main Terminal (Mit OSB Hardware Buttons)
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import RwrGrid from './RwrGrid';
import ThreatModal from './ThreatModal';
import { fa18cThreats, Threat } from './threatData';

type FilterCategory = 'ALL' | 'SAM' | 'AAA' | 'SHIP' | 'AIR';

export default function App() {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  const handleThreatSelect = (threat: Threat) => {
    setSelectedThreat(threat);
    setModalVisible(true);
  };

  const closeMfd = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedThreat(null), 300); 
  };

  const filteredThreats = activeFilter === 'ALL' 
    ? fa18cThreats 
    : fa18cThreats.filter(t => t.category === activeFilter);

  const categories: FilterCategory[] = ['ALL', 'SAM', 'AAA', 'SHIP', 'AIR'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.headerConsole}>
        <Text style={styles.glitchText}>[ RWR DATABASE ]</Text>
        <Text style={styles.subText}>SYSTEM ONLINE ...</Text>
      </View>

      {/* 🎯 Taktische OSB-Leiste (Option Select Buttons) */}
      <View style={styles.mfdBezel}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {categories.map(cat => (
            <View key={cat} style={styles.osbGroup}>
              {/* Der physische "Hardware" Button */}
              <TouchableOpacity 
                style={[styles.osbHardwareBtn, activeFilter === cat && styles.osbHardwareBtnActive]}
                onPress={() => setActiveFilter(cat)}
                activeOpacity={0.7}
              />
              {/* Die kleine Verbindungslinie vom Button zum Display-Text */}
              <View style={[styles.osbConnector, activeFilter === cat && styles.osbConnectorActive]} />
              
              {/* Der digitale Text "auf" dem Bildschirm */}
              <Text style={[styles.osbScreenText, activeFilter === cat && styles.osbScreenTextActive]}>
                {cat}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.radarScreen}>
        <RwrGrid threats={filteredThreats} onThreatSelect={handleThreatSelect} />
      </View>

      <ThreatModal 
        threat={selectedThreat} 
        visible={modalVisible} 
        onClose={closeMfd} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    paddingTop: 40,
  },
  headerConsole: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#005500',
  },
  radarScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  glitchText: {
    color: '#39FF14',
    fontFamily: 'monospace',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subText: {
    color: '#005500',
    fontFamily: 'monospace',
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 1,
  },
  
  /* NEUE OSB STYLES (Hardware-Look) */
  mfdBezel: {
    backgroundColor: '#111', // Dunkelgrau für den "Rahmen" um das Display
    borderBottomWidth: 2,
    borderBottomColor: '#222',
  },
  filterScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 25,
    alignItems: 'flex-start',
  },
  osbGroup: {
    alignItems: 'center',
    width: 60,
  },
  osbHardwareBtn: {
    width: 45,
    height: 25,
    backgroundColor: '#333', // Graues Plastik/Metall
    borderWidth: 2,
    borderColor: '#111',
    borderBottomWidth: 4, // Erzeugt einen 3D-Tasten-Effekt
    borderRadius: 4,
  },
  osbHardwareBtnActive: {
    borderBottomWidth: 1, // "Reingedrückter" Effekt
    transform: [{ translateY: 3 }], // Bewegt den Button physisch nach unten
    backgroundColor: '#444',
  },
  osbConnector: {
    width: 2,
    height: 8,
    backgroundColor: '#003300',
    marginTop: 5,
  },
  osbConnectorActive: {
    backgroundColor: '#39FF14',
    shadowColor: '#39FF14',
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  osbScreenText: {
    color: '#005500', 
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 5,
  },
  osbScreenTextActive: {
    color: '#39FF14', 
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  }
});