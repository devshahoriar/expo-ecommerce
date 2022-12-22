import { useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { POPPINS_MED } from '../font'
import useTheme from '../hooks/useTheme'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { AntDesign } from '@expo/vector-icons'

const Search = () => {
  const th = useTheme()
  const bottomSheetModalRef = useRef(null)
  const snapPoints = useMemo(() => ['1%', '20%'], [])

  const openModel = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const closeModel = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])
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
                fontFamily: POPPINS_MED,
                fontSize: 20,
                flex: 1,
                marginRight: 10,
                color: th.text,
                borderColor: th.bg_invart,
                borderWidth: 2,
                padding: 5,
                paddingLeft: 10,
                borderRadius: 10,
              }}
              placeholderTextColor={th.text}
              onEndEditing={(t) => console.log(t.nativeEvent.text)}
            />
            <TouchableOpacity onPress={openModel}>
              <Text
                style={{
                  fontFamily: POPPINS_MED,
                  fontSize: 20,
                  color: th.text,
                }}
              >
                Filter
              </Text>
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
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
                style={{
                  fontFamily: POPPINS_MED,
                  fontSize: 30,
                  color: th.text,
                }}
              >
                Filter Gose There
              </Text>
            </View>
          </BottomSheetModal>
        </SafeAreaView>
      </>
    </BottomSheetModalProvider>
  )
}

export default Search
