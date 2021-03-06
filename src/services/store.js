import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import store2 from 'store2';

export default initialState => {
  let initialStateData = store2.session.get('state') || initialState;
  initialState = initialStateData;
  const middleware = [thunk];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
      /* window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() */
    )
  );

  store.subscribe(() => {
    const state = store.getState();
    const persist = {
      cart: state.cart,
      total: state.total
    };
    store2.session.set('state', persist);
  });

  return store;
};
