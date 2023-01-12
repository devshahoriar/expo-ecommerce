import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { POPPINS_BOLD, POPPINS_LITE, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons'
import BackButton from '../components/BackButton'
import Orders from '../components/Orders'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../redux/slice/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGetOrderQuery } from '../redux/api/order'
import { useEffect } from 'react'

const profile_img =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
const MyAccount = ({ navigation }) => {
  const th = useTheme()
  const user = useSelector((s) => s.user)
  const dispatch = useDispatch()
  const { isError, isLoading, data } = useGetOrderQuery(
    {
      id: user.id,
      jwt: user.jwt,
    },
    { refetchOnMountOrArgChange: true }
  )
  const orders = data?.data

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log(result)
  }

  const _HendelLogOut = async () => {
    await AsyncStorage.removeItem('jwt')
    dispatch(logOutUser())

    navigation.replace('Home')
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: th.bg,
        position: 'relative',
      }}
    >
      <View style={{ position: 'absolute', zIndex: 999 }}>
        <BackButton />
      </View>
      <ScrollView>
        <SafeAreaView>
          <View style={{ marginTop: th.height / 10, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => pickImage()}>
              <Image
                source={{ uri: profile_img }}
                style={{
                  height: th.width / 2,
                  width: th.width / 2,
                  borderRadius: 30,
                }}
              />
              <Text style={{ color: th.text, textAlign: 'center' }}>
                Tap to change
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: th.text,
                fontFamily: POPPINS_MED,
                fontSize: 30,
                marginTop: 17,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: th.text, fontFamily: POPPINS_LITE }}>
              {user.email}
            </Text>
            <Text style={{ color: th.text, fontFamily: POPPINS_LITE }}>
              0177596336
            </Text>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={_HendelLogOut}>
              <Text style={{ color: th.text, fontFamily: POPPINS_BOLD }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: th.text,
              marginHorizontal: 10,
              fontFamily: POPPINS_BOLD,
              fontSize: 30,
            }}
          >
            Orders :
          </Text>
          <View style={{ height: '100%', width: '100%' }}>
            {isLoading && <Text>Loading...</Text>}
            {isError && <Text>Something Error!</Text>}
            {orders?.length <= 0 ? (
              <Text>No Order.</Text>
            ) : (
              orders?.map((o, i) => <Orders key={i} order={o} />)
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default MyAccount
