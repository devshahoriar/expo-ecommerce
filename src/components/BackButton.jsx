import { AntDesign } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { POPPINS_BOLD } from '../font'
import useTheme from '../hooks/useTheme'

import { useNavigation } from '@react-navigation/native'
const BackButton = () => {
  const navigation = useNavigation()
  const th = useTheme()
  return (
    <TouchableOpacity
      style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="leftcircleo" size={20} color={th.text} />
      <Text
        style={{
          fontFamily: POPPINS_BOLD,
          fontSize: 20,
          marginLeft: 10,
          marginTop: 5,
          color: th.text,
        }}
      >
        Back
      </Text>
    </TouchableOpacity>
  )
}

export default BackButton
