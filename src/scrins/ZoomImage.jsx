import { View, Text, Image, StyleSheet } from 'react-native'
import { ImageZoom } from '@likashefqet/react-native-image-zoom'
import useTheme from '../hooks/useTheme'
import { POPPINS_BOLD, POPPINS_MED } from '../font'
import BackButton from '../components/BackButton'
const ZoomImage = ({ route }) => {
  const th = useTheme()
  const c = style(th)
  return (
    <View style={c.contsiner}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <BackButton />
        <Text style={c.text}>Zoom To see</Text>
      </View>
      <ImageZoom uri={route.params.uri} />
    </View>
  )
}

const style = (th) =>
  StyleSheet.create({
    contsiner: {
      backgroundColor: th.bg,
      height: '100%',
      width: '100%',
    },
    text: {
      color: th.text,
      fontFamily: POPPINS_BOLD,
      fontSize: 20,
      marginRight:10
    },
  })

export default ZoomImage
