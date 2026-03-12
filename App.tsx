// App.tsx - Main Application Terminal (OSB Interface & Navigation Routing)
import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import RwrGrid from './RwrGrid';
import ThreatModal from './ThreatModal';
import TargetIndex from './GroundTargetIndex';
import { fa18cThreats, Threat } from './threatData';
import CommsLink from './CommsLink';

type FilterCategory = 'ALL' | 'SAM' | 'AAA' | 'SHIP' | 'AIR' | 'SR';
type MfdPage = 'RWR_DATABASE' | 'TARGET_INDEX' | 'COMMS_LINK';

export default function App() {
  useKeepAwake();
  
  // Navigation & UI State
  const [activeApp, setActiveApp] = useState<MfdPage>('RWR_DATABASE');
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  
  // Swipe Gesture Tracking
  const touchStartX = useRef(0);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // CommsLink Network State
  const [commsIp, setCommsIp] = useState('192.168.');
  const [isCommsLinked, setIsCommsLinked] = useState(false);

  const handleThreatSelect = (threat: Threat) => {
    setSelectedThreat(threat);
    setModalVisible(true);
  };

  const closeMfd = () => {
    setModalVisible(false);
    // Delay clearing the selected threat to allow the modal close animation to finish
    setTimeout(() => setSelectedThreat(null), 300);
  };

  // Cycles through available MFD pages
  const toggleMfdPage = () => {
    setActiveApp(prev => {
      if (prev === 'RWR_DATABASE') return 'TARGET_INDEX';
      if (prev === 'TARGET_INDEX') return 'COMMS_LINK';
      return 'RWR_DATABASE';
    });
  };

  // Combined filtering and sorting logic for threat data
  const filteredAndSortedThreats = fa18cThreats
    .filter(t => {
      // 1. Filter by category
      const matchesCategory = activeFilter === 'ALL' || t.category === activeFilter;

      // 2. Filter by search query (checks RWR symbol, Name, and HARM code)
      const query = searchQuery.toLowerCase();
      const matchesSearch = query === '' ||
        t.rwrSymbol.toLowerCase().includes(query) ||
        t.name.toLowerCase().includes(query) ||
        (t.harmCode && t.harmCode.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // Check if symbols are strictly numeric for proper sorting order
      const aNum = parseInt(a.rwrSymbol, 10);
      const bNum = parseInt(b.rwrSymbol, 10);
      const aIsPureNum = !isNaN(aNum) && /^\d+$/.test(a.rwrSymbol);
      const bIsPureNum = !isNaN(bNum) && /^\d+$/.test(b.rwrSymbol);

      // Case 1: Both are pure numbers -> Sort numerically ascending
      if (aIsPureNum && bIsPureNum) {
        return aNum - bNum;
      }

      // Case 2: Mixed types -> Numbers take precedence over letters
      if (aIsPureNum && !bIsPureNum) return -1;
      if (!aIsPureNum && bIsPureNum) return 1;

      // Case 3: Both are alphanumeric (or mixed like "E2") -> Sort alphabetically
      return a.rwrSymbol.localeCompare(b.rwrSymbol);
    });

  const categories: FilterCategory[] = ['ALL', 'SAM', 'SR', 'AIR', 'SHIP', 'AAA'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Interactive header with swipe gesture recognition and navigation arrows */}
      <View 
        style={styles.headerConsole}
        onTouchStart={(e) => {
          touchStartX.current = e.nativeEvent.pageX;
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.nativeEvent.pageX;
          // Trigger page toggle if horizontal swipe distance exceeds 50 pixels
          if (Math.abs(touchEndX - touchStartX.current) > 50) {
            toggleMfdPage();
          }
        }}
      >
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={toggleMfdPage} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Text style={styles.navArrow}>{'<'}</Text>
          </TouchableOpacity>
          
          <Text style={styles.glitchText}>
            {activeApp === 'RWR_DATABASE' && '[ RWR DATABASE ]'}
            {activeApp === 'TARGET_INDEX' && '[ TARGET INDEX ]'}
            {activeApp === 'COMMS_LINK' && '[ COMMS LINK ]'}
          </Text>

          <TouchableOpacity onPress={toggleMfdPage} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Text style={styles.navArrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subText}>SYSTEM ONLINE ... SWIPE TITLE TO SWITCH</Text>
      </View>

      {/* MFD Page Routing */}
      {activeApp === 'RWR_DATABASE' && (
        <>
          {/* OSB (Option Select Button) Hardware Bezel */}
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

          {/* RWR Grid Display & Search Overlay */}
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
      )}

      {activeApp === 'TARGET_INDEX' && <TargetIndex />}
      
      {activeApp === 'COMMS_LINK' && (
        <CommsLink 
          ipAddress={commsIp} 
          setIpAddress={setCommsIp} 
          isLinked={isCommsLinked} 
          setIsLinked={setIsCommsLinked} 
        />
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
    position: 'relative', 
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
    gap: 15,
  },
  navArrow: {
    color: '#005500',
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

  /* --- OSB BEZEL STYLES --- */
  mfdBezel: {
    backgroundColor: '#111',
    borderBottomWidth: 2,
    borderBottomColor: '#222',
    zIndex: 1, 
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

  /* --- SEARCH OVERLAY STYLES --- */
  sideSearchContainer: {
    position: 'absolute',
    right: 0,       
    top: 30,        
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 50,     
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
    borderRightWidth: 0,
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  rightEdgeBtn: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#005500',
    borderRightWidth: 0,
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
    lineHeight: 16,
  },
  verticalCharActive: {
    color: '#39FF14',
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  }
});