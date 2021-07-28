import { createStore } from '@reduxjs/toolkit';
import reducer from "../reducers/reducer";
import { devToolsEnhancer } from 'redux-devtools-extension';

 export const store = createStore(reducer, devToolsEnhancer(
   // applyMiddleware(...middleware),
   // other store enhancers if any
 ));
