import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('home');
        }
      });
    } catch (error) {
      console.log('E R R O R', error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || age.length==0) {
      Alert.alert('warning', 'Enter the username');
    } else {
      try {
        var user={Name:name,Age:age}
        await AsyncStorage.setItem('UserData',JSON.stringify(user));
        navigation.navigate('home');
      } catch (error) {
        console.log('ERROR', error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
      }}>
      <Text style={{fontSize: 30, margin: 30}}>Async storage</Text>
      <TextInput
        placeholder="Enter username"
        style={{
          borderWidth: 2,
          borderColor: 'pink',
          backgroundColor:"white",
          borderRadius: 10,
          padding: 10,
          margin: 10,
        }}
        onChangeText={val => setName(val)}
      />
      <TextInput
        placeholder="Enter age"
        keyboardType='number-pad'
        style={{
          borderWidth: 2,
          borderColor: 'pink',
          backgroundColor:"white",
          borderRadius: 10,
          padding: 10,
          margin: 10,
        }}
        onChangeText={val => setAge(val)}
      />
      <Button title="LOGIN" onPress={setData} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
