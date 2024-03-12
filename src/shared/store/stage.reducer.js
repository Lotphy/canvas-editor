import {createSlice} from '@reduxjs/toolkit';

const stageSlice = createSlice({
  name: 'stage',
  initialState: {},
  reducers: {
    setChildren(state, action) {
      state = {
        ...state,
        children: action.payload.elements
      }
      return state;
    }
  }
})

export const { setChildren } = stageSlice.actions;

export const getChildren = ((state) => state.stage.children);

export default stageSlice.reducer;
