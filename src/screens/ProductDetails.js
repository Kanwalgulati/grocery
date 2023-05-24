import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../common/Header/Header';
import Images from '../images/images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getFormattedText,
  isUserLoggedIn,
  navigateToScreen,
} from '../common/genericFunctions';
import BlurImage from '../common/BlurImage';
import CustomButton from '../common/CustomButton';
import colors from '../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToWishList,
  removeProductFromWishList,
} from '../redux/Slices/WishListSlice';
import {
  addProductToCart,
  reduceProductFromCart,
  removeProductFromCart,
} from '../redux/Slices/CartSlice';
import constants from '../constants/constants';

const {BackIcon, CartIcon, HeartIcon, SelectedHeartIcon} = Images;
const ProductDetails = props => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {data: wishlistProducts} = useSelector(state => state.wishlist);
  const {data: cartProducts} = useSelector(state => state.cart);
  let {params: {productId} = {}} = route || {};

  const getIsProductWishlist = () => {
    return wishlistProducts.find(({id}) => id === productId);
  };

  const [isWishlist, setIsWishlist] = useState(getIsProductWishlist());
  const navigation = useNavigation();
  const [productDetails, setProductDetails] = useState({});
  const [productQty, setProductQty] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(json => {
        let cartQty = 1;
        cartProducts?.map(prod => {
          if (prod.id === productId) {
            cartQty = prod.qty;
          }
        });
        setProductQty(cartQty);

        setProductDetails(json);
      });
  }, [productId]);

  const addToCart = useCallback(async () => {
    let authStatus = await isUserLoggedIn();
    if (authStatus) {
      dispatch(addProductToCart({...productDetails, qty: productQty}));
    } else {
      Alert.alert('Please Login to continue');
    }
  }, [productDetails, productQty]);

  const onClickLeft = useCallback(() => {
    navigation.goBack();
  }, []);

  const addToWishList = useCallback(
    productDetails => async () => {
      let authStatus = await isUserLoggedIn();
      if (authStatus) {
        setIsWishlist(value => !value);
        if (getIsProductWishlist()) {
          dispatch(removeProductFromWishList(productId));
        } else {
          dispatch(addProductToWishList(productDetails));
        }
      } else {
        Alert.alert('Please Login to Continue');
      }
    },
    [productDetails],
  );
  const increaseProductQty = () => {
    setProductQty(qty => qty + 1);
  };

  const decreaseProductQty = () => {
    let qty = productQty;
    if (qty === 1) {
      return;
    }
    setProductQty(qty => qty - 1);
  };

  const {
    image: productImage,
    title = '',
    description = '',
    price = 0,
  } = productDetails;
  return (
    <View style={styles.container}>
      <Header
        leftIcon={BackIcon}
        rightIcon={CartIcon}
        title="Product Details"
        onClickLeftIcon={onClickLeft}
        onClickRightIcon={navigateToScreen(navigation, constants.Screens.CART)}
      />
      <ScrollView>
        {productImage ? (
          <View style={styles.productImageContainer}>
            <BlurImage
              productImage={productImage}
              productImageStyle={styles.productImageStyle}
              bgImageStyle={styles.bgImageStyle}
            />
            <TouchableOpacity
              style={styles.wishlistBtn}
              onPress={addToWishList(productDetails)}>
              <Image
                source={isWishlist ? SelectedHeartIcon : HeartIcon}
                style={styles.wishlistIcon}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{getFormattedText(title)}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>
              <Text style={styles.priceTag}>Price : </Text>
              <Text style={styles.price}>{price}</Text>
            </Text>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={decreaseProductQty}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={{color: 'black', marginLeft: 10}}>{productQty}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={increaseProductQty}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        bg={colors.theme_color}
        title={'Add To Cart'}
        color={'#fff'}
        onClick={addToCart}
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  productImageStyle: {height: 200, width: '100%', resizeMode: 'contain'},
  detailsContainer: {marginLeft: 20, paddingRight: 20},
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#c1c1c1',
    marginTop: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: 'green',
    marginTop: 5,
  },
  priceTag: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginTop: 5,
  },
  bgImageStyle: {
    height: 220,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageContainer: {alignItems: 'center'},
  wishlistBtn: {
    position: 'absolute',
    left: 15,
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
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
