import React, {Component} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Fastfood from '@material-ui/icons/Fastfood';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import Toc from '@material-ui/icons/Toc';
import Grid from "@material-ui/core/Grid/Grid";
import Snackbar from '@material-ui/core/Snackbar';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    )
};

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            isEmailValid: "dispNone",
            isPassValid: "dispNone",
            isContactValid: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") != null
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            isEmailValid: "dispNone",
            isPassValid: "dispNone",
            isContactValid: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            openSnackBar: false
        });
    };

    closeModalHandler = () => {
        this.setState({modalIsOpen: false});
    };

    tabChangeHandler = (event, value) => {
        this.setState({value});
    };

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) : this.setState({usernameRequired: "dispNone"});
        this.state.loginPassword === "" ? this.setState({loginPasswordRequired: "dispBlock"}) : this.setState({loginPasswordRequired: "dispNone"});

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    };

    inputUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value});
    };

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({loginPassword: e.target.value});
    };

    /**
     * validate the sign up page
     * */
    validateSignUp() {

        const emailRegx =/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        const contactRegx = /^[0-9]{10}$/;

        this.state.firstname === "" ? this.setState({firstnameRequired: "dispBlock"}) : this.setState({firstnameRequired: "dispNone"});
        // this.state.lastname === "" ? this.setState({lastnameRequired: "dispBlock"}) : this.setState({lastnameRequired: "dispNone"});
        this.state.email === "" ? this.setState({
            emailRequired: "dispBlock",
            isEmailValid: "dispNone"
        }) : this.state.email.match(emailRegx) ? this.setState({
            isEmailValid: "dispNone",
            emailRequired: "dispNone"
        }) : this.setState({isEmailValid: "dispBlock", emailRequired: "dispNone"});

        this.state.registerPassword === "" ? this.setState({registerPasswordRequired: "dispBlock"}) :
            this.state.registerPassword.match(passwordRegx) ? this.setState({
                isPassValid: "dispNone",
                registerPasswordRequired: "dispNone"
            }) : this.setState({isPassValid: "dispBlock", registerPasswordRequired: "dispNone"});

        this.state.contact === "" ? this.setState({contactRequired: "dispBlock"}) :
            this.state.contact.match(contactRegx) ? this.setState({
                isContactValid: "dispNone",
                contactRequired: "dispNone"
            }) : this.setState({isContactValid: "dispBlock", contactRequired: "dispNone"});

    }

    /**
     * user sign up api call
     */
    signUp(dataSignup) {
        let baseUrl = "http://localhost:8080/api";
        let resourcePath = "/user/signup";
        let xhrSignup = new XMLHttpRequest();
        let that = this;

        console.log("baseurl : " +baseUrl + resourcePath);
        console.log("signUp Data : " + dataSignup);
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 201) {
                that.setState({
                    registrationSuccess: true,
                    openSnackBar : true,
                    value : 0
                });
            }else{
                console.log(this.responseText);
            }
        });

        xhrSignup.open("POST", baseUrl + resourcePath + "?" +dataSignup.toString());
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send();

    }

    /**
     * singup click handler to call the sign up method
     * */
    signUpClickHandler = () => {

        this.validateSignUp();

        let dataSignup =
            "firstName=" + this.state.firstname+
            "&lastName=" + this.state.lastname+
            "&email=" + this.state.email+
            "&contactNumber="+this.state.contact+
            "&password="+ this.state.registerPassword
        ;



        this.signUp(dataSignup);
    };
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false });
    };

    inputFirstNameChangeHandler = (e) => {
        this.setState({firstname: e.target.value});
    };

    inputLastNameChangeHandler = (e) => {
        this.setState({lastname: e.target.value});
    };

    inputEmailChangeHandler = (e) => {
        this.setState({email: e.target.value});
    };

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({registerPassword: e.target.value});
    };

    inputContactChangeHandler = (e) => {
        this.setState({contact: e.target.value});
    };

    logoutHandler = () => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    };

    render() {
        return (
            <div>
                <header className="app-header">
                    <Grid container>
                        <Grid item sm={3} xs={12}>
                            <IconButton color="inherit" aria-label="Open drawer">
                                <Fastfood/>
                            </IconButton>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <div className="searchIcon">
                                <SearchIcon/>
                            </div>
                            <Input className="inputInput"
                                   placeholder="Search by Restaurant Name"
                            />
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <IconButton color="inherit" aria-label="Open drawer">
                                <Toc/> Categories
                            </IconButton>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            {!this.state.loggedIn ?
                                <div className="login-button">
                                    <Button variant="contained" color="default" onClick={this.openModalHandler}>
                                        <AccountCircle/>
                                        Login
                                    </Button>
                                </div>
                                :
                                <div>
                                    <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                        Logout
                                    </Button>
                                </div>
                            }
                        </Grid>
                    </Grid>
                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="LOGIN"/>
                        <Tab label="SIGNUP"/>
                    </Tabs>

                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="username">Contact No.</InputLabel>
                            <Input id="username" type="number" username={this.state.username}
                                   onChange={this.inputUsernameChangeHandler}/>
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword}
                                   onChange={this.inputLoginPasswordChangeHandler}/>
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        {this.state.loggedIn === true &&
                        <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                        </FormControl>
                        }
                        <br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }
                    {/*signup  page */}
                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={this.state.firstname}
                                   onChange={this.inputFirstNameChangeHandler}/>
                            <FormHelperText className={this.state.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={this.state.lastname}
                                   onChange={this.inputLastNameChangeHandler}/>
                            <FormHelperText className={this.state.lastnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="email" email={this.state.email}
                                   onChange={this.inputEmailChangeHandler}/>
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.isEmailValid}>
                                <span className="red">Invalid Email</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword}
                                   onChange={this.inputRegisterPasswordChangeHandler}/>
                            <FormHelperText className={this.state.registerPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.isPassValid}>
                                <span className="red">Password must contain at least one capital letter, one small letter,
                                    one number, and one special character</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" contact={this.state.contact}
                                   onChange={this.inputContactChangeHandler}/>
                            <FormHelperText className={this.state.contactRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.isContactValid}>
                                <span
                                    className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        {this.state.registrationSuccess === true &&
                                <div>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.openSnackBar}
                                        autoHideDuration={3000}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">Registered successfully! Please login now!</span>}
                                    />
                                </div>
                        }
                        <br/><br/>
                        <Button variant="contained" color="primary"
                                onClick={this.signUpClickHandler}>SIGNUP</Button>
                    </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
}

export default Header;