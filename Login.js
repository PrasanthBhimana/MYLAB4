import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from './firebase'; // Firebase function
import { useNavigation } from '@react-navigation/core';
import { auth } from './firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('User logged in:', userCredential.user.email);
        navigation.replace('HomeScreen'); // Navigate to Home on success
      })
      .catch(error => {
        setError(error.message);
        Alert.alert('Sign In Error', error.message); // Alert user of an error
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#90CAF9',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;
