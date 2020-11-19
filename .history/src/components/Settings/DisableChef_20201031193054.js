import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader,Input } from 'reactstrap'
import { Save} from 'react-feather'
import {Table, TableBody, TableCell, TableRow, TableHead, makeStyles, TablePagination, TableSortLabel,Toolbar} from '@material-ui/core'
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
pageContent: {
    margin: theme.spacing(5),
    padding : theme.spacing(3)
},
searchInput:{
    width: "15%"
}
}))
const DisableChef = () => {
    const classes = useStyles()
    const pages = [5,10,25]
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    const [users,setUsers] = useState([])
    const [cName,setCname] = useState([])
    const [cPushId,setcPushid] = useState([])
    const [show,setShow] = useState(true)
    const [filterfn,setFilterFn] = useState({fn : items=> {return items;}})
    const [text,setText] = useState("")
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
              content.map(item=>{
                  if(item.UserId === undefined){
                      item.UserId = ""
                  }
                  if(item.AStatus === undefined){
                    item.AStatus = ""
                }
                if(item.Name === undefined){
                    item.Name = ""
                }
                if(item.MobileNumber === undefined){
                    item.MobileNumber = ""
                }
                if(item.Reason === undefined){
                    item.Reason = ""
                }
                if(cName[cPushId.indexOf(item.City)] === undefined){
                    cName[cPushId.indexOf(item.City)]= ""
                }
                if(item.LocalityName === undefined){
                    item.LocalityName = ""
                }
                setText(item.Reason)
                return item
              })
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
    const onChangeTextHandler = (event) =>{
        setText(event.target.value)
        users.map(item=>{
            if(event.target.id === item.UserId){
                event.target.value = item.Reason
            }
            return item
        })
    }
    const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }
    const handleSearch = (e)=>{
        let target = e.target
        setFilterFn({
            fn: items =>{
                if(target.value === ""){
                return items;
                }
                else{
                return items.filter(x =>x.UserId.includes(target.value))

                }
            }
           
        })
    }
    const recordsAfterPagingAndSorting = ()=>{
        return filterfn.fn(users).slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }
    
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
                <Toolbar>
                <div className="col-md-5" style={{margin: "1%"}}>
                    <div className="form-group col-md-9">
                         <label className="form-label">Search </label>
                             <Input type="text"   placeholder="Search..."
                             onChange={handleSearch}  required=""  className="form-control"  />
                             <div className="clearfix"></div>
                        </div>
                    </div>
                    
                </Toolbar>
                <Col sm="12">
                        <Card>
                           <CardBody>
                            <div className="table-responsive text-nowrap">
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="col"><TableSortLabel>SL.NO</TableSortLabel></TableCell>
                                            <TableCell scope="col"><TableSortLabel>Chef ID</TableSortLabel>		</TableCell>
                                            <TableCell scope="col"><TableSortLabel>Name</TableSortLabel></TableCell>
                                            <TableCell scope="col"><TableSortLabel>Number</TableSortLabel></TableCell>
                                            <TableCell scope="col"><TableSortLabel>City</TableSortLabel></TableCell>
                                            <TableCell scope="col"><TableSortLabel>Zone</TableSortLabel></TableCell>
                                            <TableCell scope="col">Reason for Disable	</TableCell>
                                            <TableCell scope="col">Status	</TableCell>
                                            <TableCell scope="col">Action	</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {recordsAfterPagingAndSorting().map((item,id)=>{
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
            <TableCell className="item_reason"><textarea type="text" id={item.UserId} value={item.Reason} onChange={onChangeTextHandler} className="crop" rows="1" cols="30">{item.Reason}</textarea></TableCell>:
           <TableCell className="item_reason">{""}</TableCell>

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

                                    <TablePagination
                                    className={classes.pageContent}
                                    component = "div"
                                    page = {page}
                                    rowsPerPageOptions = {pages}
                                    rowsPerPage = {rowsPerPage}
                                    count = {users.length}
                                    onChangePage = {handleChangePage}
                                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                                    />

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