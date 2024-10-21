import React, { useEffect, useState } from 'react';  
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailsScreen from '../app/DetailsScreen'; // Import DetailsScreen
import PullToRefreshList from '../components/PullToRefreshList'; // Import the new component

// Define the Item interface
interface Item {
  id: string;
  title: string;
  image: string;
}

// HomeScreen Component
const Fizzastore: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [data, setData] = useState<Item[]>([]); // State to hold API data
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false); // Refreshing state

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const json = await response.json();

      const formattedData = json.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        image: item.image,
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(); // Fetch data when refreshing
  };

  const onItemPress = (itemId: string, itemTitle: string, imageUrl: string) => {
    navigation.navigate('Details', { itemId, itemTitle, imageUrl });
  };

  return (
    <View style={styles.container}>
      <PullToRefreshList
        data={data}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onItemPress={onItemPress}
      />
    </View>
  );
};

// Stack Navigator setup
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Fizza Store">
        <Stack.Screen name="                   Fizza Online Store" component={Fizzastore} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2B48C', 
    paddingTop: 10,
  },
});

export default App;