import {createSlice} from '@reduxjs/toolkit';

const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    selectedElementId: null,
    uploadedImages: []
  },
  reducers: {
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

export const { storeUploadedImage } = stageSlice.actions;

export const getUploadedImages = ((state) => state.stage.uploadedImages);

export default stageSlice.reducer;
