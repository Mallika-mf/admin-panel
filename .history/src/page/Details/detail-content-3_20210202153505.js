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
              src="../assets/img/blog-img-2.jpg"
              alt="mothersfood"
              style={{ width: "700px" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong>Fast Food Vs. Homemade Food</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>10-07-2020</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
              Sure, Fast food can be luring with its looks, aroma, and taste,
              but have you realized the oily platters, unhygienic kitchen
              equipment, and rotten ingredients? Yes. That's what makes them
              tasty, and most important unhealthy. We all have a myth that
              homemade food is not as delicious as street food. Well, whoever
              said that surely didn't understand the homemade food well.
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
              The battle between Homemade food and fast food is never-ending,
              but have you ever realized that we can cook fast food at home, but
              all these so-called Fast food can't bring the taste and
              love-filled in the homemade food? I understand how much ever I'd
              like to brag about the homemade food our part of the tummy that
              craves fast food drags us the mind towards in a different way. But
              there's always a way to tackle it. All you need to do is solely
              dedicate yourself to homemade food and turn to opt for healthy,
              homemade, hygienic also, superb tasty food. Wondering how? Read
              through and find out.
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
              <table border="1px solid black" border-collapse="collapse">
                <tr>
                  <th style={{ padding: "5px" }}>Homemade Food</th>
                  <th style={{ padding: "5px" }}>Fast Food</th>
                </tr>
                <tr>
                  <td style={{ padding: "2px" }}>
                    They are freshly made. If the ingredients are off the date,
                    they're off the table too.
                  </td>
                  <td style={{ padding: "2px" }}>
                    Stocked up, frozen or chemically balanced to last longer
                    than usual.
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "2px" }}>
                    Healthy, delicious and Hygienic
                  </td>
                  <td style={{ padding: "2px" }}>
                    Unhealthy and untidy in most circumstances
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "2px" }}>
                    The quality of the food is assured. Quality trumps over
                    money
                  </td>
                  <td style={{ padding: "2px" }}>
                    Cheapest options are the safest options for fast food
                    centers to save extra pennies.
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "2px" }}>
                    Control over quantity, serving, and eating portions.
                  </td>
                  <td style={{ padding: "2px" }}>
                    Addictive enough to ruin your health
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "2px" }}>
                    Adequate amounts of spices and ingredients used and cooked
                    at the right temperatures.
                  </td>
                  <td style={{ padding: "2px" }}>
                    Excessive salt and fat content used are addictive
                  </td>
                </tr>
              </table>
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
              But why are we having this discussion now?
            </p>
            <p style={{ textAlign: "justify" }}>
              There is no other better time than this to discuss homemade food
              benefits when the world is suffering from a deadly pandemic. An
              unseen virus that can literally spread through anything, and
              everything is changing lives drastically. Do you think cheating
              over your healthy meals with fast food is still worthwhile? I'm
              sure it's not more precious than your own life and definitely not
              worth risking it.
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
              Wait, wait, when we bragged so much about homemade food, we
              understand how we sometimes feel to order food from outside or how
              some amateur cooks struggle to cook food to cope with this kind of
              situation. That's where we come into the picture. MothersFood -
              Your Best Chef to deliver you healthy, homemade meals by hundreds
              of local women to cure your cravings and still takes care of your
              safety. Next time you long for fast food, read this again and
              again and thank us later.
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
