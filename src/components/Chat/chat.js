import React,{useState,useEffect, Fragment,useRef} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Container,Row,Col,Card,CardBody,Media,Form,FormGroup,Input,InputGroup,InputGroupAddon,Button,Nav,NavItem,NavLink,TabPane,TabContent,Label} from 'reactstrap'
import {GET_MEMBERS_SUCCESS} from '../../redux/actionTypes'
import { useSelector, useDispatch } from 'react-redux'; 
import {getAllChats,changeChat,createNewChat,searchMember,sendMessage,replyByUser} from '../../redux/chap-app/action'
import four from '../../assets/images/user/4.jpg';
import one from '../../assets/images/user/1.jpg';
import two from '../../assets/images/user/2.png';
import errorImg from '../../assets/images/search-not-found.png';
import start_conversion from '../../assets/images/start-conversion.jpg';
import {Picker} from 'emoji-mart'
import ImageUploader from 'react-images-upload';
import app,{storage} from '../../data/base'
import images from '../../assets/images/2-small.png'
import * as firebase from "firebase/app";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const Chat1 = (props) =>  {



    const [users,setUsers] = useState([])
    const [contacts,setContacts] = useState([])
    const [file,setFile] = useState('')
    const [fileUrl,setFileUrl] = useState('')
    const [message,setMessage] = useState('')
    const inputFile = useRef(null) 
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)

    // var images = require.context('../../assets/images/2-small.png', true);

    useEffect(() => {
        // var snd=new this.Audio("assets/audio/notification.mp3");

        var database = app.database();
        database.ref().child("SupportTime")
        .orderByChild("Time")
        .on('value', function(snapshot){        
            if(snapshot.exists()){
                var count=snapshot.numChildren();
                // snd.play();
                var content = [];
                var sn;
                sn=0;
                snapshot.forEach(function(data){
                    var val = data.val();
                    let locker= {
                        UserId:data.val().UserId,
                        Name:data.val().Name,
                        Number:data.val().Number,
                        sn:sn,
                        count:count
                    }
                    content.push(locker)
                })
                content.reverse()
                setUsers(content)
                console.log(content)
            }
            })
    }, [app]);
    
    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }
  
    const addEmoji = (emoji) =>  {
    const text = `${message}${emoji.native}`;
    setShowEmojiPicker(false);
    setMessage(text)
    }
 const onContactsHandler=(event)=>{
    var id = event.target.id.split(",")
    //  document.getElementById('chatname').innerHTML=id[1];
    console.log(id[1])
    window.id=id[0];
    var userid=id[0]
    console.log(userid)
    
    app.database().ref().child("Support").child(id[0]).child("Chat")
    .on('value', function(snapshot){
        if(snapshot.exists()){
            var content = [];
            var sn;
            sn=0;
            snapshot.forEach(function(data){
                var val = data.val();    
                content.push(val)
            })
            setContacts(content)
        }
    })
 }


    const onMessageChangeHandler=(event)=>{
        setMessage(event.target.value)
    }

    const onSendHandler=(event)=>{

        if(window.id==""){
            Swal.fire({
                title: "Select User to chat with!",
                icon: "warning",
                confirmButtonText: "Ok" 
               });
               return;
        }
    
    
        if(message===""){
            Swal.fire({
                title: "Enter Message!",
                icon: "warning",
                confirmButtonText: "Ok" 
               });
               return;
        }
    
        const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm =  monthNames[today.getMonth()];
    
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
    
        var yyyy = today.getFullYear();
        today = mm + ' ' + dd + ', ' + yyyy;
    
        
    
    
    
        var firebaseref= app.database().ref().child("Support").child(window.id).child("Time").set(firebase.database.ServerValue.TIMESTAMP);
        var firebaseref= app.database().ref().child("Support").child(window.id).child("Chat").push();
        firebaseref.child("PushId").set(firebaseref.getKey());
        firebaseref.child("Name").set("Support");
        firebaseref.child("Date").set(today);
        firebaseref.child("Time").set(strTime);
        firebaseref.child("Text").set(String(message));
        firebaseref.child("Type").set("Text");
    
       setMessage("")
    
    
}
    
        // $("#send").bind("keypress", {}, keypressInBox);
    
        // function keypressInBox(e) {
        //     var code = (e.keyCode ? e.keyCode : e.which);
        //     if (code == 13) { //Enter keycode                        
        //         alert("entered");
        //     }
        // };
    
    const onChangeFileInput = (event)=>{
        console.log("file selected")
        const image = event.target.files[0]
        setFile(imageFile => (image))
        if(window.id==""){
            Swal.fire({
                title: "Select User to chat with!",
                icon: "warning",
                confirmButtonText: "Ok" 
               });
               return;
        }
        if(image === '' ) {
            alert("Add Passport Size photo");
            return;
        }
        if(fileUrl===""){
    
                window.temp--;
                var imagePath = fileUrl;
                let name = imagePath.substr(imagePath.indexOf('%2F') + 3, (imagePath.indexOf('?')) - (imagePath.indexOf('%2F') + 3));
                name = name.replace('%20',' '); 
                let storagePath = app.storage().ref();
                storagePath.child(`Support/${name}`).delete();
            
                
          }
          const ref = app.storage().ref("Support/");
          const name = (+new Date()) + '-' + image.name;
          const metadata = {
            contentType: image.type
            };
          const uploadTask = ref.child(name).put(image, metadata)
          uploadTask.on('state_changed', 
          (snapShot) => {
            snapShot.ref.getDownloadURL()
             .then(fireBaseUrl => {
                const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm =  monthNames[today.getMonth()];
          
              var hours = today.getHours();
              var minutes = today.getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var strTime = hours + ':' + minutes + ' ' + ampm;
          
              var yyyy = today.getFullYear();
              today = mm + ' ' + dd + ', ' + yyyy;
          
              var firebaseref= app.database().ref().child("Support").child(window.id).child("Time").set(firebase.database.ServerValue.TIMESTAMP);
              var firebaseref= app.database().ref().child("Support").child(window.id).child("Chat").push();
              firebaseref.child("PushId").set(firebaseref.getKey());
              firebaseref.child("Name").set("Support");
              firebaseref.child("Date").set(today);
              firebaseref.child("Time").set(strTime);
              firebaseref.child("Text").set(String(fireBaseUrl));
              firebaseref.child("Type").set("Image");
        })
        .catch(console.error);
           })
          
             
          
    }
    
   
const onClickFileInput=(event)=>{
    inputFile.current.click();

}
return (
    // (allMembers && chats) ?
    <Fragment>
    <BreadCrumb parent="Home" subparent="Chat" title="Chat App"/>
    <Container fluid={true}>
        <Row>
          <Col sm="12" className="call-chat-sidebar">
            <Card>
              <CardBody className="chat-body">
                <div className="chat-box">
                  <div className="chat-left-aside">
                    <div className="media">
                    <Media  src={images} className="rounded-circle user-image" alt="" />
                    <div className="about">
                        {/* <div className="name f-w-600">{currentUser.name}</div> */}
                        <div className="status">
                            {/* {currentUser.status} */}
                        </div>
                    </div>
                    </div>
                    <div className="people-list">
                      <div className="search">
                        <Form className="theme-form">
                          <FormGroup className="form-group">
                          <Input
                                className="form-control"
                                type="text"
                                placeholder="search"
                                // defaultValue={searchKeyword}
                                // onChange={(e) => handleSearchKeyword(e.target.value)}
                            />
                            <i className="fa fa-search"></i>
                          </FormGroup>
                        </Form>
                      </div>
                      {/* {members.length > 0 ? */}
                        <ul className="list">
                               {users.map((item, i) => {
                                         item.sn++
                                    return (
                                        <a  id={item.UserId+','+item.Name} className="media align-items-center"   onClick={onContactsHandler} style={{backgroundColor:"white",borderStyle:"hidden",marginBottom:"10px",marginLeft:"30px"}}>
                                        <img src={images}  className="d-block ui-w-40 rounded-circle" alt=""/>
                                       <div>
                                        {item.sn==item.count-1?
                                        <div className="media-body ml-3 text-success">{item.Name}<span className="badge badge-dot badge-success indicator"></span><br/><span className="text-warning">{item.Number}<br/>{item.UserId}</span></div>
                                            :
                                        <div className="media-body ml-3 text-success">{item.Name}<br/><span className="text-warning">{item.Number}<br/>{item.UserId}</span></div>
                                        }     
                                                                      
                                       </div>
                                       </a>
                                        )
                                        
                                })
                                }
                        </ul>
                        {/* :  
                        <Media className="img-fluid m-auto" src={errorImg} alt=""/>
                        } */}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="call-chat-body">
            <Card>
              <CardBody className="p-0">
                <Row className="chat-box">
                  <Col className="pr-0 chat-right-aside">
                    <div className="chat">
                     <div className="chat-header clearfix">
                        <Media src={images} className="rounded-circle" alt="" />
                        <div className="about">
                            <div className="name">
                                {/* {selectedUser.name} */}
                            </div>
                            <div className="status digits" >
                                {/* {selectedUser.online ? 'online' : selectedUser.lastSeenDate} */}
                            </div>
                        </div>
                        <ul className="list-inline float-left float-sm-right chat-menu-icons">
                            <li className="list-inline-item"><a href="#javascript"><i className="icon-search"></i></a></li>
                            <li className="list-inline-item"><a href="#javascript"><i className="icon-clip"></i></a></li>
                            <li className="list-inline-item"><a href="#javascript"><i className="icon-headphone-alt"></i></a></li>
                            <li className="list-inline-item"><a href="#javascript"><i className="icon-video-camera"></i></a></li>
                            <li className="list-inline-item toogle-bar" ><a href="#javascript"><i className="icon-menu"></i></a></li>
                        </ul>
                    </div>
                    <div className="chat-history chat-msg-box custom-scrollbar" >
                        <ul>
                        {contacts.map((item,id)=>{
                        return(
                            <div className="media align-items-center" key={id}>
                                {item.Name=="Support"&&item.Type=="Text"?
                                <div className="  media align-items-center"><div><img src={images} style={{height:"40px",width:"40px",align:"right"}} className="ui-w-40 rounded-circle" alt=""></img>
                                <div className="text-muted small text-nowrap mt-2" style={{textAlign:"right"}}></div></div>
                                <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3"><div className="font-weight-semibold mb-1">{item.Text}</div>
                                {item.Date+','+item.Time}</div>
                                </div>:item.Name=="Support"&&item.Type!=="Text"?
                                <div className=" align-items-center  "><div><img src={images} style={{height:"40px",width:"40px",align:"right"}} className="ui-w-40 rounded-circle" alt=""></img>
                                <div className="text-muted small text-nowrap mt-2" style={{textAlign:"right"}}></div></div>
                                <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3"><img src={item.Text} width="250px" style={{align:"right"}} className="img-responsive" />
                                {item.Date+','+item.Time}</div>
                                </div>:item.Type=="Text"?
                                <div className="chat-message-left mb-4 align-items-center"><div><img src={images} style={{height:"40px",width:"40px"}} className="ui-w-40 rounded-circle" alt=""></img>
                                <div className="text-muted small text-nowrap mt-2"></div></div>
                                <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3"><div className="font-weight-semibold mb-1">{item.Text}</div>
                                {item.Date+','+item.Time}</div></div>:
                                 <div className="chat-message-left mb-4 align-items-center"><div><img src={images} style={{height:"40px",width:"40px"}} className="ui-w-40 rounded-circle" alt=""></img>
                                 <div className="text-muted small text-nowrap mt-2"></div></div>
                                 <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3"><img src={item.Text} width="250px" className="img-responsive" />
                                 {item.Date+','+item.Time}</div></div>
                        }
                                    </div>
                                    )
                                })}
                        </ul>
                    </div>
                      <div className="chat-message clearfix">
                        <Row>
                        <div className="mb-2">
                        {showEmojiPicker ? (
                                <Picker set="apple" emojiSize={30} onSelect={addEmoji} />
                         ) : null}
                         </div>
                          <Col xl="12" className="d-flex">
                            <div className="smiley-box bg-primary">
                            
                                <div className="picker">
                                <Media src={images}  alt=""/>
                                </div>
                            </div>
                            <InputGroup className="text-box">
                                <Input
                                    type="text"
                                    className="form-control input-txt-bx"
                                    placeholder="Type a message......"
                                    value={message}
                                    onChange={onMessageChangeHandler}
                                  
                                   
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary"  >SEND</Button>
                                </InputGroupAddon>
                            </InputGroup>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col >
                        <Nav tabs className="nav  border-tab nav-primary">
                            <NavItem  id="myTab" role="tablist">
                                <NavLink tag="a" href="#javascript"  >
                                    CALL
                                </NavLink>
                            </NavItem>
                            <NavItem  id="myTab" role="tablist">
                                <NavLink tag="a" href="#javascript">
                                    STATUS
                                </NavLink>
                            </NavItem>
                            <NavItem  id="myTab" role="tablist">
                                <NavLink tag="a" href="#javascript"  >
                                    PROFILE
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent >
                            <TabPane tabId="1">
                                <div className="people-list">
                                    <ul className="list digits custom-scrollbar">
                                        <li className="clearfix"><Media className="rounded-circle user-image" src={images} alt="" />
                                            <div className="about">
                                                <div className="name">Erica Hughes</div>
                                                <div className="status"><i className="fa fa-share font-success"></i>  5 May, 4:40 PM</div>
                                            </div>
                                        </li>
                                        <li className="clearfix"><Media className="rounded-circle user-image mt-0" src={images} alt="" />
                                            <div className="about">
                                                <div className="name">Vincent Porter
                                                    <div className="status">
                                                    <i className="fa fa-reply font-danger"></i>  5 May, 5:30 PM
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {users.map((item, i) => {
                                         item.sn++
                                    return (
                                        <a  id={item.UserId+','+item.Name} className="media align-items-center"   onClick={onContactsHandler} style={{backgroundColor:"white",borderStyle:"hidden",marginBottom:"10px",marginLeft:"30px"}}>
                                        <img src={images}  className="d-block ui-w-40 rounded-circle" alt=""/>
                                       <div>
                                        {item.sn==item.count-1?
                                        <div className="media-body ml-3 text-success">{item.Name}<span className="badge badge-dot badge-success indicator"></span><br/><span className="text-warning">{item.Number}<br/>{item.UserId}</span></div>
                                            :
                                        <div className="media-body ml-3 text-success">{item.Name}<br/><span className="text-warning">{item.Number}<br/>{item.UserId}</span></div>
                                        }     
                                                                      
                                       </div>
                                       </a>
                                        )
                                        
                                })
                                }
                                    </ul>
                                </div>
                            </TabPane>
                            <TabPane tabId="2">
                                <div className="people-list">
                                    <div className="search">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <Input className="form-control" type="text" placeholder="Write Status..." /><i className="fa fa-pencil"></i>
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </div>
                                <div className="status">
                                    <p className="font-dark">Active</p>
                                    <hr />
                                    <p>
                                        Established fact that a reader will be distracted  
                                        <i className="icofont icofont-emo-heart-eyes font-danger f-20"></i>
                                        <i className="icofont icofont-emo-heart-eyes font-danger f-20 m-l-5"></i>
                                    </p>
                                    <hr />
                                    <p>Dolore magna aliqua<i className="icofont icofont-emo-rolling-eyes font-success f-20"></i></p>
                                </div>
                            </TabPane>
                            <TabPane tabId="3">
                                <div className="user-profile">
                                    <div className="image">
                                        <div className="avatar text-center"><Media body alt="" src={two} /></div>
                                        <div className="icon-wrapper"><i className="icofont icofont-pencil-alt-5"></i></div>
                                    </div>
                                    <div className="user-content text-center">
                                        <h5 className="text-uppercase">mark jenco</h5>
                                        <div className="social-media">
                                            <ul className="list-inline">
                                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                            </ul>
                                        </div>
                                        <hr />
                                        <div className="follow text-center">
                                            <Row>
                                                <Col className="border-right"><span>Following</span>
                                                    <div className="follow-num">236k</div>
                                                </Col>
                                                <Col><span>Follower</span>
                                                    <div className="follow-num">3691k</div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr />
                                        <div className="text-center digits">
                                            <p className="mb-0">Mark.jecno23@gmail.com</p>
                                            <p className="mb-0">+91 365 - 658 - 1236</p>
                                            <p className="mb-0">Fax: 123-4560</p>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
    // : 
    // <div className="loading"></div>
);
}

export default Chat1;