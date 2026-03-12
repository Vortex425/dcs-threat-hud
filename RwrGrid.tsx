// RwrGrid.tsx - Radar Warning Receiver (RWR) Symbol Grid
// Renders a scrollable grid of RWR threat symbols. Users can tap a symbol to view detailed threat data.
import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Threat } from './threatData'; 

interface Props {
  threats: Threat[];
  onThreatSelect: (threat: Threat) => void;
}

export default function RwrGrid({ threats, onThreatSelect }: Props) {
  return (
    // Utilizing a ScrollView to accommodate extensive threat lists. 
    // Grid layout styles must be applied via contentContainerStyle rather than style.
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {threats.map((threat) => (
        <TouchableOpacity 
          key={threat.id} 
          style={styles.blip}
          onPress={() => onThreatSelect(threat)}
          activeOpacity={0.6} // Provides tactile visual feedback when pressed
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
    // Bottom padding ensures the last row of elements isn't cut off by the screen edge
    paddingBottom: 40, 
  },
  blip: {
    width: 75,
    height: 75,
    borderWidth: 1.5,
    borderColor: '#39FF14',
    backgroundColor: '#001100',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40, // Perfect circle
    // Glow effect to simulate CRT phosphor luminescence on the RWR display
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8, // Required for Android shadow rendering
  },
  blipText: {
    color: '#39FF14',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'monospace', 
  }
});