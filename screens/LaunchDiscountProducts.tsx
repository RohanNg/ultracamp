import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { DiscountSettingForm } from "../components/DiscountForm";

export function LaunchDiscountProducts(props: any) {
  const discountedProducts = props.navigation.getParam("products")
    ? JSON.parse(props.navigation.getParam("products"))
    : [];

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <DiscountSettingForm discountedProducts={discountedProducts} />
    </ScrollView>
  );
}

LaunchDiscountProducts.navigationOptions = {
  title: "Launch product discount"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 15
  }
});
