import React from 'react';
import OwlCarousel from 'react-owl-carousel3';
import {Image,Button} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import firebase from '../Firebase'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

class GalleryCarousel extends React.Component {
   constructor(props){
    super(props);
    this.state = {
      itemscount: 0,
      showing:0,
      image:[],
      showImage:false
    }; 
    this.Carousel = React.createRef();            
  }

  componentDidMount=()=>{
    let chefid = this.props.match.params["chef"];

    firebase.database().ref().child("CloudKitchen").child(chefid).once('value',snapshot=>{
      if(snapshot.exists()){
        let content = []
        snapshot.child("FoodItems").forEach(snap=>{
          let val = snap.val()
          let container = {
            Image : val.Image
          }
          content.push(container)
        })
        this.setState({image:content})
      }
    })
  }
  onShowImage = (event)=>{
    this.setState({showImage:true})
  }
	render() {
    	return (
        <>
        {this.state.showImage===false?
	      <>
		      <OwlCarousel ref={this.Carousel}  nav loop {...options} className="owl-theme homepage-ad">
            {this.state.image.map((item,index)=>{
              return(
              <div className="item" key={index}>
		         	<Image fluid src={item.Image} style={{objectFit:"fill"}}/>
		         </div>
              )
            })}
		      </OwlCarousel>
	          <div className="position-absolute restaurant-slider-pics bg-dark text-white">{this.state.image.length}&nbsp;Images</div>
            <div className="position-absolute restaurant-slider-view-all"><Button variant='light' type="button" onClick={this.onShowImage} className="bg-white">See all Photos</Button></div>
            </>:
            <div className="row">
            {this.state.image.map((item,index)=>{
              return(
                <div className="col-4">
                <Zoom>
                <div className="card" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",margin: "auto",textAlign: "center", fontFamily: "arial"}}>
                <Image fluid src={item.Image} style={{objectFit:"fill"}}/>

    </div>
                </Zoom>
                </div>
             
              )
            })}
            </div>
             }
           </>
                        	    
	    );
	}
}

const options={
	responsive: {
        0:{
            items:2,
        },
        764:{
            items:2,
        },
        765: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
      lazyLoad: true,
      loop: true,
      autoplay: true,
      autoplaySpeed: 1000,
      dots: false,
      autoplayTimeout: 2000,
      nav: true,
      navText:["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      autoplayHoverPause: true,
}

export default withRouter(GalleryCarousel);