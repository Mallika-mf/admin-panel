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
              src="../assets/img/blog-img-22.jpg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong> Indian Meal Prep and Hacks</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>06-03-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
            Indian cuisine and food are famous all over the world for their spicy taste, innovative ingredients, and nutritional value. A lot of times people living away from home working without any house help face a lot of difficulties especially for homemade food. Since roti, dal, sabzi is something we have been having as kids it is difficult to adjust to some other food. Here are some pre-planning tips to have a quick meal or to quicken the process of cooking an entire meal:
                                    <br/>
                        </p>
            {/* <p style={{ textAlign: "justify" }}>
            Including immunity boosting and healthy food in your daily diet will make you feel good, healthy, and it will make your immune system strong. This will in turn help you to stay away from diseases. So, you might be probably wondering what are the immunity boosting Indian foods that I can easily find. Here are a few immunity boosting food suggestions to help you get started. 
                                    <br />
            </p> */}
        

            <p style={{ textAlign: "justify" }}><b>1) Cook pre-planned gravy: </b></p>

            <p style={{ textAlign: "justify" }}>
            The most basic sabzi gravy to be used in all kinds of vegetables/meat is the same old tomato onion gravy. What you can do is cook onion tomato together and turns it into a paste and stores it in your refrigerator for a good week. If you are running late on time then just quickly cook the gravy add paneer/veggies/meat and your lunch is ready to have with roti, rice, or even bread.
                                 <br/>   </p>

            {/* <p style={{ textAlign: "justify" }}>
            Amla is mostly available easily during the winter season. That is when it is most required too. In the winter season our body, skin, and hair need little extra care and with no doubt, Amla comes to the rescue. It is one of the healthiest foods as it barely consists of any calories and has zero fat. With immense nutrients and antioxidants, it helps us in many ways. 
                                  <br />
            </p> */}

            <p style={{ textAlign: "justify" }}><b>2) Bhuna Masala: </b></p>

            <p style={{ textAlign: "justify" }}>
            Bhuna masala or masalas in the general form an important part of Indian kitchen Bhuna masala, this is going to help you in every gravy be it dry, Shahi or Tawa. You can use, Dal tadka recipe and make them in advance for 1-4 weeks and store them in the freezer.
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

            <p style={{ textAlign: "justify" }}><b>3) Chop and keep the vegetables ready: </b></p>

            <p style={{ textAlign: "justify" }}>
            Cut and boiled vegetables like carrots, potatoes, beans, cauliflower. Keep these separately for an exclusive vegetable dish. You can store them together for dishes like pav bhaji, mix veg sabzi, pasta, lasagna, All types of pulao, Biryani and mix veg paratha. One can make meal boxes like these and store them in the fridge as per weekly meal plans.
                                                <br />
            </p>
            <p style={{ textAlign: "justify" }}><b>4) Keep Chutney, Acchar and Chilli-Garlic paste ready: </b></p>

<p style={{ textAlign: "justify" }}>
Fresh Tomato purees, chutneys, ginger-garlic paste, tamarind pulp, lemon juice, green chili-garlic paste, these pastes, and purees will form the base of your next awesome meal. Very easy to have with your roti, rice and even apply on sandwiches or as rolls they are very easy for an on the go meal or snack
                                    <br />
</p>

<p style={{ textAlign: "justify" }}><b>5) Keep roasted oats and muesli: </b></p>

<p style={{ textAlign: "justify" }}>
A very healthy option to cook or just munch on oats is forming a place in the Indian diet. A variety of foods like uttapam, upma, poha can be made from oats or even simple oats cooked with veggies and masala form a fulfilling meal. Similarly muesli is very healthy and a great breakfast option when made at home without sugar
                                    <br />
</p>

<p style={{ textAlign: "justify" }}><b>6) Boiled Chana or pulses: </b></p>

<p style={{ textAlign: "justify" }}>
Boiled beans, Chole, chana, dals, and maybe some cooked rice and quinoa. You can either prepare them fully or prep them and cook them half. Dals and chana are rich in protein and form a very fulfilling meal. Great for body and healthy if stored and kept can be cooked and ready within 10 minutes with all other meal prep.
                                    <br />
</p>

<p style={{ textAlign: "justify" }}><b>7) Keeping and idli/dosa batter ready: </b></p>

<p style={{ textAlign: "justify" }}>
You can always make the batter for dosa, chila, vada, Dahi vada, etc. in advance and store it in the fridge. If you do not get time to make your batter, ready-made batters are easily available in the market and you can make use of that. Even dry dal flours are available all you need to do is add water and spices etc. to make a batter for dosa, chila, or adai.
                                    <br />
</p>

<p style={{ textAlign: "justify" }}><b>8) Cooked meat and eggs: </b></p>

<p style={{ textAlign: "justify" }}>
Boiled eggs, cooked meat chunks, soups, pasta are other meals that are good to prep and store. You can make a complete curry and store them in portions according to meals and people for up to 2-3 days.
                                    <br />
</p>

<p style={{ textAlign: "justify" }}><b>8) Cooked meat and eggs: </b></p>

<p style={{ textAlign: "justify" }}>
<p style={{ textAlign: "justify" }}>
Boiled eggs, cooked meat chunks, soups, pasta are other meals that are good to prep and store. You can make a complete curry and store them in portions according to meals and people for up to 2-3 days.
                                    <br />
</p>                                    <br />
</p>
<p style={{ textAlign: "justify" }}>
Cooking may not be everyone's cup of tea but with these small meal preps, one can surely save a lot of time and effort. Also if it is still not working for you then MothersFood serves some lip-smacking delicious homemade food with home chefs cooking various regional cuisines on their platform and delivers it on the same day in Hyderabad and Delhi NCR. 
                                    <br />
</p>



            

           
           
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
