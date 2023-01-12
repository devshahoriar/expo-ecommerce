import { AntDesign } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { POPPINS_BOLD } from '../font'
import useTheme from '../hooks/useTheme'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import useIsLOged from '../hooks/useIsLoged'

const profile_img =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'

const Header = () => {
  const th = useTheme()
  const navigashion = useNavigation()
  const isLoged = useIsLOged()
  const cart = useSelector((s) => s.cart)
  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{ fontFamily: POPPINS_BOLD, fontSize: 25, color: th.text }}
        >
          Welcome
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigashion.navigate('Search')}>
            <AntDesign
              name="search1"
              size={24}
              color={th.text}
              style={{
                marginRight: 10,
                padding: 5,
                // borderRadius: 1000,
                // borderWidth: 1,
                // borderColor: '#aaa',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() => navigashion.navigate('Cart')}
          >
            <Text
              style={{
                color: th.text,
                position: 'absolute',
                backgroundColor: '#ddd',
                left: -5,
                zIndex: 190,
                paddingHorizontal: 5,
                borderRadius: 1000,
              }}
            >
              {cart?.length}
            </Text>
            <AntDesign
              name="shoppingcart"
              size={24}
              color={th.text}
              style={{ marginRight: 10, padding: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isLoged) {
                navigashion.navigate('Profile')
              } else {
                navigashion.navigate('Login')
              }
            }}
          >
            {isLoged ? (
              <Image
                source={{ uri: profile_img }}
                style={{ height: 40, width: 40, borderRadius: 1000 }}
              />
            ) : (
              <AntDesign name="user" size={26} color={th.text} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Header
