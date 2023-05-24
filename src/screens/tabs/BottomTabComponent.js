import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const BottomTabComponent = ({
  tab,
  icon,
  selectedIcon,
  changeTab,
  selectedTab,
}) => {
  const tabIcon = selectedTab && selectedTab === tab ? selectedIcon : icon;
  return (
    <TouchableOpacity style={styles.bottomTab} onPress={changeTab(tab)}>
      <Image source={tabIcon} style={styles.bottomTabIcon} />
    </TouchableOpacity>
  );
};

export default BottomTabComponent;

const styles = StyleSheet.create({
  bottomTab: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    tintColor: colors.theme_color,
    height: 24,
  },
});
