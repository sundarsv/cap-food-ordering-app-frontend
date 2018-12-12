import React, {Component} from 'react';
import '../details/Details.css';
import Header from '../../common/header/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircle, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';


library.add(faStar, faCircle, faRupeeSign)

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    icon: {
      margin: theme.spacing.unit,
    }
  });

class Details extends Component {

    constructor() {
        super();
        this.state = {
            snackBarOpen:false,
        }
    }

    addButtonClickHandler = event => {
        this.setState({snackBarOpen: true});
    }

    handleClose = event => {
        this.setState({snackBarOpen: false});
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
                <Divider />
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
                                    message="Item added to cart!"
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
                            </td>
                        </tr>
                    </table>

                    </div>
                </div>
                <div className="cart">
                    
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Details);