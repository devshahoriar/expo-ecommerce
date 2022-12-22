import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import BackButton from '../components/BackButton'
import Item from '../components/Item'
import { POPPINS_BOLD } from '../font'
import useTheme from '../hooks/useTheme'

const ItemWithControl = () => {
  const th = useTheme()
  return (
    <>
      <Item />
      <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
        <TouchableOpacity>
          <Text style={{ color: th.text ,fontFamily:POPPINS_BOLD,fontSize:20 }}>-</Text>
        </TouchableOpacity>
        <Text style={{ color: th.text ,fontFamily:POPPINS_BOLD,fontSize:20,marginHorizontal:20 }}>5</Text>
        <TouchableOpacity>
          <Text style={{ color: th.text ,fontFamily:POPPINS_BOLD,fontSize:20 }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color:'red',fontFamily:POPPINS_BOLD,fontSize:20 ,marginLeft:20}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
const Cart = () => {
  const th = useTheme()
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
              Orders :
            </Text>
            <View>
              <ItemWithControl />
              <ItemWithControl />
              <ItemWithControl />
              <ItemWithControl />
              <ItemWithControl />
              <ItemWithControl />
              <ItemWithControl />
              <ItemWithControl />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default Cart
