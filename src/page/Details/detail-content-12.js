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
                    <img src="../assets/img/blog-img-12.jpg" alt="mothersfood" style={{width:"700px"}}/>
                </div>
            </div>
            <div className="post-content" style={{marginTop:"5%"}}>
                <div className="post-header">
                    <h3><strong>What are your comfort foods?</strong></h3>
                    <ul className="post-meta d-flex"style={{marginTop:"3%"}}>
                        <li>06-01-2021</li>
                    </ul>
                </div><hr/>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>Comfort foods give comfort to the whole mood. Mostly comfort foods are staple foods. Majority of the people enjoy comfort foods, not to forget, comfort foods are majorly homemade food. After a busy day or busy week full of work, nothing does the magic like comfort food, made by the best chef- your mother.  <br/></p>
                    <p style={{ textAlign: "justify" }}>No South Indian would ever say no to a a bowl of hot steamy rice with dal, ghee and papad. The thought itself is so soothing. Likewise, no North Indian would ever say no to roti, sabzi or parathas. There is a list of comfort foods for everyone. Few among them which top the list are- Dal rice, Curd rice, Tempered curd rice, roti sabzi, hot idlys with chutney and ghee, dosas with chutney, upma, poha, daliya. All of these foods are light on the stomach simultaneously very filling and are nutritious. The top most advantage is that they are all homemade and can be eaten for breakfast, lunch, dinner or even evening snack.
                    <br/></p>
                    <p style={{ textAlign: "justify" }}>
                    Apart from the list but one of whole India’s most favourite is Chai and Coffee! This is a different level of comfort for 90% of Indians. There would not exist a single household without tea or coffee. Most people consume homemade coffee or tea (chai) first thing in the morning to start functioning! <br/></p>
                    <p style={{ textAlign: "justify" }}>There is no food which is so soothing and satisfying as comfort homemade foods which are enjoyed in every household!<br/></p>
                   
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