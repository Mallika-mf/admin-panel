import React, {Fragment} from 'react';
// import Clients from '../container/clients/clients1';
// import Fetures from '../content/fetures/fetures';
// import ContentBlock from '../content/contentBlock/contentBlock';
// import Cta9 from '../content/cta/cta-9';
// import TestimonialSix from '../container/testimonial/testimonial-6';
// import News from '../container/news/news';
// import Subscribe from '../content/subscribe/subscribe7';
// import Footer from '../layout/footer/footer-dark-3'
import {NavLink} from 'react-router-dom';
// import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    // geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
// import Header from '../layout/header/slider-header-2';

// import Navbar from '../layout/navbar/colorNav';

class Index extends React.Component{

    
    constructor(props) {
        super(props);
        this.state = { 
            address: ''
         };
      }
    
      handleChange = address => {
        this.setState({ address });
      };

      
    
      handleSelect = address => {

        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));

      };


     

   
render(){
    // const searchOptions = {
    //     componentRestrictions: { country: ['in'] },
    //   }

    
    return (        
        <Fragment>
               {/* <Navbar /> */}
           
               {/* <Header /> */}

               <section className="p-top-10 p-bottom-10">

                <div className="intro-five">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2 className="display-5 text-left">What is the meaning <br />of the Cloud Kitchen?</h2>
                                <p className="text-left">You must have heard about modern kitchens, open kitchen, roof-top kitchens, and a lot more. But what is this cloud kitchen? Let’s find out:

Cloud Kitchens are a redesigned format of home chef’s regular kitchen with more hygiene and safety measures. Daily sanitization, weekly and monthly maintenance, regular surveys to keep up the hygiene levels are assured in Cloud kitchens. 

</p>
                                <NavLink to="" className="btn btn-danger text-left">Read More</NavLink>
                            </div>{/*<!-- ends: .col-lg-6 -->*/}
                            <div className="col-md-6">

                                <div className="img-shape-one">
                                    <img src="./assets/img/blog.jpg" alt="" style={{width:"600px"}} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>{/*<!-- ends: .intro-three -->*/}

            </section>

            
        
            <section className="features-area  p-top-55 p-bottom-50" >
            <div className="icon-boxes">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 section-title">
                            <h1><b>Latest Articles !</b></h1>
                            {/* <p>Need Single content here</p> */}
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <NavLink to='/news-detail-2'style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                  <img src="../assets/img/blog-img-1.jpg" alt=""  max-width="100px" height="auto" />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Benefits of Eating Homemade Food</strong></h6>
                                    <ul className="text-left post-meta d-flex">
                                        <li className="text-left">10-07-2020</li>
                                    </ul>
                                    <p className="text-left">We all can agree that food is the only thing that can make anyone drool without any racial differences. When tasty,
delicious food goes down the throat, that heavenly feeling can melt the soul.</p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-lg-4 col-md-6">
                        <NavLink to='/news-detail-1'style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-3.jpg" alt=""  max-width="100px" height="auto" />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Cooking is a passion for every woman</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">10-07-2020</li>
                                    </ul>
                                    <p className="text-left">Cooking is an art and science of experimenting with savory, sweetness, and spices in ways that it brings
out a drooling essence, flavor, taste, smell, and gets you a smile. <br/><br/></p>
                                </div>
                            </div>
                            </NavLink>
                        </div>

{/* 
                        <div className="col-lg-4 col-md-6">
                        <NavLink to='/news-detail-3' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-2.jpg" alt=""  max-width="100px" height="auto"/>
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Fast Food Vs. Homemade Food</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">10-07-2020</li>
                                    </ul>
                                    <p className="text-left">Sure, Fast food can be luring with its looks, aroma, and taste, but have you realized the oily platters,
unhygienic kitchen equipment, and rotten ingredients? 
 <br/><br/></p>

                                </div>
                            </div>
                            </NavLink>
                        </div> */}
                        <div className="col-lg-4 col-md-6">
                        <NavLink to='/news-detail-4' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-2.jpg" alt=""  max-width="100px" height="auto"/>
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Best Indian Foods.</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">10-07-2020</li>
                                    </ul>
                                    <p className="text-left">India is a land of a variety of spices and flavors due to its multi-cultural nature. That deduces to Indian food being multi-cultural too. There is a variety of tasty
 <br/><br/></p>

                                </div>
                            </div>
                            </NavLink>
                        </div>
                      
                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-5' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-5.jpg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Health and Hygiene with homemade food</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">30-11-2020</li>
                                    </ul>
                                    <p className="text-left">One of the most important aspects of all life, is food. Singularly for humans. As humans have the intellect to understand good food and bad food. 
 <br/><br/></p>

                                </div>
                            </div>
                            </NavLink>
                        </div>
                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-6' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-6.jpg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Indian Homemade Foods</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">05-12-2020</li>
                                    </ul>
                                    <p className="text-left">India is a land of  a variety of spices and flavors due to its multi-cultural nature. That deduces to Indian food being multi-cultural too. There is a variety of tasty, hygienic food that is made in every household in India. 
 <br/><br/></p>

                                </div>
                            </div>
                            </NavLink>
                        </div>
                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-7' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-7.jpg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Celebrities and their favorite homemade dishes.</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">14-12-2020</li>
                                    </ul>
                                    <p className="text-left">There is a lot of variety of food available in the market. Different cuisines, different styles, different outlets and numerous options. 
 <br/><br/><br/></p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        
                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-8' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-8.jpg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Importance of Homemade food for kids.</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">18-12-2020</li>
                                    </ul>
                                    <p className="text-left">We cannot stress enough the importance of homemade food or home cooked meals. Of course, for the kind of nutrition it  
 <br/><br/></p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-9' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-9.jpg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>How many Types of Indian Breads are there?</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">24-12-2020</li>
                                    </ul>
                                    <p className="text-left" style={{wordSpacing:"-1px"}}>The most heard of breads or the most consumed breads nationally might be 3 or 4. However, there are over 25 types of breads in India. 
 </p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-10' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-10.jpg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Homemade food, an integral part of fitness.</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">24-12-2020</li>
                                    </ul>
                                    <p className="text-left">Fitness is all about maintaining a balanced lifestyle and healthy nutrition rather than the misconceived concept of having bigger muscles.  
 </p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-11' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-11.jpeg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Best Chicken Biryani  and Its Recipes.</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">02-01-2021</li>
                                    </ul>
                                    <p className="text-left">Biryani, a dish well known in almost all Indian states and loved by majority of Indian population.   
 </p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-12' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-12.jpg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>What are your comfort foods?</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">06-01-2021</li>
                                    </ul>
                                    <p className="text-left">Comfort foods give comfort to the whole mood. Mostly comfort foods are staple foods.. Majority of the people enjoy comfort foods,     
 </p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-13' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-13.jpeg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Top 25 Delhi Famous Foods</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">09-01-2021</li>
                                    </ul>
                                    <p className="text-left">Delhi culture is a mix of different cultures and traditions which thus reflect in Delhi flavors, cuisines and food as well.      
 </p>

                                </div>
                            </div>
                            </NavLink>
                        </div>

                        <div className="col-lg-4 col-md-6" style={{position:"relative",marginTop:"20px"}}>
                        <NavLink to='/news-detail-14' style={{color:"gray"}}>
                            <div className="card post--card ">
                                <figure>
                                   <img src="../assets/img/blog-img-14.jpeg" alt=""  style={{maxWidth:"350px", height:"auto"}} />
                                </figure>
                                <div className="card-body">
                                    <h6 className="text-left"><strong>Which Indian vegetable is best for winter?</strong></h6>
                                    <ul className="post-meta d-flex">
                                        <li className="text-left">13-01-2021</li>
                                    </ul>
                                    <p className="text-left">Though India is a tropical country, winters are pretty cold in most parts of the country. And as we all know, winters in India have arrived.       
 </p>

                                </div>
                            </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                

            {/* <section className="features-area  p-top-0 p-bottom-50" >
            <div className="icon-boxes">
                <div className="container">
                    <div className="row">
                       <div className="col-lg-5 col-md-6 col-sm-6">
                            <div className=" icon-box-fourteen text-center" style={{marginLeft:"15%",marginRight:"15%"}}>
                                <img src="../assets/img/bg1.png"  className="img-responsive" ></img>
                               
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6 col-sm-6" style={{margin:"auto"}}>
                            <div className="icon-box-fourteen text-center">
                            <img src="../assets/img/bginfo1.png"  className="img-responsive" ></img>                         
                            </div>
                        </div>
                        
                    </div>

                    <div className="row">
                       <div className="col-lg-5 col-md-6 col-sm-6">
                            <div className=" icon-box-fourteen text-center" style={{marginLeft:"15%",marginRight:"15%"}}>
                                <img src="../assets/img/bg1.png"  className="img-responsive" ></img>
                               
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6 col-sm-6" style={{margin:"auto"}}>
                            <div className="icon-box-fourteen text-center">
                            <img src="../assets/img/bginfo1.png"  className="img-responsive" ></img>                         
                            </div>
                        </div>
                        
                    </div>

                    <div className="row">
                       <div className="col-lg-5 col-md-6 col-sm-6">
                            <div className=" icon-box-fourteen text-center" style={{marginLeft:"15%",marginRight:"15%"}}>
                                <img src="../assets/img/bg1.png"  className="img-responsive" ></img>
                               
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6 col-sm-6" style={{margin:"auto"}}>
                            <div className="icon-box-fourteen text-center">
                            <img src="../assets/img/bginfo1.png"  className="img-responsive" ></img>                         
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section> */}
                

           
                {/* <Footer /> */}
        </Fragment>
    )

    }
}

export default Index;