import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/RootReducer';
import Game from './components/Game';

const middleWare = applyMiddleware(ReduxThunk);

const store = createStore(reducers, compose(
    middleWare
));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Game />
            </Provider>
        );
    }
}

export default App;
