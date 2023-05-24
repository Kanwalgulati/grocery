import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import ProductCard from '../../components/ProductCard';
import {useNavigation} from '@react-navigation/native';
import Header from '../../common/Header/Header';
import { navigateToScreen} from '../../common/genericFunctions';
import constants from '../../constants/constants';

const UserLike = () => {
  const {data: products = []} = useSelector(state => state.wishlist);
  const navigation = useNavigation();
  const [wishlistProducts, setWishlistProducts] = useState(products);

  const onClickProduct = useCallback(
    id => () => {
      navigation.navigate('ProductDetails', {productId: id});
    },
    [wishlistProducts],
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
        fromWishlistScreen={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Wishlist'}
        onClickRightIcon={navigateToScreen(navigation,constants.Screens.CART)}
      />
      <FlatList
        data={wishlistProducts}
        renderItem={renderProductCard}
        style={{marginTop: 30}}
      />
    </View>
  );
};

export default UserLike;

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
