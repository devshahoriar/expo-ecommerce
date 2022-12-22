import { View, Text, StyleSheet } from 'react-native'
import { POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import Product from './Product'
const Products = ({ title = 'Exclusive' }) => {
  const th = useTheme()
  return (
    <View style={styles.container}>
      {title && (
        <Text
          style={[styles.heading, { fontFamily: POPPINS_MED, color: th.text }]}
        >
          {title}
        </Text>
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Product />
        <Product />
        <Product />
        <Product />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 20,
  },
})

export default Products
