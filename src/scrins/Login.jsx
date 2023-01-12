import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { POPPINS, POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import imgLogin from '../images/loginBg.jpg'
import { useLoginMutation } from '../redux/api/auth'
import { loginUser } from '../redux/slice/user'

const Login = ({ navigation }) => {
  const them = useTheme()
  const [err, setErr] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isError, isLoading, error }] = useLoginMutation()
  const dispatch = useDispatch()

  const _hendelLogin = async () => {
    try {
      const d = await login({
        identifier: email,
        password: password,
      }).unwrap()

      const data = {
        jwt: d.jwt,
        email: d.user.email,
        name: d.user.username,
      }
      await AsyncStorage.setItem('jwt', data.jwt)
      dispatch(loginUser(data))
      navigation.replace('Home')
    } catch (errorr) {
      console.log(error)
      if (errorr?.data?.error?.message) {
        setErr(errorr?.data?.error?.message)
      }
      if (errorr?.error) {
        setErr(errorr?.error)
      }
    }
  }

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
              marginHorizontal: 10,
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
              onChangeText={(t) => setEmail(t)}
              value={email}
              style={{
                backgroundColor: them.main,
                fontSize: 20,
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 5,
                fontFamily: POPPINS,
                includeFontPadding: false,
              }}
              placeholder="Email"
            />
            <TextInput
              onChangeText={(t) => setPassword(t)}
              value={password}
              style={{
                backgroundColor: them.main,
                fontSize: 20,
                width: '100%',
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
                fontSize: 20,
                marginVertical: 5,
              }}
            >
              {err}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: them.bg_invart,
                paddingHorizontal: 40,
                paddingVertical: 8,
                marginTop: 10,
              }}
              onPress={_hendelLogin}
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
