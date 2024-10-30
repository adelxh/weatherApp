/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function App() {
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState('');
  const [temperature, setTemperature] = useState<number | null>(null);

  const fetchWeather = async () => {
    const apiKey= '5ef00863801848d5aef203310242910'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try { 
      const response = await fetch(url);
      const data = await response.json();

      

      setCityName(data.location.name);
      setTemperature(data.current.temp_c);
      
    } catch(error) {
        console.error('Error fetching weather data:', error);
    }
  
  
  }

  const clearFields = () => {
    setCity('');
    setCityName('');
    setTemperature(null);
  }
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Welcome to the Weather App</Text>
    <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter city name..."
          placeholderTextColor="#999"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.searchButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {cityName ? (
        <Text style={styles.resultText}>City: {cityName}, temperature: {temperature}&#176;C</Text>
       
      ) : null}
      {}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 20,
  },
  searchBar: {
   
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  searchButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderTopRightRadius: 8,
    marginTop: 30,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  clearButton: {
    height: 50,
    backgroundColor: 'grey',
    borderTopRightRadius: 8,
    marginTop: 10,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: { 
    marginTop: 20,
    fontSize: 18,
  }, 
});

export default App;
