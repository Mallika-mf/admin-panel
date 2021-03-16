/* eslint-disable no-unused-vars */
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// import Header from "./components/common/Header";
import ScrollToTop from "./components/common/ScrollToTop";
import Footer from "./components/common/Footer";
import Index from "./components/Index";
import Offers from "./components/Offers";
import MyAccount from "./components/MyAccount";
import List from "./components/List";
import NotFound from "./components/NotFound";
import Thanks from "./components/Thanks";
import Extra from "./components/Extra";
import Login from "./components/Login";
import Register from "./components/Register";
import TrackOrder from "./components/TrackOrder";
import PartnerWithUs from "./components/partnerwithus";
import RideWithUs from "./components/ridewithus";
import HelpSupport from "./components/helpsupport";
import Invoice from "./components/Invoice";
import DetailOrder from "./components/DetailsOrder";
import Checkout from "./components/Checkout";
import Detail from "./components/Detail";
import ContactUs from "./components/contactus";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "./App.css";
import About from "./components/AbotUs/AboutUs";
import Career from "./components/FooterPages/career";
import Apply from "./components/FooterPages/apply-form";
import Term from "./components/FooterPages/TermAndConditions";
import Refund from "./components/FooterPages/Refund";
import Blog from "./components/Blogs/blog";
import HomeFood from "./components/order";
import Privacy from "./components/FooterPages/Privacy";
import Catering from "./components/FooterPages/catering";
import Catering1 from "./components/FooterPages/catering1";
import Download from "./components/Download";

import NewsDetail4 from "./page/news-detail-4";
import NewsDetail1 from "./page/news-detail-1";
import NewsDetail2 from "./page/news-detail-2";
import NewsDetail3 from "./page/news-detail-3";
import NewsDetail5 from "./page/news-detail-5";
import NewsDetail6 from "./page/news-detail-6";
import NewsDetail7 from "./page/news-detail-7";
import NewsDetail8 from "./page/news-detail-8";
import NewsDetail9 from "./page/news-detail-9";
import NewsDetail10 from "./page/news-detail-10";
import NewsDetail11 from "./page/news-detail-11";
import NewsDetail12 from "./page/news-detail-12";
import NewsDetail13 from "./page/news-detail-13";
import NewsDetail14 from "./page/news-detail-14";
import NewsDetail15 from "./page/news-detail-15";
import NewsDetail16 from "./page/news-detail-16";
import NewsDetail17 from "./page/news-detail-17";
import NewsDetail18 from "./page/news-detail-18";
import NewsDetail19 from "./page/news-detail-19";
import NewsDetail20 from "./page/news-detail-20";
import NewsDetail21 from "./page/news-detail-21";
import NewsDetail22 from "./page/news-detail-22";
import NewsDetail23 from "./page/news-detail-23";

import LocalFood from "./components/localFood";
import localkitchens from "./components/FooterPages/localkitchens";
import homechefs from "./components/FooterPages/homechefs";
class App extends React.Component {
  render() {
    return (
      <>
        {/* {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          // <Header />
        ) : (
          ""
        )} */}
        {/* <BrowserRouter basename={`/`}> */}
        <ScrollToTop />

        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/offers" exact component={Offers} />
          <Route exact path="/localDishes" component={LocalFood} />
          <Route path="/listing" exact component={List} />
          <Route path="/homefood" exact component={HomeFood} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/404" exact component={NotFound} />
          <Route path="/about" exact component={NotFound} />
          <Route path="/extra" exact component={Extra} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/track-order" exact component={TrackOrder} />
          <Route path="/invoice" exact component={Invoice} />
          <Route path="/catering" exact component={Catering} />
          <Route path="/catering1" exact component={Catering1} />

          <Route path="/localkitchens" exact component={localkitchens} />
          <Route path="/homechefs" exact component={homechefs} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/detailsOrder" exact component={DetailOrder} />
          <Route path="/thanks" exact component={Thanks} />
          <Route path="/partnerwithus" exact component={PartnerWithUs} />
          <Route path="/detail/:chef" exact component={Detail} />
          <Route path="/ridewithus" exact component={RideWithUs} />
          <Route path="/helpsupport" exact component={HelpSupport} />
          <Route path="/contactus" exact component={ContactUs} />
          <Route path="/about-us" exact component={About} />
          <Route path="/career" exact component={Career} />
          <Route path="/apply" exact component={Apply} />
          <Route path="/refund" exact component={Refund} />
          <Route path="/term" exact component={Term} />
          <Route path="/blog" exact component={Blog} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/download" exact component={Download} />

          <Route exact path="/news-detail-1" component={NewsDetail1} />
          <Route exact path="/news-detail-2" component={NewsDetail2} />
          <Route exact path="/news-detail-3" component={NewsDetail3} />
          <Route exact path="/news-detail-4" component={NewsDetail4} />
          <Route exact path="/news-detail-5" component={NewsDetail5} />
          <Route exact path="/news-detail-6" component={NewsDetail6} />
          <Route exact path="/news-detail-7" component={NewsDetail7} />
          <Route exact path="/news-detail-8" component={NewsDetail8} />
          <Route exact path="/news-detail-9" component={NewsDetail9} />
          <Route exact path="/news-detail-10" component={NewsDetail10} />
          <Route exact path="/news-detail-11" component={NewsDetail11} />
          <Route exact path="/news-detail-12" component={NewsDetail12} />
          <Route exact path="/news-detail-13" component={NewsDetail13} />
          <Route exact path="/news-detail-14" component={NewsDetail14} />
          <Route exact path="/news-detail-15" component={NewsDetail15} />
          <Route exact path="/news-detail-16" component={NewsDetail16} />
          <Route exact path="/news-detail-17" component={NewsDetail17} />
          <Route exact path="/news-detail-18" component={NewsDetail18} />
          <Route exact path="/news-detail-19" component={NewsDetail19} />
          <Route exact path="/news-detail-20" component={NewsDetail20} />
          <Route exact path="/news-detail-21" component={NewsDetail21} />
          <Route exact path="/news-detail-22" component={NewsDetail22} />
          <Route exact path="/news-detail-23" component={NewsDetail23} />

          <Route exact component={NotFound} />
        </Switch>
        {/* </BrowserRouter> */}
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register"&&
        this.props.location.pathname !=="/download" ? (
          <Footer />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default App;
