import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

// Imports: Redux Root Reducer

// Imports: Redux Root Saga
import { rootSaga } from './saga';
import RootReducer from './state';

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = configureStore({
  reducer: RootReducer,
  middleware: [sagaMiddleware],
});

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export { store };