import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CampaignForm } from '../components/CampaignForm';

export function LaunchCampaign() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <CampaignForm />
    </ScrollView>
  );
}

LaunchCampaign.navigationOptions = {
  title: 'Launch promotion campaign',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 15
  },
});
