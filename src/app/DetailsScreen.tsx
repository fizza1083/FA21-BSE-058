import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

  const DetailsScreen: React.FC<{ route: any }> = ({ route }) => {
    const { itemId, itemTitle, imageUrl } = route.params; // Retrieve parameters including price
  
    return (
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.detailsText}>Details of {itemTitle}                 (ID: {itemId})</Text>
       
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightpink',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  detailsText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default DetailsScreen;
