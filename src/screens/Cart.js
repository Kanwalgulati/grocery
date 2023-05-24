import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';
import Header from '../common/Header/Header';
import Images from '../images/images';

const {BackIcon} = Images;

const Cart = ({route, navigation}) => {
  const {data: products = []} = useSelector(state => state.cart);
  //   const navigation = useNavigation();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts(products);
  }, [products]);

  const onClickProduct = useCallback(
    id => () => {
      navigation.navigate('ProductDetails', {productId: id});
    },
    [cartProducts],
  );

  const renderProductCard = ({item, index}) => {
    return (
      <ProductCard
        product={item}
        onClick={onClickProduct}
        style={{
          productCardContainer: styles.productItem,
          productImage: styles.itemImage,
          productDetailsContainer: styles.productDetailsContainer,
          productTitle: styles.title,
          productDescription: styles.description,
          productPrice: styles.price,
          bgImageStyle: styles.bgImageStyle,
        }}
        showQty={true}
        index={index}
      />
    );
  };

  const onClickLeft = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={'Cart'}
        screen="Cart"
        onClickLeftIcon={onClickLeft}
        leftIcon={BackIcon}
      />
      <FlatList
        data={cartProducts}
        renderItem={renderProductCard}
        style={{marginTop: 30}}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: '#fff',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 40,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  productDetailsContainer: {
    paddingLeft: 20,
    paddingRight: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: '#c1c1c1',
  },
  price: {
    color: 'green',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 5,
  },
  bgImageStyle: {
    marginHorizontal: 5,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
