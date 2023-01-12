import { View, Text, StyleSheet } from 'react-native'
import { POPPINS_BOLD, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import Product from './Product'
const Products = ({ title, products }) => {

  const th = useTheme()
  return (
    <View style={styles.container}>
      {title && (
        <Text
          style={[
            styles.heading,
            {
              fontFamily: POPPINS_MED,
              color: th.text,
              marginTop: 10,
              marginLeft: 10,
            },
          ]}
        >
          {title}
        </Text>
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {products?.data?.map((p, i) => (
          <Product key={i} product={p} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
  },
  heading: {
    fontSize: 20,
  },
})

export default Products
