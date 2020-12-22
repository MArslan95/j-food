import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Icon} from 'react-native-elements';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MenuNavigator = ()=>{
  return(
    <Stack.Navigator  >
      <Stack.Screen name="Menu" component={Menu}
       options={{
        headerStyle: {
          backgroundColor: '#512DA8',
        },headerTintColor: '#fff',
           headerLeft:<Icon name="menu" size={24} color='white' onPress={()=> navigation.toogleDrawer()}/>
        // 
      }} />
      <Stack.Screen name="Dishdetail" component={Dishdetail} />
    </Stack.Navigator>
  )

}
const ContactUs = ()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Contact " component={Contact}
        options={{
          headerStyle: {
            backgroundColor: '#512DA8',
          },headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}
const AboutUs = ()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="About Us" component={About}
        options={{
          headerStyle: {
            backgroundColor: '#512DA8',
          }, headerTintColor: '#fff',
          
        }}
      />
    </Stack.Navigator>
  )
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish:null
    };
  }
  onDishSelect(dishId) {
      this.setState({selectedDish: dishId})
  }

  render() {

    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="About Us" component={AboutUs} />
          <Drawer.Screen name="Menu" component={MenuNavigator} />
          <Drawer.Screen name="Contact Us" component={ContactUs} />
        </Drawer.Navigator>

      </NavigationContainer>
       </View>
    );
  }
}

export default Main;


