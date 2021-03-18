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
              <li>16-03-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify",fontSize: "14px" }}>
            Clean eating is a lifestyle one has to adapt to maintain their health. But is clean eating always possible? Especially when you have a huge social circle where networking and socializing form a very important part of your life. But one cannot daily indulge in unhealthy food as well. Here are some tips you can use in order to do both socialize as well as eat clean:
                                                            <br/>
                        </p>
           
        
        <p style={{ textAlign: "justify",fontSize: "20px" }}><b>1) Pre-Eating:  </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            Healthy snacks are available at some parties but we cannot expect the same out of all restaurants and venues. The best way to curb your cravings is to go half full to a party or event. Have your bowl of sprouts, salad, or soup before you leave and so you won't reach the venue hungry and then it will automatically avoid overeating.
                                                                      <br />
            </p>

            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>2) Avoid Buffets:   </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px"  }}>
            Buffets are an all-you-can-eat food spread and tend to make you eat larger portions of food. Avoid any kind of buffet and prefer going to restaurants where you can order the food of your choice and taste. Also, ingredients play an important role in the upkeep of your health, and hence choosing your restaurants wisely is the key.
                        <br />
            </p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px"  }}>Although they offer very little nutrition and are packed with unhealthy ingredients, they are also very expensive. By skipping the processed and unhealthy foods, you can spend more of your budget on higher-quality, healthy foods.
                                               <br />
            </p>
          

            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>3) Have Plenty of Water:   </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px"  }}>
            Water is an excellent choice to curb your sudden hunger. It not only keeps you hydrated but also helps in taking up your appetite thus leaving you to eat less food. Thus one should have large glasses of water after and before a meal when eating clean and especially at a party. It helps to keep your stomach full most of the time.
              <br />
            </p>
            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>4)Skip Breadbasket:    </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
Bread is a very high source of carbs and very difficult to digest and hence it is very necessary to avoid bread especially when eating during dinner because it doesn't get digested properly and also weakens the metabolism as the system has to put in more strength to digest the food.               
                   <br />
</p>

<p style={{ textAlign: "justify",fontSize: "15px" }}><b>5) Carry Granola bars:    </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
Granola bars made of oats and honey are great for a quick snack and fill the stomach very quickly but are extremely healthy and light on the stomach. They are very easy to carry as well as can be eaten anywhere and everywhere thus making it an on-the-go snack. It keeps you full for a long time.

<br />
</p>
<p style={{ textAlign: "justify",fontSize: "15px" }}><b>6) Share the Meal:   </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
A study of people who successfully lost weight and kept it off showed that they often shared food or ordered half a portion when eating out. It’s a simple way to cut back on calories and prevent overeating. If you have nobody to share with, you can ask the waiter to wrap up half your meal for you to take home.

<br />
</p>

<p style={{ textAlign: "justify",fontSize: "15px" }}><b>7) Avoid Aerated Drinks:    </b></p>
<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
Many of us. Have too much sugar in our diets, and it can be quite bad for us. One source of sugar that we don’t need is sugar-sweetened drinks .Drinking sugar-sweetened beverages are strongly linked with an increased risk of obesity and type 2 diabetes. If you want to make a healthy drink choice while dining out, stick to water or unsweetened tea.               
<br />
</p>

<p style={{ textAlign: "justify",fontSize: "15px" }}><b>8) Have More Appetizers:     </b></p>
<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
As per the portion control rule appetizers are served in lesser quantity as compared to the main course. Also, appetizers have a lot of protein-rich options like paneer, eggs, sautéed veggies, mushrooms, soya chunks, and a lesser quantity of bread or roti. They can be consumed on their own with some mint chutney and also if you have more appetizers you have less space for the main course.
<br />
</p>

<p style={{ textAlign: "justify",fontSize: "15px" }}><b>9) Skip Desserts:      </b></p>
<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
Desserts are very appetizing and hence a lot of people tend to overeat desserts especially when they are eating at buffets or eating out and hence they tend to overeat and increase the quantity. If you crave desserts just call for a plate of fruits or have black coffee but binging on cakes and pastries is a big no-no if you are eating clean.
<br />
</p>


<p style={{ textAlign: "justify",fontSize: "15px" }}><b>10)Order Healthy Food Options:     </b></p>
<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
If you are going out for lunch/brunch order options like dosa, idli,curry-rice that are lighter on the stomach and don't have a lot of oil or masalas. When going out for dinner order some salad, order options that have paneer and void maida-based naan and roti as much as possible. Options like sautéed veggies, chicken are great for fulfilling the needs of the stomach.
<br />
</p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
There will be times when you want to eat your favourite food for pleasure and not worry about whether it is healthy or not.
                                    <br /></p>

<p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
Being flexible about your diet and food choices is linked with better overall health and weight management. It’s helpful to think about how a meal fits into your diet overall.
 <br /></p>

 <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
 If you are following <NavLink to="/download">
                <strong
                  style={{
                    textShadow: "1px 1px 1px yellow",
                    fontWeight: 600,
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                   healthy meal
                </strong>
              </NavLink> patterns most of the time, go ahead and treat yourself. An occasional indulgence can be good for the soul. Exercise daily, think positively, have your sunlight, and have home-cooked meals to keep yourself healthy.
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
