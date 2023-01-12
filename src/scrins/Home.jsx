import { useEffect, useRef, useState } from 'react'
import {
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  AsyncStorage,
  Dimensions,
  View,
  Image,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import useTheme from '../hooks/useTheme'
import { POPPINS, POPPINS_BOLD, POPPINS_LITE, POPPINS_MED } from '../font'
import Header from '../components/Header'
import sliderData from '../data/Slider'
import Products from '../components/Products'
import {
  useGetProdutsWithOfferPriceQuery,
  useGetRandomQuery,
} from '../redux/api/productApi'
import { useGetSlideQuery } from '../redux/api/homeApi'
import { serverUrl } from '../data/constant'

const Home = ({ navigation }) => {
  const th = useTheme()
  const [activeSlide, setActiveSlide] = useState(0)
  const slideRef = useRef()
  const { isError, isLoading, data: pData } = useGetRandomQuery()
  const {
    isError: oErr,
    isLoading: oLod,
    data: oData,
  } = useGetProdutsWithOfferPriceQuery()
  const {
    isError: slideErr,
    isLoading: slideLoading,
    data: slidesD,
  } = useGetSlideQuery()

  const slides = slidesD?.data.attributes.slides


  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (!Boolean(state.isConnected)) {
        navigation.push('Nodata')
      }
    })
  }, [])

  const item = ({ item }) => {
  
    return (
      <View
        style={{
          width: th.width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{ height: 200, width: th.width * 0.95, borderRadius: 5 }}
          resizeMode="cover"
          source={{
            uri: serverUrl + item.img.data.attributes.formats.large.url,
          }}
        />
      </View>
    )
  }

  const CatItem = () => {
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#cecece', borderRadius: 5 }}
          onPress={() => navigation.navigate('Search')}
        >
          <Image
            style={{ height: 60, margin: 5 }}
            resizeMode="cover"
            source={{
              uri: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
            }}
          />
          <Text style={{ textAlign: 'center', fontFamily: POPPINS }}>
            Title
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const updatePos = (e) => {
    const current_ofset = e.nativeEvent.contentOffset.x
    setActiveSlide(Math.round(current_ofset / (th.width * 0.95)))
  }

  const toggleSlide = () => {
    const nextSlide = activeSlide + 1
    if (nextSlide === sliderData.length) {
      setActiveSlide(0)
      slideRef.current.scrollToOffset({ offset: 0 })
      return
    }
    slideRef.current.scrollToOffset({ offset: th.width * nextSlide })
    setActiveSlide(nextSlide)
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView
          style={{
            backgroundColor: th.bg,
            height: '100%',
            width: '100%',
            marginBottom: 10,
          }}
        >
          <StatusBar backgroundColor={th.status} barStyle={th.bar_style} />
          <Header />
          <View style={{ marginTop: 20, height: 200, position: 'relative' }}>
            <FlatList
              ref={slideRef}
              data={slides}
              renderItem={item}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={updatePos}
            />
            <View
              style={{
                position: 'absolute',
                top: '90%',
                left: th.width / 2 - 10 * (sliderData.length / 2),
                flexDirection: 'row',
                // transform: [ { translateX:-20*sliderData.length }],
              }}
            >
              {sliderData.map((_, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: activeSlide === i ? '#fff' : '#aaa',
                    height: 8,
                    width: 8,
                    margin: 2,
                    borderRadius: 2,
                  }}
                ></View>
              ))}
            </View>
          </View>
          <Text
            style={{
              color: th.text,
              marginLeft: 5,
              fontFamily: POPPINS_MED,
              marginTop: 20,
            }}
          >
            Cetegoris:
          </Text>
          <View style={{ marginHorizontal: 5, flexDirection: 'row' }}>
            <CatItem />
            <CatItem />
            <CatItem />
            <CatItem />
          </View>
          {isLoading ? (
            <Text>Loading....</Text>
          ) : (
            <Products title="Just For you." products={oData} />
          )}

          {oLod ? (
            <Text>Loading...</Text>
          ) : (
            <Products products={pData} title="Highlight." />
          )}
          <Text
            style={{
              color: th.text,
              textAlign: 'center',
              fontFamily: POPPINS_MED,
            }}
          >
            Made By
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.facebook.com/devshahoriar')
            }
          >
            <Text
              style={{
                color: th.text,
                textAlign: 'center',
                fontFamily: POPPINS_BOLD,
                fontSize: 20,
              }}
            >
              Shuvo
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </>
  )
}

export default Home
