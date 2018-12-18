import React, {Component} from 'react';
import '../checkout/Checkout.css';
import Header from '../../common/header/Header'

class Checkout extends Component {
    
    constructor() {
        super();
        this.state = {
            id : "",
            value:"",
            location:"",
            tabValue: 0,
            activeStep: 0,
            flat:"",
            city:"",
            open: false,
            locality:"",
            zipcode:"",
            statename:"",
            iconClass:"",
            addressClass:"",
            selectedIndex:"",
            flatRequired: "dispNone",
            cityRequired: "dispNone",
            stateRequired: "dispNone",
            zipcodeRequired: "dispNone",
            localityRequired: "dispNone",
            incorrectZipcode: "dispNone",
            orderPlaced: "dispNone",
            incorrectDetails:"false",
            address : "" ,
            categories : [],
            totalCartItemsValue: "",
            orderNotificationMessage:"",
            states:[],
            selectedAddress:[],
            cartItems: [],
            paymentModes: [],
            addresses: []
        }
    }
    

    render() {
        return (
            <div>
                <Header />
                <div>
                    Checkout page
                </div>
            </div>
        )
    }
}

export default Checkout;
