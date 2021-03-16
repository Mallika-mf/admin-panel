import React from 'react';
import {Image,Badge,Button,Media} from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import Icofont from 'react-icofont';
import MydModalWithGrid from './Model'
class QuickBite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 0,
      show: this.props.show || true,
      max:this.props.maxValue || 5,
      min:this.props.minValue || 0,

    };
  }

  IncrementItem = () => {
    if(this.state.quantity >= this.state.max) {

    }else {
        this.setState({
            quantity: this.state.quantity + 1 
        });
      this.props.getValue({id:this.props.id,quantity: (this.state.quantity + 1 )});
    }
  }
  DecreaseItem = () => {
    if(this.state.quantity <= (this.state.min)) {

    }else {
      this.setState({ quantity: this.state.quantity - 1 });
      this.props.getValue({id:this.props.id,quantity: (this.state.quantity - 1 )});
    }
  }

  render() {
    if(this.props.showCart===false){
      return (
      	<div className={"p-3 border-bottom "+this.props.itemClass}>{console.log(this.props.portion)}
		   {this.props.quantity===0?
	            <span className="float-right"> 
              
	              <Button variant='outline-secondary' onClick={this.props.onAddClick} size="sm">ADD</Button>
                <MydModalWithGrid show={this.props.modelShow} onHide={this.props.onHide} /> {console.log(this.props.modelShow)}
	            </span>
	            :
	            <span className="count-number float-right">
	               <Button variant="outline-secondary" onClick={this.props.onIncClicked} className="btn-sm left dec"> <Icofont icon="minus" /> </Button>
	               <input className="count-number-input" type="text" value={this.props.quantity} readOnly/>
	               <Button variant="outline-secondary" onClick={this.props.onDecClick} className="btn-sm right inc"> <Icofont icon="icofont-plus" /> </Button>
	            </span>
	         }
		   <Media>
		      {this.props.image?
		      	<Image className={"mr-3 rounded-pill " +this.props.imageClass} src={this.props.image} alt={this.props.imageAlt} />
		      	:
		      	<div className="mr-3"><Icofont icon="ui-press" className={"text-"+this.props.badgeVariant+" food-item"} /></div>
		      }
		      <Media.Body>
		         <h6 className="mb-1" style={{ textAlign: "justify" }}>{this.props.title} {this.props.showBadge?<Badge variant={this.props.badgeVariant}>{this.props.badgeText}</Badge>:""}</h6>
             <p className="mb-1" style={{ textAlign: "justify" }}>{this.props.detail} </p>

		         <p className="text-gray mb-0" style={{ textAlign: "justify" }}>{this.props.priceUnit}{this.props.price}</p>
		      </Media.Body>
		   </Media>
		</div>
    );
    }else{
      return (
      	<div className={"p-3 border-bottom "+this.props.itemClass} style={{ opacity: "0.5" }}>
		   {this.props.quantity===0?
	            <span className="float-right"> 
	              <Button variant='outline-secondary' onClick={this.props.onAddClick} size="sm" disabled>ADD</Button>
	            </span>
	            :
	            <span className="count-number float-right">
	               <Button variant="outline-secondary" onClick={this.props.onIncClicked} disabled className="btn-sm left dec"> <Icofont icon="minus" /> </Button>
	               <input className="count-number-input" type="text" value={this.props.quantity} readOnly/>
	               <Button variant="outline-secondary" onClick={this.props.onDecClick} disabled className="btn-sm right inc"> <Icofont icon="icofont-plus" /> </Button>
	            </span>
	         }
		   <Media>
		      {this.props.image?
		      	<Image className={"mr-3 rounded-pill " +this.props.imageClass} src={this.props.image} alt={this.props.imageAlt} />
		      	:
		      	<div className="mr-3"><Icofont icon="ui-press" className={"text-"+this.props.badgeVariant+" food-item"} /></div>
		      }
		      <Media.Body>
		         <h6 className="mb-1" style={{ textAlign: "justify" }}>{this.props.title} {this.props.showBadge?<Badge variant={this.props.badgeVariant}>{this.props.badgeText}</Badge>:""}</h6>
             <p className="mb-1" style={{ textAlign: "justify" }}>{this.props.detail} </p>

		         <p className="text-gray mb-0" style={{ textAlign: "justify" }}>{this.props.priceUnit}{this.props.price}</p>
		      </Media.Body>
		   </Media>
		</div>
    );
    }
  
  }
}


QuickBite.propTypes = {
  itemClass:PropTypes.string,
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  showBadge: PropTypes.bool,
  badgeVariant: PropTypes.string,
  badgeText: PropTypes.string,
  price: PropTypes.number.isRequired,
  priceUnit: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  getValue: PropTypes.func.isRequired
};
QuickBite.defaultProps = {
  itemClass:'gold-members',
  imageAlt:'',
  imageClass:'',
  showBadge: false,
  price: '',
  priceUnit:'$',
  showPromoted: false,
  badgeVariant: 'danger',
  detail:""
}

export default QuickBite;