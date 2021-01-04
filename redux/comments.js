// import * as ActionTypes from './ActionTypes';
// export const comments = (state = {

//     errMess: null,
//     comments: []
// }, action) => {
//     switch (action.type) {
//         case ActionTypes.ADD_COMMENTS:
//             return { ...state, errMess: null, comments: action.payload }
//         case ActionTypes.COMMENTS_FAILED:
//             return { ...state, errMess: action.payload, comments: [] }
//         default:
//             return state;
//     }
// }

import * as ActionTypes from './ActionTypes';

export const comments = (state = {
    errorMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            // We calculate the new ID based on the ID of the last element on the comments array
            let commentsLength = state.comments.length;
            let newId = commentsLength === 0 ? 1 : state.comments[commentsLength - 1]["id"] + 1

            // Then, we assign the new ID to the payload obtained from the action
            // and concat the new comment to the state.comments array
            let newComment = Object.assign(action.payload, { id: newId });

            return { ...state, errorMessage: null, comments: state.comments.concat([newComment]) };
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errorMessage: null, comments: action.payload };
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errorMessage: action.payload, comments: [] };
        default:
            return state;
    };
};