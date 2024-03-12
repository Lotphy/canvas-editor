import { configureStore } from '@reduxjs/toolkit';
import stageReducer from './stage.reducer';

const store = configureStore({
  reducer: {
    stage: stageReducer,
  }
})

export default store
