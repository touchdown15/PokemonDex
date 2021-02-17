import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Pokeball from '../../assets/pokeball.svg';

export default () => {

  const navigation = useNavigation();

  useEffect(()=>{
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token){
        //validar token
      }else{
        navigation.navigate('MainScreen');
      }
    }
    checkToken();
  }, []);

  return(
    <Container>
      <Pokeball width="100%" height="160" />
      <LoadingIcon size="large" color="#FFFFFF"/>
    </Container>
  );
}