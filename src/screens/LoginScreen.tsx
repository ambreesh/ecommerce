
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useAppDispatch } from '../redux/hooks';
import { loginUser } from '../redux/slices/authSlice';
import { getUser, saveSession } from '../services/storage';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const storedUser = await getUser();

      if (!storedUser) {
        Alert.alert(
          'Error',
          'User not registered. Please signup first.'
        );
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();

      if (
        storedUser.email !== normalizedEmail ||
        storedUser.password !== password
      ) {
        Alert.alert('Error', 'Invalid email or password');
        return;
      }

      // Save session first
await saveSession({
  name: storedUser.name,
  email: storedUser.email,
});

// Update Redux
dispatch(
  loginUser({
    name: storedUser.name,
    email: storedUser.email,
  })
);

    } catch (error) {
      Alert.alert('Error', 'Something went wrong during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.link}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#2563eb',
  },
});

export default LoginScreen;
