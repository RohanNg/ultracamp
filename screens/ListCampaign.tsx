import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { CampaignCard } from "../components/CampaignCard";
import { CampaignData, getCampaigns } from "../repositories";
import { theme } from "../styles";

interface Props {}

interface State {
  campaigns: CampaignData[];
}
export class ListCampaignScreen extends React.Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      campaigns: []
    };
  }

  async componentDidMount() {
    const campaigns = await getCampaigns();
    this.setState({ campaigns });
  }

  public render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {this.state.campaigns.map(camp => {
          return (
            <CampaignCard {...camp} key={camp.id}/>
          ) 
        })}
      </ScrollView>
    );
  }
}

ListCampaignScreen.navigationOptions = {
  title: "Campaigns"
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 30,
    marginHorizontal: theme.spacing.atomic
  }
});
