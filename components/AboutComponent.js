import React, { Component } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

const renderLeader = ({ item, index }) => {
    return (
        <ListItem key={index} >
            <Avatar source={{ uri: baseUrl + item.image }} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

};
const History = () => {
    return (
        <Card>
            <Card.Title style={{
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
                paddingBottom: 10
            }}>
                {'Our History'}
            </Card.Title>
            <Text style={{ margin: 10 }}>
                {`
          Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.

          The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
          `}
            </Text>
        </Card>
    )
}
class About extends Component {
    // componentDidMount() {
    //     // console.log(this.props.navigation);
    // }

    render() {
        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <FlatList
                            data={this.props.leaders.leaders}
                            renderItem={renderLeader}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView>
            );
        }
    }

    // return (
    //     <>
    //         <History />
    //         <Card>
    //             <Card.Title style={{
    //                 borderBottomColor: '#ddd',
    //                 borderBottomWidth: 1,
    //                 paddingBottom: 10
    //             }}>
    //                 {'Corporate Leadership'}
    //             </Card.Title>
    //             {/* <FlatList
    //                 data={this.props.leaders.leaders}
    //                 renderItem={renderLeaders}
    //                 keyExtractor={item => item.id.toString()}
    //                 // image={require('./images/alberto.png')}
    //             /> */}
    //             <FlatList
    //                 data={this.props.leaders.leaders}
    //                 renderItem={renderLeader}
    //                 keyExtractor={item => item.id.toString()}
    //             />
    //         </Card>

    //     </>
    // );
}
export default connect(mapStateToProps)(About);