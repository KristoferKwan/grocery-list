import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';

export default function PrivateRoute(props) {
   const { user, isLoading } = useContext(UserContext);
   const { component: Component, ...rest } = props;
   if(isLoading) {
      return <div></div>
   }
   if(user){
      return ( <Route {...rest} render={(props) => 
           (<Component {...props}/>)
            }
         />
       )}
   //redirect if there is no user 
   return <Redirect to='/' />
}