import { Image, Text, TouchableOpacity, View } from 'react-native'
import { POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import { useNavigation } from '@react-navigation/native'
import { serverUrl } from '../data/constant'

const url =
  'https://images.unsplash.com/photo-1670826139885-48466e8e21f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'

const Item = ({ product }) => {
  const th = useTheme()
  const navigation = useNavigation()
  return (
    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
      <View>
        <Image
          source={{ uri: serverUrl + product.img }}
          style={{ height: 70, width: 70 }}
          resizeMode="cover"
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Product', { id: product.id })}
        > */}
        <Text
          style={{
            color: th.text,
            fontFamily: POPPINS_MED,
            fontSize: 20,
          }}
        >
          {product.name}
        </Text>
        {/* </TouchableOpacity> */}
        <Text style={{ color: th.text }}>
          {product.qun} * {product.price} taka = {product.qun * product.price}
          taka
        </Text>
      </View>
    </View>
  )
}

export default Item
