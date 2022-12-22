
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity, SafeAreaView, StatusBar
} from 'react-native'
import { POPPINS, POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import imgLogin from '../images/loginBg.jpg'

const Login = ({ navigation }) => {
  const them = useTheme()
  return (
    <>
      <StatusBar backgroundColor={them.status} barStyle={them.bar_style} />
      <ImageBackground
        // source={imgLogin}
        style={{ height: '100%', width: '100%', backgroundColor: them.bg }}
      >
        <SafeAreaView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Text
              style={{
                color: them.text,
                fontSize: 60,
                fontFamily: POPPINS_BOLD,
              }}
            >
              Sign In
            </Text>
            <TextInput
              style={{
                backgroundColor: them.main,
                fontSize: 20,
                width: '90%',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 5,
                fontFamily: POPPINS,
                includeFontPadding: false,
              }}
              placeholder="Email"
            />
            <TextInput
              style={{
                backgroundColor: them.main,
                fontSize: 20,
                width: '90%',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 10,
                borderRadius: 5,
                fontFamily: POPPINS,
                includeFontPadding: false,
              }}
              secureTextEntry
              placeholder="Password"
            />
            <Text
              style={{
                color: 'red',
                textAlign: 'left',
                width: '100%',
                marginLeft: 20,
                fontSize: 20,
                marginVertical: 5,
              }}
            >
              Error
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: them.bg_invart,
                paddingHorizontal: 40,
                paddingVertical: 8,
                marginTop: 10,
              }}
              onPress={() => console.log('Clicked')}
            >
              <Text
                style={{
                  color: them.text_invart,
                  fontSize: 20,
                  fontFamily: POPPINS_MED,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ color: them.text, fontSize: 18 }}>
                Don't have account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: them.text, fontSize: 18 }}>
                  {' '}
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  )
}

export default Login
