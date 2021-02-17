import React, { useState, useEffect } from 'react';
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

const pokemonURL = "https://pokeapi.co/api/v2/pokemon";

export default () => {

  const [isLoading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(()=>{
    fetch(pokemonURL)
      .then((response) => response.json())
      .then((json) => setPokemons(json.results))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  })

  const [table, setTable] = useState('Todos')
  const setTableFilter = table => {
    setTable(table)
  }

  const renderPokemon = ({item}) =>{
    return(
      <Text>
        {item.name} , {item.url}
      </Text>
    )
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
      
      {isLoading ? <ActivityIndicator /> : 
        <FlatList
          data={pokemons}
          keyExtractor={({id}, index) => id}
          renderItem={renderPokemon} 
        />
      }

      

    </SafeAreaView>
  );
}
