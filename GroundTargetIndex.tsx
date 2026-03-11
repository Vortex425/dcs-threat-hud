//  GroundTargetIndex.tsx - Unser taktischer Dokumenten-Viewer
import React from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');


const pdfPages = [
  require('./assets/groundtraget/Walriders_Target_Index-1_page-0001.png'),
  require('./assets/groundtraget/Walriders_Target_Index-1_page-0002.png'),
  require('./assets/groundtraget/Walriders_Target_Index-1_page-0003.png'),
  require('./assets/groundtraget/Walriders_Target_Index-1_page-0004.png'),
  require('./assets/groundtraget/Walriders_Target_Index-1_page-0005.png'),
  require('./assets/groundtraget/Walriders_Target_Index-1_page-0006.png'),
  require('./assets/groundtraget/Walriders_Target_Index-1_page-0007.png'),
];

export default function TargetIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>LOADING INTEL... BSC TARGET INDEX</Text>
      
      <View style={styles.documentFrame}>
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          style={styles.scrollArea}
        >
          {pdfPages.map((page, index) => (
            <View key={index} style={styles.pageContainer}>
              <Image 
                source={page} 
                style={styles.pageImage} 
                resizeMode="contain" 
                // tintColor="#39FF14" // Optional: Mach die Seiten MFD-Grün!
              />
              <Text style={styles.pageIndicator}>PAGE {index + 1} / {pdfPages.length}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: '#005500',
    fontFamily: 'monospace',
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 2,
  },
  documentFrame: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderColor: '#39FF14',
    backgroundColor: '#001100',
    overflow: 'hidden',
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  scrollArea: {
    flex: 1,
  },
  pageContainer: {
    width: width - 20, // Bildschirmbreite minus Padding
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pageImage: {
    width: '95%',
    height: '95%',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    color: '#39FF14',
    fontFamily: 'monospace',
    fontSize: 12,
    backgroundColor: 'rgba(0, 17, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#005500',
  }
});