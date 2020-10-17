import React, { Fragment,useState,useEffect } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import {Container,Row,Col,Card,CardHeader,CardBody,Table,Button} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, User,UserPlus, Layers, ShoppingCart,  ArrowDown, Pocket, Monitor, Truck,BarChart,DollarSign,Percent,Headphones,Check,Trash} from 'react-feather';
import app, {storage} from '../../data/base'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const PAddChefVideoTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [thumbNailImageFile,setThumbNailImageFile]=useState('')
    const [thumbNailImageUrl,setThumbNailImageUrl] = useState({imageurl:""})
    const [searchName,setSearchName] = useState("")
    const [videoUrlName,setVedioUrl] = useState("")
    const [list,setList] = useState([])
    const onSearchHander=(event)=>{
        window.addEventListener('message', handleMessage);
        var database = app.database();
        database.ref().child("CloudKitchen").child(searchName).child("Videos")
        .on('value', function(snapshot){
            if(snapshot.exists()){
                var content = [];
                snapshot.forEach(function(data){
                    var val = data.val();  
                    content.push(data.val())
                })
                setList(content)
            }
        })    
    }
   const onChangeSearchHandler=(event)=>{
        setSearchName(event.target.value)

    }
    const onChangeVideoUrlHandler=(event)=>{
        setVedioUrl(event.target.value)
    }

    const onChangeThumbNailHandle=(event)=>{
        const file =event.target.files[0]
        setThumbNailImageFile (imageFile => (file))
        if(thumbNailImageFile.files===""){
            alert("Add Passport Size photo");
            return;
        }
        return () => {
            window.removeEventListener('message', handleMessage);
          };
       
    }
    const onSubmitButton=(event)=>{
        event.preventDefault()

        if(searchName==""){
            alert('Enter Chef Id');
            return;
        }
        if(videoUrlName==""){
            alert('Enter Chef Id');
            return;
        }
        var firebaseref=app.database().ref().child("CloudKitchen").child(searchName).child("Videos").push();
        firebaseref.child("Name").set(String(videoUrlName));
        firebaseref.child("PushId").set(firebaseref.getKey());
        setVedioUrl("")
        event.preventDefault()
        alert('start of upload')
        if(thumbNailImageFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(thumbNailImageFile)}`)
          }
          const uploadTask = storage.ref(`/${videoUrlName}/${thumbNailImageFile.name}`).put(thumbNailImageFile)
          uploadTask.on('state_changed', 
          (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
          }, (err) => {
            //catches the errors
            console.log(err)
          }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            storage.ref(videoUrlName).child(thumbNailImageFile.name).getDownloadURL()
             .then(fireBaseUrl => {
                firebaseref.child("Image").set(fireBaseUrl);
                setThumbNailImageFile(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            
             })
             .then(()=>{setThumbNailImageUrl({imageurl:""})})
             
          })
          
        alert('Sucessfully Created!!!');    
        
    }
    const onClickDeleteHandler=(event)=>{
        const pushid=event.target.id
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor:'gray'
          })
          .then((willDelete) => {
            if (willDelete.value) {
                app.database().ref().child("CloudKitchen").child(searchName).child("Videos").child(pushid).remove();
                Swal.fire( {
                    icon: "success",
                    text:"Video URL Deleted!",
                });
            }
          });
    }
    const handleMessage = (event) => {
        if (event.data.action === 'receipt-loaded') {
          setIsLoading(false);
        }
      };
    
      const printIframe = (id) => {
        const iframe = document.frames
          ? document.frames[id]
          : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;
    
        iframe.focus();
        iframeWindow.print();
    
        return false;
      };
     const printDocument=(event)=> {  
        const input = document.getElementById('datatable');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("ChefList.pdf");  
          });  
      }
    return (
        <Fragment>
            <BreadCrumb parent={<Home/>} subparent="Chef Management" title="Add Chef Vedio URL's"/>
            <Container fluid={true}>
                <Row>
                <Col sm ="12">
               <CardHeader>
               <h6>Add Video ID</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                 </CardHeader>
               </Col>
               <CardBody>
               <div class="form-group row">
                     <label className="col-form-label col-sm-2 text-sm-right">Enter Chef Id</label>
                    <div className="col-sm-8">
                    <div className="row">
                     <div className="col-lg-6 col-md-5 col-sm-5">
                    <input type="text" value={searchName} onChange={onChangeSearchHandler} className="form-control"/>
                    </div>
                    <div className="col-sm-1 col-md-2">
                    <span id="search" onClick={onSearchHander}><img src="https://img.icons8.com/ios-filled/24/000000/search.png"/></span>
                    </div>
                    </div>
                     <div className="clearfix"></div>
                    </div>
                    </div>

                     <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Enter Video URL</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" onChange={onChangeVideoUrlHandler} placeholder="Youtube Video Url"/>
                    <div className="clearfix"></div>
                    </div>
                    </div>

                    <div className="form-group row">
                    <label className="col-form-label col-sm-2 text-sm-right">Enter Thumbnail Image</label>
                    <div className="col-sm-8">
                     <input type="file"  onChange={onChangeThumbNailHandle} className="form-control" id="image" />
                    <div className="clearfix"></div>
                    </div>
                   </div>
                   <div className="form-group row">
                    <div className="col-sm-8 ">
                     <button type="submit" onClick={onSubmitButton  } className="btn btn-primary">Submit</button>
                     </div>
                     </div>
                    </CardBody>
                                        
               
                    <Col sm="12">
                        <Card>
                       <CardHeader>
                        <h6> Video ID List</h6>
                                {/* <span> Use a class <code> table </code> to any table.</span> */}
                        </CardHeader>
                        <div className="col-md-11 text-right" style={{margin: "0%"}}>
                       <div className="dt-buttons btn-group">       
                       <Button onClick={printDocument} variant="contained" color="primary"><span color="white">PDF</span></Button> 
                <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="datatable"  
                filename="ChefVideo"  
                sheet="ChefVideo"  
                buttonText="Excel" />
                <iframe
                    id="iDatatable"
                    src="/table/AddChefVideo-table"
                    style={{ display: 'none' }}
                    title="Receipt"
                />
                <Button className="warning" onClick={() => printIframe('iDatatable')}>
                 {isLoading ? 'Print' : 'Print Receipt'}
                </Button>
                      </div>
                      </div>
                            <div className="table-responsive">
                                <Table id="datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL.NO</th>
                                            <th scope="col"> Video ID</th>
                                            <th scope="col"> Thumbnail Image</th>
                                            <th scope="col"> Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((item,id)=>{
                                            return(
                                                <tr key={id}>
                                                    <td>{id+1}</td>
                                                    <td>{item.Name}</td>
                                                    <td>{item.Image}</td>
                                                    <td class="actions" style={{textAlign:"center"}}><button type="button" className="btn btn-danger btn-sm" data-id="1" data-toggle="modal" data-target="#delete4"><Trash id={item.PushId} onClick={onClickDeleteHandler} size={15}/></button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                    
                    </Row>
                </Container> 
        </Fragment>
            );
        };
        
export default PAddChefVideoTable;