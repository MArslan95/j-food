import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Button, Modal, Alert, PanResponder,Share } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorite: state.favorite
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;
    handleViewRef = ref => this.view = ref;
    //Create a funcgion which recevie the parameter to swipe the left and right guesture
    //contain different 4 properties to recoginze the gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    //Create function to drag for Comment
    const recognizeComment = ({ moveX, moveY, dx, dy}) => {
        if (dx > 200)
            return true;
        else
            return false;
    }

    //create another function name as panResponder which receive different callbacks  functions
    const panResonder = PanResponder.create({
       //first callback Function when the user gesture begin on the screen setup a,
       // fucntion which return to indeicate this pan responder to that gesture and receive a evvetn and gesture state
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        //2nd Callabck will be called when the pan responder start recognainzing and it is granted the geture to the screen
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        //3rd Call back envoke when thhe user finish the gesture
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            
            else (recognizeComment(gestureState)) 
                props.toggleModal();
            

            return true;
        }
    });

    //Share Dish Function here it contain 3 parameter title message url
    const shareDish=(title,message,url)=>{
       //here  Share api contain JS object as parameter
         Share.share({
             title:title,
             message:title+':'+ message+''+url,
            url:url        
         },{
            //ot take one more parameter that take dialog that popup there
            dialogTitle:'Share'+ title 
         }
         )
    }
    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={this.handleViewRef}
            {...panResonder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <Icon raised
                        reverse name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome' color='#f50'
                        onPress={() => props.favorite ? console.log("Already favorite") : props.onPress()}
                    />
                    <Icon
                        color='#512DA8'
                        name={'pencil'}
                        onPress={() => props.onPressComment()}
                        raised
                        reverse
                        type='font-awesome'
                    />
                    <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            //onPress finction contain 3 parameter name descripton and image
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                     />
                            
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    // const renderCommentItem = ({ item, index }) => {
    //     return (
    //         <View key={index} style={{ margin: 10 }}>
    //             <Text style={{ fontSize: 14 }}>
    //                 {item.comment}
    //             </Text>
    //             <Text style={{ fontSize: 12 }}>
    //                 {item.rating} Stars
    //             </Text>
    //             <Text style={{ fontSize: 12 }}>
    //                 {'--' + item.author + ', ' + item.date}
    //             </Text>
    //         </View>
    //     )
    // }
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }} >
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    readonly={true}
                    style={{ alignItems: 'left', marginTop: 4, marginBottom: 4 }}
                />
                <Text style={{ fontSize: 12 }}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        );
    };
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    )
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    };

    //This Function save the favorite dish id into the array we created name as favorite  
    markFavorite(dishId) {
        // this.setState({ favorites: this.state.favorites.concat(dishId) })
        this.props.postFavorite(dishId);
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    };

    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
        this.resetForm();
    };
    resetForm() {
        this.setState({
            rating: 1,
            author: '',
            comment: ''
        });
    };


    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    //some,filter is a javascript array operation  
                    // favorite={this.state.favorites.some(el => el === dishId)}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={this.markFavorite(dishId)}
                    onPressComment={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                >
                    <View>
                        <Rating
                            startingValue={1}
                            showRating
                            onFinishRating={(value) => this.setState({ rating: value })}
                            minValue={1}
                            fractions={0}
                            style={{ marginTop: 40 }}
                        />
                    </View>

                    <View>
                        <Input
                            placeholder={'Author'}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={(author) => this.setState({ author: author })}
                            value={this.state.author}
                        />
                    </View>

                    <View>
                        <Input
                            placeholder={'Comment'}
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={(comment) => this.setState({ comment: comment })}
                            value={this.state.comment}
                        />
                    </View>

                    <View>
                        <Button
                            title='Submit'
                            color='#512DA8'
                            onPress={() => this.handleComment(dishId)}
                            accessibilityLabel='Learn more about this purple button'
                        />
                    </View>

                    <View>
                        <Button
                            title='Cancel'
                            color='#555'
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            accessibilityLabel='Learn more about this gray button'
                        />
                    </View>
                </Modal>

            </ScrollView>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);