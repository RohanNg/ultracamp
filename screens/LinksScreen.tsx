import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DiscountSettingForm } from '../components/DiscountForm';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <DiscountSettingForm />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Launch product discount',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 15
  },
});
