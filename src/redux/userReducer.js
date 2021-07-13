import axios from "axios";

const initialState= {
    user:[]
}
const LOGIN_USER = 'LOGIN_USER';

export const loginUser=(email,password)=>{
    let login = axios.post('/auth/login',{email,password}).then(res=>res.data).catch(err=>console.log(err));

    return{
        type:LOGIN_USER,
        payload:login
    }
}

export default function reducer(state = initialState,action){
    switch(action.type){
        case LOGIN_USER + '_PENDING':
            return{
                ...state
            };
        case LOGIN_USER + '_FULFILLED':
            console.log(action.payload)
            if (!action.payload){
                return{
                    ...state,
                    user:{}
                }
            }
            return{
                ...state,
                user:action.payload
            };
            default:return state;
    }
}