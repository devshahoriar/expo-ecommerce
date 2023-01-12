import { useState } from 'react'
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { POPPINS, POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import { useRegisterMutation } from '../redux/api/auth'

const Register = ({ navigation }) => {
  const them = useTheme()
  const [register, { isError, isLoading, error }] = useRegisterMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const _hendelRegister = async () => {
    const d = await register({ username: name, email, password: pass })
    console.log(d)
    if (!d?.error?.data) {
      ToastAndroid.showWithGravity(
        'Register Success',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      )
      navigation.push('Login')
    }
  }
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
              onChangeText={(t) => setName(t)}
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
              onChangeText={(t) => setEmail(t)}
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
              onChangeText={(t) => setPass(t)}
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
              {isError &&
                (error?.data?.error?.message
                  ? error?.data?.error?.message
                  : 'Something Error.')}
            </Text>
            <TouchableOpacity
              disabled={isLoading}
              style={{
                backgroundColor: them.bg_invart,
                paddingHorizontal: 40,
                paddingVertical: 8,
                marginTop: 10,
              }}
              onPress={_hendelRegister}
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
