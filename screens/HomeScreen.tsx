import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import { ProductComponent } from "../components/Product";
import { ProductItemData, getDiscountedProducts } from "../repositories";
import { Product } from "../types/product";
import { Button } from "react-native-elements";
import { ProductMerchantComponent } from "../components/ProductMerchant";
import { Button as PaperButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Item } from "react-native-paper/typings/components/Drawer";

interface HomeScreenProps {
  navigation: any;
}

interface HomeScreenState {
  products: { product: Product; selected: boolean }[];
}
export default class HomeScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      products: []
    };
    this.genererateProductsView = this.genererateProductsView.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.submitProducts = this.submitProducts.bind(this);
  }

  async componentDidMount() {
    const products = await getDiscountedProducts();
    this.setState({
      products: products.map((productItemData: ProductItemData) => {
        return {
          product: {
            name: productItemData.name,
            imgURL: productItemData.imgURL,
            discountRate: productItemData.discount.discountRate,
            price: productItemData.price,
            brand: productItemData.brand
          },
          selected: false
        };
      })
    });
  }

  selectProduct(index: number) {
    const products = this.state.products;
    products[index].selected = !products[index].selected;
    this.setState({ products: products });
  }

  submitProducts() {
    const selectedProducts = this.state.products
      .filter((item: any) => item.selected)
      .map((item: any) => item.product);
    this.props.navigation.navigate("Links", {
      products: JSON.stringify(selectedProducts)
    });
  }
  genererateProductsView() {
    const products = this.state.products;

    let productViews = [];
    for (let i = 0; i < products.length; i = i + 2) {
      productViews.push(
        <View key={i} style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <ProductMerchantComponent
              selectProduct={() => this.selectProduct(i)}
              product={products[i].product}
              selected={products[i].selected}
              showButton={true}
            />
          </View>
          {products[i + 1] ? (
            <View style={{ flex: 1 }}>
              <ProductMerchantComponent
                selectProduct={() => this.selectProduct(i + 1)}
                product={products[i + 1].product}
                selected={products[i + 1].selected}
                showButton={true}
              />
            </View>
          ) : (
            <View style={{ flex: 1 }}></View>
          )}
        </View>
      );
    }
    return productViews;
  }

  getIcon(name: string) {
    return ({ color, size }: { color: string; size: number }) => {
      return <MaterialCommunityIcons size={size} color={color} name={name} />;
    };
  }

  public render() {
    const productComponents = this.genererateProductsView();
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {productComponents}
        </ScrollView>

        <PaperButton
          icon={this.getIcon("rocket")}
          mode="contained"
          style={styles.lastSection}
          color={"#F27979"}
          onPress={this.submitProducts}
          disabled={
            this.state.products.filter((item: any) => item.selected).length <= 0
          }
        >
          Launch
        </PaperButton>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: "Home"
};

const styles = StyleSheet.create({
  lastSection: {
    marginTop: 32
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  selected: {
    backgroundColor: "red"
  }
});
