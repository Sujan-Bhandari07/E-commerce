import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category:[],
 subcategory:[],
 sort:"relevent",
 search:"",
 related:{
  cat:"",
  subcat:""
 },
 isauth:false

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setcategory(state,action){
    const value = action.payload.value;
    if(state.category.includes(value)){
      state.category = state.category.filter((item)=> item !== value) 
    } else {
      state.category = [...state.category, value]
    }
   },
    
   setsubcategory(state,action){
    const value = action.payload.value;
    if(state.subcategory.includes(value)){
      state.subcategory = state.subcategory.filter((item)=> item !== value) 
    } else {
      state.subcategory = [...state.subcategory, value]
    }
  },
  setsort(state,action){
    state.sort = action.payload.value
  },

setsearch(state, action) {
  state.search = action.payload.value;
},


setrelated(state,action){

  state.related.cat = action.payload.cat
  state.related.subcat = action.payload.subcat
},



setisauth(state, action) {
  if (action.payload.login === true) {
    state.isauth = localStorage.getItem("token");
  }
  if (action.payload.login === false) {
    localStorage.removeItem("token");
    state.isauth = false;
  }
}
  }
});
export const { setcategory,setsubcategory,setsort,setisauth,setsearch,setid,setrelated } = userSlice.actions;
export default userSlice.reducer;
