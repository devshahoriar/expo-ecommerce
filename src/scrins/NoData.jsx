import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native'
import useTheme from '../hooks/useTheme'
import nodata from '../images/nodata.png'
import { POPPINS_MED, POPPINS } from '../font/index'
const NoData = () => {
  const th = useTheme()
  return (
    <SafeAreaView
      style={{
        backgroundColor: th.bg,
      }}
    >
      <StatusBar backgroundColor={th.status} barStyle={th.bar_style} />
      <View
        style={{
          height: '100%',
          marginTop: th.height * 0.2,
          alignItems: 'center',
        }}
      >
        <Image
          source={nodata}
          resizeMode="cover"
          style={{ width: '100%', height: 200 }}
        />
        <Text
          style={{
            color: th.text,
            marginTop: 20,
            fontSize: 40,
            fontFamily: POPPINS_MED,
          }}
        >
          No Internet!
        </Text>
        <Text>May be backend error!</Text>
        <TouchableOpacity
          onPress={() => BackHandler.exitApp()}
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius:10
          }}
        >
          <Text
            style={{
              color: th.text_invart,
              fontSize: 18,
              fontFamily: POPPINS,
              lineHeight: 24,
            }}
          >
            Exit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NoData
