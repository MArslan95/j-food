import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leader';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; //Provide access to the localstorage to the device
export const ConfigureStore = () => {
    //configuraton for the redux presist store
    const config = {
        key: 'root',
        storage,
        debug: true
    }

    const store = createStore(
        persistCombineReducers(config, {
            dishes, comments, promotions, leaders, favorites
        }),
        applyMiddleware(thunk, logger)
    )
    const persistor = persistStore(store);
    return { persistor, store };
}
