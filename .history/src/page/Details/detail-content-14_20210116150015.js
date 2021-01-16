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
        <div className="post-head" style={{marginLeft:"-5%"}}>
                <div className="post-audio">
                    <img src="../assets/img/blog-img-14.jpeg" alt="mothersfood" style={{maxWidth:"700px"}}/>
                </div>
            </div>
            <div className="post-content" style={{marginTop:"5%"}}>
                <div className="post-header">
                    <h3><strong>Which Indian vegetable is best for winter?</strong></h3>
                    <ul className="post-meta d-flex">
                        <li>13-01-2021</li>
                    </ul>
                </div>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>Though India is a tropical country, winters are pretty cold in most parts of the country. And as we all know, winters in India have arrived. Along with many winter favourites- woollen clothes, lazy days, soup days; food also will be greatly influenced the cold climate.<br/></p>
                    <p style={{ textAlign: "justify" }}>People usually prefer to stay indoors, eat a coz homemade meal made by the world’s best chef- mother. There are many winter favourite foods in India like momos, soups, starters etc. However, rice, rotis and curries constitute a major portion of staple Indian food, vegetables are crucial. 
                    <br/></p>
                    <p style={{ textAlign: "justify" }}>
                    We could go on and about the variety of vegetables that are grown in India. Few of the country’s favourite and most eaten vegetables during winters are- Potatoes, lady’s finger, cauliflower, brinjal, turnip, gooseberry, etc.,<br/></p>
                    <p style={{ textAlign: "justify" }}>Potatoes are used to make a mixed vegetable curry, or as a curry on its own, or as a side dish- potato fry. Another most loved potato dish would be aloo paratha. That is the nation’s favourite and would be perfect for a chilly evening or a cold morning.<br/></p>
                   
                    <p style={{ textAlign: "justify" }}>Lady’s finger is used to make curry, rice. There are lot of varieties available in the kind of curries made with lady’s finger. <br/></p>
                    <p style={{ textAlign: "justify" }}>Same goes with cauliflower, brinjal as well. However, cauliflower and potato make a great combination for a curry.<br/></p>
                    <p style={{ textAlign: "justify" }}>Gooseberry on the other hand, is made into a pickle and stored for a couple of months to savour it with white rice and some ghee.<br/></p>
                    <p style={{ textAlign: "justify" }}>Another important constituent of Indian winter food will be green leafy vegetables- spinach, cabbage, lettuce etc. There are preferred mostly in soups, parathas during the winters.<br/></p>
                   
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