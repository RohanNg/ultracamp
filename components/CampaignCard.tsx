import * as WebBrowser from 'expo-web-browser';
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title } from "react-native-paper";
import { CampaignData } from "../repositories";


export function CampaignCard({ campaignURL, id, end, imgURL, start, title, brand }: CampaignData) {
  const handlePressButtonAsync = async () => {
    console.info('opening browers')
    try {
      const result = await WebBrowser.openBrowserAsync(campaignURL);
      console.info(result)
    } catch (e) {
      console.error(e)
    }
    
  };

  return (
    <Card style={styles.surface}>
      <Card.Cover source={{ uri: imgURL }} />
      <Card.Content>
        <Title>{brand}: {title}</Title>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  surface: {
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  }
})
