import {
    ShoppingCart,
  
    PieChart,
    BarChart,
  
    UserPlus,
  
} from 'react-feather';
const MENUITEMS2=[
    {
       title: 'DashBoard', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/partner-ordermanagment`
       
   },

  
  
          

           {
           title: 'Chef Partner',icon:UserPlus, type: 'sub',active: false, children:[
           { path: `${process.env.PUBLIC_URL}/partner-pchef-list`, title: 'Chef List', type: 'link' },
           { path: `${process.env.PUBLIC_URL}/partner-pAdd-chef`, title: 'Add Chef ', type: 'link' },
           { path: `${process.env.PUBLIC_URL}/partner-pAdd-chef-video`, title: 'Add Chef Video ', type: 'link' },
           { path: `${process.env.PUBLIC_URL}/partner-pAdd-chef-photo`, title: 'Add Chef Photo ', type: 'link' },
       ]
   },
   
   
   
   

     
  
         
  
       

   {
       title: 'Slots Report', icon: PieChart, type: 'link', active: false, path: `${process.env.PUBLIC_URL}/partner-pSlots-reports` },

    {       title: 'Booked Slots Status', icon: PieChart, type: 'link', active: false, path: `${process.env.PUBLIC_URL}/partner-pBooked-slots-status` },

    {
       title: 'Payouts', icon: BarChart, type: 'sub', active: false, children: [
           { path: `${process.env.PUBLIC_URL}/partner-pChef-payouts`, title: ' Chef Payouts', type: 'link' },
           { path: `${process.env.PUBLIC_URL}/partner-pchef-transaction-history`, title: 'Chef Transaction History ', type: 'link' },
          
       ]
   },
]

export default MENUITEMS2