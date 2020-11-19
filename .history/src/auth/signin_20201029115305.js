import React,{useState} from 'react';
import {Container,Row,Col,CardBody,Form,FormGroup,Input,Label,Button,Media} from 'reactstrap'
import app from '../data/base'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

const Login = (props) => {
  const history = useHistory();
  const [state, setState] = useState({username:"",password:""});
  //const [password, setPassword] = useState("test123");
  const [,setLoading] = useState(false) 
const [remember,setRemember] =  useState(false)
  // const [value, setValue] = useState(
  //     window.localStorage.getItem('profileURL' || man)
  // );
  //   const [name, setName] = useState(
  //     window.localStorage.getItem('Name')
  // );

  // const [isuser, setisuser] = useState(window.localStorage.getItem("isUser"));

  // const toggleform = () => {
  //   document.querySelector('.cont').classList.toggle('s--signup');
  //  }

  // useEffect(() => {
  //     window.localStorage.setItem('profileURL', value);
  //     window.localStorage.setItem('Name', name);
  //     window.localStorage.setItem('isUser', isuser);
  // }, [value,name,isuser]);
  const onChnageHandler = (event) =>{
    const {id, value} = event.target
    setState(prevState =>({
      ...prevState,
      [id]: value
    }))
  }
const onChangeCheckHandler=(event)=>{
setRemember(event.target.checked)
}
const loginAuth =  (event) => {
  event.preventDefault();

  setLoading(true)
  try {
    if(state.username.length===0)
    {
      alert("Enter username")
      state.username.focus()
    }
    if(state.password.length===0)
    {
      alert("Enter password")
      state.password.focus()
    }
    //console.log({username:state.username,password:state.password})
        var firebaseref=app.database().ref().child("WebUser").child(state.username)
       return firebaseref.once('value').then(function(snapshot){
         if(snapshot.exists())
         {
           if(state.password===(snapshot.val().Password)){    
                   if(snapshot.val().Role==="WorkingPartner"){
                       if(snapshot.val().Status==="Active"){
                           if(remember=== true){
                               window.localStorage.setItem('name', snapshot.val().UserName);  
                               window.localStorage.setItem('role',snapshot.val().Role); 
                               window.localStorage.setItem('number',snapshot.val().Number); 
                               window.localStorage.setItem('nam',snapshot.val().Name); 
                               window.localStorage.setItem('city',snapshot.val().City); 
                               window.localStorage.setItem('id',snapshot.val().UserName); 
                               window.localStorage.setItem('com',snapshot.val().Commision); 
                               history.push(`${process.env.PUBLIC_URL}/partner-ordermanagment`);
                              } 
                               else{
                                   window.sessionStorage.setItem('name', snapshot.val().UserName);  
                                   window.sessionStorage.setItem('role',snapshot.val().Role); 
                                   window.sessionStorage.setItem('number',snapshot.val().Number); 
                                   window.sessionStorage.setItem('nam',snapshot.val().Name); 
                                   window.sessionStorage.setItem('city',snapshot.val().City); 
                                   window.sessionStorage.setItem('id',snapshot.val().UserName); 
                                   window.sessionStorage.setItem('com',snapshot.val().Commision); 
                                   history.push(`${process.env.PUBLIC_URL}/partner-ordermanagment`);
                                   //window.location.reload()
                               }
                       }
                       else{
                           alert('Account Not Approved');
                       }
                   }
                   else{
                        if(remember=== true){
                       window.localStorage.setItem('name', snapshot.val().Name);  
                       window.localStorage.setItem('role',snapshot.val().Role); 
                       window.localStorage.setItem('superadmin',snapshot.val().SuperAdmin); 
                       window.localStorage.setItem('city',snapshot.val().City); 
                           if(snapshot.val().SuperAdmin==="Yes"){
                            history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
                             //window.location.reload()
                           }
                           else{
                            history.push(`${process.env.PUBLIC_URL}/dashboard`);
                            //window.location.reload()
                           }
                       }
                       else{
                          window.sessionStorage.setItem('name', snapshot.val().Name);  
                          window.sessionStorage.setItem('role',snapshot.val().Role); 
                           window.sessionStorage.setItem('superadmin',snapshot.val().SuperAdmin); 
                           window.sessionStorage.setItem('city',snapshot.val().City); 
                           if(snapshot.val().SuperAdmin==="Yes"){
                             history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
                             //window.location.reload()
                         }
                         else{
                             history.push(`${process.env.PUBLIC_URL}/dashboard`);
                             //window.location.reload()
                         }
                       }
                   }
                   
           }               
           else
           alert("Wrong Password");
       }
       else{
           alert("User Not Registered");
       }

       window.location.reload();

   });
         
       
      //     .auth()
      //     .signInWithEmailAndPassword(email, password).then(function () {
      //       setValue(man);
      //       setName("Elana Saint");
      //       setisuser("true")
      //       setTimeout(() => {
      //         history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
      //         window.location.reload()
      //       }, 200);
            
          
           // })
            
  } catch (error) {
      setTimeout(() => {
          toast.error("Oppss.. The password is invalid or the user does not have a password.");
      }, 200);
  }
   
}

    return (
        <div className="page-wrapper">
        <Container fluid={true} className="p-0">
          <div className="authentication-main m-0">
            <Row>
              <Col md="12">
                <div className="auth-innerright">
                  <div className="authentication-box">
                    
                    <CardBody className="h-100-d-center">
                      <div className="cont text-center b-light">
                        <div> 
                          <Form className="theme-form">
                          
                          <div className="user-image">
                        <div className="avatar"><Media body  alt="" src={require("../assets/images/banner/logo.png")} style={{height:"auto", maxWidth:"100%"}} data-intro="This is Profile image" /></div>
                      </div>
                      <br/>
                            <h4>LOGIN</h4>
                            <FormGroup>
                              <Label className="col-form-label pt-0">Your Name</Label>
                              <Input className="form-control" type="text" id="username" value={state.username} onChange={onChnageHandler}  required=""/>
                            </FormGroup>
                            <FormGroup>
                              <Label className="col-form-label">Password</Label>
                              <Input className="form-control" type="password" id="password" value = {state.password} onChange={onChnageHandler}   required=""/>
                            </FormGroup>
                            <div className="checkbox p-0">
                              <input id ="checkbox_id"  type="checkbox"  checked={remember}  onChange={onChangeCheckHandler} />
                              <label htmlFor ="checkbox_id"  >Remember me</label>
                            </div>
                            <FormGroup className="form-row mt-3 mb-0">
                              {/* {loading ?
                              <Button color="primary btn-block" disabled={loading}>
                                LOADING...
                              </Button>
                              : */}
                              <Button color="primary btn-block"   onClick={(event) => loginAuth(event)}>
                                  LOGIN
                              </Button>
                              {/* } */}
                            
                            </FormGroup>
                       
                            {/* <div className="login-divider"></div>
                            <div className="social mt-3"> */}
                              {/* <Row form className="btn-showcase">
                                <Col md="3" sm="6">
                                  <Button color="social-btn btn-fb" onClick={facebookAuth}>Facebook</Button>
                                </Col>
                                <Col md="3" sm="6">
                                  <Button color="social-btn btn-twitter" onClick={twitterAuth}>Twitter</Button>
                                </Col>
                                <Col md="3" sm="6">
                                  <Button color="social-btn btn-google" onClick={googleAuth}>Google + </Button>
                                </Col>
                                <Col md="3" sm="6">
                                  <Button color="social-btn btn-github btn-block" onClick={githubAuth} >Github</Button>
                                </Col>
                              </Row> */}
                            {/* </div>
                          </Form>
                        </div>
                        <div className="sub-cont">
                           <div >
                            <div className="img__text m--up"> 
                            
                            </div>  */}
                            {/* <div className="img__text m--in">
                              <h2>One of us?</h2>
                              <p>If you already has an account, just sign in. We've missed you!</p>
                            </div>
                            {/* <div className="img__btn" onClick={toggleform}><span className="m--up">Sign up</span><span className="m--in">Sign in</span></div> */}
                          {/* </div> */} 
                          {/* </div>
                          <div>
                            <Form className="theme-form">
                            <h4 className="text-center">NEW USER</h4>
                            <h6 className="text-center">Enter your Username and Password For Signup</h6>
                            <Row form>
                              <Col md="12">
                                <FormGroup>
                                  <Input className="form-control" type="text" placeholder="First Name"/>
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input className="form-control" type="text" placeholder="Last Name"/>
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Input className="form-control" type="text" placeholder="User Name"/>
                            </FormGroup>
                            <FormGroup>
                              <Input className="form-control" type="password" placeholder="Password"/>
                            </FormGroup>
                            <Row form>
                              <Col sm="4">
                                <Button color="primary" type="submit">Sign Up</Button>
                              </Col>
                              <Col sm="8">
                                <div className="text-left mt-2 m-l-20">Are you already user?  
                                  <a className="btn-link text-capitalize" href="login.html">Login</a>
                                </div>
                              </Col>
                            </Row>
                            <div className="form-divider"></div>
                            <div className="social mt-3">
                              <div className="form-row btn-showcase">
                                <Col sm="4">
                                  <Button color="social-btn btn-fb">Facebook</Button>
                                </Col>
                                <Col sm="4">
                                  <Button color="social-btn btn-twitter">Twitter</Button>
                                </Col>
                                <Col sm="4">
                                  <Button color="social-btn btn-google">Google +</Button>
                                </Col>
                              </div>
                             </div>*/}
                          </Form> 
                           </div> 
                        </div>
                      {/* </div> */}
                    </CardBody>
              
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          </Container>
          
        </div>
    );
}

export default Login;