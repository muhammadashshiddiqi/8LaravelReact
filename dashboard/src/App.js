import React from 'react';
import './assets/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Product from './components/Product';
import Login from "./components/Login";
import Register from "./components/Register";
import Protected from './components/Protected';
import ListProduct from './components/ListProduct';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/login'> 
                        <Login />
                    </Route>
                    <Route path='/register'> 
                        <Register />
                    </Route>
                    <Route path='/product'> 
                    <Protected Cmp={Product} />
                    </Route>
                    <Route path='/'>
                        <ListProduct />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>

    );
}

export default App;
