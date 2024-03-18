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
    },
    setDrawableZone(state, action) {
      state = {
        ...state,
        drawableZone: action.payload.drawableZone
      }
      return state;
    }
  }
})

export const { setStageElements, setDrawableZone } = stageSlice.actions;

export const getStageElements = ((state) => state.stage.elements);
export const getDrawableZone = ((state) => state.stage.drawableZone);

export default stageSlice.reducer;
