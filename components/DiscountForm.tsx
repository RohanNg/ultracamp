import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button, Text, TextInput } from 'react-native-paper';

interface State {
    startDate?: Date,
    endDate?: Date,
    discountRate: string,
    isDateTimePickerVisible: boolean,
    datePicker: 'start' | 'end'
}

export class DiscountSettingForm extends React.Component<any, State> {
    state: State = {
        discountRate: '0',
        isDateTimePickerVisible: false,
        datePicker: 'start'
    }
    render(): React.ReactNode {
        const { startDate, discountRate, endDate } = this.state;
        return (
            <>
                <TextInput
                    keyboardType='numeric'
                    label='Discount rate (%)'
                    mode='outlined'
                    value={this.state.discountRate}
                    onChangeText={discountRate => this.setState({ discountRate })}
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
                >
                    Launch
                </Button>
            </>
        )
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
    section: {
        marginTop: 8,
    },
    lastSection: {
        marginTop: 32,
    },
    dateLabel: { lineHeight: 36, fontSize: 12 }
});