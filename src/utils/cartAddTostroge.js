import AsyncStorage from "@react-native-async-storage/async-storage"

const cartAddToStorage = (data) => {
  AsyncStorage.setItem('cart', JSON.stringify(data)).then(() => {
    console.log("Added modified");
  }).catch((e) => {
    console.log(e);
  })
}

export default cartAddToStorage