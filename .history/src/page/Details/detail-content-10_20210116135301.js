import React, { Fragment } from 'react';
// import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
const noAction = (e) => {
    e.preventDefault()
}
const DetailsContent = (props) => {
    // const { title, content, date, blog } = props;

    return (
        <Fragment>
        <div className="post-details">
            <div className="post-head">
                <div className="post-audio">
                    <img src="../assets/img/blog-img-10.jpg" alt="mothersfood" />
                </div>
            </div>
            <div className="post-content">
                <div className="post-header">
                    <h3><strong>Homemade food, an integral part of fitness.</strong></h3>
                    <ul className="post-meta d-flex">
                        <li>29-12-2020</li>
                    </ul>
                </div>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>Fitness is all about maintaining a balanced lifestyle and healthy nutrition rather than the misconceived concept of having bigger muscles. <br/></p>
                    <p style={{ textAlign: "justify" }}>Like all of us already know, homemade food provides wholesome nutrition for the human body. Basically, having more muscle mass rathe than fat in the human body, is considered and proven healthier. To have more muscle mass, one needs to eat good amounts of protein, controlled amounts of carbohydrates and fats.
                    <br/></p>
                    <p style={{ textAlign: "justify" }}>
                    Fitness is making sure; your calorie intake is in balance with the calories you burn per day/week. Calorie intake might sound sophisticated however it is not. Calorie intake is basically eating a balanced diet at all meals of your day according to your weight/weight goals, age, gender and few other factors.  <br/></p>
                    <p style={{ textAlign: "justify" }}>With the advent of internet, many people have access to lots of information on nutrition and proven studies. Which tell us that fitness is a must considering the current lifestyles people have and the ongoing pandemic.<br/></p>
                    <p style={{ textAlign: "justify" }}>Nothing favors fitness like homemade meals. With so much hygiene, use of good quality ingredients and fresh veggies and fruits, home cooked meals offer wholesome meals to human bodies.</p>
                   
                </div>
            </div>
        </div>{/*<!-- ends: .comment-form -->*/}
    </Fragment>
    )
}
// const mapStateToProps = (state) => {
//     return {
//         blog: state.blog
//     }
// }
// export default connect(mapStateToProps)(DetailsContent);
export default DetailsContent