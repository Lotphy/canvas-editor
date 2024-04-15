import {createSlice} from '@reduxjs/toolkit';

const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    elements: [],
    selectedElementId: null,
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
    addElement(state, action) {
      state = {
        ...state,
        elements: [...state.elements, action.payload.element]
      }
      return state;
    },
    cloneElementAtIndex(state, action) {
      const clone = {
        ...state.elements[action.payload.index],
        ...action.payload.cloneData
      };
      const elemsCopy = Array.from(state.elements);
      elemsCopy.splice(action.payload.index + 1, 0, clone);
      state = {
        ...state,
        elements: elemsCopy
      }
      return state;
    },
    updateElement(state, action) {
      const elemToUpdate = action.payload.element;
      const newElems = state.elements.map(elem => {
        if (elem.id === elemToUpdate.id) {
          return elemToUpdate;
        }
        return elem;
      });
      state = {
        ...state,
        elements: newElems
      }
      return state;
    },
    deleteElement(state, action) {
      const elemCopy = Array.from(state.elements.filter((elem) => elem.id !== action.payload.id));
      state = {
        ...state,
        elements: elemCopy
      }
      return state;
    },
    setSelectedElementId(state, action) {
      state = {
        ...state,
        elements: state.elements.filter((elem) => elem.id !== action.payload.id)
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

export const { setStageElements, addElement, cloneElementAtIndex, updateElement, deleteElement, setDrawableZone, storeUploadedImage } = stageSlice.actions;

export const getStageElements = ((state) => state.stage.elements);
export const getDrawableZone = ((state) => state.stage.drawableZone);
export const getUploadedImages = ((state) => state.stage.uploadedImages);

export default stageSlice.reducer;
