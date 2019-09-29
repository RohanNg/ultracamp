import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card, Button, Badge, Image } from "react-native-elements";
import { Product } from "../types/product";
import {SCLAlert,SCLAlertButton} from "react-native-scl-alert"


interface ProductMerchantProps {
  product: Product;
  selected: false;
  showButton: false;
  selectProduct: () => void;
}

interface ProductMerchantState {
  dialogVisible:boolean
}

export class ProductMerchantComponent extends React.Component< ProductMerchantProps,ProductMerchantState> {

  constructor(props) {
    super(props);

    this.state = {
      dialogVisible:false
    };

    const {product,selected,showButton,selectProduct} = props
}

  render(): React.ReactNode {
    const {product,selected,showButton,selectProduct} = this.props

    return (
    <>
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
        <Text style={styles.name}
        onPress={() => {
          this.setState({dialogVisible:true})
        }}
        >
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

    <SCLAlert
          theme="info"
          show={ this.state.dialogVisible}
          title={product.brand}
          subtitle={`${product.price.toString()} $`} 
          onRequestClose={() => {}}
          headerIconComponent={<Image
            source={{ uri: product.imgURL }}
            style={{ width: "200%", height: 150, borderRadius: 0.5 ,paddingLeft: 200 }}
          />}
        >
          <SCLAlertButton theme="inverse" onPress={() => {
            this.setState({dialogVisible:false})
          }}>Close</SCLAlertButton>
    </SCLAlert>
    

    </>

    )
  }
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
