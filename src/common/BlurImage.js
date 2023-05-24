import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';

const BlurImage = ({
  productImage,
  productImageStyle = styles.productImageStyle,
  bgImageStyle = styles.bgImageStyle,
}) => {
  return (
    <ImageBackground
      source={{uri: productImage}}
      style={bgImageStyle}
      blurRadius={9}>
      <Image style={productImageStyle} source={{uri: productImage}} />
    </ImageBackground>
  );
};

export default BlurImage;

const styles = StyleSheet.create({
  productImageStyle: {height: 200, width: '100%', resizeMode: 'contain'},
  bgImageStyle: {
    height: 220,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
