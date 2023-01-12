import { useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { POPPINS, POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { AntDesign } from '@expo/vector-icons'
import StarRating from 'react-native-star-rating-widget'
import { useState } from 'react'
import Products from '../components/Products'
import { FontAwesome } from '@expo/vector-icons'
import { useSearchProductQuery } from '../redux/api/searchApi'
import { useEffect } from 'react'
import useDebounce from '../hooks/useDebounce'

const Search = () => {
  const th = useTheme()
  const [star, setStar] = useState(5)
  const [search, setSearch] = useState('')
  const [max, setMax] = useState(0)
  const [min, setMin] = useState(0)
  const bottomSheetModalRef = useRef(null)
  const deSearch = useDebounce(search, 500)
  const { isError, isLoading, data } = useSearchProductQuery({
    maxPrice: max,
    minPrice: min,
    search: deSearch,
    rating: star,
  })

  const openModel = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const closeModel = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])
  const _hendelFilter = () => {
    console.log(star, search, max, min)
    closeModel()
  }
  return (
    <BottomSheetModalProvider>
      <>
        <SafeAreaView
          style={{ backgroundColor: th.bg, height: '100%', width: '100%' }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
            }}
          >
            <TextInput
              placeholder="Search"
              style={{
                fontFamily: POPPINS,
                fontSize: 20,
                flex: 1,
                marginRight: 5,
                color: th.text,
                borderColor: th.bg_invart,
                borderWidth: 1,
                padding: 5,
                paddingLeft: 10,
                borderRadius: 10,
              }}
              keyboardType="web-search"
              placeholderTextColor={th.text}
              onChangeText={(t) => setSearch(t)}
              value={search}
            />
            {/* <TouchableOpacity
              onPress={openModel}
              style={{
                backgroundColor: th.main,
                padding: 5,
                borderRadius: 10,
                marginRight: 5,
              }}
            >
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={openModel}
              style={{ backgroundColor: th.main, padding: 5, borderRadius: 10 }}
            >
              <FontAwesome name="bars" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={[200, 300]}
            style={{
              borderColor: th.bg_invart,
              borderWidth: 1,
              borderRadius: 20,
              overflow: 'hidden',
              margin: 5,
            }}
            handleIndicatorStyle={{ height: 0 }}
            handleStyle={{ backgroundColor: th.bg, height: 0 }}
          >
            <View
              style={{
                backgroundColor: th.bg,
                height: '100%',
                paddingHorizontal: 15,
                position: 'relative',
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 15,
                  top: 0,
                  zIndex: 9999,
                }}
                onPress={closeModel}
              >
                <AntDesign name="closecircle" size={27} color={th.text} />
              </TouchableOpacity>
              <Text
                style={{ color: th.text, fontSize: 20, fontFamily: POPPINS }}
              >
                Price:
              </Text>
              <View>
                <TextInput
                  placeholder="Min Price"
                  placeholderTextColor={th.text}
                  keyboardType="decimal-pad"
                  value={min}
                  onChangeText={(t) => setMin(t)}
                  style={{
                    fontSize: 18,
                    borderColor: th.main,
                    borderWidth: 2,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    color: th.text,
                  }}
                />
                <TextInput
                  placeholder="Max Price"
                  placeholderTextColor={th.text}
                  keyboardType="decimal-pad"
                  value={max}
                  onChangeText={(t) => setMax(t)}
                  style={{
                    fontSize: 18,
                    borderColor: th.main,
                    borderWidth: 2,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginTop: 10,
                    color: th.text,
                  }}
                />
                <Text
                  style={{
                    color: th.text,
                    marginVertical: 10,
                    fontFamily: POPPINS,
                    fontSize: 20,
                  }}
                >
                  Set rating:
                </Text>
                <StarRating
                  starSize={30}
                  color={th.text}
                  rating={star}
                  onChange={(n) => setStar(n)}
                  enableHalfStar={false}
                  animationConfig={{ scale: 1, delay: 0 }}
                  style={{ marginLeft: -8, marginTop: -5 }}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: th.main,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  onPress={_hendelFilter}
                >
                  <Text
                    style={{
                      color: th.text,
                      fontFamilyP: POPPINS_MED,
                      fontSize: 25,
                      textAlign: 'center',
                    }}
                  >
                    Filter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetModal>

          <ScrollView>
            {isLoading && <Text style={{fontFamily: POPPINS_MED, fontSize: 30}}>Loading...</Text>}
            <Products products={data} />
          </ScrollView>
        </SafeAreaView>
      </>
    </BottomSheetModalProvider>
  )
}

export default Search
