import React from 'react';

import Header from './app/components/Header/Header';
import Footer from './app/components/Footer/Footer';
import Login from './app/pages/Login';
import Signup from './app/pages/Signup';
import Grocery from './app/pages/Grocery';
import Home from './app/pages/Home';
import { UserContext } from './app/hooks/UserContext';
import useFindUser from './app/hooks/useFindUser';
import PrivateRoute from './app/components/PrivateRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css'
// const history = createHashHistory();

function App() {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <div className="app">
      
      {
        <Router>
        <UserContext.Provider value ={{ user, setUser, isLoading}}>
        <Header />
          <switch>

            <Route path="/" exact>
              <Home/>
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <PrivateRoute path="/grocerylist">
              <Grocery />
            </PrivateRoute>
            
          </switch>
          </UserContext.Provider>
        </Router>
      }
      <Footer />
    </div>
  );
}

export default App;
