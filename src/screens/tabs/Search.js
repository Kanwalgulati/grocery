import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header/Header';
import Images from '../../images/images';
import {TextInput} from 'react-native-gesture-handler';
import ProductCard from '../../components/ProductCard';
import {useNavigation} from '@react-navigation/native';
import {  navigateToScreen } from '../../common/genericFunctions';
import constants from '../../constants/constants';
const {SearchIcon, CrossIcon} = Images;
const Search = () => {
  const {products} = useSelector(state => state);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [allProducts, setAllProducts] = useState(products.data);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const updateFilterProducts = useCallback(
    txt => {
      let filteredData = products.data?.filter(product =>
        product.title.toLowerCase().match(txt?.toLowerCase()),
      );
      setFilteredProducts(filteredData);
    },
    [searchText],
  );
  const changeSearchText = txt => search => {
    let updatedText = !!txt ? '' : search;
    updateFilterProducts(updatedText);
    setSearchText(updatedText);
  };
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
        title={'Search Items'}
        onClickRightIcon={navigateToScreen(navigation,constants.Screens.CART)}
      />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.searchIcon} source={SearchIcon} />
          <TextInput
            placeholder="Search Items Here"
            style={styles.inputBox}
            value={searchText}
            onChangeText={changeSearchText()}
          />
        </View>
        {!!searchText ? (
          <TouchableOpacity
            style={[
              styles.searchIcon,
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={changeSearchText('clearSearch')}>
            <Image
              source={CrossIcon}
              style={[styles.searchIcon, {width: 16, height: 16}]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        style={{marginTop: 30}}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  searchIcon: {width: 24, height: 24, resizeMode: 'center'},
  inputBox: {
    width: '80%',
    marginLeft: 10,
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
