import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DateTime } from "luxon";
import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button, Text, TextInput } from "react-native-paper";
import { Product } from "../types/product";
import { ProductComponent } from "./Product";
import { ProductMerchantComponent } from "./ProductMerchant";
import { updateProducts } from "../repositories";

interface State {
  startDate?: Date;
  endDate?: Date;
  discountRate: string;
  isDateTimePickerVisible: boolean;
  datePicker: "start" | "end";
}

export class DiscountSettingForm extends React.Component<any, State> {
  state: State = {
    discountRate: "0",
    isDateTimePickerVisible: false,
    datePicker: "start"
  };

  render(): React.ReactNode {
    const { startDate, discountRate, endDate } = this.state;
    const discountedProducts = this.props.discountedProducts || [];
    return (
      <>
        <TextInput
          keyboardType="numeric"
          label="Discount rate (%)"
          mode="outlined"
          value={this.state.discountRate}
          onChangeText={discountRate => this.setState({ discountRate })}
        />
        <Button
          onPress={() => this.showDateTimePicker("start")}
          mode={"outlined"}
          icon={getIcon("calendar")}
          style={[styles.section, { alignItems: "stretch" }]}
        >
          <Text style={[styles.dateLabel, { flex: 1 }]}>
            {startDate
              ? "Discount start on " + format(startDate)
              : "Set start date"}
          </Text>
        </Button>
        <Button
          onPress={() => this.showDateTimePicker("end")}
          mode={"outlined"}
          icon={getIcon("calendar")}
          style={[styles.section, { alignItems: "stretch" }]}
        >
          <Text style={[styles.dateLabel, { flex: 1 }]}>
            {endDate ? "Discount last util " + format(endDate) : "Set end date"}
          </Text>
        </Button>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="datetime"
          minuteInterval={10}
          minimumDate={new Date()}
        />

        {discountedProducts.length > 0 && (
          <ScrollView horizontal={true}>
            {discountedProducts.map((product: Product, index: number) => (
              <View key={index} style={{ width: 200 }}>
                <ProductMerchantComponent
                  selectProduct={() => {}}
                  product={product}
                  selected={false}
                  showButton={false}
                />
              </View>
            ))}
          </ScrollView>
        )}
        <Button
          icon={getIcon("rocket")}
          mode="contained"
          style={styles.lastSection}
          color={"#F27979"}
          onPress={this.submit}
        >
          Launch
        </Button>
      </>
    );
  }

  submit = async () => {
    const products = this.props.discountedProducts || [];
    await updateProducts(products, {
      start: this.state.startDate,
      end: this.state.endDate,
      discountRate: Number(this.state.discountRate)
    });
  };

  showDateTimePicker = (datePicker: "start" | "end") => {
    this.setState({
      isDateTimePickerVisible: true,
      datePicker
    });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState(({ datePicker }) => {
      if (datePicker === "start") {
        return { startDate: date };
      } else {
        return { endDate: date };
      }
    });
    this.hideDateTimePicker();
  };
}

function getIcon(name: string) {
  return ({ color, size }: { color: string; size: number }) => {
    return <MaterialCommunityIcons size={size} color={color} name={name} />;
  };
}

function format(date: Date): string {
  return DateTime.fromJSDate(date).toFormat("LLL dd hh:mm");
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8
  },
  lastSection: {
    marginTop: 32
  },
  dateLabel: { lineHeight: 36, fontSize: 12 }
});
