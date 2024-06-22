import {createSlice} from '@reduxjs/toolkit';
const initialState ={
    taskDetails : null,
    taskStatus : null,
    documents : null
}
export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action)=> {
      state.taskDetails = action.payload.taskTitle;
      state.taskStatus = action.payload.taskStatus;
      state.documents = action.payload.documents;
    },
    removeTask: (state)=>  {
      state.taskDetails = null;
      state.taskStatus = null;
      state.document = null;
    },
    
  },
});

export const {addTask, removeTask} = taskSlice.actions;
export const selectTasks = state => state.tasks;
export default taskSlice.reducer;
