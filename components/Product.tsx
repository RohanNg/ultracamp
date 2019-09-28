import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card, Button, Badge, Image } from "react-native-elements";
import { Product } from "../types/product";

interface ProductProps {
  product: Product;
}
export function ProductComponent(props: ProductProps) {
  const { product } = props;

  return (
    <Card
      containerStyle={{
        padding: 0,
        margin: 10,
        elevation: 0,
        backgroundColor: "#fff"
      }}
    >
      <Image
        source={{ uri: product.imgURL }}
        style={{ width: "100%", height: 150 }}
      />
      <View style={{ paddingLeft: 10 }}>
        <Text style={styles.name}>{product.name}</Text>
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
