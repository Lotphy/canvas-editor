import {createSlice} from '@reduxjs/toolkit';

const stageSlice = createSlice({
  name: 'stage',
  initialState: {},
  reducers: {
    setStageElements(state, action) {
      state = {
        ...state,
        elements: action.payload.elements
      }
      return state;
    }
  }
})

export const { setStageElements } = stageSlice.actions;

export const getStageElements = ((state) => state.stage.elements);

export default stageSlice.reducer;
