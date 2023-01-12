import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import { useNavigation } from '@react-navigation/native'
import { serverUrl } from '../data/constant'
const Product = (product) => {

  const { name, price, offerPrice, slug, media } = product?.product
    ?.attributes || {
    name: 'nn',
    price: 100,
    slug: 'd',
    offerPrice: 0,
  }
  const img =
    media?.data[0].attributes?.formats.medium.url ||
    '/uploads/medium_md_salman_iiqg2xbmvk0_unsplash_48794a5e9f.jpg'

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
    navagation.navigate('Product', { id: product?.product?.id })
  }

  return (
    <View style={styles.catV}>
      <View style={{ margin: 2, padding: 10 }}>
        <TouchableOpacity onPress={_hendelPress}>
          <Image style={styles.catImg} source={{ uri: serverUrl + img }} />
          <Text
            style={{
              fontFamily: POPPINS_MED,
              fontSize: 17,
              height: 50,
              color: th.text,
            }}
          >
            {name}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ color: th.text }}>{price}$</Text>
            <Text style={{ color: 'blue' }}>
              -{Math.round((price / offerPrice) * 100 - 100).toFixed(2)}%
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Product
