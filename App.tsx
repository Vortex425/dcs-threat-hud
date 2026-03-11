// 🚀 App.tsx - Unser Main Terminal (Mit OSB Hardware Buttons & Suche)
import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import RwrGrid from './RwrGrid';
import ThreatModal from './ThreatModal';
import TargetIndex from './GroundTargetIndex';
import { fa18cThreats, Threat } from './threatData';

type FilterCategory = 'ALL' | 'SAM' | 'AAA' | 'SHIP' | 'AIR' | 'SR';
type MfdPage = 'RWR_DATABASE' | 'TARGET_INDEX';

export default function App() {
  useKeepAwake();
  const [activeApp, setActiveApp] = useState<MfdPage>('RWR_DATABASE');
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const touchStartX = useRef(0);

  // Neue Suchfunktion
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleThreatSelect = (threat: Threat) => {
    setSelectedThreat(threat);
    setModalVisible(true);
  };

  const closeMfd = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedThreat(null), 300);
  };

  //Funktion zum Wechseln der MFD Seiten
  const toggleMfdPage = () => {
    setActiveApp(prev => prev === 'RWR_DATABASE' ? 'TARGET_INDEX' : 'RWR_DATABASE');
  };

  // Die kombinierte Filter- und Sortier-Logik
  const filteredAndSortedThreats = fa18cThreats
    .filter(t => {
      // 1. Kategorie-Filter
      const matchesCategory = activeFilter === 'ALL' || t.category === activeFilter;

      // 2. Suchbegriff-Filter (RWR, Name, HARM)
      const query = searchQuery.toLowerCase();
      const matchesSearch = query === '' ||
        t.rwrSymbol.toLowerCase().includes(query) ||
        t.name.toLowerCase().includes(query) ||
        (t.harmCode && t.harmCode.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // Prüfen, ob die Symbole reine Zahlen sind
      const aNum = parseInt(a.rwrSymbol, 10);
      const bNum = parseInt(b.rwrSymbol, 10);
      const aIsPureNum = !isNaN(aNum) && /^\d+$/.test(a.rwrSymbol);
      const bIsPureNum = !isNaN(bNum) && /^\d+$/.test(b.rwrSymbol);

      // 1. Fall: Beide sind reine Zahlen -> Numerisch sortieren
      if (aIsPureNum && bIsPureNum) {
        return aNum - bNum;
      }

      // 2. Fall: Nur einer ist eine Zahl -> Zahl kommt zuerst
      if (aIsPureNum && !bIsPureNum) return -1;
      if (!aIsPureNum && bIsPureNum) return 1;

      // 3. Fall: Beide sind Buchstaben (oder Mix wie "E2") -> Alphabetisch sortieren
      return a.rwrSymbol.localeCompare(b.rwrSymbol);
    });

  const categories: FilterCategory[] = ['ALL', 'SAM', 'SR', 'AIR', 'SHIP', 'AAA'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* 🔥 NEU: Der interaktive Header mit Swipe-Erkennung und Pfeilen */}
      <View 
        style={styles.headerConsole}
        onTouchStart={(e) => {
          touchStartX.current = e.nativeEvent.pageX; // <-- .current nutzen
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.nativeEvent.pageX;
          // Prüfen, ob mehr als 50 Pixel gewischt wurde
          if (Math.abs(touchEndX - touchStartX.current) > 50) { // <-- .current nutzen
            toggleMfdPage();
          }
        }}
      >
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={toggleMfdPage} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Text style={styles.navArrow}>{'<'}</Text>
          </TouchableOpacity>
          
          <Text style={styles.glitchText}>
            {activeApp === 'RWR_DATABASE' ? '[ RWR DATABASE ]' : '[ TARGET INDEX ]'}
          </Text>

          <TouchableOpacity onPress={toggleMfdPage} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Text style={styles.navArrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subText}>SYSTEM ONLINE ... SWIPE TITLE TO SWITCH</Text>
      </View>

      {/* 🔥 NEU: Hier weicheln wir zwischen RWR und TARGET INDEX */}
      {activeApp === 'RWR_DATABASE' ? (
        <>
          {/* Deine OSB-Leiste */}
          <View style={styles.mfdBezel}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
              {categories.map(cat => (
                <View key={cat} style={styles.osbGroup}>
                  <TouchableOpacity
                    style={[styles.osbHardwareBtn, activeFilter === cat && styles.osbHardwareBtnActive]}
                    onPress={() => setActiveFilter(cat)}
                    activeOpacity={0.7}
                  />
                  <View style={[styles.osbConnector, activeFilter === cat && styles.osbConnectorActive]} />
                  <Text style={[styles.osbScreenText, activeFilter === cat && styles.osbScreenTextActive]}>
                    {cat}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Dein Radar Screen */}
          <View style={styles.radarScreen}>
            <View style={styles.sideSearchContainer}>
              {isSearchActive && (
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="TARGET..."
                  placeholderTextColor="#005500"
                  autoCapitalize="characters"
                  autoFocus={true}
                />
              )}
              <TouchableOpacity
                style={[styles.rightEdgeBtn, isSearchActive && styles.rightEdgeBtnActive]}
                onPress={() => {
                  setIsSearchActive(!isSearchActive);
                  if (isSearchActive) setSearchQuery('');
                }}
              >
                {(isSearchActive ? ['⊓', 'X', '⊔'] : ['⊓', 'S', 'R', 'C', 'H', '⊔']).map((char, index) => (
                  <Text key={index} style={[styles.verticalChar, isSearchActive && styles.verticalCharActive]}>{char}</Text>
                ))}
              </TouchableOpacity>
            </View>

            <RwrGrid threats={filteredAndSortedThreats} onThreatSelect={handleThreatSelect} />
          </View>
        </>
      ) : (
        /* 🔥 Wenn TARGET_INDEX aktiv ist, blenden wir die OSB-Leiste und das Grid aus und zeigen die PDF-Bilder */
        <TargetIndex />
      )}

      <ThreatModal threat={selectedThreat} visible={modalVisible} onClose={closeMfd} onNavigate={handleThreatSelect} />
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
    position: 'relative', // Wichtig, damit das Such-Overlay absolut darin platziert werden kann
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15, // Abstand zwischen Pfeilen und Titel
  },
  navArrow: {
    color: '#005500', // Etwas dunkler als der Haupttitel, damit es subtil bleibt
    fontFamily: 'monospace',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subText: {
    color: '#005500',
    fontFamily: 'monospace',
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 1,
  },

  /* --- OSB STYLES --- */
  mfdBezel: {
    backgroundColor: '#111',
    borderBottomWidth: 2,
    borderBottomColor: '#222',
    zIndex: 1, // Stellt sicher, dass die Suche nicht drunter rutscht
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
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#111',
    borderBottomWidth: 4,
    borderRadius: 4,
  },
  osbHardwareBtnActive: {
    borderBottomWidth: 1,
    transform: [{ translateY: 3 }],
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
  },

  /* --- NEU: SEARCH OVERLAY STYLES --- */
  /* --- NEU: VERTICAL SIDE-BUTTON STYLES --- */
  sideSearchContainer: {
    position: 'absolute',
    right: 0,       // Klebt ganz am rechten Rand
    top: 30,        // Zieht den Button etwas nach unten, weg von den oberen Filtern
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 50,     // Bleibt immer über dem RWR Grid
  },
  searchInput: {
    backgroundColor: 'rgba(0, 17, 0, 0.9)',
    color: '#39FF14',
    fontFamily: 'monospace',
    fontSize: 16,
    width: 120,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#39FF14',
    borderRightWidth: 0, // Verbindet sich nahtlos mit dem Button
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  rightEdgeBtn: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#005500',
    borderRightWidth: 0, // An der rechten Kante offen
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  rightEdgeBtnActive: {
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    borderColor: '#39FF14',
  },
  verticalChar: {
    color: '#005500',
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16, // Hält die Buchstaben dicht beisammen
  },
  verticalCharActive: {
    color: '#39FF14',
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  }
});