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
              src="../assets/img/blog-img-18.jpeg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong> SUPERFOODS AND THEIR BENEFITS</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>16-02-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
            Fruits, vegetables, cereals, pulses are all known to provide our body with a different set of nutrients each and hence it is advisable to consume them regularly. It is widely known that there are no fixed fruits or vegetables that can provide us with all nutrients. But some SuperFoods have surpassed all boundaries and are known to provide our body with substantial nutrition. They are very low in calories and hence play a major role in all types of diets.
            <br/>
                        </p>
            <p style={{ textAlign: "justify" }}>
            They contain a high quantity of vitamins, minerals, and antioxidants.
                        <br />
            </p>
        
            <p style={{ textAlign: "justify" }}>
            Antioxidants are naturally occurring molecules that help neutralize free radicals in our body. Antioxidant molecules can decrease or reverse the effect of free radicals that can cause certain    diseases:     <br/>     </p>
            <p style={{ textAlign: "justify" }}>-Heart Disorders</p>
            <p style={{ textAlign: "justify" }}>-Cancer</p>
            <p style={{ textAlign: "justify" }}>-Arthritis</p>
            <p style={{ textAlign: "justify" }}>-Stroke</p>
            <p style={{ textAlign: "justify" }}>-Immunity deficiency </p>
            <p style={{ textAlign: "justify" }}>-Respiratory disorders</p>
            <p style={{ textAlign: "justify" }}> Including Super-Foods in one's everyday diet is very essential. They are available in different types of foods. Here are 5 superfoods and the ways you can include them in your diet:<br/></p>
            <p style={{ textAlign: "justify" }}><b>1)Nuts:</b></p>

            <p style={{ textAlign: "justify" }}>
            Nuts are a very popular healthy consumption option. They are great for everyone and are inclusive in all diets. Hazelnuts, Pine nuts, Walnuts, Pecans are great antioxidant powerhouses.            <br />
            </p>

            <p style={{ textAlign: "justify" }}>
            Antioxidants, including the polyphenols in nuts, can combat oxidative stress by neutralizing free radicals — unstable molecules that may cause cell damage and increase disease risk.
                      <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>2)Olive Oil:.</b></p>

            <p style={{ textAlign: "justify" }}>
            Oil, in general, is considered to have bad fats and very risky for heart patients but Olive Oil as a whole is a different ball game. Olive oil is the oil extracted from olives and is a great source of Vitamin E. It is a very widely know superfood and is recommended by a lot of nutrition experts. Olive oil is rich in monounsaturated fats and has several health benefits, making it a healthy addition to a balanced diet when consumed in moderation. Regularly consuming olive oil can help you reach the recommended intake of healthy fats and may benefit your overall health in several ways.           <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>3)Berries:</b></p>

            <p style={{ textAlign: "justify" }}>
            Berries are a very widely spread fruit in India. Berries are grown and consumed in a lot of different ways. The most commonly consumed berry is Strawberry. It is consumed as a fruit, topping, and as a dessert. Other berries include mulberries and blueberries. Berries contain antioxidants, which help keep free radicals under control.
                        <br />
            </p>

            <p style={{ textAlign: "justify" }}>
            Free radicals are unstable molecules that are beneficial in small amounts but can damage your cells when their numbers get too high, causing oxidative stress. Berries are a great source of antioxidants, such as anthocyanins, ellagic acid, and resveratrol. In addition to protecting your cells, these plant compounds may reduce disease risk                        <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>4)Yogurt:</b></p>
            <p style={{ textAlign: "justify" }}>
            Yogurt is a very popular gut health booster and milk by-product. Yogurt can be made from all types of milk. Varieties made from skim milk are considered fat-free, whereas those made from whole milk are considered full-fat. Yogurt contains nearly every nutrient that your body needs. It’s known for containing a lot of calcium, a mineral necessary for healthy teeth and bones. Just one cup provides 49% of your daily calcium needs. It is also high in B vitamins, particularly vitamin B12 and riboflavin, both of which may protect against heart disease and certain neural tube birth defects.              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>5) Flax Seeds:</b></p>
            <p style={{ textAlign: "justify" }}>
            Flax seeds have been known as God's food for hundreds of years. Flaxseed contains a plant-based type of omega-3 fatty acid called alpha-linolenic acid, or ALA, which has been tied to improved circulation and anti-inflammatory effects. Research shows that these fats may also help fight osteoporosis by reducing the risk of bone fractures, and offer modest protection against type 2 diabetes.
                          <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            There are certain myths attached to super-foods. People consider them to be all-around nutrition. But various diet experts say that superfoods work only when one is consuming a healthy wholesome diet regularly. A healthy fresh food diet is only possible when one consumes home-cooked food. Healthy home-cooked food can now be ordered from MothersFood.                          <br />
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
