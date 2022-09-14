import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button, View, Text, TextInput, Alert} from 'react-native';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setAge(user.Age);
        }
      });
    } catch (error) {
      console.log('E R R O R', error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('warning', 'Enter the username');
    } else {
      try {
        var user={
          Name:name,
        }
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        Alert.alert('Success!', 'Data has been updated');
      } catch (error) {
        console.log('ERROR', error);
      }
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('UserName');
      navigation.navigate('login');
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 40}}>Welcome {name} !</Text>
      <Text style={{fontSize: 40}}>May I know your {age} !</Text>
     <TextInput
        placeholder="update name"
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          padding: 10,
          margin: 30,
        }}
        value={name}
        onChangeText={val => setName(val)}
      />
      <Button title="UPDATE" onPress={updateData} />
      <Button title="REMOVE" onPress={removeData} />
    </View>
  );
};

export default Home;
