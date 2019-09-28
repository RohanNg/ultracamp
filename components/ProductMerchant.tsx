import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card, Button, Badge, Image } from "react-native-elements";
import { Product } from "../types/product";

interface ProductMerchantProps {
  product: Product;
  selected: false;
  selectProduct: () => void;
}
export function ProductMerchantComponent(props: ProductMerchantProps) {
  const { product, selected, selectProduct } = props;

  return (
    <Card
      containerStyle={{
        padding: 0,
        margin: 10,
        elevation: 0,
        backgroundColor: "#fff",
        borderRadius: 10
      }}
    >
      <Image
        source={{ uri: product.imgURL }}
        style={{ width: "100%", height: 150, borderRadius: 10 }}
      />
      <View style={{ paddingLeft: 10 }}>
        <Text style={styles.name}>
          {product.name}@{product.brand}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[styles.price, styles.silver]}>RRP</Text>
          <Text style={[styles.price, styles.lineThrough, styles.silver]}>
            {product.price} $
          </Text>
          <Text style={[styles.price, styles.discount]}>
            {(product.price * (100 - product.discountRate)) / 100} $
          </Text>
        </View>
      </View>

      <Button
        buttonStyle={[
          {
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: "#F27979",
            opacity: selected ? 1 : 0.7
          }
        ]}
        onPress={selectProduct}
        titleStyle={{ fontSize: 12 }}
        title={selected ? "Selected" : "Select"}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  discountBadge: {
    width: 60,
    height: 30
  },
  name: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 12,
    textAlign: "center"
  },
  price: {
    fontSize: 12,
    marginBottom: 10
  },
  lineThrough: {
    textDecorationLine: "line-through"
  },
  discount: {
    color: "red"
  },
  silver: {
    color: "#C0C0C0",
    marginRight: 5
  }
});
