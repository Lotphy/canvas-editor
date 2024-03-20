import {createSlice} from '@reduxjs/toolkit';

const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    elements: [],
    drawableZone: {},
    uploadedImages: []
  },
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

export const { setStageElements, setDrawableZone, storeUploadedImage } = stageSlice.actions;

export const getStageElements = ((state) => state.stage.elements);
export const getDrawableZone = ((state) => state.stage.drawableZone);
export const getUploadedImages = ((state) => state.stage.uploadedImages);

export default stageSlice.reducer;
