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
                    <img src="../assets/img/blog-img-7.jpg" alt="mothersfood" style={{width:"700px"}} />
                </div>
            </div>
            <div className="post-content" style={{marginTop:"5%"}}>
                <div className="post-header">
                    <h3><strong>Celebrities and their favorite homemade dishes.</strong></h3>
                    <ul className="post-meta d-flex"style={{marginTop:"3%"}}>
                        <li>14-12-2020</li>
                    </ul>
                </div><hr/>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>There is a lot of variety of food available in the market. Different cuisines, different styles, different outlets and numerous options. However, irrespective of all the availability, homemade food tops every Indian’s heart. There is nothing like a comforting homemade meal. From a normal person to a celebrity like Shah Rukh Khan, everybody prefers home cooked meals in their daily intake. Here are few celebrities and their favorite homemade dishes made by their favorite home chefs- their mothers.<br /></p>
                    <p style={{ textAlign: "justify" }}>Starting with the Bhai of Bollywood- Salman Khan. Salman’s absolute favourite is home cooked biryani and kebabs made by his best home chef- his mother.
                    <br /></p>
                    <p style={{ textAlign: "justify" }}>
                    Coming to the heart throb of youth- Ranbir Kapoor loves to indulge in home made dishes of the Rajputs of Rajasthan, cooked by his mother. Nothing like non vegetarian food for him and his grandmother is his favourite cook. <br /></p>
                    <p style={{ textAlign: "justify" }}>Aishwarya Rai Bachchan, one of the world’s most beautiful woman loves simple everyday food cooked by her mom. Her all time favourites being- dal, a light fish curry, chicken curry.<br />  </p>
                    <p style={{ textAlign: "justify" }}>Bipasha Basu true to her Bong self loves seafood. She loves her mom-made mustard fish and prawn curry.<br />  </p>
                    <p style={{ textAlign: "justify" }}>Anushka  Sharma the super star, Punjabi tadka makes all the difference. Her favourite is the rich flavours of chicken butter masala, made by her mom.<br /> </p>
                    <p style={{ textAlign: "justify" }}>Shriya Saran, the south Indian beauty loves eating home-cooked food. Her most favourite dish is Sambar Rice.
<br /></p>
<p style={{ textAlign: "justify" }}>Shahenshah of Bollywood, Amitabh Bachan loves bhindi curry with moong dal.
<br />  </p>

                    <p style={{ textAlign: "justify" }}>Kollywood king- Ajith Kumar loves his homemade mutton curry.</p>


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