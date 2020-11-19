import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap'
import { Save} from 'react-feather'
import {Table, TableBody, TableCell, TableRow, TableHead, makeStyles} from '@material-ui/core'
import app from '../../data/base'
import {BeatLoader}  from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles(theme =>({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color : theme.palette.primary.main,
            backgroundColor: theme.palette.primary.gray 
        },
        '& tbody td':{
            fontWeight: '300',
    },
    '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
    },
},
}))
const DisableChef = () => {
    const classes = useStyles()
    const [users,setUsers] = useState([])
    const [cName,setCname] = useState([])
    const [cPushId,setcPushid] = useState([])
    const [show,setShow] = useState(true)

    useEffect(()=>{
        try{
            var cpushid=[];
            var cname=[];
            app.database().ref()
            .child("Masters").child("City")
            .once('value', function(snapshot){
                if(snapshot.exists()){
                    // var content = '';
                    // var sn;
                    // sn=0;
                    snapshot.forEach(function(data){
                        var val = data.val();      
                        cpushid.push(val.PushId);   
                        cname.push(val.Name);   
                    });
                }
               setcPushid(cpushid)
                setCname(cname)
        
        });
       
            var database = app.database();
            database.ref().child("CloudKitchen")
            .orderByChild("AStatus")
            .once('value', function(snapshot){
            if(snapshot.exists()){
            // $('#datatable').empty();
            var content = [];
            
            snapshot.forEach(snap=>{
                content.push(snap.val());
                 
              });
              setUsers(content);
              setShow(false)

            }else{
                const timeout = setTimeout(() => {
                    setShow(false)
                  }, 3000);
                  return ()=>{clearTimeout(timeout);}

            }
        
    })
 }catch(err){
     console.log(err)
 }
    },[])
   
    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Disable Chef"/> 
        <Container fluid={true}>
        <Row>
        <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Chefs Report</h6>
                </CardHeader>
                <Col sm="12">
                        <Card>
                           <CardBody>
                            <div className="table-responsive text-nowrap">
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="col">SL.NO</TableCell>
                                            <TableCell scope="col">Chef ID		</TableCell>
                                            <TableCell scope="col">Name</TableCell>
                                            <TableCell scope="col">Number</TableCell>
                                            <TableCell scope="col">City</TableCell>
                                            <TableCell scope="col">Zone</TableCell>
                                            <TableCell scope="col">Reason for Disable	</TableCell>
                                            <TableCell scope="col">Status	</TableCell>
                                            <TableCell scope="col">Action	</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {users.map((item,id)=>{
        var set=0;
        if(item.AStatus==="Active")
        set="YES";
        else
        set="NO"; 
        return(
            <TableRow key={id}> 
            <TableCell>{id+1}</TableCell>                                                                                                            
           <TableCell className="item_locality">{item.UserId}</TableCell>
           <TableCell className="">{item.Name}</TableCell>
           <TableCell className="">{item.MobileNumber}</TableCell>
           <TableCell className="item_locality">{cName[cPushId.indexOf(item.City)]}</TableCell>
           <TableCell className="item_locality">{item.LocalityName}</TableCell>
           {item.Reason !== null?
            <TableCell className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{item.Reason}</textarea></TableCell>:
            <TableCell className="item_reason"><textarea type="text" className="crop" rows="1" cols="30">{""}</textarea></TableCell>

            }
           <TableCell className="item_activate"><select className="form" id="status">
               {set=="YES"?
               <>
               <option value="Active">{"Enabled"}</option>
               <option value="InActive">{"Disabled"}</option>
               </>:
               <>
               <option value="Active">{"Disabled"}</option>
               <option value="InActive">{"Enabled"}</option>
               </>
               }    
           </select>&nbsp;</TableCell>
           <TableCell className="actions" style={{textAlign:"center"}}><Save size={15}/></TableCell>
         </TableRow> 
        )
            })}
                                    </TableBody>
                                    </Table>
                                    </div>
                                    </CardBody>
                                    </Card>
                                    </Col>
                                    </Card>
                                    </Col>
        </Row>
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className="sweet-loading">
                                     <BeatLoader
                                         css={override}
                                        size={30}
                                        margin={5}
                                        color={"#F10542"}
                                        loading={show}
                                        />
                                    </div>
        </Container>
        </Fragment>
    )}
    export default DisableChef;