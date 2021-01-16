import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
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
import Invoice from "./components/Invoice";
import Checkout from "./components/Checkout";
import Detail from "./components/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "./App.css";
import About from './components/AbotUs/AboutUs';
import Career from './components/FooterPages/career';
import Apply from './components/FooterPages/apply-form';
import Blog from './components/Blogs/blog';
import Terms from './components/FooterPages/TermAndConditions';
import Refund from './components/FooterPages/Refund';
import Privacy from './components/FooterPages/Privacy';


class App extends React.Component {
  render() {
    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Header />
        ) : (
          ""
        )}
        <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/offers" exact component={Offers} />
          <Route path="/listing" exact component={List} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/404" exact component={NotFound} />
          <Route path="/about" exact component={NotFound} />
          <Route path="/extra" exact component={Extra} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/track-order" exact component={TrackOrder} />
          <Route path="/invoice" exact component={Invoice} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/thanks" exact component={Thanks} />
          <Route path="/detail" exact component={Detail} />
          <Route path="/about-us" exact component={About} />
          <Route path="/career" exact component={Career} />
          <Route path="/apply" exact component={Apply} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/refund" exact component={Refund} />
          <Route path="/privacy" exact component={Privacy} />

          <Route path="/blog" exact component={Blog} />


          <Route exact component={NotFound} />
        </Switch>
        </Router>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <Footer />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default App;
