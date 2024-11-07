import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import adminReducer from './reducers/adminReducer';
import customerReducer from './reducers/customerReducer';


const store = configureStore({
  reducer: {
    customer: customerReducer,
    admin: adminReducer,
  },
}, composeWithDevTools());

export default store;