import { createSlice } from "@reduxjs/toolkit";

const dynamicForm = createSlice({
  name: "dynamicForm",
  initialState: {
    schemas: undefined,
  },
  reducers: {
    setSchemas(state, { payload }) {
      state.schemas = payload;
      console.log(state, state.schemas)
      return state;
    }
  },
});

export const { setSchemas } = dynamicForm.actions;

export default dynamicForm.reducer;
