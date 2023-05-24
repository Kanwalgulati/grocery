import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {getFormattedText} from '../common/genericFunctions';
import BlurImage from '../common/BlurImage';
import Images from '../images/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToCart,
  reduceProductFromCart,
  removeProductFromCart,
} from '../redux/Slices/CartSlice';

const {SelectedHeartIcon, HeartIcon} = Images;
const ProductCard = ({
  product,
  onClick,
  style,
  fromWishlistScreen = false,
  showQty = false,
  index,
}) => {
  const dispatch = useDispatch();
  const {data: wishlistProducts} = useSelector(state => state.wishlist);

  const productInWishList = productId => {
    return wishlistProducts.find(({id}) => id === productId);
  };
  const increaseProductQty = () => {
    dispatch(addProductToCart(product));
  };

  const decreaseProductQty = index => () => {
    if (product.qty > 1) {
      dispatch(reduceProductFromCart(product));
    } else if (product.qty === 1) {
      dispatch(removeProductFromCart(index));
    }
  };

  let {image, title, description, price, id, qty = 1} = product || {};
  let {
    productCardContainer,
    productImage,
    productDetailsContainer,
    bgImageStyle,
    productTitle,
    productDescription,
    productPrice,
  } = style;
  return (
    <TouchableOpacity
      key={id}
      style={productCardContainer}
      activeOpacity={0.8}
      onPress={onClick(id)}>
      <BlurImage
        productImage={image}
        productImageStyle={productImage}
        bgImageStyle={bgImageStyle}
      />
      <View style={productDetailsContainer}>
        <Text style={productTitle}>{getFormattedText(title)}</Text>
        <Text numberOfLines={2} style={productDescription}>
          {getFormattedText(description, 60)}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={productPrice}>{`$ ${price}`}</Text>
          {fromWishlistScreen ? (
            <View>
              <Image
                source={productInWishList(id) ? SelectedHeartIcon : HeartIcon}
                style={styles.wishlistIcon}
              />
            </View>
          ) : null}
          {showQty ? (
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={decreaseProductQty(index)}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={{color: 'black', marginLeft: 10}}>{qty}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={increaseProductQty}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  wishlistIcon: {
    height: 24,
    width: 24,
    tintColor: 'red',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
