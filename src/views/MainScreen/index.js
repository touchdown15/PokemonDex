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
  const [dataPokemon, setDataPokemon] = useState([]);

  useEffect(()=>{
    
    /*fetch(pokemonURL)
      .then((response) => response.json())
      .then((json) => setPokemons(json.results))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));*/   



    /*fetch(pokemonURL)
      .then(response => response.json())
      .then(data => {
        let results = data.results;
        setPokemons({ pokemonArray : [...results]})
        console.log("Here are my pokemons",   pokemons.pokemonArray)
      });*/

    fetch(pokemonURL)
    .then(response => response.json())
    .then(data => {
      let results = data.results;
      let promisesArray = results.map(result => {
        return fetch(result.url).then(response => response.json());
      })
      return Promise.all(promisesArray);
    }).then((data) => setPokemons(data))
    .catch((err) => alert(err))
    .finally(() => setLoading(false));
   
    /*setPokemons({ pokemon: data }, () => console.log('Main Pokemon State: ', pokemons.pokemon))*/

    /*fetch(pokemonURL)
      .then(response => response.json())
      .then(data => {
        let results = data.results;
        let promisesArray = results.map((result) => {
          return fetch(result.url).then((response) => response.json());
        });
        return Promise.all(promisesArray);
      })
      .then((data) => console.log(data.weight) setPokemons(data));*/
    
      //.then((data) => setPokemons(data))

      /*{ pokemon: data }, () => console.log ('Main pokemon State: ', this.state.pokemon)*/

      /*{
        fetch(json.results.url)
          .then((responsed) => responsed.json())
          .then((jsoned) => setPokemons(jsoned))
          .catch((err) => alert(err)) 
      })
      .catch ((error) => alert (error))
      .finally(() => setLoading(false));*/
      
  })

  const renderPokemon = ({item}) =>{
    return(
      <View style={styles.pokemon}>
        <View style={styles.pokemonViewImg}>
          <Image
            style={styles.pokemonImg}
            source={{uri: item.sprites.front_default}} 
          />
        </View>
        <View style={styles.pokemonBody}>
          <Text style={styles.pokemonName}>
            Nome: {item.name}
          </Text>
          <Text style={styles.pokemonName}>
            Tipo: {item.types[0].type.name}
          </Text>
        </View>
      </View>
    )
  }

  const [table, setTable] = useState('Todos')

  const setTableFilter = table => {
    setTable(table)
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
          keyExtractor={({id}, index) => id}
          renderItem={renderPokemon} 
        />
      }

    </SafeAreaView>
  );
}
