import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../common/Header/Header';
import Images from '../../images/images';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import {useDispatch} from 'react-redux';
import {addProducts} from '../../redux/Slices/ProductSlice';
import {navigateToScreen} from '../../common/genericFunctions';
import constants from '../../constants/constants';

const {MenuIcon, CartIcon} = Images;

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const getProducts = useCallback(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        json?.map(_ => (_.qty = 1));
        setProducts(json);
        dispatch(addProducts(json));
      });
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const onClickLeft = useCallback(() => {
    navigation.openDrawer();
  }, []);

  const onClickProduct = useCallback(
    id => () => {
      navigation.navigate('ProductDetails', {productId: id});
    },
    [products],
  );
  const renderProductCard = ({item}) => {
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
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={MenuIcon}
        rightIcon={CartIcon}
        title="Grocery App"
        onClickLeftIcon={onClickLeft}
        onClickRightIcon={navigateToScreen(navigation, constants.Screens.CART, {
          screen: 'Home',
        })}
      />
      <FlatList data={products} renderItem={renderProductCard} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
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
