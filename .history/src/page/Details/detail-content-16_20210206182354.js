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
              src="../assets/img/blog-img-16.jpeg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong> 7 Unique ways to Consume Vegetables</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>06-02-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
            Vegetables and fruits form a very integral part of one's daily meals. Vegetables were original gathered by hunter-gatherers in 10000 B.C.When they realized that they are tasty and can also be re-cultivated again they began the farming of different vegetables in different regions. Even today vegetables are considered a primary source of food along with grains. Vegetables are a direct source of potassium, dietary fibre, folate (folic acid), vitamin A, and vitamin C.              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            Diets rich in fibres like vegetables help to reduce cholesterol and keeps diseases like diabetes at bay. Most vegetables are low in fat and calories and none have cholesterol. It also reduces the risk of heart disease or obesity. One of the biggest mistakes we make is adding preservative based products to these natural healthy produce and make it unhealthy. Like french fries, we fry the potato deep into oil and then consume it which is the wrong way of consumption.              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            Today we are going to show you 7 ways in which one can consume vegetables daily and also make them tasty without any added preservatives or extra salts.              <br />
            </p>
           
            <p style={{ textAlign: "justify" }}><b>1) Soups:</b></p>
            <p style={{ textAlign: "justify" }}>
            Soups are one of the easiest and simplest ways to consume vegetables for all age groups. Soups are light on the stomach, easy to prepare, and can be made out of all vegetables. To season soup one requires basic ingredients like black pepper and salt and voila your soup is ready. Soup keeps the body warm and helps to give an instant energy boost.            </p>
            <p style={{ textAlign: "justify" }}><b>2) Salads:</b></p>

            <p style={{ textAlign: "justify" }}>
            From nuts to fruits, salads can be made out of everything. Salads are a perfect side dish to a heavy meal but can also be consumed as an entire meal especially at night. Salads with heavy dressing like mayonnaise can be heavy in fats and hence it is better to use natural dressings like olive oil, lemon juice, or some hung curd. Salads are also a great way one can give vegetables to kids and have them without making a fuss.              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>3) Omelette:</b></p>

            <p style={{ textAlign: "justify" }}>
            Eggs are a great source of proteins and hence it is advised to consume eggs during breakfast. An amazing way to include vegetables in breakfast is to mix them with your eggs and have them. Vegetables like zucchini, capsicums, and tomatoes taste amazing with omelette.To keep it healthy don't add any extra spices or sauces and also avoid heavy cheese. Consume your nice fluffy vegetable omelette and start the day healthy.              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>4) Smoothies:</b></p>

            <p style={{ textAlign: "justify" }}>
            Smoothies are another great way to mix fruits and vegetables and have them first thing in the morning. Smoothies are a mixture of fruits, milk, and vegetables. Vegetables like spinach, kale, zucchini, beet, are a great source of nutrients as well as easy to mix in smoothies. The best way to replace sugar is with honey or jaggery powder. Add frozen fruits to it with some almonds or nuts and you are good to go. It is also great for kids to have in the morning.              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>5) Veggie Noodles:</b></p>
            <p style={{ textAlign: "justify" }}>
            Veggie Noodles are so simple to make that one would never even know the difference in taste. Kids enjoy noodles and what best way to consume vegetables than to make noodles. Food as they say is an art and awakens our hunger when we say tasty food. They are an amazing way to replace noodle carbs by low carb vegetables. Zucchini noodles are the easiest to make and get cooked very easily using simple spices.

              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>6) Leafy vegetables as wraps:</b></p>
            <p style={{ textAlign: "justify" }}>
            Veggie Noodles are so simple to make that one would never even know the difference in taste. Kids enjoy noodles and what best way to consume vegetables than to make noodles. Food as they say is an art and awakens our hunger when we say tasty food. They are an amazing way to replace noodle carbs by low carb vegetables. Zucchini noodles are the easiest to make and get cooked very easily using simple spices.

              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>7) Grilled Veggies:</b></p>
            <p style={{ textAlign: "justify" }}>
            Grilled veggies are a perfect way to make a meal filling and healthy at the same time. Any veggie with a seasoning of salt, chili, and pepper tastes fresh, healthy, and perfectly charred. Just add any kind of veggies to your sandwich grill and keep them in it for 2-3 minutes. After that take them out, season them with spices and lemon juice and taste the difference. Tastes much better than regular veggies and is also very light on the stomach.              <br />
            </p>

            <p style={{ textAlign: "justify" }}>
            There are so many ways one can add veggies to their meals. Some discreetly get mixed and some not too discreetly. But the best part is that they not only provide the much-needed nutrients but also boost metabolism and are very light on the stomach.              <br />
            </p>

            <p style={{ textAlign: "justify" }}>
            Indian cuisine is such that one has to consume veggies every day in the form of sabzi and roti. If it is not possible for one to cook meals everyone can very easily order it from MothersFood where we serve fresh, hygienic home-cooked meals that are cooked by mothers and help in turn to make them financially independent.           <br />
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
