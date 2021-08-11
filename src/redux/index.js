// action types
import { createStore } from "redux";
const store=createStore

const BUY_CAKE="BUY_CAKE";

function buyCake(){
    return {
        type:BUY_CAKE,
        info:'first redux action',
    }
}
const initialState={
    count:0,
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "BUY_CAKE":
            return {
                ...state,
                count:state.count-1
            }
        default:
            return state;
    }
}
const store=createStore(reducer);
console.log('the store is',store.getState())
const unsubscribe=store.subscribe(()=>console.log('update state is',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe();

