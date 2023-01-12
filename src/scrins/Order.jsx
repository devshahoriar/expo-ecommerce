import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackButton from '../components/BackButton'
import Item from '../components/Item'
import { POPPINS, POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import { useMakeOrderMutation } from '../redux/api/order'
import { removeAll } from '../redux/slice/cart'

const Cart = ({ navigation }) => {
  const th = useTheme()
  const cart = useSelector((s) => s.cart)
  const user = useSelector((s) => s.user)
  const [error, setError] = useState('')
  const [addr, setAddr] = useState('')
  const [payment, setPayment] = useState('')
  const sumPrice = cart?.reduce((t, i) => t + i.price * i.qun, 0)
  const [order, { isError, isLoading }] = useMakeOrderMutation()
  const dispatch = useDispatch()

  const _hendelOrder = async () => {
    const data = {
      address: addr,
      products: JSON.stringify(cart),
      payment,
      user_id: user.id + '',
      all_price: sumPrice + '',
    }

    try {
      const order_result = await order({ data, jwt: user.jwt })
      await AsyncStorage.removeItem('cart')
      const d = dispatch(removeAll())

      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
    ToastAndroid.showWithGravity(
      'Ordered..',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  }

  return (
      <View style={{ height: '100%', width: '100%', backgroundColor: th.bg }}>
        <View style={{ position: 'absolute', zIndex: 999 }}>
          <BackButton />
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
          <SafeAreaView>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  color: th.text,
                  marginTop: 50,
                  fontFamily: POPPINS_BOLD,
                  fontSize: 30,
                }}
              >
                Cart Product :
              </Text>
              <View>
                {cart?.length === 0 ? (
                  <Text>Nothin to order</Text>
                ) : (
                  cart?.map((d, i) => <Item product={d} key={i} />)
                )}
              </View>
              <View
                style={{
                  borderColor: th.main,
                  borderBottomWidth: 2,
                  marginTop: 10,
                }}
              />
              <Text
                style={{
                  color: th.text,
                  fontFamily: POPPINS_MED,
                  fontSize: 20,
                }}
              >
                Price: {sumPrice}taka
              </Text>
              <TextInput
                onChangeText={(t) => setAddr(t)}
                style={{
                  borderColor: th.main,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontFamily: POPPINS,
                  fontSize: 20,
                  padding: 5,
                }}
                placeholder="Address"
              />
              <TextInput
                onChangeText={(t) => setPayment(t)}
                style={{
                  borderColor: th.main,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontFamily: POPPINS,
                  fontSize: 20,
                  padding: 5,
                  marginTop: 10,
                }}
                placeholder="Payment"
              />
              <Text style={{ color: 'red', marginVertical: 5 }}>{error}</Text>
              {cart?.length > 0 && (
                <TouchableOpacity
                  onPress={_hendelOrder}
                  style={{
                    backgroundColor: th.main,
                    marginTop: 10,
                    borderRadius: 5,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: th.text,
                      fontFamily: POPPINS_MED,
                      fontSize: 25,
                      textAlign: 'center',
                    }}
                  >
                    Order
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
  )
}

export default Cart
