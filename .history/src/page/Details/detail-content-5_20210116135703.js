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
                    <img src="../assets/img/blog-img-5.jpg" alt="mothersfood" />
                </div>
            </div>
            <div className="post-content">
                <div className="post-header">
                    <h3><strong>Health and Hygiene with homemade food</strong></h3>
                    <ul className="post-meta d-flex">
                        <li>30-11-2020</li>
                    </ul>
                </div>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>One of the most important aspects of all life, is food. Singularly for humans. As humans have the intellect to understand good food and bad food. Consumption of good quality, healthy food cannot be stressed enough. This is very subjective according to geographies. However, customary is to eat healthy. With the current lifestyle that people follow, they fall prey to a lot of deadly, chronic diseases and have reduced immunity. Majorly because the food they consume does not have all the prerequisite vitals. <br /></p>
                    <p style={{ textAlign: "justify" }}>“Eating healthy”, is one of the most used phrases around the world. Homemade food; we can say is the healthiest that anyone can consume. Why though? Because of the balanced diet, ingredients used, methods followed, nutritional values and hygiene maintained. Junk food on the other hand, is pre-prepared, has low nutritional value, contains bad fats, includes numerous processed items. Giving your body junk food is like injecting slow poison to it.
                    <br /></p>
                    <p style={{ textAlign: "justify" }}>
                        Homemade food is anyway lot more advantageous when compared to junk. The whole definition of junk implies the same too. High nutritional value is the key reason for homemade food to be considered healthy. And most impressively, homemade food is freshly prepared and is instantaneous with hunger. Junk food on the other hand, has low or even no nutritional values. The quality and mix of ingredients used at home are fresh, minimally processed, without artificial preservatives. Whereas junk food is highly processed with lots of added preservatives. This is a big red flag to our body. Consuming homemade food makes you less prone to allergies, food infections, food poisoning etc. The standard of hygiene maintained during the preparation of homemade food is high.
                    <br /></p>
                    <p style={{ textAlign: "justify" }}>Hygiene cannot be assured in junk food, since the food is pre-prepared in large scales.<br />  </p>
                    <p style={{ textAlign: "justify" }}>People who have been eating homemade food are found to be healthier and happier. To maintain good physical and mental health balance and to have a healthier immune system, eating homemade food is imperative. With the current pandemic situation, mankind once again realized the importance of immunity. Implying a big no to junk food. Eating healthy homemade food is crucial to nurture your body, develop immunity and become stronger to win all other races in life. </p>


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