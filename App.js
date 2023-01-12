import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import Home from './src/scrins/Home'
import Login from './src/scrins/Login'
import Register from './src/scrins/Register'
import * as Font from 'expo-font'
import { useColorScheme } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import NoData from './src/scrins/NoData'
import MyAccount from './src/scrins/MyAccount'
import Cart from './src/scrins/Cart'
import Search from './src/scrins/Search'
import ProductPage from './src/scrins/ProductPage'
import ZoomImage from './src/scrins/ZoomImage'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from './src/redux/api/auth'
import { addAll } from './src/redux/slice/cart'
import Order from './src/scrins/Order'
import isServerWork from './src/utils/isServerWork'

SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()

export default function App() {
  const scheme = useColorScheme()
  const [appIsReady, setAppIsReady] = useState(false)
  const [initial, setInitialLocation] = useState('Home')

  let [fontsLoaded] = Font.useFonts({
    poppins: require('./src/font/Poppins-Regular.ttf'),
    poppins_medium: require('./src/font/Poppins-Medium.ttf'),
    poppins_lite: require('./src/font/Poppins-Light.ttf'),
    poppins_bold: require('./src/font/Poppins-Bold.ttf'),
  })

  useEffect(() => {
    const appBoot = async () => {
      try {
        await Font.loadAsync({
          poppins: require('./src/font/Poppins-Regular.ttf'),
          poppins_medium: require('./src/font/Poppins-Medium.ttf'),
          poppins_lite: require('./src/font/Poppins-Light.ttf'),
          poppins_bold: require('./src/font/Poppins-Bold.ttf'),
        })
        const cart = await AsyncStorage.getItem('cart')
        store.dispatch(addAll(cart))
        if (!(await isServerWork())) {
          setInitialLocation('Nodata')
        }
        const jwt = await AsyncStorage.getItem('jwt')
        if (jwt) {
          const { isError, data } = await store.dispatch(
            auth.endpoints.revalidate.initiate(jwt)
          )

          console.log(
            'App open success / App.js remembar hendel expire eshue',
            data
          )
          if (isError) {
            await AsyncStorage.removeItem('jwt')
            setInitialLocation('Nodata')
          }
        }

        setAppIsReady(true)
      } catch (error) {
        setInitialLocation('Nodata')
        setAppIsReady(true)
        console.log(error)
      }
    }
    appBoot()
  }, [])

  const onLayoutRootView = async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }

  if (!appIsReady) {
    return null
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer onReady={() => onLayoutRootView()}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={initial}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Nodata" component={NoData} />
            <Stack.Screen name="Profile" component={MyAccount} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Product" component={ProductPage} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ZoomImage" component={ZoomImage} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}
