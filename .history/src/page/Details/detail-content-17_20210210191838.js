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
              src="../assets/img/blog-img-17.jpg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong> HOW SPROUTS ARE BENEFICIAL FOR THE BODY?</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>09-02-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
            Sprouts form an integral part of a meal and have been considered as superfoods for many decades. Sprouts are germination of any seed but when it comes to consumables we can sprout several different legumes and seeds. Sprouts can be cooked, turned into a salad, or eaten plain raw. When seeds are soaked in water for a certain period, they germinate, causing their outer layers to tear open and allowing a young shoot to blossom. Sprouted grains, legumes, and beans are believed to be very nutritious and healthy.             <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            Diets rich in fibres like vegetables help to reduce cholesterol and keeps diseases like diabetes at bay. Most vegetables are low in fat and calories and none have cholesterol. It also reduces the risk of heart disease or obesity. One of the biggest mistakes we make is adding preservative based products to these natural healthy produce and make it unhealthy. Like french fries, we fry the potato deep into oil and then consume it which is the wrong way of consumption.              
            <br />
            </p>
        
            <p style={{ textAlign: "justify" }}><b>Benefits of Sprouting</b></p>
            <p style={{ textAlign: "justify" }}>
            Sprouts are an excellent source of Calcium, Potassium, Magnesium, Folate, and Beta-carotene. Sprouting also increases the protein value and shortens the cooking time of pulses. During the process of sprouting, some of the stored starch in the legume is used up for forming the tiny leaves and rootlets and in making vitamin C. It has been written in numerous books that sprouting the pulses removes gas-producing starches out of them. Here are some health benefits that will convince you to consume sprouts daily.              </p>
            <p style={{ textAlign: "justify" }}><b>1.	They help in digestion</b></p>

            <p style={{ textAlign: "justify" }}>
            Sprouts contain an unusually high content of living enzymes. These enzymes further help in boosting your metabolic processes and improve chemical reactions within the body, specifically when it comes to digestion. Enzymes help break down the food effectively and enhance the absorption of nutrients by the digestive tract. Sprouts also have a lot of dietary fiber which regulates digestion. Fiber bulks up the stool, making it easier to pass through the digestive tract.              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>2. Boosts blood circulation instantly.</b></p>

            <p style={{ textAlign: "justify" }}>
            Sprouts help in boosting your blood circulation by maintaining your red blood cell count with iron and copper. This further helps in supplying oxygen to various organs and cells to optimize their performance. Sprouts tend to repair capillaries to get strong and thick hair too. A healthy blood supply is a good stimulant for hair growth. It helps generate new blood vessels and increases circulation to the scalp and follicles.                 <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>3. It Helps in weight loss</b></p>

            <p style={{ textAlign: "justify" }}>
            Sprouts are one of the best foods to help lose weight. They are high in nutrients but have negligible calories which mean that you can consume sprouts without worrying about the weighing scale. Furthermore, sprouts contain a high amount of fiber that makes you feel full for a longer period. It also inhibits the release of ghrelin, a hunger hormone that indicates our brain to eat more.             <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>4. Builds a strong immunity</b></p>
            <p style={{ textAlign: "justify" }}>
            Sprouts have a high vitamin C content that makes them a powerful stimulant for the white blood cells in the body to fight off infections and diseases and thus, building your immunity system. It also has abundant vitamin A. Vitamin A has several antioxidant properties that make it a great source of immune system strength.  
              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>5. Helps to strengthen Eye-sight:</b></p>
            <p style={{ textAlign: "justify" }}>
            Vitamin A has been associated with the improvement in vision health. Due to the presence of vitamin A, sprouts also help in improving your vision and eyesight. They also have antioxidant agents to protect the cells of the eyes from free radicals. So load up on more sprouts to ensure seeing a bright world out there. 
              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>6. Highly Beneficial for Heart:</b></p>
            <p style={{ textAlign: "justify" }}>
            Sprouts have omega-3 fatty acids which help in boosting good cholesterol (HDL) levels and reduce the amount of harmful cholesterol in your blood vessels and arteries. Omega-3 fatty acids have anti-inflammatory properties that help in reducing the excessive stress on your cardiovascular system. The presence of potassium helps reduce blood pressure levels, further reducing the risk of any cardiovascular problem.             
            <br/>
            </p>

            <p style={{ textAlign: "justify" }}><b>7. It Helps reduce acidity:</b></p>
            <p style={{ textAlign: "justify" }}>
            Sprouts are alkalizing to the body. They help regulate and maintain the pH levels of your body by reducing the level of acids. It is known that many illnesses including cancer are associated with excess acidity in the body. Include sprouts in your salads to ensure less acidity from citrus fruits.             <br/>
            </p>

            <p style={{ textAlign: "justify" }}><b>8. Prevents premature ageing:</b></p>
            <p style={{ textAlign: "justify" }}>
            Sprouts are said to have an abundance of highly active antioxidants that helps prevent premature ageing. It is known to prevent DNA destruction that is also a cause of ageing. Moreover, the antioxidants present in the sprouts help combat cell-damaging free radicals that can cause premature ageing. So eat more sprouts and include them in your daily diet.            <br/>
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
