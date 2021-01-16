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
        <div className="post-head" style={{ marginLeft: "-5%" }}>
          <div className="post-audio">
            <img
              src="../assets/img/blog-img-8.jpg"
              alt="mothersfood"
              style={{ width: "700px" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong>Importance of Homemade food for kids.</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>18-12-2020</li>
            </ul>
          </div>
          <hr />

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
              We cannot stress enough the importance of homemade food or home
              cooked meals. Of course, for the kind of nutrition it provides and
              the hygiene factors maintained. Especially for kids amidst the
              pandemic situation it is crucial for them to have whole nutrition
              only provided by home cooked meals. <br />
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
              Kids in their growing age need vitamins, minerals and all the
              essentials for developing good immune system, good health,
              stronger bones and organs. Home cooked meals made by their mothers
              have all the elements. Since fresh vegetables are used. And most
              importantly green leafy vegetables are included in homemade food.
              Consumption of fruits, fruit bowls, seasonal fruits and vegetables
              is the most important part of any kid’s nutrition.
              <br />
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
              Nutrition to kids is as important as a foundation to a building.
              The whole building relies on the foundation of the building.
              Stronger the foundation, greater the life of the building.
              Likewise, greater the nutrition for kids, greater is their healthy
              life span. <br />
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
              We should make sure that every meal each day in a kid’s life
              should include all the necessary nutritional elements. Milk is
              also very important for the development of bones and a stronger
              skeleton system.{" "}
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
