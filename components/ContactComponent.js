import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    title: 'Contact'
  };
  // componentDidMount(){
  //   console.log(this.props.navigation);
  // }
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card>

          <Card.Title style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            paddingBottom: 10
          }}>
            {'Contact Information'}
          </Card.Title>
          <Text style={{ margin: 10 }}>
            121, Clear Water Bay Road
            Clear Water Bay, Kowloon
            HONG KONG
            Tel: +852 1234 5678
            Fax: +852 8765 4321
            Email:confusion@food.net
                  </Text>
        </Card>
      </Animatable.View>
    );
  }
}
export default Contact;