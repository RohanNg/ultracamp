import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card, Button, Badge, Image } from "react-native-elements";
import { Product } from "../types/product";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

interface ProductMerchantProps {
  product: Product;
  selected: false;
  showButton: false;
  selectProduct: () => void;
}
export function ProductMerchantComponent(props: ProductMerchantProps) {
  const { product, selected, selectProduct, showButton } = props;
  let scaleAnimationDialog, defaultAnimationDialog,slideAnimationDialog = false;

  return (
    <View>
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
        <Text style={styles.name} onPress={() => {
            scaleAnimationDialog = true
        }}>
          {product.name}@{product.brand}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[styles.price, styles.silver]}>RRP</Text>
          <Text style={[styles.price, styles.silver]}>{product.price} $</Text>
        </View>
      </View>

      {showButton && (
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
      )}
    </Card>
    
    <Dialog style={dialogStyle.container}>
      onTouchOutside={() => {
        scaleAnimationDialog = false 
      }}
      width={0.9}
      visible={true}
      dialogAnimation={new ScaleAnimation()}
      onHardwareBackPress={() => {
        scaleAnimationDialog= false 
        return true;
      }}
      dialogTitle={
        <DialogTitle
          title={product.name}
          hasTitleBar={false}
        />
      }
      actions={[
        <DialogButton
          text="DISMISS"
          onPress={() => {
            scaleAnimationDialog= false 
          }}
          key="button-1"
        />,
      ]}>
      <DialogContent>
      <Image
      source={{ uri: product.imgURL }}
      style={{ width: 200, height: 200 ,alignItems: 'center' }}
      />
        <View style={dialogStyle.container}>
          <Text>
            {product.brand}
          </Text>
          <Button
            title="Close"
            onPress={() => {
              scaleAnimationDialog= false 
            }}
            key="button-1"
          />
        </View>
      </DialogContent>
    </Dialog>
   </View>
    
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


const dialogStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
