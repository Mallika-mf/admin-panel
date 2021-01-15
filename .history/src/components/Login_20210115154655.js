import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,Button} from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';
import firebase from './Firebase'
import Loader from 'react-loader-spinner'
import Moment from 'moment'
import { get } from 'lodash';
class Login extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
            showDropDown: false,
            mobile: '',
            name: '',
            emailId: '',
            password: '',
            otp: '',
            showRegister: false,
            showOtpForm: false,
            loginLoader: false,
            otpLoader: false,
            registerLoader: false
        }
    }
    handleLogout = () => {
        localStorage.setItem('isLogging', false);
        localStorage.removeItem('UserName');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('Name');
        window.location.reload();
    }

    handleRegisterSubmit = async (e) => {
        e.preventDefault();
        this.setState({registerLoader: true});
        const {  name, emailId, password } = this.state;
        try {
            const userUniqueId = await firebase.database().ref("UniqueId").once("value");
            const lastUniqueId =  userUniqueId.val();
            let userName = '';
            if (lastUniqueId > 0 && lastUniqueId < 10) {
                userName += "MF000000000" + lastUniqueId;
            } else if (lastUniqueId >= 10 && lastUniqueId < 100) {
                userName += "MF00000000" + lastUniqueId;
            } else if (lastUniqueId >= 100 && lastUniqueId < 1000) {
                userName += "MF0000000" + lastUniqueId;
            } else if (lastUniqueId >= 1000 && lastUniqueId < 10000) {
                userName += "MF000000" + lastUniqueId;
            } else if (lastUniqueId >= 10000 && lastUniqueId < 100000) {
                userName += "MF00000" + lastUniqueId;
            } else if (lastUniqueId >= 100000 && lastUniqueId < 1000000) {
                userName += "MF0000" + lastUniqueId;
            } else if (lastUniqueId >= 1000000 && lastUniqueId < 10000000) {
                userName += "MF000" + lastUniqueId;
            } else if (lastUniqueId >= 10000000 && lastUniqueId < 100000000) {
                userName += "MF00" + lastUniqueId;
            } else if (lastUniqueId >= 100000000 && lastUniqueId < 1000000000) {
                userName += "MF0" + lastUniqueId;
            } else {
                userName += lastUniqueId;
            }
            const date2 = Moment(new Date()).format('YYYY-MM-DD');
            var firebaseref=firebase.database().ref().child("Users").child(userName);
                firebaseref.child("UserName").set(userName);
                firebaseref.child("Email").set(emailId);
                firebaseref.child("JoiningDate").set(date2);
                firebaseref.child("Name").set(name);
                firebaseref.child("Number").set(localStorage.getItem('phoneNumber'));
                firebaseref.child("Password").set(password);
                firebaseref.child("Referral").set('');
                firebaseref.child("Role").set('User');
                firebaseref.child("Status").set('Active');
                firebaseref.child("Wallet").set(0);

                this.setState({ menuOpen: false });
                this.setState({registerLoader: false});
        //    firebase.database().ref('Users').push({
        //     Email: emailId,
        //     JoiningDate: new Date().toString(),
        //     Name: name,
        //     Number: localStorage.getItem('phoneNumber'),
        //     Referral: '',
        //     Role: 'User',
        //     Status: 'Active',
        //     UserName: `MF${Math.floor(Math.random() * 1000000000)}`
        //    }).then(() => console.log('user saved successfully')).catch((e) => console.log('error when saved user', e))
        } catch (e) {

        }
    }

    handleoginSubmit = (e) => {
        e.preventDefault();
        this.setState({loginLoader: true})
        this.setUpRecaptcha();
        const { mobile } = this.state; // for US number (123) 456-7899
        let appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(`+91${mobile}`, appVerifier)
            .then((confirmationResult) => {
                this.setState({loginLoader: false})
                this.setState((prevState) => {
                    return { ...prevState, showOtpForm: !prevState.showOtpForm }
                });
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;

            })
            .catch((error) => {
                this.setState({loginLoader: false})
                // Error; SMS not sent
                // Handle Errors Here
            });
    }

    onSubmitOtp = (e) => {
        e.preventDefault();
        this.setState({otpLoader: true})
        let { otp, mobile } = this.state;
        let optConfirm = window.confirmationResult;
        optConfirm
            .confirm(otp)
            .then(async  (result) => {

                this.setState({otpLoader: false});
                // User signed in successfully.
                // console.log("Result" + result.verificationID);
                // let user = result.user;
                // const isUserExist = await firebase.database().ref("Users").orderByChild("Number").equalTo(user.phoneNumber).once("value");
                const isUserExist = await firebase.database().ref("Users").orderByChild("Number").equalTo(mobile).once("value");
                if (isUserExist.exists()) {
                    const userExist = Object.values(isUserExist.val())
                    localStorage.setItem('isLogging', true);
                    localStorage.setItem('UserName', userExist[0].UserName);
                    localStorage.setItem('Name', userExist[0].Name);
                    // localStorage.setItem('phoneNumber', userExist[0].Number);
                    localStorage.setItem('phoneNumber', mobile);
                    this.setState({menuOpen: false});
                    
                    localStorage.removeItem('chefId');
                    console.log('USER LOGIN CART', get(isUserExist.val()[userExist[0].UserName], 'Cart', []));
                    Object.values(get(isUserExist.val()[userExist[0].UserName], 'Cart', [])).map((cartItem) => {
                        console.log('cartItem Deleted', cartItem.PushId)
                        cartItem.Qty = 0;
                        this.props.setCart(cartItem);
                        //firebaserefUser.child("Cart").child(cartItem.PushId).remove().then((res)=> console.log('cart removed successfullt')).caatch((err) => console.log('cart remoed error', err))
                    });
                    document.getElementById("rightMenu").style.display = "none";
                    window.location.reload();
                }
                else{
                    this.setState({otpLoader: false});
                    let UniqueIdTransaction = firebase.database().ref('UniqueId'); 
                    UniqueIdTransaction.transaction((data) => {
                        return data+1;
                   }).then(() => console.log('UniqueIdTransaction Done')).catch((error) => console.log('UniqueIdTransaction error', error))
                    
                    // localStorage.setItem('phoneNumber', user.phoneNumber);
                    localStorage.setItem('phoneNumber', mobile);
                    this.setState((prevState) => {
                        return { ...prevState, showRegister: !prevState.showRegister }
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                // alert("Incorrect OTP");
            });
    };

    handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    showRegisterMethod = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return { ...prevState, showRegister: !prevState.showRegister }
        });
    }

    setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                    this.onSignInSubmit();
                },
                // defaultCountry: "IN",
            }
        );
    };
	isNumberKey=(evt)=>{ 
        var charCode = (evt.which) ? evt.which : evt.keyCode 
        if (charCode > 31 && (charCode < 48 || charCode > 57)) 
            return false; 
        return true; 
    }

    
    render() {
        const { showRegister, showOtpForm, loginLoader, otpLoader, registerLoader, menuOpen, showDropDown } = this.state;
        const phoneNumber = localStorage.getItem('phoneNumber');
        const isLoggedin = localStorage.getItem('isLogging');
        const userName = localStorage.getItem('Name');
        var imgurl = window.location.origin +'/assets/img/';
    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
	            <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
	            <Col md={8} lg={6}>
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4">Welcome back!</h3>
	                           <Form>
	                              {/* <div className="form-label-group">
	                                 <Form.Control type="email" id="inputEmail" placeholder="Email address" />
	                                 <Form.Label htmlFor="inputEmail">Email address / Mobile</Form.Label>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password" id="inputPassword" placeholder="Password" />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
	                              </div>
	                              <Form.Check  
	                              	className='mb-3'
							        custom
							        type="checkbox"
							        id="custom-checkbox"
							        label="Remember password"
							      /> */}
								                           <div className="card-body">
                                                            {
                                                                !showOtpForm ?
                                                                    <form onSubmit={this.handleoginSubmit}>
                                                                        <div id="recaptcha-container"></div>
                                                                        {/* <div className="form-group">
                                                                            <input type="number" name="mobile"  placeholder="Mobile Number" className="form-control" onChange={this.handleInputChange}  required/>
                                                                        </div> */}
																		<div className="form-label-group">
	                                 <Form.Control type="number" id="inputEmail" onChange={this.handleInputChange} placeholder="Email address" />
	                                 <Form.Label htmlFor="inputEmail"> Mobile</Form.Label>
	                              </div>
                                                                        <div className="form-group text-center m-bottom-20">
                                                                            <button className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">
                                                                                {loginLoader? 
                                                                                <div style={{marginTop: '7px'}}>
                                                                                    <Loader
                                                                                    type="Circles"
                                                                                    color="#FFF"
                                                                                    height={25}
                                                                                    width={100}  //  timeout={3000} //3 secs                                                                        
                                                                                    />
                                                                                </div>
                                                                              :  'Continue'}
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                    :
                                                                    <form onSubmit={this.onSubmitOtp}>
                                                                        <div className="form-group">
                                                                            <input type="password" name="otp" placeholder="OTP (One Time Password)" className="form-control" onChange={this.handleInputChange} required/>
                                                                        </div>
                                                                        <div className="form-group text-center m-bottom-20">
                                                                            <button className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"  type="submit">
                                                                            {otpLoader? 
                                                                                <div style={{marginTop: '7px'}}>
                                                                                    <Loader
                                                                                    type="Circles"
                                                                                    color="#FFF"
                                                                                    height={25}
                                                                                    width={100}                                                                      
                                                                                    />
                                                                                </div>
                                                                              :  'Sign In'} 
                                                                            </button>
                                                                        </div>
                                                                    </form>

                                                            }
                                                            {/* <form onSubmit={this.handleoginSubmit}>
                                                                <div id="recaptcha-container"></div>
                                                                <div className="form-group">
                                                                    <input type="number" placeholder="Mobile Number" className="form-control" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="password" placeholder="OTP (One Time Password)" className="form-control" />
                                                                </div>
                                                                <div className="form-group text-center m-bottom-20">
                                                                    <button className="btn btn-secondary" style={{ background: "#EA6767", color: "white", border: "#EA6767", margin: "auto" }} type="submit">Sign In</button>
                                                                </div>
                                                            </form> */}
                                                            {/* <p className="text-center m-bottom-25" style={{ display: 'flex', alignItems: 'baseline' }}>Don't you have an account? <button className="btn btn-secondary" style={{ background: "#EA6767", color: "white", border: "#EA6767", marginTop: "60px", marginLeft: "30px" }} onClick={this.showRegisterMethod}> Register </button> </p> */}
                                                        </div>
	                              {/* <Link to="/" className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Sign in</Link> */}
	                              <div className="text-center pt-3">
	                                 Don’t have an account? <Link className="font-weight-bold" to="/register">Sign Up</Link>
	                              </div>
		                           <hr className="my-4" />
		                           <p className="text-center">LOGIN WITH</p>
		                           <div className="row">
		                              <div className="col pr-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="google" className="mr-2" /> Google</Button>
		                              </div>
		                              <div className="col pl-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="facebook" className="mr-2" /> Facebook</Button>
		                              </div>
		                           </div>
	                           </Form>
	                        </Col>
	                     </Row>
	                  </Container>
	               </div>
	            </Col>
	         </Row>
	      </Container>
    	);
    }
}


export default Login;