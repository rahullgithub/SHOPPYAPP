import { createContext, useContext, useReducer} from "react";
import reducer from '../reducer/cartReducer'
import { useEffect } from "react";

const CartContext=createContext();
const getLocalCartData=()=>{
    let newCartData=localStorage.getItem("thapaCart");
//     if(newCartData===[]){
//         return [];
//     } else {
//         return JSON.parse(newCartData);
//     }
// }
const parsedData=JSON.parse(newCartData);
if(!Array.isArray(parsedData)) return [];
return parsedData;
}


const initialState={
    // cart:[],
    cart:getLocalCartData(),
    total_item:"",
    total_price:"",
    shipping_fee:50000,
}


const CartProvider=({children})=>{
const [state,dispatch]=useReducer(reducer,initialState)


 const   addToCart=(id,color,amount,product)=>{
    dispatch ({type:"ADD_TO_CART",payload:{id,color,amount,product}})
 };

// inc and dec
const setDecrease=(id)=>{
dispatch ({type:"SET_DECREMENT", payload:id})
}

const setIncrease=(id)=>{
    dispatch ({type:"SET_INCREMENT", payload:id})
    }


const removeItem=(id)=>{
dispatch({type:"REMOVE_ITEM",payload:id})
}

// to clear the cart
const clearCart=()=>{
dispatch ({type:"CLEAR_CART"})
}

// // to add the data in local storage
// get vs set
useEffect(() => {
    dispatch ({type:"CART_TOTAL_ITEM"})
    dispatch ({type:"CART_TOTAL_PRICE"});
localStorage.setItem("thapaCart",JSON.stringify(state.cart))
}, [state.cart])





return <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,setDecrease,setIncrease}}>
    {children}
</CartContext.Provider>
}

const useCartContext=()=>{
    return useContext(CartContext);
}


export {CartProvider,useCartContext};
