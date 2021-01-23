import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Cart } from '../../../../Store/action/cartActions';
import { toast, ToastContainer } from 'react-toastify';
class Products1 extends Component {       
    _isMounted = false;
    state = {
            product: this.props.cart.product
        }
    componentDidMount() {
        this._isMounted = true;
    }    
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        setInterval(() => {
            var match = JSON.stringify(this.state);
            var match2 = localStorage.getItem('cart')                
            if(match !== match2) {                            
                if(this._isMounted) {                            
                    this.setState({
                        product: JSON.parse(match2).product                    
                    }, () => this.props.addToCart(this.state))
                }
            }
                        
        }, 100)

               
       const array = Object.values(this.state.product);
       // add to cart       
        const handalebar = (event) => {
            event.preventDefault();
            const product_code = event.target.closest('.card').getAttribute('id');            
            
            const { shop_product } = this.props;            
            const code_item = Object.values(shop_product).filter((item) => {
                return item.id === product_code;
            });
            
            const filter = array.filter((item2) => {
                return parseInt(item2[0].id) === parseInt(code_item[0].id)
            })
            if(filter.length === 0){
                array.push(code_item);
                this.setState(
                    { product: [...array] }, 
                    () => this.props.addToCart(this.state)
                )
                toast.success("Item Added to Cart");
            } else {
                toast.error("Item already exists in Cart");                
            }                
        }                
        // add to cart           
                 
         const { shop_product } = this.props;
         return (
            
            <div className="row">
                <ToastContainer />
                {
                    Object.values(shop_product).map((value, key) => {
                        const { imgSrc, id, title, price } = value;
                        return (
                        
                            <div className="col-lg-4 col-sm-6" key={id}>
                                <div className="card card-product" id={id}>
                                    <figure>
                                        <img src={imgSrc} alt="" />
                                        <figcaption>
                                            <ul className="d-flex justify-content-center">
                                                <li><NavLink to="/at_demo" onClick={handalebar} className="btn btn--rounded btn-outline-light btn-sm">Add To Cart</NavLink></li>
                                                <li><NavLink to="/at_demo" className="btn like-btn"><i className="la la-heart-o"></i></NavLink></li>
                                            </ul>
                                        </figcaption>
                                    </figure>
                                    <div className="card-body">
                                        <h6><NavLink to={"/single-product"+id}>{title}</NavLink></h6>
                                        <div className="prices">
                                            <span className="product-price color-secondary">{"$"+price}</span>
                                        </div>
                                    </div>
                                </div>{/*<!-- End: .card -->*/}
                            </div>
                        )
                    })
                }
            </div>
                    
            
        )
    }
}

const mapStateToProps = state => {
    return {
        product : state.product,
        cart : state.cart
    }
}

const mapDispatchToProp = dispatch => {
    return {
        addToCart : (prod) => dispatch(Cart(prod))        
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Products1);