import React,{useState,useEffect, Fragment,useRef} from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Container,Button} from 'reactstrap'
// import {GET_MEMBERS_SUCCESS} from '../../redux/actionTypes'
// import { useSelector, useDispatch } from 'react-redux'; 
// import {changeChat,createNewChat,searchMember,sendMessage,replyByUser} from '../../redux/chap-app/action'
// import four from '../../assets/images/user/4.jpg';
// import one from '../../assets/images/user/1.jpg';
// import two from '../../assets/images/user/2.png';
// import errorImg from '../../assets/images/search-not-found.png';
// import start_conversion from '../../assets/images/start-conversion.jpg';
// import {Picker} from 'emoji-mart'
// import ImageUploader from 'react-images-upload';
import app,{storage} from '../../data/base'
import images from '../../assets/images/2-small.png'
import * as firebase from "firebase/app";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Trash } from 'react-feather';
// import { AutoScaleAxis } from 'chartist';
const ChatSupports = (props) =>  {

    // const dispatch = useDispatch()
    // const [image,setimage] = useState({ pictures: [] })
    // // const allMembers = useSelector(content => content.ChatApp.allMembers);
    // const chats = useSelector(content => content.ChatApp.chats);
    // const selectedUser = useSelector(content => content.ChatApp.selectedUser);
    // const currentUser = useSelector(content => content.ChatApp.currentUser);
    // const online = useSelector(content => content.ChatApp.online);
    // // const members = useSelector(content => content.ChatApp.members);

    // const [searchKeyword, setSearchKeyword] = useState('');
    // const [messageInput, setMessageInput] = useState('');
    // const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    // const [menuToggle, setMenuToggle] = useState(false);
    // const [activeTab, setActiveTab] = useState('1');

    const [users,setUsers] = useState([])
    const [contacts,setContacts] = useState([])
    const [file,setFile] = useState('')
    const [fileUrl,setFileUrl] = useState('')
    const [message,setMessage] = useState('')
    const inputFile = useRef(null) 

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
                    // var val = data.val();
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
    }, []);
    
    // const dynamicImage = (image) => {
    //     return images(`./2-small.png`);
    // }
    // const onDrop = (pictureFiles, pictureDataURLs) => {
    //     setimage({...image,pictureFiles
    //     });
    // }
    // const toggleEmojiPicker = () => {
    //     setShowEmojiPicker(!showEmojiPicker);
    // }
  
    // const addEmoji = (emoji) =>  {
    // const text = `${messageInput}${emoji.native}`;
    // setShowEmojiPicker(false);
    // setMessageInput(text)
    // }

    // const changeChatClick = (e, selectedUserId) => {
    //     handleSearchKeyword('');
    //     const currentChat = chats.find(x => x.users.includes(currentUser.id) && x.users.includes(selectedUserId))
    //     if (currentChat) {
    //         dispatch(changeChat(selectedUserId));
    //     } else {
    //         dispatch(createNewChat(currentUser.id, selectedUserId, chats))
    //     }
    // }

    // const handleSearchKeyword = (keyword) => {
    //     setSearchKeyword(keyword)
    //     dispatch(searchMember(keyword))
    // }

    // const handleMessageChange = (message) => {
    //     setMessageInput(message)
    // }

    // const handleMessagePress = (e) => {
    //     if (e.key === "Enter" || e === "send") {

    //         var container = document.querySelector(".chat-history");
    //         setTimeout(function () {
    //             container.scrollBy({ top: 200, behavior: 'smooth' });
    //         }, 310)

    //         let currentUserId = currentUser.id;
    //         let selectedUserId = selectedUser.id;
    //         let selectedUserName = selectedUser.name;


    //         if (messageInput.length > 0) {
    //             dispatch(sendMessage(currentUserId, selectedUserId, messageInput, chats, online));
    //             setMessageInput('');

    //             setTimeout(() => {
    //                 const replyMessage = "Hey This is " + selectedUserName + ", Sorry I busy right now, I will text you later";

    //                 if (selectedUser.online === true)
    //                     document.querySelector(".status-circle").classNameList.add('online');

    //                 selectedUser.online = true;
    //                 dispatch(replyByUser(currentUserId, selectedUserId, replyMessage, chats, online));
    //             }, 5000);
    //         }
    //     }
    // }
 const onContactsHandler=(event)=>{
    var id = event.target.id.split(",")
     document.getElementById('chatname').innerHTML=id[1];
    console.log(id[1])
    window.id=id[0];
    var userid=id[0]
    window.userid = userid
    console.log(userid)
    
    app.database().ref().child("Support").child(id[0]).child("Chat")
    .on('value', function(snapshot){
        if(snapshot.exists()){
            var content = [];
            
            snapshot.forEach(function(data){
                var val = data.val();    
                content.push(val)
            })
            setContacts(content)
        }
    })
 }
    // const chatMenuToggle = () => {
    //     setMenuToggle(!menuToggle)
    // }

    const onMessageChangeHandler=(event)=>{
        setMessage(event.target.value)
    }

    const onSendHandler=(event)=>{

        if(window.id===""){
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
         firebaseref= app.database().ref().child("Support").child(window.id).child("Chat").push();
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
        //     if (code === 13) { //Enter keycode                        
        //         alert("entered");
        //     }
        // };
    
    const onChangeFileInput = (event)=>{
        console.log("file selected")
        const image = event.target.files[0]
        setFile(imageFile => (image))
        if(window.id===""){
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
const onDeleteHandler = (event) =>{
    let pushid = event.target.id
    console.log(window.userid)
    console.log(pushid)

    app.database().ref().child("Support").child(window.userid).child("Chat").child(pushid).remove()

}

    return (
       
        <Fragment>
        <BreadCrumb parent="Home" subparent="Chat" title="Chat App"/>
        <Container fluid={true}>
        <div className="chat-wrapper">

{/* <!-- Make card full height of `.chat-wrapper` --> */}
<div className="card flex-grow-1 position-relative overflow-hidden" style={{widht:"1000px",height:"auto",textOverflow:"ellipsis",overflow:"hidden"}}>

    {/* <!-- Make row full height of `.card` --> */}
    <div className="row no-gutters h-100">
        <div className="chat-sidebox col">

            {/* <!-- Chat contacts header --> */}
            <div className="flex-grow-0 px-4" style={{width:"300px"}}>
                <div className="media align-items-center">
                    <div className="media-body">
                        <input type="text" className="form-control chat-search my-3" id="chatsearch" placeholder="Search..."/>
                        <div className="clearfix"></div>
                    </div>
                    <button  className="chat-sidebox-toggler d-lg-none d-block text-muted text-large font-weight-light pl-3">&times;</button>
                </div>
                <hr className="border-light m-0"/>
            </div>
            {/* <!-- / Chat contacts header --> */}
            {/* <!-- Wrap `.chat-scroll` to properly position scroll area. Remove this wtapper if you don't need scroll --> */}
            <div className="flex-grow-1 position-relative">
                <div className="chat-contacts list-group chat-scroll py-3" style={{overflowY:"scroll", height:"300px",width:"300px"}} id="contacts">
                    
                {/* .filter(x => x.Name.includes(searchKeyword)) */}
                {users.map((item, i) => {
                                         item.sn++
                                    return (
                                        <a  id={item.UserId+','+item.Name} onClick={onContactsHandler} className="media align-items-center"    style={{backgroundColor:"white",borderStyle:"hidden",marginBottom:"10px",marginLeft:"30px",cursor:"pointer"}}>
                                        <img id={item.UserId+','+item.Name} onClick={onContactsHandler}src={images} style={{cursor:"pointer"}}  className="d-block ui-w-40 rounded-circle" alt=""/>
                                       <div >
                                        {item.sn===item.count-1?
                                        <div id={item.UserId+','+item.Name} onClick={onContactsHandler}style={{cursor:"pointer"}}  className="media-body ml-3 text-success">{item.Name}<span id={item.UserId+','+item.Name} onClick={onContactsHandler} style={{cursor:"pointer"}} className="badge badge-dot badge-success indicator"></span><br/><span id={item.UserId+','+item.Name} onClick={onContactsHandler} style={{cursor:"pointer"}}  className="text-warning">{item.Number}<br/>{item.UserId}</span></div>
                                            :
                                        <div id={item.UserId+','+item.Name} onClick={onContactsHandler} style={{cursor:"pointer"}}  className="media-body ml-3 text-success">{item.Name}<br/><span id={item.UserId+','+item.Name}style={{cursor:"pointer"}}  onClick={onContactsHandler}className="text-warning">{item.Number}<br/>{item.UserId}</span></div>
                                        }     
                                                                      
                                       </div>
                                       </a>
                                        )
                                        
                                })
                                }
                 
                </div>
            </div>

        </div>
        <div className="d-flex col flex-column" >

            {/* <!-- Chat header --> */}
            <div className="flex-grow-0 py-3 pr-4 pl-lg-4" style={{width:"700px",maxHeight:"300px",textOverflow:"ellipsis",overflow:"hidden"}}>

                <div className="media align-items-center">
                    <a href="javascript:void(0)" className="chat-sidebox-toggler d-lg-none d-block text-muted text-large px-4 mr-2">
                        <i className="ion ion-md-more"></i>
                    </a>

                    <div className="position-relative">
                        <span className="badge badge-dot badge-success indicator"></span>
                        <img src={images} style={{height:"40px",width:"40px"}} className="ui-w-20 rounded-circle" alt=""/>
                        <div className="clearfix"></div>
                    </div>
                    <div className="media-body pl-3">
                        <strong id="chatname"></strong>
                        <div className="text-muted small">
                        </div>
                    </div>
                    
                </div>

            </div>
            <hr className="flex-grow-0 border-light m-0"/>
            {/* <!-- / Chat header --> */}

            {/* <!-- Wrap `.chat-scroll` to properly position scroll area. Remove this wtapper if you don't need scroll --> */}
            <div className="flex-grow-1 position-relative">

                {/* <!-- Remove `.chat-scroll` and add `.flex-grow-1` if you don't need scroll --> */}
                <div className="chat-message chat-scroll p-4" style={{maxWidth:"700px",maxHeight:"200px",overflowY:"scroll",overflowX:"hidden",margin:"0 auto",position:"relative"}} id="chat">
                    {contacts.map((item,id)=>{
                        return(
                            <div key={id}>
                                {item.Name==="Support"&&item.Type==="Text"?
                               
                                <div className="  mb-4 media align-items-center"  ><Trash id={item.PushId} onClick={onDeleteHandler} style={{color:"orange"}} size={20}/><div style={{float:"right",clear:"right",width:"300px"}} ><img src={images} style={{height:"40px",width:"40px",position:"absolute",right:"7%",marginTop:"-20px"}} className="media align-items-center float-right"  alt=""></img>
                                <div  className=" text-muted small text-nowrap mt-2"></div></div>
                                <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3" style={{backgroundColor:" #F8F8F8",maxWidth:"250px",overflow:"hidden"}}><div  className=" font-weight-semibold mb-1">{item.Text}</div>
                                {item.Date+','+item.Time}</div>
                                </div>

                                :item.Name==="Support"&&item.Type!=="Text"?
                    
                                <div className="float-right chat-message-right mb-4 align-items-center  "><Trash id={item.PushId} onClick={onDeleteHandler} style={{color:"orange",position:"absolute",right:"100%",marginTop:"-40px"}} size={20}/><div><img src={images} style={{height:"40px",width:"40px",position:"absolute",right:"7%",marginTop:"-20px"}}  alt=""></img>
                                <div className="text-muted small text-nowrap mt-2" ></div></div>
                                <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3"style={{backgroundColor:" #F8F8F8",marginRight:"70px"}}><img src={item.Text}  width="250px" alt=""  />
                                {item.Date+','+item.Time}</div></div>
                               :item.Type==="Text"?
                                <div className=" mb-4 media align-items-center"><div><img src={images} style={{height:"40px",width:"40px"}} className=" ui-w-40 rounded-circle" alt=""></img>
                                <div className="text-muted small text-nowrap mt-2"></div></div>
                                <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3"style={{backgroundColor:" #F8F8F8"}}><div className=" font-weight-semibold mb-1">{item.Text}</div>
                                {item.Date+','+item.Time}</div><Trash id={item.PushId} onClick={onDeleteHandler} style={{color:"orange"}} size={20}/></div>:
                                 <div className=" mb-4 media align-items-center"><div><img src={images} style={{height:"40px",width:"40px"}} className="ui-w-40 rounded-circle" alt=""></img>
                                 <div className="text-muted small text-nowrap mt-2"></div></div>
                                 <div className="flex-shrink-1 bg-lighter rounded py-2 px-3 ml-3"style={{backgroundColor:" #F8F8F8"}}><img src={item.Text} width="250px" className=" img-responsive" alt="" />
                                 {item.Date+','+item.Time}</div><Trash id={item.PushId} onClick={onDeleteHandler} style={{color:"orange"}} size={20}/></div>
                            }
                            </div>
                        )
                    })}
                  
                    
                </div>
                {/* <!-- / .chat-messages --> */}
            </div>

            {/* <!-- Chat footer --> */}
            <hr className="border-light m-0"/>
            <div className="flex-grow-0 py-3 px-4">
                <div className="input-group">
                    <input type="text" id="message" value={message} onChange={onMessageChangeHandler} className="form-control" placeholder="Type your message"/>
                    <div className="input-group-append">
                        <button type="button" id="send" onClick={onSendHandler} className="btn btn-primary">Send</button>
                        <input id="fileInput"  type="file" ref={inputFile} onChange={onChangeFileInput}  style={{display:"none"}} />
                        <Button type="button"  style={{marginLeft: "5px"}} onClick={onClickFileInput} className="btn btn-primary"><i className="fa fa-paperclip"   aria-hidden="true"></i></Button>
                    </div>
                </div>
            </div>
            {/* <!-- /Chat footer --> */}

        </div>
    </div>
    {/* <!-- / .row --> */}
</div>
{/* <!-- / .card --> */}

</div>
{/* <!-- / .chat-wrapper --> */}



           
          </Container>
        </Fragment>
       
    );
}

export default ChatSupports;