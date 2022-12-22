import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import Home from './src/scrins/Home'
import Login from './src/scrins/Login'
import Register from './src/scrins/Register'
import { useFonts } from 'expo-font'
import { AsyncStorage, useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'
import NoData from './src/scrins/NoData'
import MyAccount from './src/scrins/MyAccount'
import Cart from './src/scrins/Cart'
import Search from './src/scrins/Search'
import ProductPage from './src/scrins/ProductPage'

const Stack = createNativeStackNavigator()

export default function App() {
  const scheme = useColorScheme()
  let [fontsLoaded] = useFonts({
    poppins: require('./src/font/Poppins-Regular.ttf'),
    poppins_medium: require('./src/font/Poppins-Medium.ttf'),
    poppins_lite: require('./src/font/Poppins-Light.ttf'),
    poppins_bold: require('./src/font/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Nodata" component={NoData} />
        <Stack.Screen name="Profile" component={MyAccount} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Product" component={ProductPage} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  )
}
