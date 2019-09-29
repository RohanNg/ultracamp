import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button, Dialog, Paragraph, Portal, Text, TextInput } from 'react-native-paper';
import * as uuid from 'uuid';
import { saveCampaign } from '../repositories';
import { uploadImage } from '../services';
import { pickImage } from '../utils';

interface State {
    startDate?: Date,
    endDate?: Date,
    isDateTimePickerVisible: boolean,
    datePicker: 'start' | 'end',
    coverImage?: string,
    destinationURL: string,
    campaignName: string,
    brand: string,
    dialogVisible: boolean
}

export class CampaignForm extends React.Component<any, State> {
    
    state: State = {
        isDateTimePickerVisible: false,
        datePicker: 'start',
        destinationURL: '',
        campaignName: '',
        dialogVisible: false,
        brand: ''
    }
    render(): React.ReactNode {
        const productCampaigns = this.props.campaignProducts || [];
        const { startDate, endDate, coverImage, campaignName, destinationURL } = this.state;
        return (
            <>
                <TouchableOpacity onPress={this.pickActivityImage}>
                <Image
                style={[
                    styles.backgroundImage
                ]}
                source={coverImage
                    ? { uri: coverImage }
                    : require('../assets/images/upload_activity_image.png')}
            />
                </TouchableOpacity>
                <TextInput
                    keyboardType='default'
                    label='Brand'
                    mode='outlined'
                    value={campaignName}
                    onChangeText={brand => this.setState({ brand })}
                    style={styles.section}
                />
                <TextInput
                    keyboardType='default'
                    label='Campaign name'
                    mode='outlined'
                    value={campaignName}
                    onChangeText={campaignName => this.setState({ campaignName })}
                    style={styles.section}
                />
                <TextInput
                    keyboardType='default'
                    label='Campaign destination'
                    mode='outlined'
                    value={destinationURL}
                    onChangeText={destinationURL => this.setState({ destinationURL })}
                    style={styles.section}
                />
                <Button
                    onPress={() => this.showDateTimePicker('start')}
                    mode={'outlined'}
                    icon={getIcon('calendar')}
                    style={[styles.section, { alignItems: 'stretch' }]}
                >
                    <Text style={[styles.dateLabel, { flex: 1 }]}>{startDate ? 'Discount start on ' + format(startDate) : 'Set start date'}</Text>
                </Button>
                <Button
                    onPress={() => this.showDateTimePicker('end')}
                    mode={'outlined'}
                    icon={getIcon('calendar')}
                    style={[styles.section, { alignItems: 'stretch' }]}
                >
                    <Text style={[styles.dateLabel, { flex: 1 }]}>{endDate ? 'Discount last util ' + format(endDate) : 'Set end date'}</Text>
                </Button>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode='datetime'
                    minuteInterval={10}
                    minimumDate={new Date()}
                />
                <Button 
                    icon={getIcon('rocket')} 
                    mode='contained'
                    style={styles.lastSection}
                    color={'#F27979'}
                    
                    onPress={this.createCampaign}
                >
                    Launch
                </Button>
                <Portal>
                    <Dialog
                        visible={this.state.dialogVisible}
                        onDismiss={this.hideDialog}>
                        <Dialog.Title>Congrats!</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Campaign was successfully created</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={this.hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </>
        )
    }

    showDialog = () => this.setState({ dialogVisible: true });

    hideDialog = () => this.setState({ dialogVisible: false });

    createCampaign = async () => {

        const { endDate, startDate, campaignName, coverImage, destinationURL, brand } = this.state;
        // const uploadedImgURL = await uploadImage(coverImage)
        const productCampaigns = this.props.campaignProducts || [];
        
        await saveCampaign({
            id: uuid.v4(),
            campaignURL: destinationURL,
            end: endDate.toISOString(),
            start: startDate.toISOString(), 
            imgURL: "https://cdn.24h.com.vn/upload/4-2018/images/2018-11-16/1542366931-31-lam-gi-de-mua-duoc-gia-hoi-ngay-black-friday-black-friday-gaming-pc-1541290602-width660height399.jpg",
            title: campaignName,
            brand,
            products:productCampaigns
        })
        this.showDialog()
        // this.props.navigation.navigate("ListCampaign");
    }

   
    isFormValid = (): boolean => {
        const { endDate, startDate, campaignName, coverImage, destinationURL, brand } = this.state;
        return typeof endDate === 'object' && typeof startDate === 'object' && campaignName  && brand && !!destinationURL 
    }
    
    showDateTimePicker = (datePicker: 'start' | 'end') => {
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
        this.setState(({datePicker}) => { 
            if (datePicker === 'start') {
                return { startDate: date}
            } else {
                return { endDate: date }
            }
        })
        this.hideDateTimePicker();
    };
    
    private pickActivityImage = async () => {
        const result = await pickImage()
    
        if (!result.cancelled) {
          this.setState({ coverImage: result.uri })
        }
    }
}

function getIcon(name: string) {
    return ({ color, size }: { color: string; size: number }) => {
        return <MaterialCommunityIcons size={size} color={color} name={name} />
    }
}
  

function format(date: Date): string {
    return DateTime.fromJSDate(date).toFormat('LLL dd hh:mm')
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 8,
        paddingBottom: 64,
    },
    section: {
        marginTop: 8,
    },
    lastSection: {
        marginTop: 32,
    },
    dateLabel: { lineHeight: 36, fontSize: 12 },
    backgroundImage: {
        width: undefined,
        height: 220,
        resizeMode: 'cover',
        borderRadius: 4,
        borderWidth: 0
      },
});
