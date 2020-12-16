// import React, { Component } from 'react';
// import Home from './HomeComponent';
// import Menu from './MenuComponent';
// import { View, Platform } from 'react-native';
// import { createStackNavigator,createDrawerNavigator } from 'react-navigation';


// class Main extends Component {

//   render() {
//     const MenuNavigator = createStackNavigator({
//       Menu: { screen: Menu },
//       Dishdetail: { screen: Dishdetail }
//     },
//       {
//         initialRouteName: 'Menu',
//         navigationOptions: {
//           headerStyle: {
//             backgroundColor: "#512DA8"
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             color: "#fff"
//           }
//         }
//       }
//     );
//     const HomeNavigator=createStackNavigator({
//       Home: { screen: Home },
//     },
//       {
      
//         navigationOptions: {
//           headerStyle: {
//             backgroundColor: "#512DA8"
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             color: "#fff"
//           }
//         }
//       }
//     );

//     const MainNavigator=createDrawerNavigator({
//       Home:{
//         screen:HomeNavigator,
//         navigationOptions:{
//           title:'Home',
//           drawerLabel:'Home'
//         }
//       },
//       Menu:{
//         screen:MenuNavigator,
//         navigationOptions:{
//           title:'Menu ',
//           drawerLabel:'Menu'
//         }
//       }
//     },{
//       drawerBackgroundColor:'#D1C4E9'
//     });
//     return (
//       // <View style={{flex:1}}>
//       //     <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
//       //     <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
//       // </View>
//       // <Menu dishes={this.state.dishes} />
//       <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
//         <MainNavigator />
//       </View>
//     );
//   }
// }

// export default Main;


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



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MenuNavigator = ()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={Menu} />
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