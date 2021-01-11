// import React, { Component } from 'react';
// import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal } from 'react-native';
// import DatePicker from 'react-native-datepicker';
// import { Picker } from '@react-native-community/picker';
// class Reservation extends Component {

//     constructor(props) {
//         super(props);
//         this.setState = {
//             guests: 1,
//             smoking: false,
//             date: '',
//             showModal: false //For the use of  Model we have to define the state of themodel in our class componenet

//         }
//     }

//     static navigationOption = {
//         title: 'Reserve Table'
//     }

//     toggleModel() {
//         this.setState({ showModel: !this.setState.showModal })
//     }
//     handleReservation() {
//         console.log(JSON.stringify(this.state));
//         this.toggleModel();
//     }
//     resetForm() {
//         this.setState({
//             guests: 1,
//             smoking: false,
//             date: ''
//         });
//     }

//     render() {
//         return (
//             <ScrollView >
//                 <View style={styles.formRow}>
//                     <Text style={styles.formLabel}>
//                         Number of Guests
//                     </Text>
//                     <Picker style={styles.formItem} selectedValue={this.state.guests}
//                         onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })} >
//                         <Picker.Item label='1' value='1' />
//                         <Picker.Item label='2' value='2' />
//                         <Picker.Item label='3' value='3' />
//                         <Picker.Item label='4' value='4' />
//                         <Picker.Item label='5' value='5' />
//                         <Picker.Item label='6' value='6' />
//                     </Picker>
//                 </View>
//                 <View style={styles.formRow}>
//                     <Text style={styles.formLabel}>
//                         Smoking/Non Smoking?
//                     </Text>
//                     <Switch style={styles.formItem}
//                         value={this.state.smoking} onTintColor='#512DA8'
//                         onValueChange={(value) => this.setState({ smoking: value })}
//                     >

//                     </Switch>
//                 </View>
//                 <View style={styles.formRow}>
//                     <Text style={styles.formLabel}>
//                         Date and Time
//                     </Text>
//                     <DatePicker
//                         style={{ flex: 2, marginRight: 20 }}
//                         date={this.state.date}
//                         format=''
//                         mode='datetime'
//                         placeholder='select date and time'
//                         minDate='2017-01-01'
//                         confirmBtnText='Confrim'
//                         cancelBtnText='Cancel'
//                         customStyles={{
//                             dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
//                             dateInput: { marginLeft: 36 }
//                         }}
//                         onDateChange={(date) => { this.setState({ date: date }) }}
//                     />
//                 </View>
//                 <View style={styles.formRow}>
//                     <Button
//                         title='Reserve'
//                         color='#512DA8'
//                         onPress={() => this.handleReservation()}
//                         accessibilityLabel='Learn more about purple button'
//                     />
//                 </View>
//                 <Modal animationType={'slide'} transparent={false} visible={this.setState.showModal}
//                     onDismiss={() => { this.toggleModel(); this.resetForm() }}
//                 >
//                     <View style={styles.model}>
//                         <Text style={styles.modelTitle}>
//                             Your Reservation
//                         </Text>
//                         <Text style={styles.modelTitle}>Number Of Guests {this.state.guests} </Text>
//                         <Text style={styles.modelTitle}> Smoking? : {this.state.smoking ? 'Yes' : 'No'} </Text>
//                         <Text style={styles.modelTitle}>Date and Time {this.state.date} </Text>
//                         <Button onPress={() => { this.toggleModel(); this.resetForm() }} color='#512DA8'
//                             title="Close"></Button>
//                     </View>

//                 </Modal>
//             </ScrollView>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     formRow: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         flexDirection: 'row',
//         margin: 20
//     },
//     formLabel: {
//         fontSize: 18,
//         flex: 2
//     },
//     formItem: {
//         flex: 1
//     },
//     model: {
//         justifyContent: 'center',
//         margin: 20
//     },
//     modelTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         backgroundColor: '#512DA8',
//         textAlign: 'center',
//         color: 'white',
//         marginBottom: 20
//     },
//     modelText: {
//         fontSize: 18,
//         margin: 10
//     }
// })
// export default Reservation
import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, Button, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from "@react-native-community/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications } from 'expo';


class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date',
        }
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
            [
                { text: 'Cancel', onPress: () => { this.resetForm() }, style: 'cancel' },
                {
                    text: 'Ok', onPress: () => {
                        this.resetForm()
                        this.presentLocalNotification(this.state.date)
                    }
                }
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date',
            showModal: false
        });
    }
    //Create function to Obtaon the notification    
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }
    //Create Function to present Local Notification
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            //For IOS We generate Sound as well as Android and it allows the vibrate and color
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    render() {
        return (
            <Animatable.View animation="zoomIn" duration={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                    >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({ smoking: value })}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity style={styles.formItem}
                        style={{
                            padding: 7,
                            borderColor: '#512DA8',
                            borderWidth: 2,
                            flexDirection: 'row'
                        }}
                        onPress={() => this.setState({ show: true, mode: 'date' })}
                    >
                        <Icon type='font-awesome' name='calendar' color='#512DA8' />
                        <Text>{' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A')}</Text>
                    </TouchableOpacity>
                    {/* Date Time Picker */}
                    {this.state.show && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            minimumDate={new Date()}
                            minuteInterval={30}
                            onChange={(event, date) => {
                                if (date === undefined) {
                                    this.setState({ show: false });
                                }
                                else {
                                    this.setState({
                                        show: this.state.mode === "time" ? false : true,
                                        mode: "time",
                                        date: new Date(date)
                                    });
                                }
                            }}
                        />
                    )}
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;