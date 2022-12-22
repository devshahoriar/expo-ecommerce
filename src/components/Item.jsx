import { Image, Text, TouchableOpacity, View } from 'react-native'
import { POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import { useNavigation } from '@react-navigation/native';


const url =
  'https://images.unsplash.com/photo-1670826139885-48466e8e21f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'

const Item = () => {
  const th = useTheme()
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
      <View>
        <Image
          source={{ uri: url }}
          style={{ height: 70, width: 70 }}
          resizeMode="cover"
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Product",{slug: "from cart"})}>
          <Text
            style={{
              color: th.text,
              fontFamily: POPPINS_MED,
              fontSize: 20,
            }}
          >
            Product Name shuvo
          </Text>
        </TouchableOpacity>
        <Text style={{ color: th.text }}> 3 * 300 taka = 900 taka</Text>
      </View>
    </View>
  )
}

export default Item
