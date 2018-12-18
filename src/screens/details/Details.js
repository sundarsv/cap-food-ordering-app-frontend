import React, {Component} from 'react';
import '../details/Details.css';
import Header from '../../common/header/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircle, faRupeeSign, faStopCircle} from '@fortawesome/free-solid-svg-icons';
// import {faStopCircle} from '@fortawesome/free-regular-svg-icons';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Card from '@material-ui/core/Card';  
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';


library.add(faStar, faCircle, faRupeeSign, faStopCircle)

/* Styles for Material UI */
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    icon: {
      margin: theme.spacing.unit,
    },
    card: {
        
    },
    badge: {
        margin: theme.spacing.unit * 2,
      }
  });

class Details extends Component {

    constructor() {
        super();
        this.state = {
            restaurant: {},
            snackBarOpen:false,
            snackBarMessage:"",
            cartCounter:0,
        }
    }

    /* HTTP request to fetch data for the specific restaurant */
    componentWillMount() {
        let xhr = new XMLHttpRequest();
        let that = this;
        console.log("baseurl : " + this.props.baseUrl + "/restaurant/" + this.props.match.params.restaurantID);
        xhr.addEventListener("readystatechange", function(){
            if(this.readyState == 4 && this.status === 200) {
                that.setState({
                    restaurant: JSON.parse(this.responseText)
                });
                console.log(this.responseText);
            }
        });

        xhr.open("GET", this.props.baseUrl + "/restaurant/" +  this.props.match.params.restaurantID);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send();
    }

    /* Function to add an item to cart */
    addButtonClickHandler = event => {
        this.setState({snackBarOpen: true});
        this.setState({snackBarMessage:"Item added to cart!"})
        this.setState({cartCounter: this.state.cartCounter + 1});
    }

    /* Function to increase an item's quantity in cart */
    cartAddButtonClickHandler = event => {
        this.setState({snackBarOpen: true});
        this.setState({snackBarMessage: "Item quantity increased by 1!"});
        this.setState({cartCounter: this.state.cartCounter + 1});
    }

    /* Function to decrease an item's quantity in cart */
    cartRemoveButtonClickHandler = event => {
        if (this.state.cartCounter > 0) { 
            this.setState({snackBarOpen: true});
            this.setState({snackBarMessage: "Item quantity decreased by 1!"});
            this.setState({cartCounter: this.state.cartCounter - 1});
        }
    }

    /* Function to close snack bar */
    handleClose = event => {
        this.setState({snackBarOpen: false});
    }

    /* Function to open snack bar */
    checkoutButtonClickHandler = event => {
        if (this.state.cartCounter == 0) {
            this.setState({snackBarOpen: true});
            this.setState({snackBarMessage: "Please add an item to your cart!"});
        }
    }

    render() {
        const restaurant = this.state.restaurant;
        const { classes } = this.props;
        return (
            <div className="details-container">
                <Header {...this.props}/>
                <div className="restaurant-info">
                    <div className="restaurant-image">
                        <img height="200px" width="auto" src={restaurant.photoUrl} />
                    </div>
                    <div className="restaurant-details">
                        <p className="restaurant-title">{restaurant.restaurantName}</p>
                        <p className="restaurant-locality">CBD-Belapur</p>
                        <p className="restaurant-categories">Chinese, Continental, Indian, Italian, Snacks</p>
                        <div className="rating-cost">
                            <div className="restaurant-rating">
                                <FontAwesomeIcon icon="star" /> 4.4
                                <p className="sub-text">Average rating by <span className="bold">658</span> users</p>
                            </div>
                            <div className="restaurant-avg-cost">
                                <FontAwesomeIcon icon="rupee-sign" /> 600
                                <p className="sub-text">Average cost for two people</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-container">
                    <div className="menu-container">
                        <div className="cat-container">
                            <p className="cat-heading">chinese
                            <Divider className="divider"/>
                            </p>
                            <table className="menu-items">
                                <tr>    
                                    <td width="10%" className="veg-or-non-veg-icon">
                                        <FontAwesomeIcon className="veg-icon" icon="circle" /> 
                                    </td>
                                    <td width="50%" className="menu-item-name">
                                        Pizza indiana
                                    </td>
                                    <td width="30%">
                                        <FontAwesomeIcon icon="rupee-sign"/> 500.00
                                    </td>
                                    <td>
                                        <IconButton className={classes.button} onClick={this.addButtonClickHandler} >
                                            <Add className={classes.icon} />
                                       </IconButton>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="cart-container">
                        <div className="cart-card-container">
                            <Card>
                            <div className="card-card-heading">
                                    <Badge className={classes.badge} badgeContent={this.state.cartCounter} color="primary">
                                            <ShoppingCartIcon />
                                    </Badge>
                                    <span className="cart-heading">My Cart</span>
                            </div>
                            <table className="cart-table" width="100%">
                                        <tr>
                                            <td className="veg-or-non-veg-icon">
                                                <FontAwesomeIcon className="veg-icon" icon="circle" /> 
                                            </td>
                                            <td className="menu-item-name">
                                                Pizza indiana
                                            </td>
                                            <td >
                                                <IconButton onClick={this.removeButtonClickHandler} >
                                                    <Remove />
                                                </IconButton>
                                            </td>
                                            <td >
                                                1
                                            </td>
                                            <td >
                                                <IconButton onClick={this.addButtonClickHandler} >
                                                    <Add />
                                                </IconButton>
                                            </td>
                                            <td className="menu-item-amount">
                                                <FontAwesomeIcon icon="rupee-sign"/> 500.00
                                            </td>
                                        </tr>
                                    </table>
                                    <table class="cart-table" width="100%">
                                        <tr>
                                            <td className="bold" width="70%">TOTAL AMOUNT</td>
                                            <td className="total-amount"><FontAwesomeIcon icon="rupee-sign"/> 500.00</td>
                                        </tr>
                                    </table>
                                <div className="cart-button">
                                        <Button variant="contained" color="primary" className="checkout-button"
                                            onClick={this.checkoutButtonClickHandler}>
                                            CHECKOUT
                                        </Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
                <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.snackBarOpen}
                autoHideDuration={6000}
                onClose={this.handleClose}
                >
                <SnackbarContent
                    onClose={this.handleClose}
                    message={this.state.snackBarMessage}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                        >
                        <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
                </Snackbar>
            </div>
        )
    }
}

export default withStyles(styles)(Details);