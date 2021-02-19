import React from 'react';
import {
  View,
  Text,
  Image
 } from 'react-native';
import styles from './styles'

export default ({ route }) => {

  const item = route.params;

  return(
    <View style={styles.container}>
      <Image
        style={styles.pokemonImg}
        source={{uri: item.sprites.front_default}} 
      />
      <Text>Detail Name: { item.name } </Text>
      <View>
        {item.types.map(types => (
          <View>
            <Text>Detail Type: { types.type.name } </Text>
          </View>
        ))}
      </View>
      <View>
        {item.stats.map(status=> (
          <View>
            <Text>Detail Stat Name: { status.stat.name } </Text>
            <Text>Detail Stat Number: { status.base_stat } </Text>
          </View>
        ))}
      </View>
      <Text>Detail Weight: { item.weight } </Text>
      <View>
        {item.moves.slice(0, 4).map(moves=>(
          <View> 
            <Text>Detail Move Name: { moves.move.name } </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/*<View>
        {item.moves.map(moves=> (
          <View> 
            <Text>Detail Move Name: { moves.move.name } </Text>
          </View>
        ))}
      </View>*/

/*      <Text>Detail Move Name: { item.moves[0].move.name } </Text>
      <Text>Detail Move Name: { item.moves[1].move.name } </Text>
      <Text>Detail Move Name: { item.moves[2].move.name } </Text>
      <Text>Detail Move Name: { item.moves[3].move.name } </Text>*/