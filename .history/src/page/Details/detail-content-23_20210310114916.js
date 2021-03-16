import React, { Fragment } from "react";
// import { NavLink } from 'react-router-dom';
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
              src="../assets/img/blog-img-23.jpg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong>  Importance of High Quality Ingredients in meals.</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>09-03-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
            Food is loved by everyone. But what goes into your body is directly proportional to what shows on your body and health. So in simple words eating healthy is very necessary. Not just that but ingredients are used to make the food you are consuming is also necessary to be checked. With the increasing demand and expensive raw materials, people have forgotten to use authentic ingredients for their food preparations. When you go to someone’s house people will always serve you home-cooked food the reason being one never uses bad quality products for themselves if they can afford it. One always uses the best quality because it is much better to have a better quality of food than to pay the doctor for medicines and the medical issues caused by that food.
                                                <br/>
                        </p>
            {/* <p style={{ textAlign: "justify" }}>
            Including immunity boosting and healthy food in your daily diet will make you feel good, healthy, and it will make your immune system strong. This will in turn help you to stay away from diseases. So, you might be probably wondering what are the immunity boosting Indian foods that I can easily find. Here are a few immunity boosting food suggestions to help you get started. 
                                    <br />
            </p> */}
        
        <p style={{ textAlign: "justify" }}> If Food Ingredients could speak this is what they would say:</p>
        <p style={{ textAlign: "justify",fontSize: "15px" }}><b>1)Cooking Oil: </b></p>

        {/* <ul style={{ fontSize: "15px",textAlign: "justify" }} className="bullet--list2"><b>1)Cooking Oil: </b>
                      <li
                        style={{ textAlign: "left", fontSize: "15px" }}
                        className="bullet_list"
                      >Cooking oil forms the base of all Indian recipes and curries and in general most cooking in the part of the world. Oil is extracted from different seeds be it sunflower, mustard, or even til seeds. Now to save money a lot of people use cheap mixed oils that are very harmful to the heart as well as for the throat. Now with the re-using and heating of oils again and again the oil becomes inedible. So when you order from MothersFood it is cooked by responsible professionals that use top-quality ingredients especially oils.</li></ul>
            <p style={{ textAlign: "justify" }}><b>1)Cooking Oil:  </b></p>

            <p style={{ textAlign: "justify" }}>
            The most basic sabzi gravy to be used in all kinds of vegetables/meat is the same old tomato onion gravy. What you can do is cook onion tomato together and turns it into a paste and stores it in your refrigerator for a good week. If you are running late on time then just quickly cook the gravy add paneer/veggies/meat and your lunch is ready to have with roti, rice, or even bread.
                                 <br/>   </p> */}

            <p style={{ textAlign: "justify",marginLeft:"2%" }}>
            Cooking oil forms the base of all Indian recipes and curries and in general most cooking in the part of the world. Oil is extracted from different seeds be it sunflower, mustard, or even til seeds. Now to save money a lot of people use cheap mixed oils that are very harmful to the heart as well as for the throat. Now with the re-using and heating of oils again and again the oil becomes inedible. So when you order from MothersFood it is cooked by responsible professionals that use top-quality ingredients especially oils.
                                              <br />
            </p>

            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>2) Fresh Vegetables:  </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%"  }}>
            Fresh vegetables and fruits are very healthy to consume be it cooked or raw. They give an important taste to the curry or sabzi. For vegetables, it is very important to buy raw grown vegetables as compared to the pesticide grown ones that are forced to be grown quicker. Now to cook healthy food, the vegetables also need to be fresh and pure. So always buy fruits and vegetables from vendors that sell organically grown produce.
                                               <br />
            </p>
            {/* <p style={{ textAlign: "justify" }}>
            They contain a high quantity of vitamins, minerals, and antioxidants.
            <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            Antioxidants are naturally occurring molecules that help neutralise free radicals in our body. Antioxidant molecules can decrease or reverse the effect of free radicals that can cause certain diseases:
            
            <br />
            </p> */}
            {/* <p style={{ textAlign: "justify" }}>-Heart Disorders</p>
            <p style={{ textAlign: "justify" }}>-Cancer</p>
            <p style={{ textAlign: "justify" }}>-Arthritis</p>
            <p style={{ textAlign: "justify" }}>-Stroke</p>
            <p style={{ textAlign: "justify" }}>-Immunity deficiency </p>
            <p style={{ textAlign: "justify" }}>-Respiratory disorders</p> */}

            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>3)Masalas:  </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%"  }}>
            Masala known as spices is a very important component of flavors in the food. To bring down the costs of bulk production and enhance flavors, non-organic spices use additional fillers and flavors, some of which are downright harmful to your health. In a recent survey, it was found that a conventionally produced spice contained high levels of MSG (Mono Sodium Glutamate). Despite being an excellent flavor enhancer, it is deemed as a ‘silent killer’ by health experts.
                                                            <br />
            </p>
            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>4)Grains:  </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%" }}>
When one purchase high-quality wheat, rice pulses they are free from any dirt or dust that is accumulated on the grains. Also very nutritious in their values these grains are easy to digest. Good grains are never irradiated. Irradiated food is exposed to intense ionizing radiation. This is done in a processing room for a specified duration. With food irradiation, radiant energy (electrons, gamma rays, or x-rays) breaks chemical bonds and the intention is to reduce microorganisms. The concern is that radiation is known to cause cancer.
                                    <br />
</p>

<p style={{ textAlign: "justify",fontSize: "15px" }}><b>5)Meat:  </b></p>

<p style={{ textAlign: "justify",marginLeft:"2%" }}>
Meat products and meat is something people prefer to have of the best quality since there are a lot of chances for diseases to spread via animal meat. Meat is one of the most careful ingredients that a cook has to deal with. Since a lot of animals consumed are not pet or are in the wild one is unaware as to what exactly they have consumed and the same thing will go into your stomach. So it is always advised to consume meat from trustworthy places.
                                    
</p>
<p style={{ textAlign: "justify",marginLeft:"2%" }}>
Now that we are aware of various important ingredients it is easy to conclude that the best way to have food is to have homemade food or order it from places that are trustworthy for good quality of food. Order fresh delicious food from Mothersfood that is made with high-quality ingredients and is safe for your heart and health.
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
