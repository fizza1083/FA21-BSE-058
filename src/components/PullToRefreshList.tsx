import React, { useRef } from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet, Text, View, Animated } from 'react-native';

// Define the Item interface
interface Item {
  id: string;
  title: string;
  image: string;
}

// Props interface for PullToRefreshList
interface PullToRefreshListProps {
  data: Item[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onItemPress: (itemId: string, itemTitle: string, imageUrl: string) => void;
}

// PullToRefreshList Component
const PullToRefreshList: React.FC<PullToRefreshListProps> = ({
  data,
  loading,
  refreshing,
  onRefresh,
  onItemPress,
}) => {
  const imageScaleAnim = useRef(new Animated.Value(1)).current; // Create animated value for image scale

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    const handlePressIn = () => {
      Animated.timing(imageScaleAnim, {
        toValue: 1.05, // Scale up
        duration: 150,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.timing(imageScaleAnim, {
        toValue: 1, // Scale back to original size
        duration: 150,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        activeOpacity={1} // Prevents opacity change while pressing
        onPressIn={handlePressIn} // Start animation on press in
        onPressOut={handlePressOut} // Reset animation on press out
        onPress={() => {
          onItemPress(item.id, item.title, item.image);
          handlePressOut(); // Ensure scaling is reset after press
        }}
        style={[styles.item, index % 2 !== 0 && styles.lowerItem]}
      >
        <Animated.Image
          source={{ uri: item.image }}
          style={[styles.itemImage, { transform: [{ scale: imageScaleAnim }] }]} // Apply scaling transformation to the image only
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      numColumns={2}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  item: {
    width: '47%', // Adjust width for two items per row
    padding: 16,
    backgroundColor: 'lightyellow',
    marginVertical: 8,
    borderRadius: 12,
    marginHorizontal: '2%',
    alignItems: 'center',
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5, // Increased height for a stronger shadow
    },
    shadowOpacity: 0.3,
    shadowRadius: 8, // Increased blur radius for a softer edge
    // Inner shadow
    overflow: 'hidden', // Prevents the inner shadow from spilling outside the border radius
    // Elevation for Android
    elevation: 5,
  },
  lowerItem: {
    marginTop: 60, // Add margin to lower the second column items
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 20,
    color: 'black',
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default PullToRefreshList;
