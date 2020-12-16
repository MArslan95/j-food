// import React, { Component } from 'react';
// import { DISHES } from '../shared/dishes'

// class Dishdetail extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             dishes: DISHES
//         };
//     }

//     static navigationOptions = {
//         title: 'Dish Details'
//     };

//     render() {
//         const dishId = this.props.navigation.getParam('dishId','');
//         return(
//             <RenderDish dish={this.state.dishes[+dishId]} />
//         );
//     }
// }
// export default Dishdetail;
import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';

// function RenderDish(props) {

//     const dish = props.dish;
    
//         if (dish != null) {
//             return(
//                 <Card
//                 featuredTitle={dish.name}
//                 image={require('./images/uthappizza.png')}>
//                     <Text style={{margin: 10}}>
//                         {dish.description}
//                     </Text>
//                 </Card>
//             );
//         }
//         else {
//             return(<View></View>);
//         }
// }

// function Dishdetail(props) {
//     return(<RenderDish dish={props.dish} />);
// }



class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId',null);
        return(
            <RenderDish dish={this.state.dishes[+dishId]} />
        );
    }
}
export default Dishdetail;