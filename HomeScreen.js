// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase'; // Import your Firebase auth configuration

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('LandingPage'); // Navigate to LandingPage on logout
      })
      .catch(error => console.error('Sign Out Error:', error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.welcomeText}>Welcome, {auth.currentUser?.email}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
