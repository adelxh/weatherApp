/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import {API_KEY} from '@env'; 


function App() {
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState('');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchWeather = async () => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    try { 
      const response = await fetch(url);
      const data = await response.json();

      

      setCityName(data.location.name);
      setTemperature(data.current.temp_c);
      
    } catch(error) {
        console.error('Error fetching weather data:', error);
    }
  
  
  }

  const handleSearch = () => {
    setModalVisible(true);
    fetchWeather();
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
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.searchButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>City: {cityName}</Text>
            <Text style={styles.modalText}>Temperature: {temperature}°C</Text>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
