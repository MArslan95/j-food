import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Button, Modal } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators'

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

    if (dish != null) {
        return (
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
            </Card>
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
        <Card title="Comments">
            <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
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