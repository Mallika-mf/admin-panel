import React from 'react';
import {Image,Badge,Button,Media,Modal} from 'react-bootstrap';
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
      	<div className={"p-3 border-bottom "+this.props.itemClass}>
		   {this.props.quantity===0?
	            <span className="float-right">               
	              <Button variant='outline-secondary' onClick={this.props.onAddClick} size="sm">ADD</Button>
                {/* <MydModalWithGrid 
                show={this.props.modelShow} 
                 onHide={this.props.onHide}
                 titleName={this.props.foodName} /> */}
                  {/* <Modal
          show={this.props.modelShow}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>{this.props.foodName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  {/* <Icofont size="6" icon="warning-alt" /> */}
                  {/* <Accordion defaultActiveKey="0">
                     
                      <div className="filters-card border-bottom p-4">
                        <div className="filters-card-header" id="headingTwo">
                          <h6 className="mb-0">
                            <Accordion.Toggle
                              as={Button}
                              size="block"
                              variant="link"
                              className="text-left d-flex align-items-center p-0 text-black"
                              eventKey="1"
                            >
                              Category{" "}
                              <Icofont icon="arrow-down" className="ml-auto" />
                            </Accordion.Toggle>
                          </h6>
                        </div>

                        <Accordion.Collapse eventKey="1">
                          <div className="filters-card-body card-shop-filters">
                           
                            <Form.Check
                              custom
                              type="checkbox" */}
                              {/* // checked={this.state.vegItems}
                              // disabled={this.state.nonvegItems === true}
                              // onChange={this.onChangeVeg}
                              id="custom-cb6"
                              label={
                                <React.Fragment>
                                  Veg{" "}
                                  {this.state.vegItems === true ? (
                                    <small className="text-black-50">
                                      {this.state.product.items.length}
                                    </small>
                                  ) : (
                                    <small className="text-black-50"></small>
                                  )}
                                </React.Fragment>
                              }
                            />

                            <Form.Check
                              custom
                              type="checkbox"
                              id="custom-cb7"
                              // disabled={this.state.vegItems === true}
                              // checked={this.state.nonvegItems}
                              // onChange={this.onChangeNonVeg}
                              label={
                                <React.Fragment>
                                  Non/Veg{" "}
                                  {/* {this.state.nonvegItems === true ? (
                                    <small className="text-black-50">
                                      {/* {this.state.product.items.length} */}
                                    {/* </small>
                                  ) : (
                                    <small className="text-black-50"></small>
                                  )} */}
                                {/* </React.Fragment>
                              }
                            />
                            </Accordion.Collapse>
                            </Accordion>
                            </div>
                  <h3>
                    Please clear your current cart items to add the new items
                    into your cart!
                  </h3>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="btn--rounded"
              onClick={this.props.onHide}
            >
              Close
            </Button> */}
            {/* <Button
              variant="primary"
              className="btn--rounded"
              onClick={this.handleOk}
            >
              Ok
            </Button> */}
          {/* </Modal.Footer>
        </Modal> */}
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