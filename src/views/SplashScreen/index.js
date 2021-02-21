import React, { useState, useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Pokeball from '../../assets/pokeball.svg';
import { ActivityIndicator, View } from 'react-native';

const STORAGE_KEY = '@save_user';

export default () => {

  /*const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);*/

  const navigation = useNavigation();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem(STORAGE_KEY);
    if(token){
      //validar token
      navigation.navigate('MainScreen')
    }else{
      navigation.navigate('SignInScreen');
    }
  }
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }


  useEffect(()=>{
    //clearStorage();
    checkToken();
  }, []);

  /*if(isLoading){
    return(
      <View>
        <ActivityIndicator size=""large/>
      </View>
    )
  }*/

  return(
    <Container>
      <Pokeball width="100%" height="160" />
      <LoadingIcon size="large" color="#FFFFFF"/>
    </Container>
  );
}