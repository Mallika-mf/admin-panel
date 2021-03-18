import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
const noAction = (e) => {
  e.preventDefault();
};
const DetailsContent = (props) => {
  // const { title, content, date, blog } = props;

  return (
    <Fragment>
      <div className="post-details">
        <div className="post-head">
          <div className="post-audio">
            <img
              src="../assets/img/blog-img-24.jpg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong>  How the Right Nutrition Can Help You to Save a Lot of Money</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>13-03-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify",fontSize: "14px" }}>
            Your body is what you eat as they say. Similarly, our health is defined by what reaches our body. With the constant increase in junk food and fast food options, people have been consuming it constantly. But now with a pandemic people have realized the value of life and are trying to maintain their health and fitness. Now fitness in today's world is a booming business. With more people becoming conscious of their weight new products are requiring the investment of your hard-earned money. To maintain your weight one has to consume so many tonics. But in the olden time, people would maintain their health, weight without any medicines, supplements just by their right diet. You can also do the same one does not need heavy or expensive supplements to reduce weight or to maintain their health. Here are some ways in which you can maintain your health and save a lot of money
                                                <br/>
                        </p>
           
        
        <p style={{ textAlign: "justify",fontSize: "20px" }}><b>1)Right Exercise:  </b></p>

        {/* <ul style={{ fontSize: "15px",textAlign: "justify" }} className="bullet--list2"><b>1)Cooking Oil: </b>
                      <li
                        style={{ textAlign: "left", fontSize: "15px" }}
                        className="bullet_list"
                      >Cooking oil forms the base of all Indian recipes and curries and in general most cooking in the part of the world. Oil is extracted from different seeds be it sunflower, mustard, or even til seeds. Now to save money a lot of people use cheap mixed oils that are very harmful to the heart as well as for the throat. Now with the re-using and heating of oils again and again the oil becomes inedible. So when you order from MothersFood it is cooked by responsible professionals that use top-quality ingredients especially oils.</li></ul>
            <p style={{ textAlign: "justify" }}><b>1)Cooking Oil:  </b></p>

            <p style={{ textAlign: "justify" }}>
            The most basic sabzi gravy to be used in all kinds of vegetables/meat is the same old tomato onion gravy. What you can do is cook onion tomato together and turns it into a paste and stores it in your refrigerator for a good week. If you are running late on time then just quickly cook the gravy add paneer/veggies/meat and your lunch is ready to have with roti, rice, or even bread.
                                 <br/>   </p> */}

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            Exercise is the basis of any fitness be it via diet or supplements. Getting sunlight in the morning every day is very essential and hence all our Vedas advise morning walks or morning yoga. Getting early morning sunshine is great for the body and bones. Yoga is great for the gut. 
                                                          <br />
            </p>

            <p style={{ textAlign: "justify",fontSize: "20px" }}><b>2) Stop buying junk food:  </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px"  }}>
            Cut out some of the junk food from your diet. You would be surprised to see how much you may be paying for soda, crackers, cookies, prepackaged meals, and processed foods.
            <br />
            </p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px"  }}>Although they offer very little nutrition and are packed with unhealthy ingredients, they are also very expensive. By skipping the processed and unhealthy foods, you can spend more of your budget on higher-quality, healthy foods.
                                               <br />
            </p>
          

            <p style={{ textAlign: "justify",fontSize: "20px" }}><b>3) Shop wisely and with a list:  </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px"  }}>
            If you go to the grocery store hungry, you are more likely to stray from your grocery list and buy something on impulse. When you’re hungry, you often crave foods that aren’t good for you or your budget. Try to grab a piece of fruit, yogurt, or another healthy snack before you go to the store.                                                             <br />
            </p>
            <p style={{ textAlign: "justify",fontSize: "20px" }}><b>4) Plan your meals:   </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
When it comes to saving money at the grocery store, planning is essential. Use one day each week to plan your meals for the upcoming week. Then, make a grocery list of what you need. Also, make sure to scan your fridge and cabinets to see what you already have. There are usually a lot of foods hidden in the back that can be used. Only plan to purchase what you know you’re going to use so that you don’t end up throwing away a lot of what you buy.                 
                   <br />
</p>

<p style={{ textAlign: "justify",fontSize: "20px" }}><b>5) Have home-cooked meals:   </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
Meal planning forms a very important activity for a lot of people. Having home-cooked meals not only ensures clean ingredients but also makes sure that the quantity consumed is viable. The taste is as per one's regular taste and hence even less food consumed makes one feel fulfilled because of the warmth 
<NavLink to="/">
                <strong
                  style={{
                    textShadow: "1px 1px 1px yellow",
                    fontWeight: 600,
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                  home-cooked
                </strong>
              </NavLink> meals have.
<br />
</p>
<p style={{ textAlign: "justify",fontSize: "20px" }}><b>6) Have smoothies:  </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
These days a lot of supplements are available in the market that is super expensive and are very bad for the health. Instead of consuming protein shakes replace them with healthy fruit and vegetable juices and you can see the difference. A lot of ayurvedic techniques can be used to keep a person healthy and happy.
               
<br />
</p>
<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
These are some ways and on adopting and following them well you will realize that one doesn't need to invest much money but their time and efforts will do their magic.
                                    <br /></p>




            

           
           
          </div>
        </div>
      </div>
      {/*<!-- ends: .comment-form -->*/}
    </Fragment>
  );
};
// const mapStateToProps = (state) => {
//     return {
//         blog: state.blog
//     }
// }
// export default connect(mapStateToProps)(DetailsContent);
export default DetailsContent;
