import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './style';
import {useSelector} from 'react-redux';

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  Cart = '',
}) => {
  const {data: cartProducts} = useSelector(state => state.cart);
  return (
    <View style={styles.header}>
      {leftIcon ? (
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            onClickLeftIcon && onClickLeftIcon();
          }}>
          <Image source={leftIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {rightIcon ? (
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            onClickRightIcon && onClickRightIcon();
          }}>
          <Image
            source={rightIcon}
            style={[styles.icon, {height: 40, width: 40}]}
          />
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#fff',
              position: 'absolute',
              right: 0,
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{cartProducts.length}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Header;
