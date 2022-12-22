import { View, Text, Image } from 'react-native'
import { POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import Item from './Item'


const Orders = () => {
  const th = useTheme()
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 5,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
      }}
    >
      <Item />
      <Item />
      <Text style={{ color: th.text }}>Order Status : Pending</Text>
      <Text style={{ color: th.text }}>Address : Bagha</Text>
      <Text style={{ color: th.text }}>Payment : Bkash</Text>
    </View>
  )
}

export default Orders
