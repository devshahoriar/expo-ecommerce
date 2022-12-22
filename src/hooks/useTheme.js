import { useMemo } from 'react'
import { useColorScheme, Dimensions } from 'react-native'

const useTheme = () => {
  const mood = useColorScheme()

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height

  return useMemo(() => {
    const color =
      mood === 'dark'
        ? {
            text: 'white',
            bg: 'black',
            text_invart: 'black',
            bg_invart: 'white',
            main: '#386974',
            status: 'black',
            bar_style: 'light-content',
          }
        : {
            text: 'black',
            bg: 'white',
            text_invart: 'white',
            bg_invart: 'black',
            main: '#B8F2FF',
            status: 'white',
            bar_style: 'dark-content',
          }

    return {
      ...color,
      height,
      width,
    }
  }, [mood])
}

export default useTheme
