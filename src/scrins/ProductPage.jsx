import { View, Text, SafeAreaView, Image } from 'react-native'

import BackButton from '../components/BackButton'
import useTheme from '../hooks/useTheme'

import Lightbox from 'react-native-lightbox-zoom'
const ProductPage = ({ route, navigation }) => {
  const { slug } = route?.params
  console.log(slug)
  const th = useTheme()
  return (
    <>
      <View style={{ backgroundColor: th.bg, width: '100%', height: '100%' }}>
        <SafeAreaView>
          <View style={{ position: 'absolute', zIndex: 999 }}>
            <BackButton />
          </View>
          <View>
            <Lightbox caption="Cat looking cute" style={{zIndex:9999}}>
              {/* Image is what the lightbox is designed for but you can use any component */}
              <Image
                style={[
                  {
                    width: 350,
                    height: 245,
                    alignSelf: 'center',
                  },
                ]}
                source={{ uri: 'https://placekitten.com/500/350' }}
              />
            </Lightbox>
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}

export default ProductPage
