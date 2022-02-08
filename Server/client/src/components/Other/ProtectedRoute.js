import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';


const ProtedRoute = ({component:Component,...rest}) => {

    const isLogin = useSelector((state) => state.auth.isLoggedIn);
    const token = useSelector( (state) => state.auth.token);

    return(
        <Route {...rest} render={(props) => {
            
            if(isLogin || token != null)
            {
                return <Component />
            }
            else
            {
                return (
                <Redirect to={{ pathname:'/', state : {from:props.location} }} />
                )
            }

        }} />
    )

}

export default ProtedRoute;