import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  ship: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const data = action.payload.data;
const exist = state.items.find((item)=> item._id == data._id  && item.size == data.size)
if(exist){
    exist.quantity +=1
    
}else{

  state.items.push({...data,quantity:1})
}
state.totalQuantity+=1;
state.totalPrice+=data.price
if(   state.totalQuantity>0 &&   state.totalQuantity<2){
  state.ship = 20
}else if(state.totalQuantity>2 && state.totalQuantity<5){
state.ship = 50
}else{
  state.ship = 100
}




    },

    increaseitem(state,action){
      const {size,id} = action.payload
      const data = state.items.find(item => item._id == id && item.size == size )
      if(data){
        data.quantity+=1
        state.totalQuantity+=1
        state.totalPrice+=data.price
      }


    },

    decreseitem(state,action){
const {id,size} = action.payload
      const data = state.items.find(item => item._id == id  && item.size == size)
      if(data.quantity >1 ){
 data.quantity-=1
 state.totalQuantity-=1
 state.totalPrice-=data.price
      }


    },

    removeitem(state,action){
      const {size,id} = action.payload
      const data = state.items.find(item => item._id == id && item.size == size)
      if(data){
const newitems= state.items.filter((item)=> !(item._id == id && item.size ==size))
state.items = newitems
state.totalQuantity-= data.quantity
state.totalPrice-=data.price*data.quantity
      }

    },

    removeall(state,action){

      state.items = []
      state.totalPrice=0
      state.ship=0
      state.totalQuantity=0

    }
  
  },
});

export const { addItem ,increaseitem,decreseitem,removeitem,removeall} = cartSlice.actions;
export default cartSlice.reducer;
