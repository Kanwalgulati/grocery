import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constants/constants';

const {
  AsyncStorageKeys: {IS_USER_LOGGED_IN},
} = constants;

export const getFormattedText = (title, length = 25) => {
  let tempTitle = title ? title : '';
  if (tempTitle.length > length) {
    tempTitle = tempTitle.substring(0, length) + '...';
  }
  return tempTitle;
};

export const navigateToScreen =
  (navigation, screen, params = {}) =>
  () => {
    navigation.navigate(screen, {...params});
  };
export const isUserLoggedIn = async () => {
  let isUserLoggedIn = false;
  const status = await AsyncStorage.getItem(IS_USER_LOGGED_IN);
  if (status !== null) {
    isUserLoggedIn = true;
  }
  return isUserLoggedIn;
};
