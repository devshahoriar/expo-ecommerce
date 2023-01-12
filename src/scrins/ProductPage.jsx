import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import BackButton from '../components/BackButton'
import useTheme from '../hooks/useTheme'
import { useRef, useState } from 'react'
import { POPPINS, POPPINS_BOLD, POPPINS_MED } from '../font'
import StarRating from 'react-native-star-rating-widget'
import { ToastAndroid } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useGetProductByIdQuery } from '../redux/api/productApi'
import { useEffect } from 'react'
import { serverUrl } from '../data/constant'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slice/cart'

const ProductPage = ({ route, navigation }) => {
  const { id } = route?.params
  const { isError, isLoading, data } = useGetProductByIdQuery(id)
  const th = useTheme()
  const slideRef = useRef()
  const [activeSlide, setActiveSlide] = useState(0)
  const [fullDesc, setFullDesc] = useState(3)
  const dispatch = useDispatch()

  const { name, price, offerPrice, slug, media, star, desc } = data?.data
    ?.attributes || {
    name: 'nn',
    price: 100,
    slug: 'd',
    offerPrice: 0,
  }
  const sliderData = media?.data
  const updatePos = (e) => {
    const current_ofset = e.nativeEvent.contentOffset.x
    setActiveSlide(Math.round(current_ofset / (th.width * 0.95)))
  }

  useEffect(() => {
    // console.log(media)
  }, [data])

  const _hendelAddCart = () => {
    const l = {
      id: data?.data?.id,
      name,
      price,
      img: sliderData[0].attributes.formats.medium.url,
    }
    dispatch(addToCart(l))
    ToastAndroid.showWithGravity(
      'Product Added.',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  }

  const item = ({ item }) => {
    const _hendelClick = () => {
      navigation.navigate('ZoomImage', {
        uri: serverUrl + item.attributes.formats.large.url,
      })
    }
    return (
      <View
        style={{
          width: th.width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={_hendelClick}>
          <Image
            style={{ height: 300, width: th.width * 0.95, borderRadius: 5 }}
            resizeMode="cover"
            source={{ uri: serverUrl + item.attributes.formats.medium.url }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const Review = () => {
    return (
      <View style={{ marginVertical: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AntDesign name="user" style={{ fontSize: 40 }} color={th.text} />
          <View>
            <Text style={{ color: th.text, fontSize: 20, marginLeft: 5 }}>
              Names
            </Text>
            <View pointerEvents="none">
              <StarRating
                starSize={16}
                color={th.text}
                rating={Math.floor(Math.random() * 5)}
              />
            </View>
          </View>
        </View>
        <Text style={{ color: th.text, marginLeft: 10 }}>Good Product</Text>
      </View>
    )
  }

  return (
    <>
      <View style={{ backgroundColor: th.bg, width: '100%', height: '100%' }}>
        <SafeAreaView>
          <View style={{ position: 'absolute', zIndex: 999 }}>
            <BackButton />
          </View>
          {isLoading ? (
            <Text
              style={{ fontFamily: POPPINS_BOLD, fontSize: 30, marginTop: 40 }}
            >
              Loading...
            </Text>
          ) : (
            <ScrollView>
              {sliderData && (
                <View style={{ position: 'relative' }}>
                  <FlatList
                    ref={slideRef}
                    data={sliderData}
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
              )}

              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={{
                    fontFamily: POPPINS_MED,
                    fontSize: 25,
                    color: th.text,
                  }}
                >
                  {name}
                </Text>
                <Text style={{ fontFamily: POPPINS, color: th.text }}>
                  Price: {price} taka
                </Text>
                <View pointerEvents="none">
                  <StarRating
                    style={{ marginLeft: -5 }}
                    starSize={20}
                    // starStyle={{ height: 8, width:8, marginRight: 11 }}
                    onChange={() => {}}
                    color={th.text}
                    rating={star}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={_hendelAddCart}
                    style={{
                      backgroundColor: th.main,
                      paddingHorizontal: 20,
                      paddingVertical: 13,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: th.text }}>Add To cart</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  numberOfLines={fullDesc}
                  style={{
                    color: th.text,
                    fontFamily: POPPINS,
                    fontSize: 16,
                    marginTop: 15,
                  }}
                >
                  {desc}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    fullDesc ? setFullDesc(null) : setFullDesc(3)
                  }}
                >
                  <Text style={{ color: 'blue' }}>
                    {fullDesc ? 'See More' : 'See Less'}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: th.text,
                    fontFamily: POPPINS_MED,
                    marginTop: 10,
                    fontSize: 20,
                  }}
                >
                  Reviews:
                </Text>
                <View>
                  <Review />
                  <Review />
                  <Review />
                  <Review />
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </View>
    </>
  )
}

export default ProductPage
