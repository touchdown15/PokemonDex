import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import styles from './styles'

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

export default () => {

  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [pagesPokemon, setPagesPokemon] = useState(0);
  const [table, setTable] = useState('Todos');
  const [pokemons, setPokemons] = useState([]);
  
  const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset="+pagesPokemon;

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
            <Text style={styles.pokemonName}>
              Tipo: {item.types[0].type.name}
            </Text>
          </View>
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
      
      {isLoading ? 
        <ActivityIndicator
          size="large" color="#E63F34"
        /> : 
        <FlatList
          data={pokemons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPokemon}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      }
    </SafeAreaView>
  );
}
