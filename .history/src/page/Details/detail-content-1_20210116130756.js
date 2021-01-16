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
            <div className="post-details" >
                <div className="post-head">
                    <div className="post-images" style={{marginLeft:"-5%"}}>
                        <img src="../assets/img/blog-img-3.jpg" alt="mothersfood" style={{width:"700px"}} />
                    </div>
                </div>
                <div className="post-content">
                    <div className="post-header">
                        <h3><strong>Cooking is a passion for every woman</strong></h3>
                        <ul className="post-meta d-flex">
                            <li>10-07-2020</li>
                        </ul>
                    </div>

                    <div className="m-bottom-40">
                        <p style={{ textAlign: "justify" }}>Cooking is an art and science of experimenting with savory, sweetness, and spices in ways that it brings
                        out a drooling essence, flavor, taste, smell, and gets you a smile. Well, this might sound easy, but you
                        don't know what you are facing until you get to the field. It is a time taking task that needs complete
                        attention and a lot more patience to make it perfect, and experts believe love is what makes it the best.<br/></p>
                        <p style={{ textAlign: "justify" }}>Our minds perceive in a way that when we see food experts, we naturally assume it to be our mom. No
                        matter how many cousins and gourmets you hog on to, in the end, we all crave Ghar ka khana. No food
                        is as good as mom's food. They certainly have an abundance of love and mostly a determined passion
                        for providing for us every day.<br/></p>
                        <p style={{ textAlign: "justify" }}>It requires as much skill set, dedication, time, practice, curiosity, and commitment to be best at it like in
                        any other profession space. Though it should be practiced, it is often not appreciated much, on the
                        everyday dining table. Being a part of the Indian households, girls from a very young age are conditioned
                        to believe that cooking is merely a responsibility. Hence this art never gets the kind of appreciation and
                        encouragement which it truly deserves.<br/></p>
                        <p style={{ textAlign: "justify" }}>Cooking as a passion is found in almost every mother or Indian woman, but it gets too little awareness
                        and exposure to monetize this skill set. Homemakers, though, are making the right way into the
                        professional world, with changing times and recognition, they are taking their talent to get occupational
                        exposure. Women like Shipra Khanna, winner of Master Chef 2012, and Social Media sensation Uma
                        Raghuraman, also famous as @MasterChef mom, is one of the best food bloggers. She shares her
                        everyday food recipes from her home, and she has a huge following base. They followed their passion
                        and made it from their kitchen to being celebrity chefs.<br/></p>
                        <p style={{ textAlign: "justify" }}>Come by this day after ages of struggle, mindset towards cooking is changing and is one of society's
                        most progressive arts. Women are following their passion for discovering and widening their scopes, but
                        men are also the most significant part of this industry, slowly fading out the gender stereotype.<br/></p>
                        {/*<!-- ends: .bullet--list2 -->*/}
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