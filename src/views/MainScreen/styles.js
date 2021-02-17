import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  
  container:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  listTab:{
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20
  },

  btnTab:{
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center'
  },

  textTab:{
    fontSize: 16
  },

  btnTabActive:{
    backgroundColor: '#E6838D'
  },

  textTabActive:{
    color: '#FFFFFF'
  },

  pokemon:{
    flexDirection: 'row',
    paddingVertical: 15
  },

  pokemonViewImg:{
    padding: 10
  },

  pokemonImg:{
    width: 50,
    height: 50
  },

  pokemonBody:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  
  pokemonName:{
    fontWeight: 'bold',
    fontSize: 16
  },

  pokemonTipo:{
    backgroundColor: 'green',
    paddingHorizontal: 6,
    justifyContent: 'center',
    right: 12
  }

})

export default styles;
