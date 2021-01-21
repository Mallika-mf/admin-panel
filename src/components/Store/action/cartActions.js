import firebase from "../../../src/components/firebase";
import {get} from 'lodash';

export const Cart = (prod) => {    
    return (dispatch, getState) => {        
        new Promise((resolve, reject) => {
            console.log('prod', prod)

            // var product = JSON.stringify(prod)
            // localStorage.setItem("cart", product)
            const cartItem = {
                Details: prod.Details,
                Name: prod.Name,
                Price: prod.Price,
                PushId: prod.PushId,
                Qty: `${prod.quantity}`,
                RPrice: `${get(prod, 'Settlement', get(prod, 'RPrice', ''))}`,
                RTotal: `${get(prod, 'Settlement', get(prod, 'RPrice', '')) * prod.quantity}`,
                Total: `${prod.quantity * prod.Price}`,
                Type: prod.Category || prod.Type
            };
            console.log('prod cartItem', cartItem)
            console.log('prod prod.PushId', prod.PushId)
            let userName = localStorage.getItem('UserName');
            let pushId = prod.PushId
            var firebaseref=firebase.database().ref().child("Users").child(userName);
            if(prod.quantity > 0){
                firebaseref.child("Cart").child(pushId).set(cartItem);
            }else{
                firebaseref.child("Cart").child(pushId).remove();
               firebaseref.child("Cart").on('value',function(snapshot){
                   if(snapshot.exists()){

                   }else{
                    localStorage.removeItem('chefId',);
                    localStorage.removeItem('chefLoc');
                    localStorage.removeItem('chefAddress');
                    localStorage.removeItem('chefName');
            localStorage.removeItem('chefPhoto')
            localStorage.removeItem('KitchenName')
            localStorage.removeItem('Local')
                   }
               })
            }
        }).then(() => {
            // dispatch({type: 'CREATE_CART', prod})
            // dispatch({type: 'UPDATE_USER_CART', item:cartItem})
        }).catch((err) => {
            dispatch({type: 'CREATE_CART_ERROR', err})
        })


    }
   
}
       
      
       

