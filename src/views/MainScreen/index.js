import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';

const listTab = [
  {
    table: 'Todos'
  },
  {
    table: 'Favoritos'
  },
  {
    table: 'Capturados'
  },
]

const STORAGE_KEY = '@save_user';

export default () => {

  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [pagesPokemon, setPagesPokemon] = useState(0);
  const [table, setTable] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [userInfo, setUserInfo] = useState(
    {
      nome: '',
      idade: null,
      sexo: null,
      favoritos: [],
      capturados: [],
    }
  )

  const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset="+pagesPokemon;

  const readData = async () => {
    try {
      const userInfo = await AsyncStorage.getItem(STORAGE_KEY)
      const objUserInfo = JSON.parse(userInfo)
      if (objUserInfo.idade !== null) {
        console.log('nome: ' + objUserInfo.nome + ' idade: ' + objUserInfo.idade+ ' sexo: ' +objUserInfo.sexo)
        setUserInfo(objUserInfo)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo))
      alert('Data successfully saved ')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const setTableFilter = table => {
    setTable(table)
  }

  useEffect(()=>{
    fetch(pokemonURL)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      const promisesArray = results.map(result => {
        return fetch(result.url).then(response => response.json());
      })
      return Promise.all(promisesArray);
    }).then((data) => setPokemons([...pokemons, ...data]))
    .catch((err) => alert(err))
    .finally(() => setLoading(false));
  }, [pagesPokemon])

  useEffect(() =>{
    setFilteredPokemons(
      pokemons.filter( pokemon => {
        return pokemon.name.toLowerCase().includes( searchTerm.toLowerCase() )
      })
    )
  },[searchTerm, pokemons])

  useEffect(()=>{
    readData()
  }, [])

  /*useEffect(()=>{
    console.log('nome: '+userInfo.nome +' idade: ' + userInfo.idade + ' sexo: ' + userInfo.sexo + ' favorito: ' + userInfo.favoritos[0].name);
  }, [userInfo]);*/

  const renderPokemon = ({item}) =>{
    return(
      <View style={styles.pokemon}>
        <View style={styles.pokemonViewImg}>
          <Image
            style={styles.pokemonImg}
            source={{uri: item.sprites.front_default}} 
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.push('DetailScreen' , item)}
        >
          <View style={styles.pokemonBody}>
            <Text style={styles.pokemonName}>
              Nome: {item.name}
            </Text>
            <View>
              {item.types.map(types =>(
                <Text style={styles.pokemonName}>
                  Tipo: {types.type.name}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            setUserInfo({
            ...userInfo,
            favoritos: [item],
          })
          saveData()
        }}
        >
          <Text>Favoritar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{setUserInfo({
            ...userInfo,
            capturados: [item],
          })
          saveData()
        }}
        >
          <Text>Capturar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleLoadMore = () =>{
    setPagesPokemon(pagesPokemon + 20)
  } 

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
        {
          listTab.map(e => (
          <TouchableOpacity
            style={[styles.btnTab, table === e.table && styles.btnTabActive]}
            onPress={() => setTableFilter(e.table)}
          >
            <Text style={styles.textTab /*, table === e.table && styles.textTabActive*/}>
              {e.table}
            </Text>
          </TouchableOpacity>
          ))
        }
      </View>

      <View>
        <TextInput
          type='text'
          placeholder='Search Here...'
          onChangeText={text => setSearchTerm(text)}
        />
      </View>
      
      {isLoading ? 
        <ActivityIndicator
          size="large" color="#E63F34"
        /> : 
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPokemon}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      }
    </SafeAreaView>
  );
}

/*Flatlist data={pokemons}*/