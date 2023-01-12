import { View, Text, Image } from 'react-native'
import { POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import Item from './Item'

const Orders = ({ order }) => {

  const d = order?.attributes
  const p = JSON.parse(d.products)

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
      {p?.map((e, i) => (
        <Item product={e} key={i} />
      ))}
      
      <Text style={{ color: th.text }}>Order Status : {d.status}</Text>
      <Text style={{ color: th.text }}>Cost : {d.all_price}</Text>
      <Text style={{ color: th.text }}>Address : {d.address}</Text>
      <Text style={{ color: th.text }}>Payment : {d.payment}</Text>
    </View>
  )
}

export default Orders
