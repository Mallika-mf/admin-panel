import React, { createContext } from 'react';
import firebase from '../../Firebase';
export const AppContext = createContext({ 'demo': "tes" });



const intialState = {
    cityname:'',
    cityinfo:{}

};


const reducer = (state,action)=>{
    switch (action.type) {
        case 'SET_LOCATION':
            return { ...state, 'cityinfo':action.payload,cityname:action.payload.Name };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }

}




export const AppProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer,intialState)
    // const [pageLoading,setPageLoading] = React.useState(false);
    const setAppLocation = (city)=>{
        dispatch({type:'SET_LOCATION',payload:city})
    } 

    const setDefaultLocation = (citname)=>{
        firebase.database().ref('Masters').child('City').once('value',(snapshot)=>{
            if(snapshot.exists()){
                let allCities = Object.values(snapshot.val());
    
                    for(let city of allCities){
                        if(citname === city.Name){
                            setAppLocation(city);
                            break;
                        }
                    }
    
    
            }
            // setPageLoading(false);
        });
    }
    React.useEffect(()=>{
        if(localStorage.getItem('cityname')){
            // setPageLoading(false);
            setDefaultLocation(localStorage.getItem('cityname'));
        }
       
    },[]);

    const ProviderState = {
        appState:state,
        setAppLocation
    }

    return (
        <AppContext.Provider value={ProviderState}>
            {/* {pageLoading?null:children} */}
        </AppContext.Provider>
    );
};


export const useAppContext = () => React.useContext(AppContext);