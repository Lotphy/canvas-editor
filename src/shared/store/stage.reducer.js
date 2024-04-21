import {createSlice} from '@reduxjs/toolkit';

const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    elements: [],
    selectedElementId: null,
    drawableZone: {
      x: 0,
      y: 0
    },
    uploadedImages: []
  },
  reducers: {
    setDrawableZone(state, action) {
      state = {
        ...state,
        drawableZone: action.payload.drawableZone
      }
      return state;
    },
    storeUploadedImage(state, action) {
      state= {
        ...state,
        uploadedImages: [...state.uploadedImages, {
          id: action.payload.id,
          data: action.payload.data
        }]
      }
      return state;
    }
  }
})

export const { setDrawableZone, storeUploadedImage } = stageSlice.actions;

export const getStageElements = ((state) => state.stage.elements);
export const getDrawableZone = ((state) => state.stage.drawableZone);
export const getUploadedImages = ((state) => state.stage.uploadedImages);

export default stageSlice.reducer;
