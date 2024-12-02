import { createStore } from "redux";
const initailState={isdarkmood:false}


const darkMoodReducer=(state=initailState,action)=>{
    if (action.type==="change"){
    return({isdarkmood:!state.isdarkmood})}
    else{
        return state
    }


}


const store=createStore(darkMoodReducer)
export default store