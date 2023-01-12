import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackButton from '../components/BackButton'
import Item from '../components/Item'
import { POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import { decProduct, incProduct, removeFromCart } from '../redux/slice/cart'

const ItemWithControl = ({ product }) => {
  const th = useTheme()
  const dispatch = useDispatch()
  return (
    <>
      <Item product={product} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => dispatch(decProduct(product.id))}>
          <Text
            style={{ color: th.text, fontFamily: POPPINS_BOLD, fontSize: 20 }}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: th.text,
            fontFamily: POPPINS_BOLD,
            fontSize: 20,
            marginHorizontal: 20,
          }}
        >
          {product.qun}
        </Text>
        <TouchableOpacity onPress={() => dispatch(incProduct(product.id))}>
          <Text
            style={{ color: th.text, fontFamily: POPPINS_BOLD, fontSize: 20 }}
          >
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(removeFromCart(product.id))}>
          <Text
            style={{
              color: 'red',
              fontFamily: POPPINS_BOLD,
              fontSize: 20,
              marginLeft: 20,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
const Cart = ({ navigation }) => {
  const th = useTheme()
  const cart = useSelector((s) => s.cart)
  const user = useSelector((s) => s.user)


  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: th.bg }}>
      <View style={{ position: 'absolute', zIndex: 999 }}>
        <BackButton />
      </View>
      <ScrollView>
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
                <Text>No cart item!</Text>
              ) : (
                cart?.map((d, i) => <ItemWithControl product={d} key={i} />)
              )}
            </View>
            {cart?.length > 0 && (
              <TouchableOpacity
                onPress={() => Boolean(user.jwt) ? navigation.navigate('Order') :  navigation.navigate('Login')}
                style={{
                  backgroundColor: th.main,
                  marginTop: 10,
                  borderRadius: 5,
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
                  Buy
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
