import React, {useState,Fragment,useEffect } from 'react'
import BreadCrumb from '../../layout/Breadcrumb'
import {Home} from 'react-feather';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Input } from 'reactstrap'
import app from '../../data/base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'
const WebUserCreation = () => {
    const[hide,setHide]=useState(false)
   const [selectUser,setSelectUser] = useState("")
   const [username,setUserName] = useState("")
   const [password,setPassword] = useState("")
   const [name,setName] = useState("")
   const [number,setNumber] = useState("")
   const [designation,setDesignation] = useState("")
   const [email,setEmail] = useState("")
   const [selectCity,setSelectCity] = useState("")
   const [order1,setOrder1] = useState("order1")
   const [order2,setOrder2] = useState("order2")
   const [order3,setOrder3] = useState("order3")
   const [order4,setOrder4] = useState("order4")
   const [order5,setOrder5] = useState("order5")
   const [order6,setOrder6] = useState("order6")
   const [order7,setOrder7] = useState("order7")
   const [order8,setOrder8] = useState("order8")

   const [city1,setCity1] = useState("city1")
   const [city2,setCity2] = useState("city2")
   const [city3,setCity3] = useState("city3")
   const [city4,setCity4] = useState("city4")
   const [city5,setCity5] = useState("city5")
   const [city6,setCity6] = useState("city6")

   const [chef1,setChef1] = useState("chef1")
   const [chef2,setChef2] = useState("chef2")
   const [chef3,setChef3] = useState("chef3")
   const [chef4,setChef4] = useState("chef4")

   const [driver1,setDriver1] = useState("driver1")
   const [driver2,setDriver2] = useState("driver2")
   const [driver3,setDriver3] = useState("driver3")

   const [agency1,setAgency1] = useState("agency1")
   const [agency2,setAgency2] = useState("agency2")

   const [franchise1,setFranchise1] = useState("franchise1")
   const [franchise2,setFranchise2] = useState("franchise2")

   const [approvals1,setApprovals1] = useState("approvals1")
   const [approvals2,setApprovals2] = useState("approvals2")
   const [approvals3,setApprovals3] = useState("approvals3")
   const [approvals4,setApprovals4] = useState("approvals4")
   const [approvals5,setApprovals5] = useState("approvals5")
   const [approvals6,setApprovals6] = useState("approvals6")
   const [approvals7,setApprovals7] = useState("approvals7")
   const [approvals8,setApprovals8] = useState("approvals8")
   const [approvals9,setApprovals9] = useState("approvals9")
   const [approvals10,setApprovals10] = useState("approvalsDescription")
   const [approvals11,setApprovals11] = useState("approvalsProfile")

   const [payouts1,setPayouts1] = useState("payouts1")
   const [payouts2,setPayouts2] = useState("payouts2")
   const [payouts3,setPayouts3] = useState("payouts3")
   const [payouts4,setPayouts4] = useState("payouts4")
   const [payouts5,setPayouts5] = useState("payouts5")
   const [payouts6,setPayouts6] = useState("payouts6")
   const [payouts7,setPayouts7] = useState("payouts7")
   const [payouts8,setPayouts8] = useState("payouts8")

   const [documents1,setDocuments1] = useState("documents1")
   const [documents2,setDocuments2] = useState("documents2")

   const [subscription1,setSubscription1] = useState("subscription1")
   const [subscription2,setSubscription2] = useState("subscription2")

   const [food1,setFood1] = useState("food1")
   const [food2,setFood2] = useState("food2")
   const [food3,setFood3] = useState("food3")
   const [food4,setFood4] = useState("food4")
   const [food5,setFood5] = useState("food5")
   const [food6,setFood6] = useState("food6")
   const [food7,setFood7] = useState("food7")
   const [food8,setFood8] = useState("food8")
   const [food9,setFood9] = useState("food9")
   const [food10,setFood10] = useState("foodTodaysOffer")
   const [food11,setFood11] = useState("foodPreORDER")
   const [food12,setFood12] = useState("foodChefDetails")

   const [usermanagement,setUsermanagement] = useState("usermanagement")
   const [corporate1,setCorporate1] = useState("corporate1")
   const [corporate2,setCorporate2] = useState("corporate2")

   const [settings1,setSettings1] = useState("settings1")
   const [settings2,setSettings2] = useState("settings2")
   const [settings3,setSettings3] = useState("settings3")
   const [settings4,setSettings4] = useState("settings4")
   const [settings5,setSettings5] = useState("settings5")
   const [settings6,setSettings6] = useState("settings6")
   const [settings7,setSettings7] = useState("settings7")
   const [settings8,setSettings8] = useState("settings8")
   const [settings9,setSettings9] = useState("settings9")
   const [settings10,setSettings10] = useState("settingsMyCash")
   const [settings11,setSettings11] = useState("settingsPartial")
   const [settings12,setSettings12] = useState("settingsLocal")


   const [emails1,setEmails1] = useState("emails1")
   const [emails2,setEmails2] = useState("emails2")
   const [emails3,setEmails3] = useState("emails3")
   const [emails4,setEmails4] = useState("emails4")

   const [disputes1,setDisputes1] = useState("disputes1")
   const [disputes2,setDisputes2] = useState("disputes2")
   const [disputes3,setDisputes3] = useState("disputes3")
   const [disputes4,setDisputes4] = useState("disputes4")

   const [chatsupport,setChatsupport] = useState("chatsupport")
   const [reports,setReports] = useState("reports")

   const [reports1,setReports1] = useState("reports1")
   const [reports2,setReports2] = useState("reports2")
   const [reports3,setReports3] = useState("reports3")
   const [reports4,setReports4] = useState("reports4")
   const [reports5,setReports5] = useState("reports5")
   const [reports6,setReports6] = useState("reports6")
   const [reports7,setReports7] = useState("reports7")
   const [reports8,setReports8] = useState("reports8")
   const [reports9,setReports9] = useState("reports9")
   const [reportsA,setReportsA] = useState("reportsA")
   const [reportsB,setReportsB] = useState("reportsB")
   const [reportsC,setReportsC] = useState("reportsC")
   const [reportsD,setReportsD] = useState("reportsD")
   const [reportsE,setReportsE] = useState("reportsE")
   const [reportsF,setReportsF] = useState("reportsF")
   const [reportsG,setReportsG] = useState("reportsG")
   const [reportsH,setReportsH] = useState("reportsH")
   const [reportsI,setReportsI] = useState("reportsI")
   const [reportsJ,setReportsJ] = useState("reportsJ")
   const [reportsK,setReportsK] = useState("reportsK")
   const [reportsL,setReportsL] = useState("reportsL")
   const [reportsM,setReportsM] = useState("reportsM")
   const [reportsN,setReportsN] = useState("reportsN")
   const [reportsO,setReportsO] = useState("reportsO")
   const [reportsP,setReportsP] = useState("reportsP")
   const [reportsQ,setReportsQ] = useState("reportsQ")
   const [reportsR,setReportsR] = useState("reportsR")
   const [reportsS,setReportsS] = useState("reportsS")
   const [reportsT,setReportsT] = useState("reportsT")
   const [reportsU,setReportsU] = useState("reportsU")
   const [reportsV,setReportsV] = useState("reportsV")
   const [reportsW,setReportsW] = useState("reportsW")
   const [reportsX,setReportsX] = useState("reportsX")
   const [reportsY,setReportsY] = useState("reportsY")

   const [cb1,setCb1] = useState(false)
   const [cb2,setCb2] = useState(false)
   const [cb3,setCb3] = useState(false)
   const [cb4,setCb4] = useState(false)
   const [cb5,setCb5] = useState(false)
   const [cb6,setCb6] = useState(false)
   const [cb7,setCb7] = useState(false)
   const [cb8,setCb8] = useState(false)
   const [cb9,setCb9] = useState(false)
   const [cb10,setCb10] = useState(false)
   const [cb11,setCb11] = useState(false)
   const [cb12,setCb12] = useState(false)
   const [cb13,setCb13] = useState(false)
   const [cb14,setCb14] = useState(false)
   const [cb16,setCb16] = useState(false)
   const [cb17,setCb17] = useState(false)
   const [cb18,setCb18] = useState(false)
   const [cb19,setCb19] = useState(false)
   const [cb20,setCb20] = useState(false)
   const [cb21,setCb21] = useState(false)
   const [cb22,setCb22] = useState(false)
   const [cb23,setCb23] = useState(false)
   const [cb24,setCb24] = useState(false)
   const [cb25,setCb25] = useState(false)
   const [cb26,setCb26] = useState(false)
   const [cb27,setCb27] = useState(false)
   const [cb28,setCb28] = useState(false)
   const [cb29,setCb29] = useState(false)
   const [cb30,setCb30] = useState(false)
   const [cb31,setCb31] = useState(false)
   const [cb32,setCb32] = useState(false)
   const [cb33,setCb33] = useState(false)
   const [cb34,setCb34] = useState(false)
   const [cb35,setCb35] = useState(false)
   const [cb36,setCb36] = useState(false)
   const [cb37,setCb37] = useState(false)
   const [cb38,setCb38] = useState(false)
   const [cb39,setCb39] = useState(false)
   const [cb40,setCb40] = useState(false)
   const [cb41,setCb41] = useState(false)
   const [cb42,setCb42] = useState(false)
   const [cb43,setCb43] = useState(false)
   const [cb44,setCb44] = useState(false)
   const [cb45,setCb45] = useState(false)
   const [cb46,setCb46] = useState(false)
   const [cb47,setCb47] = useState(false)
   const [cb48,setCb48] = useState(false)
   const [cb49,setCb49] = useState(false)
   const [cb50,setCb50] = useState(false)
   const [cb51,setCb51] = useState(false)
   const [cb52,setCb52] = useState(false)
   const [cb53,setCb53] = useState(false)
   const [cb54,setCb54] = useState(false)
   const [cb55,setCb55] = useState(false)
   const [cb56,setCb56] = useState(false)
   const [cb57,setCb57] = useState(false)
   const [cb58,setCb58] = useState(false)
   const [cb59,setCb59] = useState(false)
   const [cb60,setCb60] = useState(false)
   const [cb61,setCb61] = useState(false)
   const [cb62,setCb62] = useState(false)
   const [cb63,setCb63] = useState(false)
   const [cb64,setCb64] = useState(false)
   const [cb66,setCb66] = useState(false)
   const [cb67,setCb67] = useState(false)
   const [cb68,setCb68] = useState(false)
   const [cb69,setCb69] = useState(false)
   const [cb70,setCb70] = useState(false)
   const [cb71,setCb71] = useState(false)
   const [cb72,setCb72] = useState(false)
   const [cb73,setCb73] = useState(false)
   const [cb74,setCb74] = useState(false)
   const [cb75,setCb75] = useState(false)
   const [cb76,setCb76] = useState(false)
   const [cb77,setCb77] = useState(false)
   const [cb78,setCb78] = useState(false)
   const [cb80,setCb80] = useState(false)
   const [cb81,setCb81] = useState(false)
   const [cb82,setCb82] = useState(false)
   const [cb91,setCb91] = useState(false)
   const [cb92,setCb92] = useState(false)
   const [cb93,setCb93] = useState(false)
   const [cb94,setCb94] = useState(false)
   const [cb95,setCb95] = useState(false)
   const [cb96,setCb96] = useState(false)
   const [cb97,setCb97] = useState(false)
   const [cb98,setCb98] = useState(false)
   const [cb99,setCb99] = useState(false)
   const [cb100,setCb100] = useState(false)
   const [cb101,setCb101] = useState(false)
   const [cb102,setCb102] = useState(false)
   const [cb103,setCb103] = useState(false)
   const [cb104,setCb104] = useState(false)
   const [cb105,setCb105] = useState(false)
   const [cb106,setCb106] = useState(false)
   const [cb107,setCb107] = useState(false)
   const [cb108,setCb108] = useState(false)
   const [cb109,setCb109] = useState(false)
   const [cb110,setCb110] = useState(false)
   const [cb111,setCb111] = useState(false)
   const [cb112,setCb112] = useState(false)
   const [cb113,setCb113] = useState(false)
   const [cb114,setCb114] = useState(false)
   const [cb115,setCb115] = useState(false)
   const [cb116,setCb116] = useState(false)
   const [cb117,setCb117] = useState(false)
   const [cb118,setCb118] = useState(false)
   const [cb119,setCb119] = useState(false)
   const [cb120,setCb120] = useState(false)
   const [cb121,setCb121] = useState(false)
   const [cb122,setCb122] = useState(false)
   const [cb123,setCb123] = useState(false)
   const [cb124,setCb124] = useState(false)
   const [cb125,setCb125] = useState(false)
   const [cb126,setCb126] = useState(false)
   const [cb127,setCb127] = useState(false)
   const [cb128,setCb128] = useState(false)
   const [cb129,setCb129] = useState(false)
   const [cb130,setCb130] = useState(false)

   const [webUser,setWebUser] = useState([])
   const [city,setCity] = useState([])

    useEffect(()=>{
        var firebaseref1=app.database().ref().child("WebUser");
        firebaseref1.once('value').then(function(snapshot) {
            var content=[]
            snapshot.forEach(function(data){
                var val = data.val(); 
                content.push(val)          
              })
              setWebUser(content)
        })

        app.database().ref().child("Masters").child("City")
        .once('value').then(function(snapshot) {
            var content=[]
            snapshot.forEach(function(data){
                var val = data.val(); 
                content.push(val)
            })
            setCity(content)
        })
    },[])

    const onChangeSelectUser=(event)=>{
        setSelectUser(event.target.value)
        setUserName("")
        setPassword("")
        setEmail("")
        setName("")
        setCb1(false)
        setCb2(false)
        setCb3(false)
        setCb4(false)
        setCb5(false)
        setCb6(false)
        setCb7(false)
        setCb8(false)
        setCb9(false)
        setCb10(false)
        setCb11(false)
        setCb12(false)
        setCb13(false)
        setCb14(false)
        setCb16(false)
        setCb17(false)
        setCb18(false)
        setCb19(false)
        setCb20(false)
        setCb21(false)
        setCb22(false)
        setCb23(false)
        setCb24(false)
        setCb25(false)
        setCb26(false)
        setCb27(false)
        setCb28(false)
        setCb29(false)
        setCb30(false)
        setCb31(false)
        setCb32(false)
        setCb33(false)
        setCb34(false)
        setCb35(false)
        setCb36(false)
        setCb37(false)
        setCb38(false)
        setCb39(false)
        setCb40(false)
        setCb41(false)
        setCb42(false)
        setCb43(false)
        setCb44(false)
        setCb45(false)
        setCb46(false)
        setCb47(false)
        setCb48(false)
        setCb49(false)
        setCb50(false)
        setCb51(false)
        setCb52(false)
        setCb53(false)
        setCb54(false)
        setCb55(false)
        setCb56(false)
        setCb57(false)
        setCb58(false)
        setCb59(false)
        setCb60(false)
        setCb61(false)
        setCb62(false)
        setCb63(false)
        setCb64(false)
        setCb66(false)
        setCb67(false)
        setCb68(false)
        setCb69(false)
        setCb70(false)
        setCb71(false)
        setCb72(false)
        setCb73(false)
        setCb74(false)
        setCb75(false)
        setCb76(false)
        setCb77(false)
        setCb78(false)
        setCb80(false)
        setCb81(false)
        setCb82(false)
        setCb126(false)
        setCb130(false)

        setCb91(false)
        setCb92(false)
        setCb93(false)
        setCb95(false)
        setCb96(false)
        setCb97(false)
        setCb98(false)
        setCb99(false)
        setCb100(false)
        setCb101(false)
        setCb102(false)
        setCb103(false)
        setCb104(false)
        setCb105(false)
        setCb106(false)
        setCb107(false)
        setCb108(false)
        setCb109(false)
        setCb110(false)
        setCb111(false)
        setCb112(false)
        setCb113(false)
        setCb114(false)
        setCb115(false)
        setCb116(false)
        setCb117(false)
        setCb118(false)
        setCb119(false)
        setCb120(false)
        setCb121(false)
        setCb122(false)
        setCb123(false)
        setCb124(false)
        setCb125(false)
        setCb127(false)
        setCb128(false)
        setCb129(false)


        var database = app.database();
        database.ref().child("WebUser").child(event.target.value)
        .on('value', function(snapshot){
            if(snapshot.exists()){
              var role=snapshot.val().Role;
                setName(snapshot.val().Name)
                setUserName(snapshot.val().UserName)
                setPassword(snapshot.val().Password)
                setEmail(snapshot.val().Email)
                setNumber(snapshot.val().Number)
                setDesignation(snapshot.val().Designation)
                if(snapshot.val().City!==undefined){
                    setSelectCity(snapshot.val().City)
                }
                if(role.includes('order1'))
                setCb1(true)
                if(role.includes('order2'))
                setCb2(true)
                if(role.includes('order3'))
                setCb3(true)
                if(role.includes('order4'))
                setCb4(true)
                if(role.includes('order5'))
                setCb5(true)
                if(role.includes('order6'))
                setCb6(true)
                if(role.includes('order7'))
                setCb7(true)
                if(role.includes('order8'))
                setCb8(true)
                if(role.includes('subscription1'))
                setCb52(true)
                if(role.includes('subscription2'))
                setCb53(true)
                if(role.includes('city1'))
                setCb9(true)
                if(role.includes('city2'))
                setCb10(true)
                if(role.includes('city3'))
                setCb11(true)
                if(role.includes('city4'))
                setCb12(true)
                if(role.includes('food1'))
                setCb54(true)
                if(role.includes('food2'))
                setCb55(true)
                if(role.includes('food3'))
                setCb56(true)
                if(role.includes('food4'))
                setCb57(true)
                if(role.includes('food5'))
                setCb58(true)
                if(role.includes('food6'))
                setCb59(true)
                if(role.includes('food7'))
                setCb60(true)
                if(role.includes('food8'))
                setCb61(true)
                if(role.includes('food9'))
                setCb91(true)
                if(role.includes('foodTodaysOffer'))
                setCb92(true)
                if(role.includes('foodPreORDER'))
                setCb93(true)
                if(role.includes('foodChefDetails'))
                setCb94(true)
                if(role.includes('chef1'))
                setCb21(true)
                if(role.includes('chef2'))
                setCb22(true)
                if(role.includes('chef3'))
                setCb23(true)
                if(role.includes('chef4'))
                setCb24(true)
                if(role.includes('driver1'))
                setCb25(true)
                if(role.includes('driver2'))
                setCb26(true)
                if(role.includes('driver3'))
                setCb27(true)
                if(role.includes('agency1'))
                setCb28(true)
                if(role.includes('agency2'))
                setCb29(true)
                if(role.includes('franchise1'))
                setCb30(true)
                if(role.includes('franchise2'))
                setCb31(true)
                if(role.includes('approvals1'))
                setCb32(true)
                if(role.includes('approvals2'))
                setCb33(true)
                if(role.includes('approvals3'))
                setCb34(true)
                if(role.includes('approvals4'))
                setCb35(true)
                if(role.includes('approvals5'))
                setCb36(true)
                if(role.includes('approvals6'))
                setCb37(true)
                if(role.includes('approvals7'))
                setCb38(true)
                if(role.includes('approvals8'))
                setCb39(true)
                if(role.includes('approvals9'))
                setCb40(true)
                if(role.includes('approvalsDescription'))
                setCb41(true)
                if(role.includes('approvalsProfile'))
                setCb81(true)
                if(role.includes('payouts1'))
                setCb42(true)
                if(role.includes('payouts2'))
                setCb43(true)
                if(role.includes('payouts3'))
                setCb44(true)
                if(role.includes('payouts4'))
                setCb45(true)
                if(role.includes('payouts5'))
                setCb46(true)
                if(role.includes('payouts6'))
                setCb47(true)
                if(role.includes('payouts7'))
                setCb48(true)
                if(role.includes('payouts8'))
                setCb49(true)
                if(role.includes('documents1'))
                setCb50(true)
                if(role.includes('documents2'))
                setCb51(true)
                if(role.includes('usermanagement'))
                setCb62(true)
                if(role.includes('corporate1'))
                setCb63(true)
                if(role.includes('corporate2'))
                setCb64(true)
                if(role.includes('settings1'))
                setCb66(true)
                if(role.includes('settings2'))
                setCb67(true)
                if(role.includes('settings3'))
                setCb68(true)
                if(role.includes('settings4'))
                setCb69(true)
                if(role.includes('settings5'))
                setCb60(true)
                if(role.includes('settings6'))
                setCb71(true)
                if(role.includes('settings7'))
                setCb72(true)
                if(role.includes('settings8'))
                setCb73(true)
                if(role.includes('emails1'))
                setCb74(true)
                if(role.includes('emails2'))
                setCb16(true)
                if(role.includes('emails3'))
                setCb17(true)
                if(role.includes('emails4'))
                setCb18(true)
                if(role.includes('disputes1'))
                setCb19(true)
                if(role.includes('disputes2'))
                setCb20(true)
                if(role.includes('disputes3'))
                setCb75(true)
                if(role.includes('disputes4'))
                setCb76(true)
                if(role.includes('chatsupport'))
               //  setCb77(true)
               //  if(role.includes('reports'))
                setCb78(true)
                if(role.includes('city5'))
                setCb13(true)
                if(role.includes('city6'))
                setCb14(true)
                if(role.includes('settings9'))
                setCb80(true)
                if(role.includes('settingsMyCash'))
                setCb82(true)
                if(role.includes('settingsPartial'))
                setCb126(true)
                if(role.includes('settingsLocal'))
                setCb130(true)
                if(role.includes('reports1'))
                  setCb95(true)
               if(role.includes('reports2'))
                  setCb96(true)
                  if(role.includes('reports3'))
                  setCb97(true)
                  if(role.includes('reports4'))
                  setCb98(true)
                  if(role.includes('reports5'))
                  setCb99(true)
                  if(role.includes('reports6'))
                  setCb100(true)
                  if(role.includes('reports7'))
                  setCb101(true)
                  if(role.includes('reports8'))
                  setCb102(true)
                  if(role.includes('reports9'))
                  setCb103(true)
                  if(role.includes('reportsA'))
                  setCb104(true)
                  if(role.includes('reportsB'))
                  setCb105(true)
                  if(role.includes('reportsC'))
                  setCb106(true)
                  if(role.includes('reportsD'))
                  setCb107(true)
                  if(role.includes('reportsE'))
                  setCb108(true)
                  if(role.includes('reportsF'))
                  setCb109(true)
                  if(role.includes('reportsG'))
                  setCb110(true)
                  if(role.includes('reportsH'))
                  setCb111(true)
                  if(role.includes('reportsI'))
                  setCb112(true)
                  if(role.includes('reportsJ'))
                  setCb113(true)
                  if(role.includes('reportsK'))
                  setCb114(true)
                  if(role.includes('reportsL'))
                  setCb115(true)
                  if(role.includes('reportsM'))
                  setCb116(true)
                  if(role.includes('reportsN'))
                  setCb117(true)
                  if(role.includes('reportsO'))
                  setCb118(true)
                  if(role.includes('reportsP'))
                  setCb119(true)
                  if(role.includes('reportsQ'))
                  setCb120(true)
                  if(role.includes('reportsR'))
                  setCb121(true)
                  if(role.includes('reportsS'))
                  setCb122(true)
                  if(role.includes('reportsT'))
                  setCb123(true)
                  if(role.includes('reportsU'))
                  setCb124(true)
                  if(role.includes('reportsV'))
                  setCb125(true)
                  if(role.includes('reportsW'))
                  setCb127(true)
                  if(role.includes('reportsX'))
                  setCb128(true)
                  if(role.includes('reportsY'))
                  setCb129(true)
            }
        })

        setHide(true)
    }
    const onChangeUserName=(event)=>{
        setUserName(event.target.value)
    }
    const onChangePassword=(event)=>{
        setPassword(event.target.value)
    }
    const onChangeName=(event)=>{
        setName(event.target.value)
    }
    const onChangeNumber=(event)=>{
        setNumber(event.target.value)
    }
    const onChangeDesignation=(event)=>{
        setDesignation(event.target.value)
    }
    const onChangeEmail=(event)=>{
        setEmail(event.target.value)
    }
    const onChangeSelectCity=(event)=>{
        setSelectCity(event.target.value)
    }
    const onChangeCB1=(event)=>{
        setCb1(event.target.checked)
        setOrder1(event.target.value)
        console.log(event.target.value)
    }
    const onChangeCB2=(event)=>{
        setCb2(event.target.checked)
        setOrder2(event.target.value)

    }
    const onChangeCB3=(event)=>{
        setCb3(event.target.checked)
        setOrder3(event.target.value)

    }
    const onChangeCB4=(event)=>{
        setCb4(event.target.checked)
        setOrder4(event.target.value)

    }
    const onChangeCB5=(event)=>{
        setCb5(event.target.checked)
        setOrder5(event.target.value)

    }
    const onChangeCB6=(event)=>{
        setCb6(event.target.checked)
        setOrder6(event.target.value)

    }

    const onChangeCB7=(event)=>{
      setCb7(event.target.checked)
      setOrder7(event.target.value)

  }

  const onChangeCB8=(event)=>{
   setCb8(event.target.checked)
   setOrder8(event.target.value)

}
    
    const onChangeCB9=(event)=>{
        setCb9(event.target.checked)
        setCity1(event.target.value)

    }
    const onChangeCB10=(event)=>{
        setCb10(event.target.checked)
        setCity2(event.target.value)

    }
    const onChangeCB11=(event)=>{
        setCb11(event.target.checked)
        setCity3(event.target.value)

    }
    const onChangeCB12=(event)=>{
        setCb12(event.target.checked)
        setCity4(event.target.value)

    }
    const onChangeCB13=(event)=>{
        setCb13(event.target.checked)
        setCity5(event.target.value)

    }
    const onChangeCB14=(event)=>{
        setCb14(event.target.checked)
        setCity6(event.target.value)
    }

    const onChangeCB16=(event)=>{
        setCb16(event.target.checked)
        setEmails2(event.target.value)
    }
    const onChangeCB17=(event)=>{
        setCb17(event.target.checked)
        setEmails3(event.target.value)
    }
    const onChangeCB18=(event)=>{
        setCb18(event.target.checked)
        setEmails4(event.target.value)
    }
    const onChangeCB19=(event)=>{
        setCb19(event.target.checked)
        setDisputes1(event.target.value)
    }
    const onChangeCB20=(event)=>{
        setCb20(event.target.checked)
        setDisputes2(event.target.value)
    }
    const onChangeCB21=(event)=>{
        setCb21(event.target.checked)
        setChef1(event.target.value)
    }
    const onChangeCB22=(event)=>{
        setCb22(event.target.checked)
        setChef2(event.target.value)
    }
    const onChangeCB23=(event)=>{
        setCb23(event.target.checked)
        setChef3(event.target.value)
    }
    const onChangeCB24=(event)=>{
        setCb24(event.target.checked)
        setChef4(event.target.value)
    }
    const onChangeCB25=(event)=>{
        setCb25(event.target.checked)
        setDriver1(event.target.value)
    }
    const onChangeCB26=(event)=>{
        setCb26(event.target.checked)
        setDriver2(event.target.value)
    }
    const onChangeCB27=(event)=>{
        setCb27(event.target.checked)
        setDriver3(event.target.value)
    }
    const onChangeCB28=(event)=>{
        setCb28(event.target.checked)
         setAgency1(event.target.value)
    }
    const onChangeCB29=(event)=>{
        setCb29(event.target.checked)
        setAgency2(event.target.value)
    }
    const onChangeCB30=(event)=>{
        setCb30(event.target.checked)
        setFranchise1(event.target.value)
    }
    const onChangeCB31=(event)=>{
        setCb31(event.target.checked)
        setFranchise2(event.target.value)
    }
    const onChangeCB32=(event)=>{
        setCb32(event.target.checked)
        setApprovals1(event.target.value)
    }

    const onChangeCB33=(event)=>{
        setCb33(event.target.checked)
        setApprovals2(event.target.value)
    }
    const onChangeCB34=(event)=>{
        setCb34(event.target.checked)
        setApprovals3(event.target.value)
    }
    const onChangeCB35=(event)=>{
        setCb35(event.target.checked)
        setApprovals4(event.target.value)
    }
    const onChangeCB36=(event)=>{
        setCb36(event.target.checked)
        setApprovals5(event.target.value)
    }
    const onChangeCB37=(event)=>{
        setCb37(event.target.checked)
        setApprovals6(event.target.value)
    }
    const onChangeCB38=(event)=>{
        setCb38(event.target.checked)
        setApprovals7(event.target.value)
    }
    const onChangeCB39=(event)=>{
        setCb39(event.target.checked)
        setApprovals8(event.target.value)
    }
    const onChangeCB40=(event)=>{
        setCb40(event.target.checked)
        setApprovals9(event.target.value)
    }
    const onChangeCB41=(event)=>{
        setCb41(event.target.checked)
        setApprovals10(event.target.value)
    }
    const onChangeCB81=(event)=>{
      setCb81(event.target.checked)
      setApprovals11(event.target.value)
  }
    const onChangeCB42=(event)=>{
        setCb42(event.target.checked)
        setPayouts1(event.target.value)

    }
    const onChangeCB43=(event)=>{
        setCb43(event.target.checked)
        setPayouts2(event.target.value)

    }
    const onChangeCB44=(event)=>{
        setCb44(event.target.checked)
        setPayouts3(event.target.value)
    }
    const onChangeCB45=(event)=>{
        setCb45(event.target.checked)
        setPayouts4(event.target.value)
    }
    const onChangeCB46=(event)=>{
        setCb46(event.target.checked)
        setPayouts5(event.target.value)
    }
    const onChangeCB47=(event)=>{
        setCb47(event.target.checked)
        setPayouts6(event.target.value)
    }
    const onChangeCB48=(event)=>{
        setCb48(event.target.checked)
        setPayouts7(event.target.value)
    }
    const onChangeCB49=(event)=>{
        setCb49(event.target.checked)
        setPayouts8(event.target.value)
    }
    const onChangeCB50=(event)=>{
        setCb50(event.target.checked)
        setDocuments1(event.target.value)
    }
    const onChangeCB51=(event)=>{
        setCb51(event.target.checked)
        setDocuments2(event.target.value)
    }
    const onChangeCB52=(event)=>{
        setCb52(event.target.checked)
        setSubscription1(event.target.value)
    }
    const onChangeCB53=(event)=>{
        setCb53(event.target.value)
        setSubscription2(event.target.value)
    }
    const onChangeCB54=(event)=>{
        setCb54(event.target.checked)
        setFood1(event.target.value)
    }
    const onChangeCB55=(event)=>{
        setCb55(event.target.checked)
        setFood2(event.target.value)
    }
    const onChangeCB56=(event)=>{
        setCb56(event.target.checked)
        setFood3(event.target.value)
    }
    const onChangeCB57=(event)=>{
        setCb57(event.target.checked)
        setFood4(event.target.value)
    }
    const onChangeCB58=(event)=>{
        setCb58(event.target.checked)
        setFood5(event.target.value)
    }
    const onChangeCB59=(event)=>{
        setCb59(event.target.checked)
        setFood6(event.target.value)
    }
    const onChangeCB60=(event)=>{
        setCb60(event.target.checked)
        setFood7(event.target.value)
    }
    const onChangeCB61=(event)=>{
        setCb61(event.target.checked)
        setFood8(event.target.value)
    }
    const onChangeCB91=(event)=>{
      setCb91(event.target.checked)
      setFood9(event.target.value)
  }
  const onChangeCB92=(event)=>{
   setCb92(event.target.checked)
   setFood10(event.target.value)
}
const onChangeCB93=(event)=>{
   setCb93(event.target.checked)
   setFood11(event.target.value)
}
const onChangeCB94=(event)=>{
   setCb94(event.target.checked)
   setFood12(event.target.value)
}
    const onChangeCB62=(event)=>{
        setCb62(event.target.checked)
        setUsermanagement(event.target.value)
    }
    const onChangeCB63=(event)=>{
        setCb63(event.target.checked)
        setCorporate1(event.target.value)
    }
    const onChangeCB64=(event)=>{
        setCb64(event.target.checked)
        setCorporate2(event.target.value)
    }
    const onChangeCB66=(event)=>{
        setCb66(event.target.checked)
        setSettings1(event.target.value)
    }
    const onChangeCB67=(event)=>{
        setCb67(event.target.checked)
        setSettings2(event.target.value)
    }
    const onChangeCB68=(event)=>{
        setCb68(event.target.checked)
        setSettings3(event.target.value)
    }
    const onChangeCB69=(event)=>{
        setCb69(event.target.checked)
        setSettings4(event.target.value)
    }
    const onChangeCB70=(event)=>{
        setCb70(event.target.checked)
        setSettings5(event.target.value)
    }
    const onChangeCB71=(event)=>{
        setCb71(event.target.checked)
        setSettings6(event.target.value)
    }
    const onChangeCB72=(event)=>{
        setCb72(event.target.checked)
        setSettings7(event.target.value)
    }
    const onChangeCB73=(event)=>{
        setCb73(event.target.checked)
        setSettings8(event.target.value)
    }
    const onChangeCB74=(event)=>{
        setCb74(event.target.checked)
        setEmails1(event.target.value)
    }
    const onChangeCB75=(event)=>{
        setCb75(event.target.checked)
        setDisputes3(event.target.value)
    }
    const onChangeCB76=(event)=>{
        setCb76(event.target.checked)
        setDisputes4(event.target.value)
    }
    const onChangeCB77=(event)=>{
        setCb77(event.target.checked)
        setChatsupport(event.target.value)
    }
   //  const onChangeCB78=(event)=>{
   //      setCb78(event.target.checked)
   //      setReports(event.target.value)
   //  }
    const onChangeCB80=(event)=>{
      setCb80(event.target.checked)
      setSettings9(event.target.value)
  }
  const onChangeCB82=(event)=>{
   setCb82(event.target.checked)
   setSettings10(event.target.value)
}
const onChangeCB83=(event)=>{
   setCb126(event.target.checked)
   setSettings11(event.target.value)
}
const onChangeCB84=(event)=>{
   setCb130(event.target.checked)
   setSettings12(event.target.value)
}
const onChangeCB95=(event)=>{
   setCb95(event.target.checked)
   setReports1(event.target.value)
}

const onChangeCB96=(event)=>{
   setCb96(event.target.checked)
   setReports2(event.target.value)
}
const onChangeCB97=(event)=>{
   setCb97(event.target.checked)
   setReports3(event.target.value)
}
const onChangeCB98=(event)=>{
   setCb98(event.target.checked)
   setReports4(event.target.value)
}
const onChangeCB99=(event)=>{
   setCb99(event.target.checked)
   setReports5(event.target.value)
}
const onChangeCB100=(event)=>{
   setCb100(event.target.checked)
   setReports6(event.target.value)
}
const onChangeCB101=(event)=>{
   setCb101(event.target.checked)
   setReports7(event.target.value)
}
const onChangeCB102=(event)=>{
   setCb102(event.target.checked)
   setReports8(event.target.value)
}
const onChangeCB103=(event)=>{
   setCb103(event.target.checked)
   setReports9(event.target.value)
}
const onChangeCB104=(event)=>{
   setCb104(event.target.checked)
   setReportsA(event.target.value)
}
const onChangeCB105=(event)=>{
   setCb105(event.target.checked)
   setReportsB(event.target.value)
}
const onChangeCB106=(event)=>{
   setCb106(event.target.checked)
   setReportsC(event.target.value)
}
const onChangeCB107=(event)=>{
   setCb107(event.target.checked)
   setReportsD(event.target.value)
}
const onChangeCB108=(event)=>{
   setCb108(event.target.checked)
   setReportsE(event.target.value)
}
const onChangeCB109=(event)=>{
   setCb109(event.target.checked)
   setReportsF(event.target.value)
}
const onChangeCB110=(event)=>{
   setCb110(event.target.checked)
   setReportsG(event.target.value)
}
const onChangeCB111=(event)=>{
   setCb111(event.target.checked)
   setReportsH(event.target.value)
}
const onChangeCB112=(event)=>{
   setCb112(event.target.checked)
   setReportsI(event.target.value)
}
const onChangeCB113=(event)=>{
   setCb113(event.target.checked)
   setReportsJ(event.target.value)
}
const onChangeCB114=(event)=>{
   setCb114(event.target.checked)
   setReportsK(event.target.value)
}
const onChangeCB115=(event)=>{
   setCb115(event.target.checked)
   setReportsL(event.target.value)
}
const onChangeCB116=(event)=>{
   setCb116(event.target.checked)
   setReportsM(event.target.value)
}
const onChangeCB117=(event)=>{
   setCb117(event.target.checked)
   setReportsN(event.target.value)
}
const onChangeCB118=(event)=>{
   setCb118(event.target.checked)
   setReportsO(event.target.value)
}
const onChangeCB119=(event)=>{
   setCb119(event.target.checked)
   setReportsP(event.target.value)
}
const onChangeCB120=(event)=>{
   setCb120(event.target.checked)
   setReportsQ(event.target.value)
}
const onChangeCB121=(event)=>{
   setCb121(event.target.checked)
   setReportsR(event.target.value)
}
const onChangeCB122=(event)=>{
   setCb122(event.target.checked)
   setReportsS(event.target.value)
}
const onChangeCB123=(event)=>{
   setCb123(event.target.checked)
   setReportsT(event.target.value)
}
const onChangeCB124=(event)=>{
   setCb124(event.target.checked)
   setReportsU(event.target.value)
}
const onChangeCB125=(event)=>{
   setCb125(event.target.checked)
   setReportsV(event.target.value)
}
const onChangeCB127=(event)=>{
   setCb127(event.target.checked)
   setReportsW(event.target.value)
}
const onChangeCB128=(event)=>{
   setCb128(event.target.checked)
   setReportsX(event.target.value)
}
const onChangeCB129=(event)=>{
   setCb129(event.target.checked)
   setReportsY(event.target.value)
}


    const onSubmitHandler=(event)=>{
        try{
        event.preventDefault()
        if(name===""){
            alert('Enter Name');
        
            return;
        }
    
        if(username===""){
             alert('Enter UserName');
             
             return;
         }
    
    
         if(number===""){
             alert('Enter Mobile Number');
             
             return;
          }
    
          if(number.length===9){
             alert('Enter Proper Mobile Number');
             return;
          }
    
          if(designation===""){
             alert('Enter Designation')
             return;
          }
    
          if(password===""){
             alert('Enter Password');
             return;
          }
    
          if(email===""){
             alert('Enter Email Id');
             
             return;
          }
          if(selectCity==="Select")
          {
              alert("Select City");
          }
          var $role=''
          if(cb1===true){
            $role +=order1       
          }
        if(cb2===true){
        $role +=order2
        }
        if(cb3===true){
        $role +=order3 
        }
        if(cb4===true){
        $role +=order4       
        }
        if(cb5===true){
            $role +=order5      
        }
        if(cb6===true){
           $role +=order6       
        }
        if(cb7===true){
         $role +=order7       
      }
      if(cb8===true){
         $role +=order8       
      }
        
        if(cb9===true){
            $role +=city1
        }
        if(cb10===true){
            $role +=city2
        }
        if(cb11===true){
            $role +=city3
        }
        if(cb12===true){
            $role +=city4
        }
        if(cb13===true){
            $role +=city5
          }
          if(cb14===true){
            $role +=city6
        }

        if(cb16===true){
            $role +=emails2
        }
        if(cb17===true){
            $role +=emails3      
        }
        if(cb18===true){
           $role +=emails4     
        }
        if(cb19===true){
            $role +=disputes1       
         }
         if(cb20===true){
            $role +=disputes2       
         }
         if(cb21===true){
            $role +=chef1       
         }
         if(cb22===true){
            $role +=chef2       
         }
         if(cb23===true){
            $role +=chef3       
         }
         if(cb24===true){
            $role +=chef4       
         }
         if(cb25===true){
            $role +=driver1       
         }
         if(cb26===true){
            $role +=driver2       
         }
         if(cb27===true){
            $role +=driver3       
         }
         if(cb28===true){
            $role +=agency1       
         }
         if(cb29===true){
            $role +=agency2       
         }
         if(cb30===true){
            $role +=franchise1      
         }
         if(cb31===true){
            $role +=franchise2      
         }
         if(cb32===true){
            $role +=approvals1       
         }
         if(cb33===true){
            $role +=approvals2       
         }
         if(cb34===true){
            $role +=approvals3       
         }
         if(cb35===true){
            $role +=approvals4       
         }
         if(cb36===true){
            $role +=approvals5       
         }
         if(cb37===true){
            $role +=approvals6       
         }
         if(cb38===true){
            $role +=approvals7      
         }
         if(cb39===true){
            $role +=approvals8       
         }
         if(cb40===true){
            $role +=approvals9       
         }
         if(cb41===true){
            $role +=approvals10       
         }
         if(cb81===true){
            $role +=approvals11      
         }
         if(cb42===true){
            $role +=payouts1       
         }
         if(cb43===true){
            $role +=payouts2    
         }
         if(cb44===true){
            $role +=payouts3       
         }
         if(cb45===true){
            $role +=payouts4       
         }
         if(cb46===true){
            $role +=payouts5       
         }
         if(cb47===true){
            $role +=payouts6       
         }
         if(cb48===true){
            $role +=payouts7       
         }
         if(cb49===true){
            $role +=payouts8       
         }
         if(cb50===true){
            $role +=documents1       
         }
         if(cb51===true){
            $role +=documents2       
         }
         if(cb52===true){
            $role +=subscription1       
         }
         if(cb53===true){
            $role +=subscription2
         }
         if(cb54===true){
            $role +=food1       
         }
         if(cb55===true){
            $role +=food2       
         }
         if(cb56===true){
            $role +=food3;       
         }
         if(cb57===true){
            $role +=food4       
         }
         if(cb58===true){
            $role +=food5       
         }
         if(cb59===true){
            $role +=food6      
         }
         if(cb60===true){
            $role +=food7       
         }
         if(cb61===true){
            $role +=food8       
         }
         if(cb91===true){
            $role +=food9       
         }
         if(cb92===true){
            $role +=food10      
         }
         if(cb93===true){
            $role +=food11      
         }
         if(cb94===true){
            $role +=food12       
         }
         if(cb62===true){
            $role +=usermanagement       
         }
         if(cb63===true){
            $role +=corporate1      
         }
         if(cb64===true){
            $role +=corporate2       
         }
       
         if(cb66===true){
            $role +=settings1       
         }
         if(cb67===true){
            $role +=settings2       
         }
         if(cb68===true){
            $role +=settings3       
         }
         if(cb69===true){
            $role +=settings4       
         }
         if(cb70===true){
            $role +=settings5       
         }
         if(cb71===true){
            $role +=settings6      
         }
         if(cb72===true){
            $role +=settings7      
         }
         if(cb73===true){
          $role +=settings8     
       }
       if(cb74===true){
          $role +=emails1       
       }
       if(cb75===true){
        $role +=disputes3       
     }
     if(cb76===true){
        $role +=disputes4       
     }
     if(cb77===true){
        $role +=chatsupport       
     }
   //   if(cb78===true){
   //      $role +=reports       
   //   }
     if(cb80===true){
      $role +=settings9       
   }
   if(cb82===true){
      $role +=settings10      
   }
   if(cb126===true){
      $role +=settings11    
   }
   if(cb130===true){
      $role +=settings12    
   }
   if(cb95===true){
      $role +=reports1      
   }
   if(cb96===true){
      $role +=reports2      
   }
   if(cb97===true){
      $role +=reports3      
   }
   if(cb98===true){
      $role +=reports4      
   }
   if(cb99===true){
      $role +=reports5      
   }
   if(cb100===true){
      $role +=reports6      
   }
   if(cb101===true){
      $role +=reports7      
   }
   if(cb102===true){
      $role +=reports8      
   }
   if(cb103===true){
      $role +=reports9      
   }
   if(cb104===true){
      $role +=reportsA      
   }
   if(cb105===true){
      $role +=reportsB      
   }
   if(cb106===true){
      $role +=reportsC      
   }
   if(cb107===true){
      $role +=reportsD      
   }
   if(cb108===true){
      $role +=reportsE      
   }
   if(cb109===true){
      $role +=reportsF      
   }
   if(cb110===true){
      $role +=reportsG      
   }
   if(cb111===true){
      $role +=reportsH      
   }
   if(cb112===true){
      $role +=reportsI      
   }
   if(cb113===true){
      $role +=reportsJ      
   }
   if(cb114===true){
      $role +=reportsK      
   }
   if(cb115===true){
      $role +=reportsL      
   }
   if(cb116===true){
      $role +=reportsM      
   }
   if(cb117===true){
      $role +=reportsN      
   }
   if(cb118===true){
      $role +=reportsO      
   }
   if(cb119===true){
      $role +=reportsP      
   }
   if(cb120===true){
      $role +=reportsQ      
   }
   if(cb121===true){
      $role +=reportsR      
   }
   if(cb122===true){
      $role +=reportsS      
   }
   if(cb123===true){
      $role +=reportsT      
   }
   if(cb124===true){
      $role +=reportsU      
   }
   if(cb125===true){
      $role +=reportsV      
   }
   if(cb127===true){
      $role +=reportsW    
   }
   if(cb128===true){
      $role +=reportsX  
   }
   if(cb129===true){
      $role +=reportsY
   }

     var firebaseref=app.database().ref().child("WebUser").child(username);
       firebaseref.child("UserName").set(String(username));
       firebaseref.child("Name").set(String(name));
       firebaseref.child("Password").set(String(password));
       firebaseref.child("Email").set(String(email));
       firebaseref.child("Number").set(String(number));
       firebaseref.child("Designation").set(String(designation));
       firebaseref.child("Role").set(String($role));
       firebaseref.child("City").set(selectCity);

       axios
       .post('https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles='+number+'&sms=Dear '+name+', Your account has been Successfully Created.%Username:'+username+'%Password:'+password+'%0aLogin URL:https://admin.mothersfood.in/Login.html%0a- Team MothersFood&senderid=mtfood&schedule=no&sending-time=& client-sms-ids=&unicode=yes&message- type=')
       .then(function (response) {
         Swal.fire({
            title: "Sucessfully Updated",
            icon: "success",
            dangermode: true,
          });
          setUserName("")
          setPassword("")
          setEmail("")
          setName("")
          setNumber("")
          setDesignation("")
          setCb1(false)
          setCb2(false)
          setCb3(false)
          setCb4(false)
          setCb5(false)
          setCb6(false)
          setCb7(false)
          setCb8(false)
          setCb9(false)
          setCb10(false)
          setCb11(false)
          setCb12(false)
          setCb13(false)
          setCb14(false)
          setCb16(false)
          setCb17(false)
          setCb18(false)
          setCb19(false)
          setCb20(false)
          setCb21(false)
          setCb22(false)
          setCb23(false)
          setCb24(false)
          setCb25(false)
          setCb26(false)
          setCb27(false)
          setCb28(false)
          setCb29(false)
          setCb30(false)
          setCb31(false)
          setCb32(false)
          setCb33(false)
          setCb34(false)
          setCb35(false)
          setCb36(false)
          setCb37(false)
          setCb38(false)
          setCb39(false)
          setCb40(false)
          setCb41(false)
          setCb42(false)
          setCb43(false)
          setCb44(false)
          setCb45(false)
          setCb46(false)
          setCb47(false)
          setCb48(false)
          setCb49(false)
          setCb50(false)
          setCb51(false)
          setCb52(false)
          setCb53(false)
          setCb54(false)
          setCb55(false)
          setCb56(false)
          setCb57(false)
          setCb58(false)
          setCb59(false)
          setCb60(false)
          setCb61(false)
          setCb62(false)
          setCb63(false)
          setCb64(false)
          setCb66(false)
          setCb67(false)
          setCb68(false)
          setCb69(false)
          setCb70(false)
          setCb71(false)
          setCb72(false)
          setCb73(false)
          setCb74(false)
          setCb75(false)
          setCb76(false)
          setCb77(false)
          setCb78(false)
          setCb80(false)
          setCb81(false)
          setCb82(false)
          setCb126(false)
          setCb130(false)

          setCb91(false)
          setCb92(false)
          setCb93(false)
          setCb95(false)
          setCb96(false)
          setCb97(false)
          setCb98(false)
          setCb99(false)
          setCb100(false)
          setCb101(false)
          setCb102(false)
          setCb103(false)
          setCb104(false)
          setCb105(false)
          setCb106(false)
          setCb107(false)
          setCb108(false)
          setCb109(false)
          setCb110(false)
          setCb111(false)
          setCb112(false)
          setCb113(false)
          setCb114(false)
          setCb115(false)
          setCb116(false)
          setCb117(false)
          setCb118(false)
          setCb119(false)
          setCb120(false)
          setCb121(false)
          setCb122(false)
          setCb123(false)
          setCb124(false)
          setCb125(false)
          setCb127(false)
          setCb128(false)
          setCb129(false)

          setHide(false)
          var firebaseref1=app.database().ref().child("WebUser");
          firebaseref1.once('value').then(function(snapshot) {
            var content=[]
              snapshot.forEach(function(data){
                     var val = data.val(); 
                    content.push(val)
              });
              setWebUser(content)
            });
        })
        setHide(true)
        }
        catch(err){
            console.log(err)
        }
    }
    const onChangeUpdateHandler=()=>{
        try{
            if(name===""){
                alert('Enter Name');
            
                return;
            }
        
            if(username===""){
                 alert('Enter UserName');
                 
                 return;
             }
        
        
             if(number===""){
                 alert('Enter Mobile Number');
                 
                 return;
              }
        
              if(number.length===9){
                 alert('Enter Proper Mobile Number');
                 return;
              }
        
              if(designation===""){
                 alert('Enter Designation')
                 return;
              }
        
              if(password===""){
                 alert('Enter Password');
                 return;
              }
        
              if(email===""){
                 alert('Enter Email Id');
                 
                 return;
              }
              if(selectCity==="Select")
              {
                  alert("Select City");
              }
              var $role=''
              if(cb1===true){
                $role +=order1       
              }
            if(cb2===true){
            $role +=order2
            }
            if(cb3===true){
            $role +=order3 
            }
            if(cb4===true){
            $role +=order4       
            }
            if(cb5===true){
                $role +=order5      
            }
            if(cb6===true){
               $role +=order6       
            }

            if(cb7===true){
               $role +=order7       
            }

            if(cb8===true){
               $role +=order8       
            }
            
            if(cb9===true){
                $role +=city1
            }
            if(cb10===true){
                $role +=city2
            }
            if(cb11===true){
                $role +=city3
            }
            if(cb12===true){
                $role +=city4
            }
            if(cb13===true){
                $role +=city5
              }
              if(cb14===true){
                $role +=city6
            }
    
            if(cb16===true){
                $role +=emails2
            }
            if(cb17===true){
                $role +=emails3      
            }
            if(cb18===true){
               $role +=emails4     
            }
            if(cb19===true){
                $role +=disputes1       
             }
             if(cb20===true){
                $role +=disputes2       
             }
             if(cb21===true){
                $role +=chef1       
             }
             if(cb22===true){
                $role +=chef2       
             }
             if(cb23===true){
                $role +=chef3       
             }
             if(cb24===true){
                $role +=chef4       
             }
             if(cb25===true){
                $role +=driver1       
             }
             if(cb26===true){
                $role +=driver2       
             }
             if(cb27===true){
                $role +=driver3       
             }
             if(cb28===true){
                $role +=agency1       
             }
             if(cb29===true){
                $role +=agency2       
             }
             if(cb30===true){
                $role +=franchise1      
             }
             if(cb31===true){
                $role +=franchise2      
             }
             if(cb32===true){
                $role +=approvals1       
             }
             if(cb33===true){
                $role +=approvals2       
             }
             if(cb34===true){
                $role +=approvals3       
             }
             if(cb35===true){
                $role +=approvals4       
             }
             if(cb36===true){
                $role +=approvals5       
             }
             if(cb37===true){
                $role +=approvals6       
             }
             if(cb38===true){
                $role +=approvals7      
             }
             if(cb39===true){
                $role +=approvals8       
             }
             if(cb40===true){
                $role +=approvals9       
             }
             if(cb41===true){
                $role +=approvals10       
             }
             if(cb81===true){
               $role +=approvals11      
            }
             if(cb42===true){
                $role +=payouts1       
             }
             if(cb43===true){
                $role +=payouts2    
             }
             if(cb44===true){
                $role +=payouts3       
             }
             if(cb45===true){
                $role +=payouts4       
             }
             if(cb46===true){
                $role +=payouts5       
             }
             if(cb47===true){
                $role +=payouts6       
             }
             if(cb48===true){
                $role +=payouts7       
             }
             if(cb49===true){
                $role +=payouts8       
             }
             if(cb50===true){
                $role +=documents1       
             }
             if(cb51===true){
                $role +=documents2       
             }
             if(cb52===true){
                $role +=subscription1       
             }
             if(cb53===true){
                $role +=subscription2
             }
             if(cb54===true){
                $role +=food1       
             }
             if(cb55===true){
                $role +=food2       
             }
             if(cb56===true){
                $role +=food3;       
             }
             if(cb57===true){
                $role +=food4       
             }
             if(cb58===true){
                $role +=food5       
             }
             if(cb59===true){
                $role +=food6      
             }
             if(cb60===true){
                $role +=food7       
             }
             if(cb61===true){
                $role +=food8       
             }
             if(cb91===true){
               $role +=food9       
            }
            if(cb92===true){
               $role +=food10      
            }
            if(cb93===true){
               $role +=food11      
            }
            if(cb94===true){
               $role +=food12       
            }
             if(cb62===true){
                $role +=usermanagement       
             }
             if(cb63===true){
                $role +=corporate1      
             }
             if(cb64===true){
                $role +=corporate2       
             }
           
             if(cb66===true){
                $role +=settings1       
             }
             if(cb67===true){
                $role +=settings2       
             }
             if(cb68===true){
                $role +=settings3       
             }
             if(cb69===true){
                $role +=settings4       
             }
             if(cb70===true){
                $role +=settings5       
             }
             if(cb71===true){
                $role +=settings6      
             }
             if(cb72===true){
                $role +=settings7      
             }
             if(cb73===true){
              $role +=settings8     
           }
           if(cb74===true){
              $role +=emails1       
           }
           if(cb75===true){
            $role +=disputes3       
         }
         if(cb76===true){
            $role +=disputes4       
         }
         if(cb77===true){
            $role +=chatsupport       
         }
         if(cb78===true){
            $role +=reports       
         }
         if(cb80===true){
            $role +=settings9       
         }
         if(cb82===true){
            $role +=settings10       
         }
         if(cb126===true){
            $role +=settings11      
         }
         if(cb130===true){
            $role +=settings12    
         }
         if(cb95===true){
            $role +=reports1      
         }
         if(cb96===true){
            $role +=reports2      
         }
         if(cb97===true){
            $role +=reports3      
         }
         if(cb98===true){
            $role +=reports4      
         }
         if(cb99===true){
            $role +=reports5      
         }
         if(cb100===true){
            $role +=reports6      
         }
         if(cb101===true){
            $role +=reports7      
         }
         if(cb102===true){
            $role +=reports8      
         }
         if(cb103===true){
            $role +=reports9      
         }
         if(cb104===true){
            $role +=reportsA      
         }
         if(cb105===true){
            $role +=reportsB      
         }
         if(cb106===true){
            $role +=reportsC      
         }
         if(cb107===true){
            $role +=reportsD      
         }
         if(cb108===true){
            $role +=reportsE      
         }
         if(cb109===true){
            $role +=reportsF      
         }
         if(cb110===true){
            $role +=reportsG      
         }
         if(cb111===true){
            $role +=reportsH      
         }
         if(cb112===true){
            $role +=reportsI      
         }
         if(cb113===true){
            $role +=reportsJ      
         }
         if(cb114===true){
            $role +=reportsK      
         }
         if(cb115===true){
            $role +=reportsL      
         }
         if(cb116===true){
            $role +=reportsM      
         }
         if(cb117===true){
            $role +=reportsN      
         }
         if(cb118===true){
            $role +=reportsO      
         }
         if(cb119===true){
            $role +=reportsP      
         }
         if(cb120===true){
            $role +=reportsQ      
         }
         if(cb121===true){
            $role +=reportsR      
         }
         if(cb122===true){
            $role +=reportsS      
         }
         if(cb123===true){
            $role +=reportsT      
         }
         if(cb124===true){
            $role +=reportsU      
         }
         if(cb125===true){
            $role +=reportsV      
         }
         if(cb127===true){
            $role +=reportsW   
         }
         if(cb128===true){
            $role +=reportsX 
         }
         if(cb129===true){
            $role +=reportsY
         }
         var firebaseref=app.database().ref().child("WebUser").child(username);
           firebaseref.child("UserName").set(String(username));
           firebaseref.child("Name").set(String(name));
           firebaseref.child("Password").set(String(password));
           firebaseref.child("Email").set(String(email));
           firebaseref.child("Number").set(String(number));
           firebaseref.child("Designation").set(String(designation));
           firebaseref.child("Role").set(String($role));
           firebaseref.child("City").set(selectCity);
    
          //  axios
          //  .post('https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles='+number.value+'&sms=Dear '+name.value+', Your account has been Successfully Created.%Username:'+username.value+'%Password:'+password.value+'%0aLogin URL:https://admin.mothersfood.in/Login.html%0a- Team MothersFood&senderid=mtfood&schedule=no&sending-time=& client-sms-ids=&unicode=yes&message- type=')
          //  .then(function (response) {
             Swal.fire({
                title: "Sucessfully Updated",
                icon: "success",
                dangermode: true,
              });
              setUserName("")
              setPassword("")
              setEmail("")
              setName("")
              setNumber("")
              setDesignation("")
              setCb1(false)
              setCb2(false)
              setCb3(false)
              setCb4(false)
              setCb5(false)
              setCb6(false)
              setCb7(false)
              setCb8(false)
              setCb9(false)
              setCb10(false)
              setCb11(false)
              setCb12(false)
              setCb13(false)
              setCb14(false)
              setCb16(false)
              setCb17(false)
              setCb18(false)
              setCb19(false)
              setCb20(false)
              setCb21(false)
              setCb22(false)
              setCb23(false)
              setCb24(false)
              setCb25(false)
              setCb26(false)
              setCb27(false)
              setCb28(false)
              setCb29(false)
              setCb30(false)
              setCb31(false)
              setCb32(false)
              setCb33(false)
              setCb34(false)
              setCb35(false)
              setCb36(false)
              setCb37(false)
              setCb38(false)
              setCb39(false)
              setCb40(false)
              setCb41(false)
              setCb42(false)
              setCb43(false)
              setCb44(false)
              setCb45(false)
              setCb46(false)
              setCb47(false)
              setCb48(false)
              setCb49(false)
              setCb50(false)
              setCb51(false)
              setCb52(false)
              setCb53(false)
              setCb54(false)
              setCb55(false)
              setCb56(false)
              setCb57(false)
              setCb58(false)
              setCb59(false)
              setCb60(false)
              setCb61(false)
              setCb62(false)
              setCb63(false)
              setCb64(false)
              setCb66(false)
              setCb67(false)
              setCb68(false)
              setCb69(false)
              setCb70(false)
              setCb71(false)
              setCb72(false)
              setCb73(false)
              setCb74(false)
              setCb75(false)
              setCb76(false)
              setCb77(false)
              setCb78(false)
              setCb80(false)
              setCb81(false)
              setCb82(false)
              setCb126(false)
              setCb130(false)

              setCb91(false)
              setCb92(false)
              setCb93(false)
              setCb95(false)
              setCb96(false)
              setCb97(false)
              setCb98(false)
              setCb99(false)
              setCb100(false)
              setCb101(false)
              setCb102(false)
              setCb103(false)
              setCb104(false)
              setCb105(false)
              setCb106(false)
              setCb107(false)
              setCb108(false)
              setCb109(false)
              setCb110(false)
              setCb111(false)
              setCb112(false)
              setCb113(false)
              setCb114(false)
              setCb115(false)
              setCb116(false)
              setCb117(false)
              setCb118(false)
              setCb119(false)
              setCb120(false)
              setCb121(false)
              setCb122(false)
              setCb123(false)
              setCb124(false)
              setCb125(false)
              setCb127(false)
              setCb128(false)
              setCb129(false)

              setHide(false)
            }
            catch(err){
                console.log(err)
            }
    }
    const onDeleteHandler=()=>{
        if(username===""){
            alert('Enter UserName');
            return;
      }

      var r = window.confirm("Are You Sure!");


    if (r === true) {

      app.database().ref().child("WebUser").child(username).remove();

      Swal.fire({
         title: "Sucessfully Deleted",
         icon: "success",
         dangermode: true,
      });


      setSelectUser("")
      setUserName("")
      setPassword("")
      setEmail("")
      setName("")
      setNumber("")
      setDesignation("")
      setCb1(false)
      setCb2(false)
      setCb3(false)
      setCb4(false)
      setCb5(false)
      setCb6(false)
      setCb7(false)
      setCb8(false)
      setCb9(false)
      setCb10(false)
      setCb11(false)
      setCb12(false)
      setCb13(false)
      setCb14(false)
      setCb16(false)
      setCb17(false)
      setCb18(false)
      setCb19(false)
      setCb20(false)
      setCb21(false)
      setCb22(false)
      setCb23(false)
      setCb24(false)
      setCb25(false)
      setCb26(false)
      setCb27(false)
      setCb28(false)
      setCb29(false)
      setCb30(false)
      setCb31(false)
      setCb32(false)
      setCb33(false)
      setCb34(false)
      setCb35(false)
      setCb36(false)
      setCb37(false)
      setCb38(false)
      setCb39(false)
      setCb40(false)
      setCb41(false)
      setCb42(false)
      setCb43(false)
      setCb44(false)
      setCb45(false)
      setCb46(false)
      setCb47(false)
      setCb48(false)
      setCb49(false)
      setCb50(false)
      setCb51(false)
      setCb52(false)
      setCb53(false)
      setCb54(false)
      setCb55(false)
      setCb56(false)
      setCb57(false)
      setCb58(false)
      setCb59(false)
      setCb60(false)
      setCb61(false)
      setCb62(false)
      setCb63(false)
      setCb64(false)
      setCb66(false)
      setCb67(false)
      setCb68(false)
      setCb69(false)
      setCb70(false)
      setCb71(false)
      setCb72(false)
      setCb73(false)
      setCb74(false)
      setCb75(false)
      setCb76(false)
      setCb77(false)
      setCb78(false)
      setCb80(false)
      setCb81(false)
      setCb82(false)
      setCb126(false)
      setCb130(false)

      setCb91(false)
      setCb92(false)
      setCb93(false)
      setCb95(false)
      setCb96(false)
      setCb97(false)
      setCb98(false)
      setCb99(false)
      setCb100(false)
      setCb101(false)
      setCb102(false)
      setCb103(false)
      setCb104(false)
      setCb105(false)
      setCb106(false)
      setCb107(false)
      setCb108(false)
      setCb109(false)
      setCb110(false)
      setCb111(false)
      setCb112(false)
      setCb113(false)
      setCb114(false)
      setCb115(false)
      setCb116(false)
      setCb117(false)
      setCb118(false)
      setCb119(false)
      setCb120(false)
      setCb121(false)
      setCb122(false)
      setCb123(false)
      setCb124(false)
      setCb125(false)
      setCb127(false)
      setCb128(false)
      setCb129(false)

      setHide(false)
      var firebaseref1=app.database().ref().child("WebUser");
      firebaseref1.once('value').then(function(snapshot) {
        var content=[]
          snapshot.forEach(function(data){
                 var val = data.val(); 
                content.push(val)
          });
          setWebUser(content)
        });


   }
   setHide(false)
    }

    return (
      <Fragment>
         <BreadCrumb parent={<Home/>} subparent="Setting" title="Create PromoCode"/> 
        <Container fluid={true}>
        <Row>
            <Col className="col-xl-12">
            <Card>
                <CardHeader>
                    <h6>Create User</h6>
                </CardHeader>
                <CardBody>
                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Select User</label>
                <div className="col-sm-8">
                <select className="form-control" value={selectUser} onChange={onChangeSelectUser}>
                <option value="Select">Select</option>
                {webUser.map((item,id)=><option key={id} value={item.UserName}>{item.UserName}</option>)}
                 </select>                
                 <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row" >
                <label className="col-form-label col-sm-2 text-sm-right">UserName  <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-10">
                <input type="text" className="form-control" value={username} onChange={onChangeUserName} placeholder="User Name"/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Password  <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-10">
                <input type="password" className="form-control" value={password} onChange={onChangePassword} placeholder="Password"/>
                <div className="clearfix"></div>
                </div>
                </Row>


                <Row className="form-group row">
                 <label className="col-form-label col-sm-2 text-sm-right">Name  <span style={{color: "red"}}>*</span></label>
                 <div className="col-sm-10">
                <input type="text" className="form-control" value={name} onChange={onChangeName} placeholder="Full Name"/>
                 <div className="clearfix"></div>
                </div>
                </Row>
                

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Mobile Number  <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-10">
                <input type="number" className="form-control" value={number} onChange={onChangeNumber} placeholder="Mobile Number"/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Designation <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-10">
                <input type="text" className="form-control" value={designation} onChange={onChangeDesignation} placeholder="Designation"/>
                <div className="clearfix"></div>
                </div>
                </Row>

                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">Email <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-10">
                <input type="email" className="form-control" value={email} onChange={onChangeEmail} placeholder="Designation"/>
                <div className="clearfix"></div>
                </div>
                </Row>


                <Row className="form-group row">
                <label className="col-form-label col-sm-2 text-sm-right">City <span style={{color: "red"}}>*</span></label>
                <div className="col-sm-10">
                 <select value={selectCity} onChange={onChangeSelectCity} className="form-control">
                 <option value="Active">Select</option>
                 {city.map((item,id)=><option key={id} value={item.PushId}>{item.Name}</option>)}
               
                </select>
                <div className="clearfix"></div>
                </div>
                 </Row>
              </CardBody>
            </Card>
            </Col>
        </Row>
        <fieldset class="form-group col-sm-10s">
        <Row>
         <Col class="col-md-6">
        <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(39, 110, 145)",color:"white"}}>
         Order Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb1" value={order1} checked={cb1} onChange={onChangeCB1}/>&nbsp;&nbsp;Order Dashboard<br/>
        <Input type="checkbox" id="cb2" value={order2} checked={cb2} onChange={onChangeCB2}/>&nbsp;&nbsp;New Order<br/>
        <Input type="checkbox" id="cb3" value={order3} checked={cb3} onChange={onChangeCB3}/>&nbsp;&nbsp;Processing Order<br/>
        <Input type="checkbox" id="cb3" value={order7} checked={cb7} onChange={onChangeCB7}/>&nbsp;&nbsp;Waiting for pickup<br/>
        <Input type="checkbox" id="cb4" value={order4} checked={cb4} onChange={onChangeCB4}/>&nbsp;&nbsp;Order Pickedup<br/>
         <Input type="checkbox" id="cb5" value={order5} checked={cb5} onChange={onChangeCB5}/>&nbsp;&nbsp;Delivered Order<br/>
         <Input type="checkbox" id="cb6" value={order6} checked={cb6} onChange={onChangeCB6}/>&nbsp;&nbsp;Cancelled Order<br/>
         <Input type="checkbox" id="cb6" value={order8} checked={cb8} onChange={onChangeCB8}/>&nbsp;&nbsp;Refunded Order<br/>

         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(158, 80, 77) ",color:"white"}}>
         City Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb9" value={city1} checked={cb9} onChange={onChangeCB9}/>&nbsp;&nbsp;City List<br/>
        <Input type="checkbox" id="cb10" value={city2} checked={cb10} onChange={onChangeCB10}/>&nbsp;&nbsp;Add City<br/>
        <Input type="checkbox" id="cb11" value={city3}checked={cb11} onChange={onChangeCB11}/>&nbsp;&nbsp;Zone List<br/>
        <Input type="checkbox" id="cb12" value={city4}checked={cb12} onChange={onChangeCB12}/>&nbsp;&nbsp;Add Zone<br/>
         <Input type="checkbox" id="cb13" value={city5} checked={cb13} onChange={onChangeCB13}/>&nbsp;&nbsp;Locality List<br/>
         <Input type="checkbox" id="cb14" value={city6} checked={cb14} onChange={onChangeCB14}/>&nbsp;&nbsp;Add Locality<br/>
         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(52, 32, 109) ",color:"white"}}>
         Chef Partner
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb21" value={chef1} checked={cb21} onChange={onChangeCB21}/>&nbsp;&nbsp;Chef List<br/>
        <Input type="checkbox" id="cb22" value={chef2} checked={cb22} onChange={onChangeCB22}/>&nbsp;&nbsp;Add Chef<br/>
        <Input type="checkbox" id="cb23" value={chef3} checked={cb23} onChange={onChangeCB23}/>&nbsp;&nbsp;Add Chef Vedio<br/>
        <Input type="checkbox" id="cb24" value={chef4} checked={cb24} onChange={onChangeCB24}/>&nbsp;&nbsp;Add Chef Photo<br/>
         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(167, 43, 150) ",color:"white"}}>
         Driver Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb25" value={driver1} checked={cb25} onChange={onChangeCB25}/>&nbsp;&nbsp;Delivery Patner List<br/>
        <Input type="checkbox" id="cb26" value={driver2} checked={cb26} onChange={onChangeCB26}/>&nbsp;&nbsp;Add Delivery Partner<br/>
        <Input type="checkbox" id="cb27" value={driver3} checked={cb27} onChange={onChangeCB27}/>&nbsp;&nbsp;Assign Driver<br/>
         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(37, 175, 152) ",color:"white"}}>
         Agency Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb28" value={agency1} checked={cb28} onChange={onChangeCB28}/>&nbsp;&nbsp;Agency List<br/>
        <Input type="checkbox" id="cb29" value={agency2} checked={cb29} onChange={onChangeCB29}/>&nbsp;&nbsp;Add Agency<br/>
         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(49, 190, 73) ",color:"white"}}>
         Agency Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox" id="cb30"  value={franchise1} checked={cb30} onChange={onChangeCB30}/>&nbsp;&nbsp;Working Partner List<br/>
        <Input type="checkbox" id="cb31"  value={franchise2} checked={cb31} onChange={onChangeCB31}/>&nbsp;&nbsp;Add Working Partner<br/>
         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(78, 8, 29) ",color:"white"}}>
         Approvals
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb32" value={approvals1} checked={cb32} onChange={onChangeCB32}/>&nbsp;&nbsp;Chef Approvals<br/>
        <Input type="checkbox" id="cb33" value={approvals2} checked={cb33} onChange={onChangeCB33}/>&nbsp;&nbsp;Delivery Partner Approvals<br/>
        <Input type="checkbox" id="cb34" value={approvals3} checked={cb34} onChange={onChangeCB34}/>&nbsp;&nbsp;Agency  Approvals<br/>
        <Input type="checkbox" id="cb35" value={approvals4} checked={cb35} onChange={onChangeCB35}/>&nbsp;&nbsp;Working Partner Approvals<br/>
        <Input type="checkbox" id="cb36" value={approvals5} checked={cb36} onChange={onChangeCB36}/>&nbsp;&nbsp;Food Items  Approvals<br/>
        <Input type="checkbox" id="cb37" value={approvals6} checked={cb37} onChange={onChangeCB37}/>&nbsp;&nbsp;Subscription  Approvals<br/>
        <Input type="checkbox" id="cb38" value={approvals7} checked={cb38} onChange={onChangeCB38}/>&nbsp;&nbsp;Preorder Approvals<br/>
        <Input type="checkbox" id="cb39" value={approvals8} checked={cb39} onChange={onChangeCB39}/>&nbsp;&nbsp;Location Change Requests<br/>
        <Input type="checkbox" id="cb40" value={approvals9} checked={cb40} onChange={onChangeCB40}/>&nbsp;&nbsp;Bank Change Requests<br/>
        <Input type="checkbox" id="cb41" value={approvals10} checked={cb41} onChange={onChangeCB41}/>&nbsp;&nbsp;Description Change Requests<br/>
        <Input type="checkbox" id="cb41" value={approvals11} checked={cb81} onChange={onChangeCB81}/>&nbsp;&nbsp;Chef Profile Photo Approval<br/>

         </CardBody>
         </Card>

         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(85, 74, 15) ",color:"white"}}>
         Payouts
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb42" value={payouts1} checked={cb42} onChange={onChangeCB42}/>&nbsp;&nbsp;Chef payouts<br/>
        <Input type="checkbox" id="cb43"value={payouts2} checked={cb43} onChange={onChangeCB43}/>&nbsp;&nbsp;Chef Transaction History<br/>
        <Input type="checkbox" id="cb44" value={payouts3} checked={cb44} onChange={onChangeCB44}/>&nbsp;&nbsp;Driver Payouts<br/>
        <Input type="checkbox" id="cb45" value={payouts4} checked={cb45} onChange={onChangeCB45}/>&nbsp;&nbsp;Driver Transaction History<br/>
        <Input type="checkbox" id="cb46" value={payouts5}checked={cb46} onChange={onChangeCB46}/>&nbsp;&nbsp;Working Partner  payouts<br/>
        <Input type="checkbox" id="cb47" value={payouts6} checked={cb47} onChange={onChangeCB47}/>&nbsp;&nbsp;Working Partner  Transaction History<br/>
        <Input type="checkbox" id="cb48" value={payouts7} checked={cb48} onChange={onChangeCB48}/>&nbsp;&nbsp;Agency Payouts<br/>
        <Input type="checkbox" id="cb49" value={payouts8} checked={cb49} onChange={onChangeCB49}/>&nbsp;&nbsp;Agency Transaction History<br/>
         </CardBody>
         </Card>    
         </Col>

         <Col class="col-md-6">
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(66, 10, 83) ",color:"white"}}>
         Subscription Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb52" value={subscription1} checked={cb52} onChange={onChangeCB52}/>&nbsp;&nbsp;Active Subscriptions<br/>
        <Input type="checkbox" id="cb53" value={subscription2} checked={cb53} onChange={onChangeCB53}/>&nbsp;&nbsp;Subscriptions History<br/>
         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(4, 37, 54) ",color:"white"}}>
         Food Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb54" value={food1} checked={cb54} onChange={onChangeCB54}/>&nbsp;&nbsp;Cusines List<br/>
        <Input type="checkbox" id="cb55" value={food2} checked={cb55} onChange={onChangeCB55}/>&nbsp;&nbsp;Add Cuisines<br/>
        <Input type="checkbox" id="cb56" value={food3} checked={cb56} onChange={onChangeCB56}/>&nbsp;&nbsp;Addons List<br/>
        <Input type="checkbox" id="cb57" value={food4} checked={cb57} onChange={onChangeCB57}/>&nbsp;&nbsp;Add Addons<br/>
        <Input type="checkbox" id="cb58" value={food5} checked={cb58} onChange={onChangeCB58}/>&nbsp;&nbsp;Food Category List<br/>
        <Input type="checkbox" id="cb59" value={food6} checked={cb59} onChange={onChangeCB59}/>&nbsp;&nbsp;Add Food Category<br/>
        <Input type="checkbox" id="cb60" value={food7} checked={cb60} onChange={onChangeCB60}/>&nbsp;&nbsp;Complimentary List<br/>
        <Input type="checkbox" id="cb61" value={food8} checked={cb61} onChange={onChangeCB61}/>&nbsp;&nbsp;Add Complimentary<br/>
        <Input type="checkbox" id="cb61" value={food9} checked={cb91} onChange={onChangeCB91}/>&nbsp;&nbsp; Add Food Item<br/>
        <Input type="checkbox" id="cb61" value={food10} checked={cb92} onChange={onChangeCB92}/>&nbsp;&nbsp;Add Todays Offer<br/>
        <Input type="checkbox" id="cb61" value={food11} checked={cb93} onChange={onChangeCB93}/>&nbsp;&nbsp;Add Preorders<br/>
        <Input type="checkbox" id="cb61" value={food12} checked={cb94} onChange={onChangeCB94}/>&nbsp;&nbsp;Add Chef Details<br/>

         </CardBody>
         </Card>
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"#606C72 ",color:"white"}}>
         User Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb62" value={usermanagement} checked={cb62} onChange={onChangeCB62}/>&nbsp;&nbsp; User Management<br/>
         </CardBody>
         </Card>

         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(5, 48, 30) ",color:"white"}}>
         Corporate Orders
         </CardHeader>
        <CardBody>
            <Input type="checkbox"  id="cb63" value={corporate1} checked={cb63} onChange={onChangeCB63}/>&nbsp;&nbsp;  Corporate Orders<br/>
         <Input type="checkbox" id="cb64" value={corporate2} checked={cb64} onChange={onChangeCB64}/>&nbsp;&nbsp;Corporate Order History<br/>
         </CardBody>
         </Card>

         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgba(110, 40, 13, 0.808) ",color:"white"}}>
         Settings
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb66" value={settings1} checked={cb66} onChange={onChangeCB66}/>&nbsp;&nbsp; Banners<br/>
        <Input type="checkbox" id="cb67" value={settings2} checked={cb67} onChange={onChangeCB67}/>&nbsp;&nbsp;PromoCode<br/>
        <Input type="checkbox" id="cb68" value={settings3}checked={cb68} onChange={onChangeCB68}/>&nbsp;&nbsp;Referrals<br/>
        <Input type="checkbox" id="cb69" value={settings4} checked={cb69} onChange={onChangeCB69}/>&nbsp;&nbsp;Cancellation Reason<br/>
        <Input type="checkbox" id="cb70" value={settings5}checked={cb70} onChange={onChangeCB70}/>&nbsp;&nbsp;Web user Creation<br/>
        <Input type="checkbox" id="cb71" value={settings6} checked={cb71} onChange={onChangeCB71}/>&nbsp;&nbsp;Disable Chefs<br/>
        <Input type="checkbox" id="cb72" value={settings7} checked={cb72} onChange={onChangeCB72}/>&nbsp;&nbsp;Disable Users<br/>
        <Input type="checkbox" id="cb73" value={settings8} checked={cb73} onChange={onChangeCB73}/>&nbsp;&nbsp;Disable Drivers<br/>
        <Input type="checkbox" id="cb80" value={settings9} checked={cb80} onChange={onChangeCB80}/>&nbsp;&nbsp;Mf Cash<br/>
        <Input type="checkbox" id="cb80" value={settings10} checked={cb82} onChange={onChangeCB82}/>&nbsp;&nbsp;My Cash<br/>
        <Input type="checkbox" id="cb80" value={settings11} checked={cb126} onChange={onChangeCB83}/>&nbsp;&nbsp;Partial Refund Amount<br/>
        <Input type="checkbox" id="cb80" value={settings12} checked={cb130} onChange={onChangeCB84}/>&nbsp;&nbsp;Chef/Local Banner<br/>

         </CardBody>
         </Card>

         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(58, 37, 173) ",color:"white"}}>
         Emails
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb74" value={emails1} checked={cb74} onChange={onChangeCB74}/>&nbsp;&nbsp; Newsletter<br/>
        <Input type="checkbox" id="cb16" value={emails2} checked={cb16} onChange={onChangeCB16}/>&nbsp;&nbsp;Emails<br/>
        <Input type="checkbox" id="cb17" value={emails3} checked={cb17} onChange={onChangeCB17}/>&nbsp;&nbsp;SMS<br/>
        <Input type="checkbox" id="cb18" value={emails4} checked={cb18} onChange={onChangeCB18}/>&nbsp;&nbsp;Birthday/Aniversary Reminders<br/>
        
         </CardBody>
         </Card>

         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(2, 36, 53)",color:"white"}}>
         Emails
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb19" value={disputes1} checked={cb19} onChange={onChangeCB19}/>&nbsp;&nbsp; Track Disputes<br/>
        <Input type="checkbox" id="cb20" value={disputes2} checked={cb20} onChange={onChangeCB20}/>&nbsp;&nbsp;Received Disputes<br/>
        <Input type="checkbox" id="cb75" value={disputes3} checked={cb75} onChange={onChangeCB75}/>&nbsp;&nbsp;Assign Disputes<br/>
        <Input type="checkbox" id="cb76" value={disputes4} checked={cb76} onChange={onChangeCB76}/>&nbsp;&nbsp;Status Disputes<br/>
         </CardBody>
         </Card>

         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(48, 124, 24)",color:"white"}}>
         Chat Support
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb77" value={chatsupport} checked={cb77} onChange={onChangeCB77}/>&nbsp;&nbsp;Chat Support<br/>
         </CardBody>
         </Card>

         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(133, 74, 182) ",color:"white"}}>
         Document Management
         </CardHeader>
        <CardBody>
        <Input type="checkbox"  id="cb50" value={documents1} checked={cb50} onChange={onChangeCB50}/>&nbsp;&nbsp;Chef Documents<br/>
        <Input type="checkbox" id="cb51" value={documents2} checked={cb51} onChange={onChangeCB51}/>&nbsp;&nbsp;Driver Documents<br/>
         </CardBody>
         </Card>
 
         </Col>
         
         </Row>
         </fieldset>
         <Row>
         <Col><h4 style={{color:"black",position:"relative",marginTop:"-50px"}}>Reports</h4></Col>

         </Row>
         <Row>
            
         <Col class="col-md-6">
         <Card style={{width: "18rem"}}>
         <CardHeader style={{backgroundColor:"rgb(16, 100, 51)",color:"white"}}>
         Mothers Food Users
         </CardHeader>
        <CardBody>
           <Input type="checkbox"   value={reports1} checked={cb95} onChange={onChangeCB95}/>&nbsp;&nbsp;User Report<br/>
           <Input type="checkbox"   value={reports2} checked={cb96} onChange={onChangeCB96}/>&nbsp;&nbsp;Vendor Reports<br/>
           <Input type="checkbox"   value={reports3} checked={cb97} onChange={onChangeCB97}/>&nbsp;&nbsp;Working Partner Reports<br/>
           <Input type="checkbox"   value={reports4} checked={cb98} onChange={onChangeCB98}/>&nbsp;&nbsp;Delivery Partner Reports<br/>
           <Input type="checkbox"   value={reports5} checked={cb99} onChange={onChangeCB99}/>&nbsp;&nbsp;Agency Report<br/>
           <Input type="checkbox"   value={reports6} checked={cb100} onChange={onChangeCB100}/>&nbsp;&nbsp;Admin User Reports<br/>
           <Input type="checkbox"   value={reports7} checked={cb101} onChange={onChangeCB101}/>&nbsp;&nbsp;Chef Report Download<br/>
           <Input type="checkbox"   value={reports8} checked={cb102} onChange={onChangeCB102}/>&nbsp;&nbsp;Chef Profiles<br/>
           <Input type="checkbox"   value={reports9} checked={cb103} onChange={onChangeCB103}/>&nbsp;&nbsp;InActive Chef Reports<br/>
           <Input type="checkbox"   value={reportsW} checked={cb127} onChange={onChangeCB127}/>&nbsp;&nbsp;Order Ratings Reports<br/>
           <Input type="checkbox"   value={reportsX} checked={cb129} onChange={onChangeCB129}/>&nbsp;&nbsp;Chef Commision Reports<br/>

</CardBody>
</Card>
<Card style={{width: "18rem"}}>
   < CardHeader style={{backgroundColor:"blue",color:"white"}}> Pending Reports & Requests  </CardHeader>

      <CardBody>
      <Input type="checkbox"   value={reportsF} checked={cb109} onChange={onChangeCB109}/>&nbsp;&nbsp;Requests Reports<br/>

      </CardBody>
</Card>
<Card style={{width: "18rem"}}>
   < CardHeader style={{backgroundColor:"orange",color:"white"}}>Partner Reports </CardHeader>

      <CardBody>
      <Input type="checkbox"   value={reportsI} checked={cb112} onChange={onChangeCB112}/>&nbsp;&nbsp;Partner With Us (Chef)<br/>
           <Input type="checkbox"   value={reportsJ} checked={cb113} onChange={onChangeCB113}/>&nbsp;&nbsp;Partner With Us (Delivery)<br/>
           <Input type="checkbox"   value={reportsK} checked={cb114} onChange={onChangeCB114}/>&nbsp;&nbsp;Career Reports<br/>
      </CardBody>
</Card>
<Card style={{width: "18rem"}}>
   < CardHeader style={{backgroundColor:"green",color:"white"}}>MF Cash </CardHeader>

      <CardBody>
      <Input type="checkbox"   value={reportsM} checked={cb116} onChange={onChangeCB116}/>&nbsp;&nbsp;Topup Mf Cash<br/>

      </CardBody>
</Card>
<Card style={{width: "18rem"}}>
   < CardHeader style={{backgroundColor:"rgb(85, 74, 15)",color:"white"}}>User Cart Report </CardHeader>

      <CardBody>
      <Input type="checkbox"   value={reportsV} checked={cb125} onChange={onChangeCB125}/>&nbsp;&nbsp;User Cart Reports<br/>

      </CardBody>
</Card>
</Col>
<Col>
<Card style={{width: "18rem"}}>
   <CardHeader style={{backgroundColor:"red",color:"white"}}>Payment Reports</CardHeader>
   <CardBody>
           <Input type="checkbox"   value={reportsA} checked={cb104} onChange={onChangeCB104}/>&nbsp;&nbsp;Subscription Reports<br/>
           <Input type="checkbox"   value={reportsB} checked={cb105} onChange={onChangeCB105}/>&nbsp;&nbsp;Payment Reports<br/>
           <Input type="checkbox"   value={reportsC} checked={cb106} onChange={onChangeCB106}/>&nbsp;&nbsp;Settlemet Reports<br/>
           <Input type="checkbox"   value={reportsD} checked={cb107} onChange={onChangeCB107}/>&nbsp;&nbsp;Working Partner Settlement<br/>
           <Input type="checkbox"   value={reportsE} checked={cb108} onChange={onChangeCB108}/>&nbsp;&nbsp;Agency Settlement<br/>
</CardBody>
</Card>
<Card style={{width: "18rem"}}>
   <CardHeader style={{backgroundColor:"green",color:"white"}}>Order Reports</CardHeader>
   <CardBody>
   <Input type="checkbox"   value={reportsG} checked={cb110} onChange={onChangeCB110}/>&nbsp;&nbsp;Order Reports<br/>
           <Input type="checkbox"   value={reportsH} checked={cb111} onChange={onChangeCB111}/>&nbsp;&nbsp;Cancelled Order Report<br/>
</CardBody>
</Card>
<Card style={{width: "18rem"}}>
   <CardHeader style={{backgroundColor:"blue",color:"white"}}>Membership Payments</CardHeader>
   <CardBody>
   <Input type="checkbox"   value={reportsL} checked={cb115} onChange={onChangeCB115}/>&nbsp;&nbsp;Payments<br/>
</CardBody>
</Card>
<Card style={{width: "18rem"}}>
   <CardHeader style={{backgroundColor:"rgb(2, 36, 53)",color:"white"}}>Chef Description</CardHeader>
   <CardBody>
   <Input type="checkbox"   value={reportsN} checked={cb117} onChange={onChangeCB117}/>&nbsp;&nbsp;Chef Descriptions<br/>
           <Input type="checkbox"   value={reportsO} checked={cb118} onChange={onChangeCB118}/>&nbsp;&nbsp;Chef Requests<br/>
           <Input type="checkbox"   value={reportsP} checked={cb119} onChange={onChangeCB119}/>&nbsp;&nbsp;Chef Videos<br/>
           <Input type="checkbox"   value={reportsQ} checked={cb120} onChange={onChangeCB120}/>&nbsp;&nbsp;Bulk Orders<br/>
           <Input type="checkbox"   value={reportsR} checked={cb121} onChange={onChangeCB121}/>&nbsp;&nbsp;Inactive Chef<br/>
           <Input type="checkbox"   value={reportsS} checked={cb122} onChange={onChangeCB122}/>&nbsp;&nbsp;Active Chef<br/>
           <Input type="checkbox"   value={reportsT} checked={cb123} onChange={onChangeCB123}/>&nbsp;&nbsp;Chef Approval Changes<br/>
           <Input type="checkbox"   value={reportsU} checked={cb124} onChange={onChangeCB124}/>&nbsp;&nbsp;Order Rejected<br/>
           <Input type="checkbox"   value={reportsX} checked={cb128} onChange={onChangeCB128}/>&nbsp;&nbsp;Chef Food Items<br/>
           </CardBody>

</Card>

         </Col>
         </Row>
        <Row class="form-group row">
            <div class="col-sm-10 ml-sm-auto">
                {hide===false?<Button type="submit" id="submit" className="warning" onClick={onSubmitHandler}>Submit</Button>:
                <div>
                <Button type="submit" id="update" class="warning" onClick={onChangeUpdateHandler}>Update</Button>&nbsp;
                <Button type="submit" id="delete" class="warning"onClick={onDeleteHandler}>Delete</Button>
                </div>
                }
            </div>
        </Row>
        </Container>
        </Fragment>

    )}
    export default WebUserCreation