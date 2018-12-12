import React, {Component} from 'react';
import Home from '../screens/home/Home';
import Details from '../screens/details/Details'
import Checkout from '../screens/checkout/Checkout'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super ();
        this.baseUrl = "http://localhost:8080/api/";
      }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Home {...props} />} />
                    <Route path='/restaurant/{restaurantID}' render={(props) => <Details {...props} />} />
                    <Route path='/checkout' render={(props) => <Checkout {...props} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;