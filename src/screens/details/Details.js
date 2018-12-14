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

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    icon: {
      margin: theme.spacing.unit,
    },
    card: {
        minWidth:275,
    },
    badge: {
        margin: theme.spacing.unit * 2,
      }
  });

class Details extends Component {

    constructor() {
        super();
        this.state = {
            snackBarOpen:false,
            snackBarMessage:"",
            cartCounter:0,
        }
    }

    addButtonClickHandler = event => {
        this.setState({snackBarOpen: true});
        this.setState({snackBarMessage:"Item added to cart!"})
        this.setState({cartCounter: this.state.cartCounter + 1});
    }

    cartAddButtonClickHandler = event => {
        this.setState({snackBarOpen: true});
        this.setState({snackBarMessage: "Item quantity increased by 1!"});
        this.setState({cartCounter: this.state.cartCounter + 1});
    }

    cartRemoveButtonClickHandler = event => {
        this.setState({snackBarOpen: true});
        this.setState({snackBarMessage: "Item quantity decreased by 1!"});
        this.setState({cartCounter: this.state.cartCounter - 1});
    }

    handleClose = event => {
        this.setState({snackBarOpen: false});
    }

    checkoutButtonClickHandler = event => {
        if (this.state.cartCounter == 0) {
            this.setState({snackBarOpen: true});
            this.setState({snackBarMessage: "Please add an item to your cart!"});
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className="restaurant-info">
                    <div className="restaurant-image">
                        <img height="200px" width="auto" src="https://b.zmtcdn.com/data/pictures/0/18564740/686000d2b5cfebfad3300f313eaae79c.jpg?output-format=webp" />
                    </div>
                    <div className="restaurant-details">
                        <p className="restaurant-title">Loud Silence</p>
                        <p className="restaurant-locality">CBD-BELAPUR</p>
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
                <div className="menu-items">
                <p className="cat-heading">Chinese</p>
                <Divider className="divider" />
                    <div className="menu-item">
                    <table width="100%">
                        <tr>
                            <td width="10%">
                                <FontAwesomeIcon className="veg-icon" icon="circle" />
                            </td>
                            <td width="50%" className="menu-item-name">
                                Pizza test
                            </td>
                            <td width="30%">
                                <FontAwesomeIcon icon="rupee-sign"/> 500.00
                            </td>
                            <td width="10%">
                            <IconButton className={classes.button} onClick={this.addButtonClickHandler} >
                                <Add className={classes.icon} />
                            </IconButton>
                            </td>
                        </tr>
                    </table>

                    </div>
                </div>
                <div className="cart">
                    <Card>
                        <Badge className={classes.badge} badgeContent={this.state.cartCounter} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                        <p className="cart-heading">My Cart</p>
                        <div className="menu-item">
                            <table width="100%">
                                <tr>
                                    <td width="10%">
                                        <FontAwesomeIcon className="veg-icon" icon="stop-circle" />
                                    </td>
                                    <td width="50%" className="cart-item-name">
                                        Pizza test
                                    </td>
                                    <td width="2%">
                                        <IconButton className={classes.button} onClick={this.cartRemoveButtonClickHandler} >
                                            <Remove className={classes.icon} />
                                        </IconButton>    
                                    </td>
                                    <td width="2%">
                                        1
                                    </td>
                                    <td width="2%">
                                        <IconButton className={classes.button} onClick={this.cartAddButtonClickHandler} >
                                            <Add className={classes.icon} />
                                        </IconButton>
                                    </td>
                                    <td width="20%" className="amount">
                                        <FontAwesomeIcon icon="rupee-sign"/> 500.00
                                    </td>
                                </tr>
                            </table>
                            <table width="100%">
                                <tr>
                                    <td width="80%">
                                        Total amount
                                    </td>
                                    <td width="20%">
                                        <FontAwesomeIcon icon="rupee-sign"/> 730.00
                                    </td>
                                </tr>
                            </table>
                            <Button variant="contained" color="primary" width="full" className="checkout-button" onClick={this.checkoutButtonClickHandler}>
                                CHECKOUT
                            </Button>
                        </div>
                    </Card>    
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