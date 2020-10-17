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
    Briefcase,
    DollarSign,
    UserPlus,
    LogOut,
    AtSign,
    Users,
    
    MessageSquare,
    Chrome,
    Settings,
    Airplay,
    FolderPlus,
    File,
    Command, Cloud, Book, FileText, Server, Image, Sliders, Map, GitPullRequest, Edit, Mail, UserCheck, Layers, HelpCircle, Database, Headphones, Mic, ShoppingBag, Search, AlertOctagon, Lock, User
} from 'react-feather';
//import Email from '../../components/application/email-app/email';

export const MENUITEMS = [
    {
        title: 'Order Managment', icon: ShoppingCart, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: 'Order Dashboard', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/basic`, title: 'New Order', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/processing-order`, title: 'Processing Order', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/waititng-for-pickup`, title: 'Waiting For Pickup', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/table/pickup-order`, title: ' Order Pickup', type: 'link' },
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
                { title: 'Add Complimentary', type: 'link', path: `${process.env.PUBLIC_URL}/table/AddComplimentary-table` }
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
            { path: `${process.env.PUBLIC_URL}/approvals/TodaysOffer-approvals`, title: 'Today Offer Approvals ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/LocalityChange-Requests`, title: 'Location Change Request', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/BankChange-Request`, title: 'Bank Change Request', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/CMS-Request`, title: ' CMS Request', type: 'link' },
   
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
            { path: `${process.env.PUBLIC_URL}/documentManagement/chef-documents`, title: 'Chef Doucment ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/documentManagement/driver-documents`, title: 'Driver Document', type: 'link' },
           ]
        },

          {title: 'User Management',icon:User, type: 'link',active: false, path: `${process.env.PUBLIC_URL}/documentManagement/user-management`},
        
    
    {
        title: 'Corporate Orders', icon: ShoppingCart, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/buttons/default-btn`, title: 'Corporate Orders ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/buttons/flatBtn`, title: 'Corporate Order History', type: 'link' },
        ]
    },
         {title: 'Settings',icon:Settings, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/setting/banner`, title: 'Banner', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/PromoCodes`, title: 'Promo Codes', type: 'link' },
            // { path: `${process.env.PUBLIC_URL}/setting/Referrals`, title: 'Referrals', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/CancellationReason`, title: 'Cancellation Reasons', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/WebUserCreation`, title: 'Web User Creation', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledChef`, title: 'Disable Chefs', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledUsers`, title: 'Disable Users', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledDrivers`, title: 'Disbles Drivers', type: 'link' },
        ]
    },
    {title: 'Chat Support', icon: MessageSquare, type: 'link', active: false, path: `${process.env.PUBLIC_URL}/chat/chat-supports` },


    {
        title: 'Report', icon: PieChart , type: 'link', active: false, path: `${process.env.PUBLIC_URL}/chat/reports` },

    {
        title: 'Log Out', icon: LogOut, type: 'link', active: true,path:`${process.env.PUBLIC_URL}/login`}

 ]
 
export const MENUITEMS2=[
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

export const MENUITEMS3 = [
  
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
                { title: 'Add Complimentary', type: 'link', path: `${process.env.PUBLIC_URL}/table/AddComplimentary-table` }
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
            { path: `${process.env.PUBLIC_URL}/approvals/TodaysOffer-approvals`, title: 'Today Offer Approvals ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/LocalityChange-Requests`, title: 'Location Change Request', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/BankChange-Request`, title: 'Bank Change Request', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/approvals/CMS-Request`, title: ' CMS Request', type: 'link' },
   
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
            { path: `${process.env.PUBLIC_URL}/documentManagement/chef-documents`, title: 'Chef Doucment ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/documentManagement/driver-documents`, title: 'Driver Document', type: 'link' },
           ]
        },

          {title: 'User Management',icon:User, type: 'link',active: false, path: `${process.env.PUBLIC_URL}/documentManagement/user-management`},
        
    
    {
        title: 'Corporate Orders', icon: ShoppingCart, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/buttons/default-btn`, title: 'Corporate Orders ', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/buttons/flatBtn`, title: 'Corporate Order History', type: 'link' },
        ]
    },
         {title: 'Settings',icon:Settings, type: 'sub',active: false, children:[
            { path: `${process.env.PUBLIC_URL}/setting/banner`, title: 'Banner', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/PromoCodes`, title: 'Promo Codes', type: 'link' },
            // { path: `${process.env.PUBLIC_URL}/setting/Referrals`, title: 'Referrals', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/CancellationReason`, title: 'Cancellation Reasons', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/WebUserCreation`, title: 'Web User Creation', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledChef`, title: 'Disable Chefs', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledUsers`, title: 'Disable Users', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/setting/DisabledDrivers`, title: 'Disbles Drivers', type: 'link' },
        ]
    },

    {
        title: 'Reports', icon: PieChart, type: 'link', active: false, path: `${process.env.PUBLIC_URL}/chat/reports` },

    {
        title: 'Log Out', icon: LogOut, type: 'link', active: true,path:`${process.env.PUBLIC_URL}/login`}

 ]