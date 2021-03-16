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
              src="../assets/img/blog-img-20.jpg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong> Indian Ancient Ingredients and their benefits.</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>26-02-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify",fontSize: "14px" }}>
            Originally according to our scriptures Indian food is considered as one of most healthiest diet.It is considered as power-packed with protiens,,carbs and nutrients all together.But with the change in the eating habits it is difficult to maintain it now.Eating less junk food and avoiding overeating are usually two of the most common food related resolutions. However, if you are planning to eat healthily, it is important to include immunity boosting Indian foods in your diet. 
                        <br/>
                        </p>
            <p style={{ textAlign: "justify",fontSize: "14px" }}>
            Including immunity boosting and healthy food in your daily diet will make you feel good, healthy, and it will make your immune system strong. This will in turn help you to stay away from diseases. So, you might be probably wondering what are the immunity boosting Indian foods that I can easily find. Here are a few immunity boosting food suggestions to help you get started. 
                                    <br />
            </p>
        

            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>Amla </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            Amla, also known as Indian Gooseberry is native to India and widely loved by all the people here. It is famously known for its nutrient-rich profile and its miraculous benefits for the body, skin, and hair. It is mainly found in two forms – Amla Tablets and Amla Powder. With multiple applications in all the areas, it is safe to say that it is the most diverse, versatile, and beneficial food.
                     <br/>   </p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            Amla is mostly available easily during the winter season. That is when it is most required too. In the winter season our body, skin, and hair need little extra care and with no doubt, Amla comes to the rescue. It is one of the healthiest foods as it barely consists of any calories and has zero fat. With immense nutrients and antioxidants, it helps us in many ways. 
                                  <br />
            </p>

            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>SuperFoods </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            Fruits, vegetables, cereals, pulses are all known to provide our body with a different set of nutrients each and hence it is advisable to consume them regularly. It is widely known that there are no fixed fruits or vegetables that can provide us with all nutrients. But some SuperFoods have surpassed all boundaries and are known to provide our body with substantial nutrition. They are very low in calories and hence play a major role in all types of diets.
                       <br />
            </p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            They contain a high quantity of vitamins, minerals, and antioxidants.
            <br />
            </p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            Antioxidants are naturally occurring molecules that help neutralise free radicals in our body. Antioxidant molecules can decrease or reverse the effect of free radicals that can cause certain diseases:
            
            <br />
            </p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>-Heart Disorders</p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>-Cancer</p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>-Arthritis</p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>-Stroke</p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>-Immunity deficiency </p>
            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>-Respiratory disorders</p>

            <p style={{ textAlign: "justify",fontSize: "15px" }}><b>Honey </b></p>

            <p style={{ textAlign: "justify",marginLeft:"2%",fontSize: "14px" }}>
            The sugars of honey are more easily digested than those of table sugar. The dry weight of honey is 95% carbohydrates, which include the sugar molecules fructose and glucose; however, table sugar (refined cane sugar) is solely sucrose. Glucose and fructose are more easily digested than fructose. and they are also chemically different. Sucrose is a complex sugar (a compound of glucose and fructose together), but in order to break down sucrose, acids or enzymes are needed. This is how bees convert the complex sugars of flower nectar into the simple sugars found in honey - they secrete a special enzyme for the process. The end result contains simple sugars that are easily absorbed by body. Because fructose is actually sweeter than sucrose, honey can taste sweeter than ordinary sugar! Honey contains a diverse nutrients array of vitamins, minerals, and other organic compounds. 
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
