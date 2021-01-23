import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'; 
import {Image} from 'react-bootstrap';

class ProductBox extends React.Component {
	render() {
    	
	           if(this.props.type!=="Delivery"){
                            return(
                                <div className={this.props.boxClass}>
                                <div className="row"  >
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-left" style={{display:"flex"}}>
                            <div  style={{borderStyle:"dotted",marginTop:"5%",width:"55px",height:"80px",borderColor:"gray",lineHeight:"18px",marginLeft:"4%"}}><strong style={{fontWeight:600}}>Get</strong><br/><span style={{marginTop:"-10%",color:"black",marginLeft:"2%",fontWeight:600}}>Up to</span><br/><span style={{marginTop:"-10%",color:"black",marginLeft:"2%",fontWeight:600}}>{this.props.discount}%</span><br/><small  style={{color:"green",fontWeight:650}}>Discount</small></div>
                            <div className="col-md-8 " style={{width:"355px",height:"80px",marginTop:"-65px",wordBreak:"word-break",marginLeft:"70px",textAlign:"justify",position:"relative",lineHeight:"12px"}}><span style={{fontSize:"15px",color:"red",fontWeight:800}}>{this.props.name}</span><br/><small style={{fontSize:"11px",fontWeight:500}}>get upto {this.props.discount}% discount for order value above ₹{this.props.minAmount}<br/>Maximun Discount ₹{this.props.maxAmount}</small></div>
                        {/* <img src="../assets/img/jumbo.png" /> */}
                    </div>
                </div>
                </div>

                            )
                        }else{
                            return(
                                <div className={this.props.boxClass}>
                                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-left">
                            <div  style={{borderStyle:"dotted",marginTop:"5%",width:"55px",height:"80px",borderColor:"gray",lineHeight:"18px",marginLeft:"4%"}}><strong style={{fontWeight:600}}>Get</strong><br/><span style={{marginTop:"-10%",color:"black",marginLeft:"2%",fontWeight:600}}>Up to</span><br/><span style={{marginTop:"-10%",color:"black",marginLeft:"2%",fontWeight:600}}>{this.props.maxAmount}%</span><br/><small  style={{color:"green",fontWeight:650}}>Discount</small></div>
                            <div className="col-md-8 " style={{width:"355px",height:"80px",marginTop:"-65px",wordBreak:"word-break",marginLeft:"70px",textAlign:"justify",position:"relative",lineHeight:"12px"}}><span style={{fontSize:"15px",color:"red",fontWeight:800}}>{this.props.name}</span><br/><small style={{fontSize:"11px",fontWeight:500}}>get free Delivery for  for order value<br/> above ₹{this.props.minAmount}</small></div>
                        {/* <img src="../assets/img/jumbo.png" /> */}
                    </div>
                </div>
                </div>
                            )
                        }

	      
	
	}
}


ProductBox.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  imageAlt: PropTypes.string,
  boxClass: PropTypes.string,
  title: PropTypes.string,
  counting: PropTypes.string,
};
ProductBox.defaultProps = {
  	imageAlt:'',
    image:'',
    imageClass:'',
    linkUrl: '',
    boxClass:'products-box',
    title:'',
    counting:'',
}

export default ProductBox;