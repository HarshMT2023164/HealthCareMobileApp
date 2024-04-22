import AsyncStorage from "@react-native-async-storage/async-storage";


export const storeInAsyncStorage = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log('Object saved successfully!');
    } catch (error) {
      console.log('Error saving object:', error);
    }
  };

export const getFromAsyncStorage = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        console.log(jsonValue);
        const json  = JSON.parse(jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (error) {
        console.log('Error retrieving object:', error);
        return null;
      }
}  

export const Askeys = {
  TOKEN : "token",
  FHW_USERNAME : "FHWUsername",
  SCORE : "score",
  REGISTER_USER : "registerUserInfo"
}