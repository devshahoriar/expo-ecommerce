import { AntDesign } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { POPPINS_BOLD } from '../font'
import useTheme from '../hooks/useTheme'
import user from '../images/user.jpg'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const th = useTheme()
  const navigashion = useNavigation()
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
          <TouchableOpacity
          onPress={() => navigashion.navigate('Search')}
          >

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
              4
            </Text>
            <AntDesign
              name="shoppingcart"
              size={24}
              color={th.text}
              style={{ marginRight: 10, padding: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigashion.navigate('Profile')}>
            <Image
              source={user}
              style={{ height: 40, width: 40, borderRadius: 1000 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Header
