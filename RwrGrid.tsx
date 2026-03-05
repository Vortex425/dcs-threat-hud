// 🎯 Vibe: RWR Symbol Grid - Update mit Scroll-Funktion
import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Threat } from './threatData'; 

interface Props {
  threats: Threat[];
  onThreatSelect: (threat: Threat) => void;
}

export default function RwrGrid({ threats, onThreatSelect }: Props) {
  return (
    // 🔥 Hier ist der Fix: ScrollView statt View, und die Styles wandern in den contentContainerStyle
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {threats.map((threat) => (
        <TouchableOpacity 
          key={threat.id} 
          style={styles.blip}
          onPress={() => onThreatSelect(threat)}
        >
          <Text style={styles.blipText}>{threat.rwrSymbol}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    paddingBottom: 40, // Etwas Puffer nach unten, damit das letzte Element nicht am Rand klebt
  },
  blip: {
    width: 75,
    height: 75,
    borderWidth: 1.5,
    borderColor: '#39FF14',
    backgroundColor: '#001100',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  blipText: {
    color: '#39FF14',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'monospace', 
  }
});