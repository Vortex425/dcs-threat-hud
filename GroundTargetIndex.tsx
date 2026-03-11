// 🚀 TargetIndex.tsx - Dokumenten-Viewer mit Zoom
import React from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

// Exportierte PDF-Seiten 
const pdfPages = [
  require('./assets/targets/page1.jpg'),
  require('./assets/targets/page2.jpg'),
  require('./assets/targets/page3.jpg'),
  require('./assets/targets/page4.jpg'),
  require('./assets/targets/page5.jpg'),
  require('./assets/targets/page6.jpg'),
  require('./assets/targets/page7.jpg'),
];

export default function TargetIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>INTEL RECON: BSC TARGET INDEX</Text>
      
      <View style={styles.documentFrame}>
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
        >
          {pdfPages.map((page, index) => (
            <View key={index} style={styles.pageContainer}>
              {/* 🔥 Jede Seite ist in einer eigenen zoombaren ScrollView */}
              <ScrollView
                maximumZoomScale={4} // Bis zu 400% Zoom
                minimumZoomScale={1}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                centerContent={true}
              >
                <Image 
                  source={page} 
                  style={styles.pageImage} 
                  resizeMode="contain" 
                />
              </ScrollView>
              <Text style={styles.pageIndicator}>PG {index + 1} / {pdfPages.length}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, alignItems: 'center' },
  statusText: { color: '#005500', fontFamily: 'monospace', fontSize: 14, marginBottom: 10 },
  documentFrame: { flex: 1, width: '100%', borderWidth: 2, borderColor: '#39FF14', backgroundColor: '#001100' },
  pageContainer: { width: width - 20, height: '100%' },
  pageImage: { width: width - 20, height: '100%' },
  pageIndicator: { position: 'absolute', bottom: 10, right: 10, color: '#39FF14', fontFamily: 'monospace', fontSize: 12, backgroundColor: 'rgba(0,0,0,0.7)', padding: 4 }
});