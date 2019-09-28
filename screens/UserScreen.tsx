import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { ProductComponent } from "../components/Product";
import { getDiscountedProducts, ProductItemData } from "../repositories";
import { Product } from "../types/product";

interface UserScreenProps {}

interface UserScreenState {
  products: ProductItemData[];
}
export default class UserScreen extends React.Component<
  UserScreenProps,
  UserScreenState
> {
  constructor(props: UserScreenProps) {
    super(props);
    this.state = {
      products: []
    };
    this.genererateProductsView = this.genererateProductsView.bind(this);
  }

  async componentDidMount() {
    const products = await getDiscountedProducts();
    this.setState({ products: products });
  }

  genererateProductsView() {
    const products: Product[] = this.state.products.map(
      (productItemData: ProductItemData) => {
        return {
          id: productItemData.id,
          name: productItemData.name,
          imgURL: productItemData.imgURL,
          discountRate: productItemData.discount.discountRate,
          price: productItemData.price,
          brand: productItemData.brand
        };
      }
    );

    let productViews = [];
    for (let i = 0; i < products.length; i = i + 2) {
      productViews.push(
        <View key={i} style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <ProductComponent product={products[i]} />
          </View>
          {products[i + 1] ? (
            <View style={{ flex: 1 }}>
              <ProductComponent product={products[i + 1]} />
            </View>
          ) : (
            <View style={{ flex: 1 }}></View>
          )}
        </View>
      );
    }
    return productViews;
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
      </View>
    );
  }
}

UserScreen.navigationOptions = {
  title: "User"
};

const styles = StyleSheet.create({
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
  }
});
