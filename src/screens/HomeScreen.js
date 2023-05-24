import {
  View,
  StyleSheet,
  KeyboardAvoidingViewBase,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Images from '../images/images';
import Home from './tabs/Home';
import Search from './tabs/Search';
import UserLike from './tabs/UserLike';
import Notifications from './tabs/Notifications';
import Profile from './tabs/Profile';
import BottomTabComponent from './tabs/BottomTabComponent';

const {
  BellIcon,
  HeartIcon,
  HomeIcon,
  ProfileIcon,
  SearchIcon,
  SelectedBellIcon,
  SelectedHeartIcon,
  SelectedHomeIcon,
  SelectedProfileIcon,
  SelectedSearchIcon,
} = Images;

const allTabsList = {
  0: Home,
  1: Search,
  2: UserLike,
  3: Notifications,
  4: Profile,
};

const botttomTabList = [
  {tab: '0', icon: HomeIcon, selectedIcon: SelectedHomeIcon},
  {tab: '1', icon: SearchIcon, selectedIcon: SelectedSearchIcon},
  {tab: '2', icon: HeartIcon, selectedIcon: SelectedHeartIcon},
  {tab: '3', icon: BellIcon, selectedIcon: SelectedBellIcon},
  {tab: '4', icon: ProfileIcon, selectedIcon: SelectedProfileIcon},
];

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('0');
  const changeSelectedTab = tab => () => {
    setSelectedTab(tab);
  };
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const SelectedTab = allTabsList[selectedTab];
  useEffect(() => {
    const keyboardDidShowListner = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListner = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListner.remove();
      keyboardDidHideListner.remove();
    };
  });

  return (
    <View style={styles.container}>
      <SelectedTab />
      {!isKeyboardVisible ? (
        <View style={styles.bottomView}>
          {botttomTabList.map(bottomTab => {
            let {icon, tab, selectedIcon} = bottomTab;
            return (
              <BottomTabComponent
                tab={tab}
                icon={icon}
                selectedIcon={selectedIcon}
                key={tab}
                changeTab={changeSelectedTab}
                selectedTab={selectedTab}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 24,
  },
});
