import {
    ShoppingCart,
    Clipboard,
    MapPin,
    Archive,
    Activity,
    Calendar,
    PieChart,
    BarChart,
    Paperclip,
  
    UserPlus,
    LogOut,
    Users,
    
    MessageSquare,
    Settings,
    UserCheck,  User
} from 'react-feather';
//import Email from '../../components/application/email-app/email';

 let MENUITEMS = [
    {
        title: 'Order Management', icon: ShoppingCart, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: 'Order Dashboard', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/basic`, title: 'New Order', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/processing-order`, title: 'Processing Order', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/waititng-for-pickup`, title: 'Waiting For Pickup', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/pickup-order`, title: ' Order Pickedup', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/delivered-order`, title: 'Delivered Order', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/cancelled-order`, title: 'Cancelled Order', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/refunded-order`, title: 'Refunded Order', type: 'link' }

        ]
    },
    {
        title: 'Subscriptions', icon: Clipboard, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/table/active-subscription`, title: 'Active Subscriptions', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/subscription-assigned`, title: 'Subscriptions History', type: 'link' },
        ]
    },
    {
        title: 'City Management', icon: MapPin, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/table/city-table`, title: 'City List', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/addCity`, title: 'Add City', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/zone-table`, title: 'Zone List', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/Addzone-table`, title: ' Add Zone', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/locality-table`, title: 'Locality List', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/addLocality-table`, title: 'Add Locality', type: 'link' },



        ]
    },

            {title: 'Food Management',icon:Archive, type: 'sub',active: false, children: [
                { title: 'Cuisines List', type: 'link', path: `${process.env.PUBLIC_URL}/table/cusines-table` },
                { title: 'Add Cuisines', type: 'link', path: `${process.env.PUBLIC_URL}/table/addCusines-table` },
                { title: 'Addons List', type: 'link', path: `${process.env.PUBLIC_URL}/table/addon-table` },
                { title: 'Add Addons', type: 'link', path: `${process.env.PUBLIC_URL}/table/addAddon-table` },
                { title: 'Food Category List', type: 'link', path: `${process.env.PUBLIC_URL}/table/foodCategory-table` },
                { title: 'Add Food Category', type: 'link', path: `${process.env.PUBLIC_URL}/table/addFoodCategory-table` },
                { title: 'Complimentary List', type: 'link', path: `${process.env.PUBLIC_URL}/table/complimentary-table` },
                { title: 'Add Complimentary', type: 'link', path: `${process.env.PUBLIC_URL}/table/AddComplimentary-table` },
                { title: 'Add Food Item', type: 'link', path: `${process.env.PUBLIC_URL}/table/add-food-items` },
                { title: 'Add Todays Offer', type: 'link', path: `${process.env.PUBLIC_URL}/table/add-todays-offer` },
                { title: 'Add Preorders', type: 'link', path: `${process.env.PUBLIC_URL}/table/add-preorder` },
                { title: 'Edit Chef Details', type: 'link', path: `${process.env.PUBLIC_URL}/table/edit-chef-detail-profile` },
                { title: 'Add Catering Packages', type: 'link', path: `${process.env.PUBLIC_URL}/table/add-catering-menu` },
                { title: 'Add Menu Items', type: 'link', path: `${process.env.PUBLIC_URL}/table/show-catering-list` }

              ]},


            {
            title: 'Chef Partner',icon:UserPlus, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/table/ChefList-table`, title: 'Chef List', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/addChef`, title: 'Add Chef ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/AddChefVideo-table`, title: 'Add Chef Video ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/AddChefPhoto`, title: 'Add Chef Photo ', type: 'link' },
            //advance/scrollable
        ]
    },
    {
        title: 'Driver Management', icon: UserCheck, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/table/DeliveryPartnerList-table`, title: 'Delivery Partner List ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/add-delivery-partner`, title: ' Add Delivery Partner ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/AssignDriver-table`, title: 'Assign Driver', type: 'link' },
        ]

    },
    {
        title: 'Agency Management',icon:Users, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/table/AgencyList-table`, title: 'Agency List', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/add-agency`, title: 'Add Agenecy ', type: 'link' },
        ]
    },
    
    {title: 'Working Partner Management',icon:Activity, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/table/WorkingPartnerList-table`, title: 'Working Partner List ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/add-working-partner`, title: 'Add Working Partner ', type: 'link' },
    ]
},


      {title: 'Approvals',icon:Calendar, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/approvals/chef-approvals`, title: 'Chef Approvals ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/deliveryPartner-approvals`, title: 'Delivery Partner Approvals ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/agency-approvals`, title: 'Agency Approvals ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/workingPartner-approvals`, title: 'Working Partner Approvals', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/FoodItems-approvals`, title: 'Food Item Approvals', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/Subscription-approvals`, title: 'Subscription Approvals ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/TodaysOffer-approvals`, title: 'Preorder Approvals ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/LocalityChange-Requests`, title: 'Location Change Request', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/BankChange-Request`, title: 'Bank Change Request', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/CMS-Request`, title: ' Description Change Request', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/chef-pp-approval`, title: 'Chef Profile Photo Approval', type: 'link' },

        ]
    },
    {
        title: 'Payouts', icon: BarChart, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/payouts/chef-payouts`, title: ' Chef Payouts', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/payouts/chef-transaction-history`, title: 'Chef Transaction History ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/payouts/driver-payouts`, title: 'Driver Payouts ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/payouts/driver-transaction-history`, title: 'Driver Transaction History ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/payouts/working-partner-payouts`, title: 'Working Partner Payouts ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/payouts/working-partner-transaction-history`, title: 'Working Partner Transaction History ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/payouts/agency-payouts`, title: 'Agency Payouts ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/payouts/agency-transaction-history`, title: 'Agency Transaction History ', type: 'link' },
        ]
    },
           {title: 'Document Management',icon:Paperclip, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/documentManagement/chef-documents`, title: 'Chef Documents ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/documentManagement/driver-documents`, title: 'Driver Documents', type: 'link' },
           ]
        },

          // {title: 'User Management',icon:User, type: 'link',active: false, path: `${process.env.PUBLIC_URL}/documentManagement/user-management`},
        
    
    // {
    //     title: 'Corporate Orders', icon: ShoppingCart, type: 'sub', active: false, children: [
    //         { path: `${process.env.PUBLIC_URL}/buttons/default-btn`, title: 'Corporate Orders ', type: 'link' },
    //         { path: `${process.env.PUBLIC_URL}/buttons/flatBtn`, title: 'Corporate Order History', type: 'link' },
    //     ]
    // },
         {title: 'Settings',icon:Settings, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/setting/banner`, title: 'Banners', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/PromoCodes`, title: 'Promo Codes', type: 'link' },
            // { path: `${process.env.PUBLIC_URL}/setting/Referrals`, title: 'Referrals', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/CancellationReason`, title: 'Cancellation Reasons', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/WebUserCreation`, title: 'Web User Creation', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledChef`, title: 'Disable Chefs', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledUsers`, title: 'Disable Users', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledDrivers`, title: 'Disbles Drivers', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/user-mf-cash`, title: 'MF Cash', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/my-cash`, title: 'My Cash', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/partial-refund`, title: 'Partial Refund Amount', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/chef-banner`, title: 'Chef/Local Banner', type: 'link' },

        ]
    },
    {title: 'Chat Support', icon: MessageSquare, type: 'link', active: false, path: `${process.env.PUBLIC_URL}/chat/chat-supports` },


    {
      title: 'Report', icon: PieChart , type: 'sub', active: false, children:[ 
        {
        title: 'Mothers Food Users ', icon: PieChart , type: 'sub', active: false, children:[ 
      { path: `${process.env.PUBLIC_URL}/reports/single-user-reports`, title: 'Single User Report', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/user-reports`, title: 'User Report', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-reports`, title: 'Vendor Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/working-partner-report`, title: 'Working Partner Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/delivery-partner-reports`, title: 'Delivery Partner Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/agency-report`, title: 'Agency Report', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/admin-user-report`, title: 'Admin User Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-download-report`, title: 'Chef Report Download', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-profiles-report`, title: 'Chef Profiles', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-inactive-report`, title: 'InActive Chef Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/order-ratings-report`, title: 'Order Ratings', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-commision-report`, title: 'Chef Commision', type: 'link' },

        ],
      },
      {
        title: 'Payment Report ', icon: PieChart , type: 'sub', active: false, children:[ 

      { path: `${process.env.PUBLIC_URL}/reports/susbcription-report`, title: 'Subscription Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/paymentReport`, title: 'Payment Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/settlement-report`, title: 'Settlemet Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/working-partner-settlement`, title: 'Working Partner Settlement', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/agency-settlement`, title: 'Agency Settlement', type: 'link' },
        ],
      },
      {
        title: 'Pending Reports & Requests ', icon: PieChart , type: 'sub', active: false, children:[
      { path: `${process.env.PUBLIC_URL}/reports/request-report`, title: 'Requests Reports', type: 'link' }
        ],
      },
      {
        title: 'Order Reports ', icon: PieChart , type: 'sub', active: false, children:[
      { path: `${process.env.PUBLIC_URL}/reports/order-report`, title: 'Order Reports', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/cancelled-order-status`, title: 'Cancelled Order Reports', type: 'link' },
        ],
      },
      {
        title: 'Partner Reports ', icon: PieChart , type: 'sub', active: false, children:[
      { path: `${process.env.PUBLIC_URL}/reports/partner-with-us-chef`, title: 'Partner With Us (Chef)', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/partner-with-us-deliver`, title: 'Partner With Us (Delivery)', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/career-report`, title: 'Career Reports', type: 'link' },
        ],
      },
      {
        title: 'Membership Payments ', icon: PieChart , type: 'sub', active: false, children:[
      { path: `${process.env.PUBLIC_URL}/reports/payment`, title: 'Payments', type: 'link' }
        ],
      },
      {
        title: 'MF Cash ', icon: PieChart , type: 'sub', active: false, children:[
      { path: `${process.env.PUBLIC_URL}/reports/topup-mf-cash`, title: 'Topup Mf Cash', type: 'link' }
        ],
      },
      {
        title: 'Chef Description ', icon: PieChart , type: 'sub', active: false, children:[
      { path: `${process.env.PUBLIC_URL}/reports/chef-description-report`, title: 'Chef Descriptions', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-requests-report`, title: 'Chef Requests', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-videos-report`, title: 'Chef Videos', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/bulk-orders-report`, title: 'Bulk Orders', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/inactive-chef-report`, title: 'Inactive Chef', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/active-chef`, title: 'Active Chef', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/approval-change-report`, title: 'Chef Approval Changes', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-reject-report`, title: 'Order Rejected', type: 'link' },
      { path: `${process.env.PUBLIC_URL}/reports/chef-fooditems-price`, title: 'Chef Food Items Report', type: 'link' },
        ],
      },
      {
        title: 'User Cart Report ', icon: PieChart , type: 'sub', active: false, children:[
      { path: `${process.env.PUBLIC_URL}/reports/user-cart-report`, title: 'User Cart Reports', type: 'link' }
        ],
      },

    ] 
    },
    

    {
        title: 'Log Out', icon: LogOut, type: 'link', active: true,path:`${process.env.PUBLIC_URL}/login`}

 ]

// var role = window.localStorage.getItem('SuperAdmin')
// if(role==="Yes"){

// }else{
// role = window.sessionStorage.getItem('SuperAdmin')
// if(role==="Yes"){
  
// }
// }

var userLocal=window.localStorage.getItem('role');
var roleLocal = window.localStorage.getItem('superadmin')
var userSession=window.sessionStorage.getItem('role');
var roleSession = window.sessionStorage.getItem('superadmin')

    if(userLocal != null && roleLocal !== "Yes"){
        let newData = []
        if(userLocal.includes("order")) {
            const order =   {
                title: 'Order Managment', icon: ShoppingCart, type: 'sub', badgeType: 'primary', active: false, children: []
  
            }
            newData.push(order)
          }
        if(userLocal.includes("order1")) {
            const order1 =   {
              title: 'DashBoard', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/dashboard/default`
  
            }
            newData[newData.length -1].children.push(order1)
        }
        if(userLocal.includes("order2")) {
          const order2 =   {
            title: 'New Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`

          }
          newData[newData.length -1].children.push(order2)
        } 
        if(userLocal.includes("order3")) {
            const order3 =   {
              title: 'Processing Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/processing-order`
  
            }
            newData[newData.length -1].children.push(order3)
          }
          if(userLocal.includes("order7")) {
            const order7=   {
              title: 'Waiting for pickup', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/waititng-for-pickup`
  
            }
            newData[newData.length -1].children.push(order7)
          }  
          if(userLocal.includes("order4")) {
            const order4 =   {
              title: 'Order Pickedup', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/pickup-order`
  
            }
            newData[newData.length -1].children.push(order4)
          } 
          if(userLocal.includes("order5")) {
            const order5 =   {
              title: 'Delivered Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/delivered-order`
  
            }
            newData[newData.length -1].children.push(order5)
          } 
          if(userLocal.includes("order6")) {
            const order6 =   {
              title: 'Cancelled Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/cancelled-order`
  
            }
            newData[newData.length -1].children.push(order6)
          } 
          if(userLocal.includes("order8")) {
            const order8 =   {
              title: 'Refunded Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/refunded-order`
  
            }
            newData[newData.length -1].children.push(order8)
          } 
          if(userLocal.includes("city")) {
            const city =   {
                title: 'City Management', icon: MapPin, type: 'sub', active: false, children: []
  
            }
            newData.push(city)
          }
          if(userLocal.includes("city1")) {
            const city1 =   {
              title: 'City List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/city-table`
  
            }
            newData[newData.length -1].children.push(city1)
          } 
          if(userLocal.includes("city2")) {
            const city2 =   {
              title: 'Add City', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addCity`
  
            }
            newData[newData.length -1].children.push(city2)
          } 
          if(userLocal.includes("city3")) {
            const city3 =   {
              title: 'Zone List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/zone-table`
  
            }
            newData[newData.length -1].children.push(city3)
          } 
          if(userLocal.includes("city4")) {
            const city4 =   {
              title: 'Add Zone', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/Addzone-table`
  
            }
            newData[newData.length -1].children.push(city4)
          } 
          if(userLocal.includes("city5")) {
            const city5 =   {
              title: 'Locality List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/locality-table`
  
            }
            newData[newData.length -1].children.push(city5)
          } 
          if(userLocal.includes("city6")) {
            const city6 =   {
              title: 'Add Locality', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addLocality-table`
  
            }
            newData[newData.length -1].children.push(city6)
          } 
          if(userLocal.includes("chef")) {
            const chef =   {
                title: 'Chef Partner',icon:UserPlus, type: 'sub',active: false, children:[]
  
            }
            newData.push(chef)
          }
          if(userLocal.includes("chef1")) {
            const chef1 =   {
              title: 'Chef List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/ChefList-table`
  
            }
            newData[newData.length -1].children.push(chef1)
          } 
          if(userLocal.includes("chef2")) {
            const chef2 =   {
              title: 'Add Chef', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addChef`
  
            }
            newData[newData.length -1].children.push(chef2)
          } 
          if(userLocal.includes("chef3")) {
            const chef3 =   {
              title: 'Add Chef Vedio', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AddChefVideo-table`
  
            }
            newData[newData.length -1].children.push(chef3)
          } 
          if(userLocal.includes("chef4")) {
            const chef4 =   {
              title: 'Add Chef Photo', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AddChefPhoto`
  
            }
            newData[newData.length -1].children.push(chef4)
          } 
          if(userLocal.includes("driver")) {
            const driver =   {
                title: 'Driver Management', icon: UserCheck, type: 'sub', active: false, children: []
  
            }
            newData.push(driver)
          }
          if(userLocal.includes("driver1")) {
            const driver1 =   {
              title: 'Delivery Partner List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/DeliveryPartnerList-table`
  
            }
            newData[newData.length -1].children.push(driver1)
          } 
          if(userLocal.includes("driver2")) {
            const driver2 =   {
              title: 'Add Delivery Partner', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-delivery-partner`
  
            }
            newData[newData.length -1].children.push(driver2)
          } 
          if(userLocal.includes("driver3")) {
            const driver3 =   {
              title: 'Assign Driver', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AssignDriver-table`
  
            }
            newData.push(driver3)
          } 
          if(userLocal.includes("agency")) {
            const agency =   {
                title: 'Agency Management',icon:Users, type: 'sub',active: false, children:[]
  
            }
            newData.push(agency)
          }
          if(userLocal.includes("agency1")) {
            const agency1 =   {
              title: 'Agency List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AgencyList-table`
  
            }
            newData[newData.length -1].children.push(agency1)
          } 
          if(userLocal.includes("agency2")) {
            const agency2 =   {
              title: 'Add Agency', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-agency`
  
            }
            newData[newData.length -1].children.push(agency2) 

          } 
          if(userLocal.includes("franchise")) {
            const franchise =   {
                title: 'Working Partner Management',icon:Activity, type: 'sub',active: false, children:[]
  
            }
            newData.push(franchise)
          }
          if(userLocal.includes("franchise1")) {
            const franchise1 =   {
              title: 'Working Partner List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/WorkingPartnerList-table`
  
            }
            newData[newData.length -1].children.push(franchise1)
          }
          if(userLocal.includes("franchise2")) {
            const franchise2 =   {
              title: 'Add Working Partner', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-working-partner`
  
            }
            newData[newData.length -1].children.push(franchise2)
          }
          if(userLocal.includes("approvals")) {
            const approvals =   {
                title: 'Approvals',icon:Calendar, type: 'sub',active: false, children:[]
  
            }
            newData.push(approvals)
          }
          if(userLocal.includes("approvals1")) {
            const approvals1 =   {
              title: 'Chef Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/chef-approvals`
  
            }
            newData[newData.length -1].children.push(approvals1)
          }
          if(userLocal.includes("approvals2")) {
            const approvals2 =   {
              title: 'Delivery Partner Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/deliveryPartner-approvals`
  
            }
            newData[newData.length -1].children.push(approvals2)
          }
          if(userLocal.includes("approvals3")) {
            const approvals3 =   {
              title: 'Agency  Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/agency-approvals`
  
            }
            newData[newData.length -1].children.push(approvals3)
          }
          if(userLocal.includes("approvals4")) {
            const approvals4 =   {
              title: 'Working Partner Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/workingPartner-approvals`
  
            }
            newData[newData.length -1].children.push(approvals4)
          }
          if(userLocal.includes("approvals5")) {
            const approvals5 =   {
              title: 'Food Items  Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/FoodItems-approvals`
  
            }
            newData[newData.length -1].children.push(approvals5)
          }
          if(userLocal.includes("approvals6")) {
            const approvals6 =   {
              title: 'Subscription  Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/Subscription-approvals`
  
            }
            newData[newData.length -1].children.push(approvals6)
          }
          if(userLocal.includes("approvals7")) {
            const approvals7 =   {
              title: 'Preorder Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/TodaysOffer-approvals`
  
            }
            newData[newData.length -1].children.push(approvals7)
          }
          if(userLocal.includes("approvals8")) {
            const approvals8 =   {
              title: 'Location Change Requests', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/LocalityChange-Requests`
  
            }
            newData[newData.length -1].children.push(approvals8)
          }
          if(userLocal.includes("approvals9")) {
            const approvals9 =   {
              title: 'Bank Change Requests', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/BankChange-Request`
  
            }
            newData[newData.length -1].children.push(approvals9)
          }
          if(userLocal.includes("approvalsDescription")) {
            const approvals10 =   {
              title: 'Description Change Request', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/CMS-Request`
  
            }
            newData[newData.length -1].children.push(approvals10)
          }
          if(userLocal.includes("approvalsProfile")) {
            const approvals11 =   {
              title: 'Chef Profile Photo Approval', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/chef-pp-approval`
  
            }
            newData[newData.length -1].children.push(approvals11)
          }
          if(userLocal.includes("payouts")) {
            const payouts =   {
                title: 'Payouts', icon: BarChart, type: 'sub', active: false, children: []  
            }
            newData.push(payouts)
          }
          if(userLocal.includes("payouts1")) {
            const payouts1 =   {
              title: 'Chef payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/chef-payouts`
  
            }
            newData[newData.length -1].children.push(payouts1)
          }
          if(userLocal.includes("payouts2")) {
            const payouts2 =   {
              title: 'Chef Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/chef-transaction-history`
  
            }
            newData[newData.length -1].children.push(payouts2)
          }
          if(userLocal.includes("payouts3")) {
            const payouts3 =   {
              title: 'Driver Payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/driver-payouts`
  
            }
            newData[newData.length -1].children.push(payouts3)
          }
          if(userLocal.includes("payouts4")) {
            const payouts4 =   {
              title: 'Driver Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/driver-transaction-history`
  
            }
            newData[newData.length -1].children.push(payouts4)
          }
          if(userLocal.includes("payouts5")) {
            const payouts5 =   {
              title: 'Working Partner  payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/working-partner-payouts`
  
            }
            newData[newData.length -1].children.push(payouts5)
          }
          if(userLocal.includes("payouts6")) {
            const payouts6 =   {
              title: 'Working Partner  Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/working-partner-transaction-history`
  
            }
            newData[newData.length -1].children.push(payouts6)
          }
          if(userLocal.includes("payouts7")) {
            const payouts7 =   {
              title: 'Agency Payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/agency-payouts`
  
            }
            newData[newData.length -1].children.push(payouts7)
          }
          if(userLocal.includes("payouts8")) {
            const payouts8 =   {
              title: 'Agency Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/agency-transaction-history`
  
            }
            newData[newData.length -1].children.push(payouts8)
          }
          if(userLocal.includes("documents")) {
            const documents =   {
                title: 'Document Management',icon:Paperclip, type: 'sub',active: false, children:[]
                }
            newData.push(documents)
          }
          if(userLocal.includes("documents1")) {
            const documents1 =   {
              title: 'Chef Documents', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/documentManagement/chef-documents`
  
            }
            newData[newData.length -1].children.push(documents1)
          }
          if(userLocal.includes("documents2")) {
            const documents2 =   {
              title: 'Driver Documents', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/documentManagement/driver-documents`
  
            }
            newData[newData.length -1].children.push(documents2)
          }
          if(userLocal.includes("subscription")) {
            const subscription =   {
                title: 'Subscriptions', icon: Clipboard, type: 'sub', active: false, children: []
                }
            newData.push(subscription)
          }
          if(userLocal.includes("subscription1")) {
            const subscription1 =   {
              title: 'Active Subscriptions', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/active-subscription`
  
            }
            newData[newData.length -1].children.push(subscription1)
          }
          if(userLocal.includes("subscription2")) {
            const subscription2 =   {
              title: 'Subscriptions History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/subscription-assigned`
  
            }
            newData[newData.length -1].children.push(subscription2)
          }
          if(userLocal.includes("food")) {
            const food =   {
                title: 'Food Management',icon:Archive, type: 'sub',active: false, children: []
                }
            newData.push(food)
          }
          if(userLocal.includes("food1")) {
            const food1 =   {
              title: 'Cuisines List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/cusines-table`
 
            }
            newData[newData.length -1].children.push(food1)
          }
          if(userLocal.includes("food2")) {
            const food2 =   {
              title: 'Add Cuisines', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addCusines-table`
  
            }
            newData[newData.length -1].children.push(food2)
          }
          if(userLocal.includes("food3")) {
            const food3 =   {
              title: 'Addons List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addon-table`
  
            }
            newData[newData.length -1].children.push(food3)
          }
          if(userLocal.includes("food4")) {
            const food4 =   {
              title: 'Add Addons', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addAddon-table`
  
            }
            newData[newData.length -1].children.push(food4)
          }
          if(userLocal.includes("food5")) {
            const food5 =   {
              title: 'Food Category List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/foodCategory-table`
  
            }
            newData[newData.length -1].children.push(food5)
          }
          if(userLocal.includes("food6")) {
            const food6 =   {
              title: 'Add Food Category', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addFoodCategory-table`
  
            }
            newData[newData.length -1].children.push(food6)
          }
          if(userLocal.includes("food7")) {
            const food7 =   {
              title: 'Complimentary List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/complimentary-table`
  
            }
            newData[newData.length -1].children.push(food7)
          }
          if(userLocal.includes("food8")) {
            const food8 =   {
              title: 'Add Complimentary', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AddComplimentary-table`
  
            }
            newData[newData.length -1].children.push(food8)
          }
          
          if(userLocal.includes("food9")) {
            const food9 =   {
              title: 'Add Food Item', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-food-items`
  
            }
            newData[newData.length -1].children.push(food9)
          }
          if(userLocal.includes("foodTodaysOffer")) {
            const food10 =   {
              title: 'Add Todays Offer', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-todays-offer`
  
            }
            newData[newData.length -1].children.push(food10)
          }
          if(userLocal.includes("foodPreORDER")) {
            const food11 =   {
              title: 'Add Preorders', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-preorder`
  
            }
            newData[newData.length -1].children.push(food11)
          }
          if(userLocal.includes("foodChefDetails")) {
            const food12 =   {
              title: 'Edit Chef Details', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/edit-chef-detail-profile`
  
            }
            newData[newData.length -1].children.push(food12)
          }
          // if(userLocal.includes("usermanagement")) {
          //   const usermanagement =   {
          //     title: ' User Management', icon: User, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/documentManagement/user-management`
  
          //   }
          //   newData.push(usermanagement)
          // }
          if(userLocal.includes("corporate")) {
            const corporate =   {
                title: 'Corporate Orders', icon: ShoppingCart, type: 'sub', active: false, children: []
                }
            newData.push(corporate)
          }
          if(userLocal.includes("corporate1")) {
            const corporate1 =   {
              title: 'Corporate Orders', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/buttons/default-btn`
  
            }
            newData[newData.length -1].children.push(corporate1)
          }
          if(userLocal.includes("corporate2")) {
            const corporate2 =   {
              title: 'Corporate Order History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/buttons/flatBtn`
  
            }
            newData[newData.length -1].children.push(corporate2)
          }
          if(userLocal.includes("settings")) {
            const settings =   {
                title: 'Settings',icon:Settings, type: 'sub',active: false, children:[]
                }
            newData.push(settings)
          }
          if(userLocal.includes("settings1")) {
            const settings1 =   {
              title: 'Banners', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/banner`
  
            }
            newData[newData.length -1].children.push(settings1)
          }
          if(userLocal.includes("settings2")) {
            const settings2 =   {
              title: 'PromoCode', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/PromoCodes`
  
            }
            newData[newData.length -1].children.push(settings2)
          }
          if(userLocal.includes("settings3")) {
            const settings3 =   {
              title: 'Referrals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/Referrals`
  
            }
            newData[newData.length -1].children.push(settings3)
          }
          if(userLocal.includes("settings4")) {
            const settings4 =   {
              title: 'Cancellation Reason', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/CancellationReason`
  
            }
            newData[newData.length -1].children.push(settings4)
          }
          if(userLocal.includes("settings5")) {
            const settings5 =   {
              title: 'Web user Creation', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/WebUserCreation`
  
            }
            newData[newData.length -1].children.push(settings5)
          }
          if(userLocal.includes("settings6")) {
            const settings6 =   {
              title: 'Disable Chefs', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/DisabledChef`
  
            }
            newData[newData.length -1].children.push(settings6)
          }
          if(userLocal.includes("settings7")) {
            const settings7 =   {
              title: 'Disable Users', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/DisabledUsers`
  
            }
            newData[newData.length -1].children.push(settings7)
          }
          if(userLocal.includes("settings8")) {
            const settings8 =   {
              title: 'Disable Drivers', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/DisabledDrivers`
  
            }
            newData[newData.length -1].children.push(settings8)
          }
         
          if(userLocal.includes("settings9")) {
            const settings9 =   {
              title: 'MF Cash', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/user-mf-cash`
  
            }
            newData[newData.length -1].children.push(settings9)
          }
          if(userLocal.includes("settingsMyCash")) {
            const settings10 =   {
              title: 'My Cash', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/my-cash`
  
            }
            newData[newData.length -1].children.push(settings10)
          }
          if(userLocal.includes("settingsPartial")) {
            const settings11 =   {
              title: 'Partial Refund Amount', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/partial-refund`
  
            }
            newData[newData.length -1].children.push(settings11)
          }
          if(userLocal.includes("settingsLocal")) {
            const settings12 =   {
              title: 'Chef/Local Banner', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/chef-banner`
  
            }
            newData[newData.length -1].children.push(settings12)
          }
        //   if(user.includes("emails1")) {
        //     const emails1 =   {
        //       title: 'Newsletter', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(emails1)
        //   }
        //   if(user.includes("emails2")) {
        //     const emails2 =   {
        //       title: 'Emails', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(emails2)
        //   }
        //   if(user.includes("emails3")) {
        //     const order1 =   {
        //       title: 'SMS', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(emails3)
        //   }
        //   if(user.includes("emails4")) {
        //     const order1 =   {
        //       title: 'Birthday/Aniversary Reminders', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(emails4)
        //   }
        //   if(user.includes("disputes1")) {
        //     const disputes1 =   {
        //       title: 'Track Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(disputes1)
        //   }
        //   if(user.includes("disputes2")) {
        //     const disputes2 =   {
        //       title: 'Received Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(disputes2)
        //   }
        //   if(user.includes("disputes3")) {
        //     const disputes3 =   {
        //       title: 'Assign Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(disputes3)
        //   }
        //   if(user.includes("disputes4")) {
        //     const disputes4 =   {
        //       title: 'Status Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
  
        //     }
        //     newData.push(disputes4)
        //   }
          if(userLocal.includes("chatsupport")) {
            const chatsupport =   {
              title: 'Chat Support', icon: MessageSquare, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/chat/chat-supports`
  
            }
            newData.push(chatsupport)
          }
          if(userLocal.includes("reports")) {
            const reports =   {
              title: 'Reports', icon: PieChart,type: 'sub',active: false, children:[]
  
            }
            newData.push(reports)
          }
          if(userLocal.includes("reportsUsers")) {
            const reportsUsers =   {
              title: 'MothersFood Users', icon: PieChart,type: 'sub',active: false, children:[]
  
            }
             newData[newData.length -1].children.push(reportsUsers)
          }
          if(userLocal.includes("reportsY")) {
            const reportsY =   {
              title: 'Single User Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/single-user-reports`
  
            }
            newData[newData.length -1].children.push(reportsY)
          }
          if(userLocal.includes("reports1")) {
            const reports1 =   {
              title: 'User Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/user-reports`
  
            }
            newData[newData.length -1].children.push(reports1)
          }
          if(userLocal.includes("reports2")) {
            const reports2 =   {
              title: 'Vendor Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-reports`
  
            }
            newData[newData.length -1].children.push(reports2)
          }
          if(userLocal.includes("reports3")) {
            const reports3 =   {
              title: 'Working Partner Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/working-partner-report`
  
            }
            newData[newData.length -1].children.push(reports3)
          }
          if(userLocal.includes("reports4")) {
            const reports4 =   {
              title: 'Delivery Partner Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/delivery-partner-reports`
  
            }
            newData[newData.length -1].children.push(reports4)
          }
          if(userLocal.includes("reports5")) {
            const reports5 =   {
              title: 'Agency Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/agency-report`
  
            }
            newData[newData.length -1].children.push(reports5)
          }
          if(userLocal.includes("reports6")) {
            const reports6 =   {
              title: 'Admin User Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/admin-user-report`
  
            }
            newData[newData.length -1].children.push(reports6)
          }
          if(userLocal.includes("reports7")) {
            const reports7 =   {
              title: 'Chef Report Download', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-download-report`
  
            }
            newData[newData.length -1].children.push(reports7)
          }
          if(userLocal.includes("reports8")) {
            const reports8 =   {
              title: 'Chef Profiles', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-profiles-report`
  
            }
            newData[newData.length -1].children.push(reports8)
          }
          if(userLocal.includes("reportsW")) {
            const reportsW =   {
              title: 'Order Ratings', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/order-ratings-report`
  
            }
            newData[newData.length -1].children.push(reportsW)
          }
          if(userLocal.includes("reportsY")) {
            const reportsX =   {
              title: 'Chef Commision ', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-commision-report`
  
            }
            newData[newData.length -1].children.push(reportsX)
          }
          if(userLocal.includes("reports9")) {
            const reports9 =   {
              title: 'InActive Chef Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-inactive-report`
  
            }
            newData[newData.length -1].children.push(reports9)
          }
          if(userLocal.includes("reportsA")) {
            const reportsA =   {
              title: 'Subscription Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/susbcription-report`
  
            }
            newData[newData.length -1].children.push(reportsA)
          }
          if(userLocal.includes("reportsB")) {
            const reportsB =   {
              title: 'Payment Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/paymentReport`
  
            }
            newData[newData.length -1].children.push(reportsB)
          }
          if(userLocal.includes("reportsC")) {
            const reportsC =   {
              title: 'Settlemet Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/settlement-report`
  
            }
            newData[newData.length -1].children.push(reportsC)
          }
          if(userLocal.includes("reportsD")) {
            const reportsD =   {
              title: 'Working Partner Settlement', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/working-partner-settlement`
  
            }
            newData[newData.length -1].children.push(reportsD)
          }
          if(userLocal.includes("reportsE")) {
            const reportsE =   {
              title: 'Agency Settlement', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/agency-settlement`
  
            }
            newData[newData.length -1].children.push(reportsE)
          }
          if(userLocal.includes("reportsF")) {
            const reportsF =   {
              title: 'Requests Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/request-report`
  
            }
            newData[newData.length -1].children.push(reportsF)
          }
          if(userLocal.includes("reportsG")) {
            const reportsG =   {
              title: 'Order Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/order-report`
  
            }
            newData[newData.length -1].children.push(reportsG)
          }
          if(userLocal.includes("reportsH")) {
            const reportsH =   {
              title: 'Cancelled Order Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/cancelled-order-status`
  
            }
            newData[newData.length -1].children.push(reportsH)
          }
          if(userLocal.includes("reportsI")) {
            const reportsI =   {
              title: 'Partner With Us (Chef)', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/partner-with-us-chef`
  
            }
            newData[newData.length -1].children.push(reportsI)
          }
          if(userLocal.includes("reportsJ")) {
            const reportsJ =   {
              title: 'Partner With Us (Delivery)', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/partner-with-us-deliver`
  
            }
            newData[newData.length -1].children.push(reportsJ)
          }
          if(userLocal.includes("reportsK")) {
            const reportsK =   {
              title: 'Career Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/career-report`
  
            }
            newData[newData.length -1].children.push(reportsK)
          }
          if(userLocal.includes("reportsL")) {
            const reportsL =   {
              title: 'Payments', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/payment`
  
            }
            newData[newData.length -1].children.push(reportsL)
          }
          if(userLocal.includes("reportsM")) {
            const reportsM =   {
              title: 'Topup Mf Cash', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}reports/topup-mf-cash`
  
            }
            newData[newData.length -1].children.push(reportsM)
          }
          if(userLocal.includes("reportsN")) {
            const reportsN =   {
              title: 'Chef Descriptions', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-description-report`
  
            }
            newData[newData.length -1].children.push(reportsN)
          }
          if(userLocal.includes("reportsO")) {
            const reportsO =   {
              title: 'Chef Requests', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-requests-report`
  
            }
            newData[newData.length -1].children.push(reportsO)
          }
          if(userLocal.includes("reportsP")) {
            const reportsP =   {
              title: 'Chef Videos', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-videos-report`
  
            }
            newData[newData.length -1].children.push(reportsP)
          }
          if(userLocal.includes("reportsQ")) {
            const reportsQ =   {
              title: 'Bulk Orders', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/bulk-orders-report`
  
            }
            newData[newData.length -1].children.push(reportsQ)
          }
          if(userLocal.includes("reportsR")) {
            const reportsR =   {
              title: 'Inactive Chef', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/inactive-chef-report`
  
            }
            newData[newData.length -1].children.push(reportsR)
          }
          if(userLocal.includes("reportsS")) {
            const reportsS =   {
              title: 'Active Chef', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/reports/active-chef`
  
            }
            newData[newData.length -1].children.push(reportsS)
          }
          if(userLocal.includes("reportsT")) {
            const reportsT =   {
              title: 'Chef Approval Changes', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/approval-change-report`
  
            }
            newData[newData.length -1].children.push(reportsT)
          }
          if(userLocal.includes("reportsU")) {
            const reportsU =   {
              title: 'Order Rejected', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-reject-report`
  
            }
            newData[newData.length -1].children.push(reportsU)
          }
          if(userLocal.includes("reportsV")) {
            const reportsV =   {
              title: 'User Cart Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/user-cart-report`
  
            }
            newData[newData.length -1].children.push(reportsV)
          }
          if(userLocal.includes("reportsX")) {
            const reportsX =   {
              title: 'Chef Food Items', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-fooditems-price`
  
            }
            newData[newData.length -1].children.push(reportsX)
          }
          MENUITEMS = newData
        }else if(userSession != null && roleSession !== "Yes") {
        let newData = []
         
            if(userSession.includes("order")) {
                const order =   {
                    title: 'Order Managment', icon: ShoppingCart, type: 'sub', badgeType: 'primary', active: false, children: []
      
                }
                newData.push(order)
              }
            if(userSession.includes("order1")) {
                const order1 =   {
                  title: 'DashBoard', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/dashboard/default`
      
                }
                newData[newData.length -1].children.push(order1)
            }
            if(userSession.includes("order2")) {
              const order2 =   {
                title: 'New Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
    
              }
              newData[newData.length -1].children.push(order2)
            } 
            if(userSession.includes("order3")) {
                const order3 =   {
                  title: 'Processing Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/processing-order`
      
                }
                newData[newData.length -1].children.push(order3)
              }
              if(userSession.includes("order7")) {
                const order4=   {
                  title: 'Waiting for pickup', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/waititng-for-pickup`
      
                }
                newData[newData.length -1].children.push(order4)
              }  
              if(userSession.includes("order4")) {
                const order5 =   {
                  title: 'Order Pickedup', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/pickup-order`
      
                }
                newData[newData.length -1].children.push(order5)
              } 
              if(userSession.includes("order5")) {
                const order6 =   {
                  title: 'Delivered Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/delivered-order`
      
                }
                newData[newData.length -1].children.push(order6)
              } 
              if(userSession.includes("order6")) {
                const order7 =   {
                  title: 'Cancelled Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/cancelled-order`
      
                }
                newData[newData.length -1].children.push(order7)
              } 
              if(userSession.includes("order8")) {
                const order8 =   {
                  title: 'Refunded Order', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/refunded-order`
      
                }
                newData[newData.length -1].children.push(order8)
              } 
              if(userSession.includes("city")) {
                const city =   {
                    title: 'City Management', icon: MapPin, type: 'sub', active: false, children: []
      
                }
                newData.push(city)
              }
              if(userSession.includes("city1")) {
                const city1 =   {
                  title: 'City List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/city-table`
      
                }
                newData[newData.length -1].children.push(city1)
              } 
              if(userSession.includes("city2")) {
                const city2 =   {
                  title: 'Add City', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addCity`
      
                }
                newData[newData.length -1].children.push(city2)
              } 
              if(userSession.includes("city3")) {
                const city3 =   {
                  title: 'Zone List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/zone-table`
      
                }
                newData[newData.length -1].children.push(city3)
              } 
              if(userSession.includes("city4")) {
                const city4 =   {
                  title: 'Add Zone', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/Addzone-table`
      
                }
                newData[newData.length -1].children.push(city4)
              } 
              if(userSession.includes("city5")) {
                const city5 =   {
                  title: 'Locality List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/locality-table`
      
                }
                newData[newData.length -1].children.push(city5)
              } 
              if(userSession.includes("city6")) {
                const city6 =   {
                  title: 'Add Locality', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addLocality-table`
      
                }
                newData[newData.length -1].children.push(city6)
              } 
              if(userSession.includes("chef")) {
                const chef =   {
                    title: 'Chef Partner',icon:UserPlus, type: 'sub',active: false, children:[]
      
                }
                newData.push(chef)
              }
              if(userSession.includes("chef1")) {
                const chef1 =   {
                  title: 'Chef List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/ChefList-table`
      
                }
                newData[newData.length -1].children.push(chef1)
              } 
              if(userSession.includes("chef2")) {
                const chef2 =   {
                  title: 'Add Chef', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addChef`
      
                }
                newData[newData.length -1].children.push(chef2)
              } 
              if(userSession.includes("chef3")) {
                const chef3 =   {
                  title: 'Add Chef Vedio', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AddChefVideo-table`
      
                }
                newData[newData.length -1].children.push(chef3)
              } 
              if(userSession.includes("chef4")) {
                const chef4 =   {
                  title: 'Add Chef Photo', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AddChefPhoto`
      
                }
                newData[newData.length -1].children.push(chef4)
              } 
              if(userSession.includes("driver")) {
                const driver =   {
                    title: 'Driver Management', icon: UserCheck, type: 'sub', active: false, children: []
      
                }
                newData.push(driver)
              }
              if(userSession.includes("driver1")) {
                const driver1 =   {
                  title: 'Delivery Partner List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/DeliveryPartnerList-table`
      
                }
                newData[newData.length -1].children.push(driver1)
              } 
              if(userSession.includes("driver2")) {
                const driver2 =   {
                  title: 'Add Delivery Partner', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-delivery-partner`
      
                }
                newData[newData.length -1].children.push(driver2)
              } 
              if(userSession.includes("driver3")) {
                const driver3 =   {
                  title: 'Assign Driver', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AssignDriver-table`
      
                }
                newData.push(driver3)
              } 
              if(userSession.includes("agency")) {
                const agency =   {
                    title: 'Agency Management',icon:Users, type: 'sub',active: false, children:[]
      
                }
                newData.push(agency)
              }
              if(userSession.includes("agency1")) {
                const agency1 =   {
                  title: 'Agency List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AgencyList-table`
      
                }
                newData[newData.length -1].children.push(agency1)
              } 
              if(userSession.includes("agency2")) {
                const agency2 =   {
                  title: 'Add Agency', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-agency`
      
                }
                newData[newData.length -1].children.push(agency2) 
    
              } 
              if(userSession.includes("franchise")) {
                const franchise =   {
                    title: 'Working Partner Management',icon:Activity, type: 'sub',active: false, children:[]
      
                }
                newData.push(franchise)
              }
              if(userSession.includes("franchise1")) {
                const franchise1 =   {
                  title: 'Working Partner List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/WorkingPartnerList-table`
      
                }
                newData[newData.length -1].children.push(franchise1)
              }
              if(userSession.includes("franchise2")) {
                const franchise2 =   {
                  title: 'Add Working Partner', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-working-partner`
      
                }
                newData[newData.length -1].children.push(franchise2)
              }
              if(userSession.includes("approvals")) {
                const approvals =   {
                    title: 'Approvals',icon:Calendar, type: 'sub',active: false, children:[]
      
                }
                newData.push(approvals)
              }
              if(userSession.includes("approvals1")) {
                const approvals1 =   {
                  title: 'Chef Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/chef-approvals`
      
                }
                newData[newData.length -1].children.push(approvals1)
              }
              if(userSession.includes("approvals2")) {
                const approvals2 =   {
                  title: 'Delivery Partner Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/deliveryPartner-approvals`
      
                }
                newData[newData.length -1].children.push(approvals2)
              }
              if(userSession.includes("approvals3")) {
                const approvals3 =   {
                  title: 'Agency  Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/agency-approvals`
      
                }
                newData[newData.length -1].children.push(approvals3)
              }
              if(userSession.includes("approvals4")) {
                const approvals4 =   {
                  title: 'Working Partner Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/workingPartner-approvals`
      
                }
                newData[newData.length -1].children.push(approvals4)
              }
              if(userSession.includes("approvals5")) {
                const approvals5 =   {
                  title: 'Food Items  Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/FoodItems-approvals`
      
                }
                newData[newData.length -1].children.push(approvals5)
              }
              if(userSession.includes("approvals6")) {
                const approvals6 =   {
                  title: 'Subscription  Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/Subscription-approvals`
      
                }
                newData[newData.length -1].children.push(approvals6)
              }
              if(userSession.includes("approvals7")) {
                const approvals7 =   {
                  title: 'Preorder Approvals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/TodaysOffer-approvals`
      
                }
                newData[newData.length -1].children.push(approvals7)
              }
              if(userSession.includes("approvals8")) {
                const approvals8 =   {
                  title: 'Location Change Requests', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/LocalityChange-Requests`
      
                }
                newData[newData.length -1].children.push(approvals8)
              }
              if(userSession.includes("approvals9")) {
                const approvals9 =   {
                  title: 'Bank Change Requests', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/BankChange-Request`
      
                }
                newData[newData.length -1].children.push(approvals9)
              }
              if(userSession.includes("approvalsDescription")) {
                const approvals10 =   {
                  title: 'Description Change Request', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/CMS-Request`
      
                }
                newData[newData.length -1].children.push(approvals10)
              }
              if(userSession.includes("approvalsProfile")) {
                const approvals11 =   {
                  title: 'Chef Profile Photo Approval', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/approvals/chef-pp-approval`
      
                }
                newData[newData.length -1].children.push(approvals11)
              }
              if(userSession.includes("payouts")) {
                const payouts =   {
                    title: 'Payouts', icon: BarChart, type: 'sub', active: false, children: []  
                }
                newData.push(payouts)
              }
              if(userSession.includes("payouts1")) {
                const payouts1 =   {
                  title: 'Chef payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/chef-payouts`
      
                }
                newData[newData.length -1].children.push(payouts1)
              }
              if(userSession.includes("payouts2")) {
                const payouts2 =   {
                  title: 'Chef Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/chef-transaction-history`
      
                }
                newData[newData.length -1].children.push(payouts2)
              }
              if(userSession.includes("payouts3")) {
                const payouts3 =   {
                  title: 'Driver Payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/driver-payouts`
      
                }
                newData[newData.length -1].children.push(payouts3)
              }
              if(userSession.includes("payouts4")) {
                const payouts4 =   {
                  title: 'Driver Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/driver-transaction-history`
      
                }
                newData[newData.length -1].children.push(payouts4)
              }
              if(userSession.includes("payouts5")) {
                const payouts5 =   {
                  title: 'Working Partner  payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/working-partner-payouts`
      
                }
                newData[newData.length -1].children.push(payouts5)
              }
              if(userSession.includes("payouts6")) {
                const payouts6 =   {
                  title: 'Working Partner  Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/working-partner-transaction-history`
      
                }
                newData[newData.length -1].children.push(payouts6)
              }
              if(userSession.includes("payouts7")) {
                const payouts7 =   {
                  title: 'Agency Payouts', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/agency-payouts`
      
                }
                newData[newData.length -1].children.push(payouts7)
              }
              if(userSession.includes("payouts8")) {
                const payouts8 =   {
                  title: 'Agency Transaction History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/payouts/agency-transaction-history`
      
                }
                newData[newData.length -1].children.push(payouts8)
              }
              if(userSession.includes("documents")) {
                const documents =   {
                    title: 'Document Management',icon:Paperclip, type: 'sub',active: false, children:[]
                    }
                newData.push(documents)
              }
              if(userSession.includes("documents1")) {
                const documents1 =   {
                  title: 'Chef Documents', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/documentManagement/chef-documents`
      
                }
                newData[newData.length -1].children.push(documents1)
              }
              if(userSession.includes("documents2")) {
                const documents2 =   {
                  title: 'Driver Documents', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/documentManagement/driver-documents`
      
                }
                newData[newData.length -1].children.push(documents2)
              }
              if(userSession.includes("subscription")) {
                const subscription =   {
                    title: 'Subscriptions', icon: Clipboard, type: 'sub', active: false, children: []
                    }
                newData.push(subscription)
              }
              if(userSession.includes("subscription1")) {
                const subscription1 =   {
                  title: 'Active Subscriptions', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/active-subscription`
      
                }
                newData[newData.length -1].children.push(subscription1)
              }
              if(userSession.includes("subscription2")) {
                const subscription2 =   {
                  title: 'Subscriptions History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/subscription-assigned`
      
                }
                newData[newData.length -1].children.push(subscription2)
              }
              if(userSession.includes("food")) {
                const food =   {
                    title: 'Food Management',icon:Archive, type: 'sub',active: false, children: []
                    }
                newData.push(food)
              }
              if(userSession.includes("food1")) {
                const food1 =   {
                  title: 'Cuisines List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/cusines-table`
     
                }
                newData[newData.length -1].children.push(food1)
              }
              if(userSession.includes("food2")) {
                const food2 =   {
                  title: 'Add Cuisines', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addCusines-table`
      
                }
                newData[newData.length -1].children.push(food2)
              }
              if(userSession.includes("food3")) {
                const food3 =   {
                  title: 'Addons List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addon-table`
      
                }
                newData[newData.length -1].children.push(food3)
              }
              if(userSession.includes("food4")) {
                const food4 =   {
                  title: 'Add Addons', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addAddon-table`
      
                }
                newData[newData.length -1].children.push(food4)
              }
              if(userSession.includes("food5")) {
                const food5 =   {
                  title: 'Food Category List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/foodCategory-table`
      
                }
                newData[newData.length -1].children.push(food5)
              }
              if(userSession.includes("food6")) {
                const food6 =   {
                  title: 'Add Food Category', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/addFoodCategory-table`
      
                }
                newData[newData.length -1].children.push(food6)
              }
              if(userSession.includes("food7")) {
                const food7 =   {
                  title: 'Complimentary List', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/complimentary-table`
      
                }
                newData[newData.length -1].children.push(food7)
              }
              if(userSession.includes("food8")) {
                const food8 =   {
                  title: 'Add Complimentary', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/AddComplimentary-table`
      
                }
                newData[newData.length -1].children.push(food8)
              }
              if(userSession.includes("food9")) {
                const food9 =   {
                  title: 'Add Food Item', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-food-items`
      
                }
                newData[newData.length -1].children.push(food9)
              }
              if(userSession.includes("foodTodaysOffer")) {
                const food10 =   {
                  title: 'Add Todays Offer', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-todays-offer`
      
                }
                newData[newData.length -1].children.push(food10)
              }
              if(userSession.includes("foodPreORDER")) {
                const food11 =   {
                  title: 'Add Preorders', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/add-preorder`
      
                }
                newData[newData.length -1].children.push(food11)
              }
              if(userSession.includes("foodChefDetails")) {
                const food12 =   {
                  title: 'Edit Chef Details', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/edit-chef-detail-profile`
      
                }
                newData[newData.length -1].children.push(food12)
              }
              // if(userSession.includes("usermanagement")) {
              //   const usermanagement =   {
              //     title: ' User Management', icon: User, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/documentManagement/user-management`
      
              //   }
              //   newData.push(usermanagement)
              // }
              if(userSession.includes("corporate")) {
                const corporate =   {
                    title: 'Corporate Orders', icon: ShoppingCart, type: 'sub', active: false, children: []
                    }
                newData.push(corporate)
              }
              if(userSession.includes("corporate1")) {
                const corporate1 =   {
                  title: 'Corporate Orders', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/buttons/default-btn`
      
                }
                newData[newData.length -1].children.push(corporate1)
              }
              if(userSession.includes("corporate2")) {
                const corporate2 =   {
                  title: 'Corporate Order History', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/buttons/flatBtn`
      
                }
                newData[newData.length -1].children.push(corporate2)
              }
              if(userSession.includes("settings")) {
                const settings =   {
                    title: 'Settings',icon:Settings, type: 'sub',active: false, children:[]
                    }
                newData.push(settings)
              }
              if(userSession.includes("settings1")) {
                const settings1 =   {
                  title: 'Banners', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/banner`
      
                }
                newData[newData.length -1].children.push(settings1)
              }
              if(userSession.includes("settings2")) {
                const settings2 =   {
                  title: 'PromoCode', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/PromoCodes`
      
                }
                newData[newData.length -1].children.push(settings2)
              }
              if(userSession.includes("settings3")) {
                const settings3 =   {
                  title: 'Referrals', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/Referrals`
      
                }
                newData[newData.length -1].children.push(settings3)
              }
              if(userSession.includes("settings4")) {
                const settings4 =   {
                  title: 'Cancellation Reason', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/CancellationReason`
      
                }
                newData[newData.length -1].children.push(settings4)
              }
              if(userSession.includes("settings5")) {
                const settings5 =   {
                  title: 'Web user Creation', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/WebUserCreation`
      
                }
                newData[newData.length -1].children.push(settings5)
              }
              if(userSession.includes("settings6")) {
                const settings6 =   {
                  title: 'Disable Chefs', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/DisabledChef`
      
                }
                newData[newData.length -1].children.push(settings6)
              }
              if(userSession.includes("settings7")) {
                const settings7 =   {
                  title: 'Disable Users', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/DisabledUsers`
      
                }
                newData[newData.length -1].children.push(settings7)
              }
              if(userSession.includes("settings8")) {
                const settings8 =   {
                  title: 'Disable Drivers', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/DisabledDrivers`
      
                }
                newData[newData.length -1].children.push(settings8)
              }
             
              if(userSession.includes("settings9")) {
                const settings9 =   {
                  title: 'MF Cash', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/user-mf-cash`
      
                }
                newData[newData.length -1].children.push(settings9)
              }
              if(userSession.includes("settingsMyCash")) {
                const settings10 =   {
                  title: 'My Cash', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/my-cash`
      
                }
                newData[newData.length -1].children.push(settings10)
              }
              if(userSession.includes("settingsPartial")) {
                const settings11 =   {
                  title: 'Partial Refund Amount', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/partial-refund`
      
                }
                newData[newData.length -1].children.push(settings11)
              }
              if(userSession.includes("settingLocal")) {
                const settings12 =   {
                  title: 'Chef/Local Banner', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/setting/chef-banner`
      
                }
                newData[newData.length -1].children.push(settings12)
              }
            //   if(user.includes("emails1")) {
            //     const emails1 =   {
            //       title: 'Newsletter', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(emails1)
            //   }
            //   if(user.includes("emails2")) {
            //     const emails2 =   {
            //       title: 'Emails', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(emails2)
            //   }
            //   if(user.includes("emails3")) {
            //     const order1 =   {
            //       title: 'SMS', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(emails3)
            //   }
            //   if(user.includes("emails4")) {
            //     const order1 =   {
            //       title: 'Birthday/Aniversary Reminders', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(emails4)
            //   }
            //   if(user.includes("disputes1")) {
            //     const disputes1 =   {
            //       title: 'Track Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(disputes1)
            //   }
            //   if(user.includes("disputes2")) {
            //     const disputes2 =   {
            //       title: 'Received Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(disputes2)
            //   }
            //   if(user.includes("disputes3")) {
            //     const disputes3 =   {
            //       title: 'Assign Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(disputes3)
            //   }
            //   if(user.includes("disputes4")) {
            //     const disputes4 =   {
            //       title: 'Status Disputes', icon: ShoppingCart, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/table/basic`
      
            //     }
            //     newData.push(disputes4)
            //   }
              if(userSession.includes("chatsupport")) {
                const chatsupport =   {
                  title: 'Chat Support', icon: MessageSquare, type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/chat/chat-supports`
      
                }
                newData.push(chatsupport)
              }
              if(userSession.includes("reports")) {
                const reports =   {
                  title: 'Reports', icon: PieChart,type: 'sub',active: false, children:[]
      
                }
                newData.push(reports)
              }
              if(userSession.includes("reportsUsers")) {
                const reportsUsers =   {
                  title: 'MothersFood Users', icon: PieChart,type: 'sub',active: false, children:[]
      
                }
                 newData[newData.length -1].children.push(reportsUsers)
              }
              if(userSession.includes("reportsY")) {
                const reportsY =   {
                  title: 'Single User Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/single-user-reports`
      
                }
                newData[newData.length -1].children.push(reportsY)
              }
              if(userSession.includes("reports1")) {
                const reports1 =   {
                  title: 'User Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/user-reports`
      
                }
                newData[newData.length -1].children.push(reports1)
              }
              if(userSession.includes("reports2")) {
                const reports2 =   {
                  title: 'Vendor Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-reports`
      
                }
                newData[newData.length -1].children.push(reports2)
              }
              if(userSession.includes("reports3")) {
                const reports3 =   {
                  title: 'Working Partner Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/working-partner-report`
      
                }
                newData[newData.length -1].children.push(reports3)
              }
              if(userSession.includes("reports4")) {
                const reports4 =   {
                  title: 'Delivery Partner Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/delivery-partner-reports`
      
                }
                newData[newData.length -1].children.push(reports4)
              }
              if(userSession.includes("reports5")) {
                const reports5 =   {
                  title: 'Agency Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/agency-report`
      
                }
                newData[newData.length -1].children.push(reports5)
              }
              if(userSession.includes("reports6")) {
                const reports6 =   {
                  title: 'Admin User Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/admin-user-report`
      
                }
                newData[newData.length -1].children.push(reports6)
              }
              if(userSession.includes("reports7")) {
                const reports7 =   {
                  title: 'Chef Report Download', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-download-report`
      
                }
                newData[newData.length -1].children.push(reports7)
              }
              if(userSession.includes("reports8")) {
                const reports8 =   {
                  title: 'Chef Profiles', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-profiles-report`
      
                }
                newData[newData.length -1].children.push(reports8)
              }
              if(userSession.includes("reportsW")) {
                const reportsW =   {
                  title: 'Order Ratings', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/order-ratings-report`
      
                }
                newData[newData.length -1].children.push(reportsW)
              }

              if(userSession.includes("reportsY")) {
                const reportsX =   {
                  title: 'Chef Commision ', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-commision-report`
      
                }
                newData[newData.length -1].children.push(reportsX)
              }
              if(userSession.includes("reports9")) {
                const reports9 =   {
                  title: 'InActive Chef Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-inactive-report`
      
                }
                newData[newData.length -1].children.push(reports9)
              }
              if(userSession.includes("reportsA")) {
                const reportsA =   {
                  title: 'Subscription Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/susbcription-report`
      
                }
                newData[newData.length -1].children.push(reportsA)
              }
              if(userSession.includes("reportsB")) {
                const reportsB =   {
                  title: 'Payment Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/paymentReport`
      
                }
                newData[newData.length -1].children.push(reportsB)
              }
              if(userSession.includes("reportsC")) {
                const reportsC =   {
                  title: 'Settlemet Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/settlement-report`
      
                }
                newData[newData.length -1].children.push(reportsC)
              }
              if(userSession.includes("reportsD")) {
                const reportsD =   {
                  title: 'Working Partner Settlement', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/working-partner-settlement`
      
                }
                newData[newData.length -1].children.push(reportsD)
              }
              if(userSession.includes("reportsE")) {
                const reportsE =   {
                  title: 'Agency Settlement', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/agency-settlement`
      
                }
                newData[newData.length -1].children.push(reportsE)
              }
              if(userSession.includes("reportsF")) {
                const reportsF =   {
                  title: 'Requests Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/request-report`
      
                }
                newData[newData.length -1].children.push(reportsF)
              }
              if(userSession.includes("reportsG")) {
                const reportsG =   {
                  title: 'Order Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/order-report`
      
                }
                newData[newData.length -1].children.push(reportsG)
              }
              if(userSession.includes("reportsH")) {
                const reportsH =   {
                  title: 'Cancelled Order Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/cancelled-order-status`
      
                }
                newData[newData.length -1].children.push(reportsH)
              }
              if(userSession.includes("reportsI")) {
                const reportsI =   {
                  title: 'Partner With Us (Chef)', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/partner-with-us-chef`
      
                }
                newData[newData.length -1].children.push(reportsI)
              }
              if(userSession.includes("reportsJ")) {
                const reportsJ =   {
                  title: 'Partner With Us (Delivery)', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/partner-with-us-deliver`
      
                }
                newData[newData.length -1].children.push(reportsJ)
              }
              if(userSession.includes("reportsK")) {
                const reportsK =   {
                  title: 'Career Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/career-report`
      
                }
                newData[newData.length -1].children.push(reportsK)
              }
              if(userSession.includes("reportsL")) {
                const reportsL =   {
                  title: 'Payments', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/payment`
      
                }
                newData[newData.length -1].children.push(reportsL)
              }
              if(userSession.includes("reportsM")) {
                const reportsM =   {
                  title: 'Topup Mf Cash', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}reports/topup-mf-cash`
      
                }
                newData[newData.length -1].children.push(reportsM)
              }
              if(userSession.includes("reportsN")) {
                const reportsN =   {
                  title: 'Chef Descriptions', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-description-report`
      
                }
                newData[newData.length -1].children.push(reportsN)
              }
              if(userSession.includes("reportsO")) {
                const reportsO =   {
                  title: 'Chef Requests', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-requests-report`
      
                }
                newData[newData.length -1].children.push(reportsO)
              }
              if(userSession.includes("reportsP")) {
                const reportsP =   {
                  title: 'Chef Videos', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-videos-report`
      
                }
                newData[newData.length -1].children.push(reportsP)
              }
              if(userSession.includes("reportsQ")) {
                const reportsQ =   {
                  title: 'Bulk Orders', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/bulk-orders-report`
      
                }
                newData[newData.length -1].children.push(reportsQ)
              }
              if(userSession.includes("reportsR")) {
                const reportsR =   {
                  title: 'Inactive Chef', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/inactive-chef-report`
      
                }
                newData[newData.length -1].children.push(reportsR)
              }
              if(userSession.includes("reportsS")) {
                const reportsS =   {
                  title: 'Active Chef', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/reports/active-chef`
      
                }
                newData[newData.length -1].children.push(reportsS)
              }
              if(userSession.includes("reportsT")) {
                const reportsT =   {
                  title: 'Chef Approval Changes', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/approval-change-report`
      
                }
                newData[newData.length -1].children.push(reportsT)
              }
              if(userSession.includes("reportsU")) {
                const reportsU =   {
                  title: 'Order Rejected', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-reject-report`
      
                }
                newData[newData.length -1].children.push(reportsU)
              }
              if(userSession.includes("reportsV")) {
                const reportsV =   {
                  title: 'User Cart Reports', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/user-cart-report`
      
                }
                newData[newData.length -1].children.push(reportsV)
              }
              if(userSession.includes("reportsX")) {
                const reportsX =   {
                  title: 'Chef Food Items', icon: PieChart,type: 'link', badgeType: 'primary',path: `${process.env.PUBLIC_URL}/reports/chef-fooditems-price`
      
                }
                newData[newData.length -1].children.push(reportsX)

              }
              MENUITEMS = newData
            
}






// export const MENUITEMS3 = [
  
//     {
//         title: 'Subscriptions', icon: Clipboard, type: 'sub', active: false, children: [
//             { path: `${process.env.PUBLIC_URL}/table/active-subscription`, title: 'Active Subscriptions', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/subscription-assigned`, title: 'Subscriptions History', type: 'link' },
//         ]
//     },
//     {
//         title: 'City Management', icon: MapPin, type: 'sub', active: false, children: [
//             { path: `${process.env.PUBLIC_URL}/table/city-table`, title: 'City List', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/addCity`, title: 'Add City', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/zone-table`, title: 'Zone List', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/Addzone-table`, title: ' Add Zone', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/locality-table`, title: 'Locality List', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/addLocality-table`, title: 'Add Locality', type: 'link' },



//         ]
//     },

//             {title: 'Food Management',icon:Archive, type: 'sub',active: false, children: [
//                 { title: 'Cuisines List', type: 'link', path: `${process.env.PUBLIC_URL}/table/cusines-table` },
//                 { title: 'Add Cuisines', type: 'link', path: `${process.env.PUBLIC_URL}/table/addCusines-table` },
//                 { title: 'Addons List', type: 'link', path: `${process.env.PUBLIC_URL}/table/addon-table` },
//                 { title: 'Add Addons', type: 'link', path: `${process.env.PUBLIC_URL}/table/addAddon-table` },
//                 { title: 'Food Category List', type: 'link', path: `${process.env.PUBLIC_URL}/table/foodCategory-table` },
//                 { title: 'Add Food Category', type: 'link', path: `${process.env.PUBLIC_URL}/table/addFoodCategory-table` },
//                 { title: 'Complimentary List', type: 'link', path: `${process.env.PUBLIC_URL}/table/complimentary-table` },
//                 { title: 'Add Complimentary', type: 'link', path: `${process.env.PUBLIC_URL}/table/AddComplimentary-table` }
//             ]},


//             {
//             title: 'Chef Partner',icon:UserPlus, type: 'sub',active: false, children:[
//             { path: `${process.env.PUBLIC_URL}/table/ChefList-table`, title: 'Chef List', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/addChef`, title: 'Add Chef ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/AddChefVideo-table`, title: 'Add Chef Video ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/AddChefPhoto`, title: 'Add Chef Photo ', type: 'link' },
//             //advance/scrollable
//         ]
//     },
//     {
//         title: 'Driver Management', icon: UserCheck, type: 'sub', active: false, children: [
//             { path: `${process.env.PUBLIC_URL}/table/DeliveryPartnerList-table`, title: 'Delivery Partner List ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/add-delivery-partner`, title: ' Add Delivery Partner ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/AssignDriver-table`, title: 'Assign Driver', type: 'link' },
//         ]

//     },
//     {
//         title: 'Agency Management',icon:Users, type: 'sub',active: false, children:[
//             { path: `${process.env.PUBLIC_URL}/table/AgencyList-table`, title: 'Agency List', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/add-agency`, title: 'Add Agenecy ', type: 'link' },
//         ]
//     },
    
//     {title: 'Working Partner Management',icon:Activity, type: 'sub',active: false, children:[
//             { path: `${process.env.PUBLIC_URL}/table/WorkingPartnerList-table`, title: 'Working Partner List ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/table/add-working-partner`, title: 'Add Working Partner ', type: 'link' },
//     ]
// },


//       {title: 'Approvals',icon:Calendar, type: 'sub',active: false, children:[
//             { path: `${process.env.PUBLIC_URL}/approvals/chef-approvals`, title: 'Chef Approvals ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/deliveryPartner-approvals`, title: 'Delivery Partner Approvals ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/agency-approvals`, title: 'Agency Approvals ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/workingPartner-approvals`, title: 'Working Partner Approvals', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/FoodItems-approvals`, title: 'Food Item Approvals', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/Subscription-approvals`, title: 'Subscription Approvals ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/TodaysOffer-approvals`, title: 'Today Offer Approvals ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/LocalityChange-Requests`, title: 'Location Change Request', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/BankChange-Request`, title: 'Bank Change Request', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/approvals/CMS-Request`, title: ' CMS Request', type: 'link' },
   
//         ]
//     },
//     {
//         title: 'Payouts', icon: BarChart, type: 'sub', active: false, children: [
//             { path: `${process.env.PUBLIC_URL}/payouts/chef-payouts`, title: ' Chef Payouts', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/payouts/chef-transaction-history`, title: 'Chef Transaction History ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/payouts/driver-payouts`, title: 'Driver Payouts ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/payouts/driver-transaction-history`, title: 'Driver Transaction History ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/payouts/working-partner-payouts`, title: 'Working Partner Payouts ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/payouts/working-partner-transaction-history`, title: 'Working Partner Transaction History ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/payouts/agency-payouts`, title: 'Agency Payouts ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/payouts/agency-transaction-history`, title: 'Agency Transaction History ', type: 'link' },
//         ]
//     },
//            {title: 'Document Management',icon:Paperclip, type: 'sub',active: false, children:[
//             { path: `${process.env.PUBLIC_URL}/documentManagement/chef-documents`, title: 'Chef Doucment ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/documentManagement/driver-documents`, title: 'Driver Document', type: 'link' },
//            ]
//         },

//           {title: 'User Management',icon:User, type: 'link',active: false, path: `${process.env.PUBLIC_URL}/documentManagement/user-management`},
        
    
//     {
//         title: 'Corporate Orders', icon: ShoppingCart, type: 'sub', active: false, children: [
//             { path: `${process.env.PUBLIC_URL}/buttons/default-btn`, title: 'Corporate Orders ', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/buttons/flatBtn`, title: 'Corporate Order History', type: 'link' },
//         ]
//     },
//          {title: 'Settings',icon:Settings, type: 'sub',active: false, children:[
//             { path: `${process.env.PUBLIC_URL}/setting/banner`, title: 'Banner', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/setting/PromoCodes`, title: 'Promo Codes', type: 'link' },
//             // { path: `${process.env.PUBLIC_URL}/setting/Referrals`, title: 'Referrals', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/setting/CancellationReason`, title: 'Cancellation Reasons', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/setting/WebUserCreation`, title: 'Web User Creation', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/setting/DisabledChef`, title: 'Disable Chefs', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/setting/DisabledUsers`, title: 'Disable Users', type: 'link' },
//             { path: `${process.env.PUBLIC_URL}/setting/DisabledDrivers`, title: 'Disbles Drivers', type: 'link' },
//         ]
//     },

//     {
//         title: 'Reports', icon: PieChart, type: 'link', active: false, path: `${process.env.PUBLIC_URL}/chat/reports` },

//     {
//         title: 'Log Out', icon: LogOut, type: 'link', active: true,path:`${process.env.PUBLIC_URL}/login`}

//  ]
export default MENUITEMS