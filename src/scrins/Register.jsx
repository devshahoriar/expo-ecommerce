import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { POPPINS, POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'

const Register = ({ navigation }) => {
  const them = useTheme()
  return (
    <>
      <StatusBar backgroundColor="#ddd0" translucent />
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
              Sign Up
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
              placeholder="Name"
            />
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
                marginTop: 10,
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
                Register
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ color: them.text, fontSize: 18 }}>
                Have account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: them.text, fontSize: 18 }}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  )
}

export default Register
