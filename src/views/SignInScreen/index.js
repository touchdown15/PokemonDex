import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import { Container } from './styles';

const sexos=[
  {label: 'Masculino', value: 1},
  {label: 'Feminino', value: 2}
];

const STORAGE_KEY = '@save_user';

export default () => {

  const [userInfo, setUserInfo] = useState(
    {
      nome: '',
      idade: null,
      sexo: null,
      favoritos: [],
      capturados: []
    }
  )

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo))
      alert('Data successfully saved ')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  useEffect(()=>{
    console.log('nome: '+userInfo.nome +' idade: ' + userInfo.idade + ' sexo: ' + userInfo.sexo);
  }, [userInfo]);

  /*const { name, value } = userName.target;
    setUserInfo(prevState=>({
      ...prevState,
      [name]: value
    }));*/

  const onChangeTextNome = userName => {
    setUserInfo({
      ...userInfo,
      nome: userName,
    });
  }

  const onChangeTextIdade = userAge =>{
    setUserInfo({
      ...userInfo,
      idade: userAge,
    });
  }


  return(
    <Container>
      <Text>Cadastro</Text>
      <TextInput
        type='text'
        placeholder='Nome'
        onChangeText={onChangeTextNome}
      />
      <TextInput
        keyboardType= 'number-pad'
        placeholder='Idade'
        onChangeText={onChangeTextIdade}
      />
      <Text>Sexo</Text>
      <View>
        <RadioForm
          radio_props={sexos}
          initial={-1}
          onPress={(value) => {
            setUserInfo({
              ...userInfo,
              sexo: value
            });
          }}
        />
      </View>
      <TouchableOpacity
        onPress={()=> saveData()}>
        <Text>Accept</Text>
      </TouchableOpacity>
    </Container>
  );
}