import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import { useNavigation } from '@react-navigation/native';
const Product = () => {
  const th = useTheme()
  const navagation = useNavigation()

  const styles = StyleSheet.create({
    catImg: {
      height: 160,
      width: '100%',
    },
    catV: {
      width: '50%',
      
    },
  })

  const _hendelPress = () => {
    navagation.navigate('Product',{slug:'pppp'})
  }

  const url =
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
  return (
    <View style={styles.catV}>
      <View style={{ margin: 3,padding:10 }}>
        <TouchableOpacity
        onPress={_hendelPress}
        >
          <Image style={styles.catImg} source={{ uri: url }} />
          <Text
            style={{
              fontFamily: POPPINS_MED,
              fontSize: 17,
              height: 50,
              color: th.text,
            }}
          >
            Name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptas similique numquam officiis nobis accusantium quam facilis
            quibusdam sequi blanditiis deleniti. Blanditiis est ut inventore
            maxime dolores modi quae, nesciunt consectetur!
          </Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>

          <Text style={{color:th.text}}>200$</Text>
          <Text style={{color:"blue"}}>-20%</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Product
