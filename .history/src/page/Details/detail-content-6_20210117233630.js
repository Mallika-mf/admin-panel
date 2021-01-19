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
                    <img src="../assets/img/blog-img-6.jpg" alt="mothersfood" style={{maxWidth:"100%",width:"700px"}} />
                </div>
            </div>
            <div className="post-content" style={{marginTop:"5%"}}>
                <div className="post-header">
                    <h3><strong>Indian Homemade Foods</strong></h3>
                    <ul className="post-meta d-flex"style={{marginTop:"3%"}}>
                        <li>5-12-2020</li>
                    </ul>
                </div><hr/>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>India is a land of  a variety of spices and flavors due to its multi-cultural nature. That deduces to Indian food being multi-cultural too. There is a variety of tasty, hygienic food that is made in every household in India. Contrary to the Western households, homemade food plays a major role in the lives of Indians. In India, a mother is considered to be the best chef. Indeed, that is true because, there is nothing like the taste of a mother’s homemade food. Varying from different cultures some of the popular Indian dishes are: Biryani, Rotis/Naans, Dal, Tandoori Items, Korma, Dosa, Idli, Butter Chicken, Laddus, Jalebi, Kulfi, Rasam and the list can go on and on. <br /></p>
                    <p style={{ textAlign: "justify" }}>The first and foremost thing someone living away from family misses is- healthy homemade food. There shall be numerous times when a person misses a delicious bowl of homemade biryani. Everyday it might be a struggle for a person to eat homemade rotis which taste like his mothers’. Be it biryani, roti, sweets like- jalebi, kulfi, laddus or just some munchies, special dishes during festivals, MothersFood understands all your homemade food cravings.
                    <br /></p>
                    <p style={{ textAlign: "justify" }}>
                        Now we bring to you- MothersFood, a healthy homemade food delivery app. MothersFood was started with the view point of making “homemade food online”, adding the taste of a mother’s hand in a dish. Our aim is as simple as making tasty, healthy, hygienic homemade food accessible to people across India, more so specifically to people living away from their homes. Monotony is never exciting, MothersFood is the product of the idea that, people usually get used to or lose appetite eating the same food everyday. We might not be sure of ordering online all the time. Especially during times like a pandemic. Hence, MothersFood can be your <br /></p>
                    <p style={{ textAlign: "justify" }}>best bet during such uncertain times. During these uncertain times, be certain about healthy, homemade food with lip smacking delicacies when you order from MothersFood, delivering homemade food at your doorstep. We partner with the best chefs- Mothers, from around the country to bring to you, different cuisines from all over India and the best foods at your doorstep. We make sure of each home chef’s dishes are tasted well in advance before we collaborate with them to bring nothing but the best to our customers. We educate home chefs about hygiene and safety guidelines to be followed while preparing lip smacking dishes. We ensure complete transparency from the time you have ordered till the time the order reaches you. Customers ordering from MothersFood can be rest assured of their order’s- taste, hygiene and ingredients used. We provide contactless “homemade food at your doorstep delivery” to ensure extreme safety.<br />  </p>
                    <p style={{ textAlign: "justify" }}>Now that you have nothing to worry about, order right away from MothersFood! To enjoy a wide variety of amazing dishes with great offers, discounts and coupons. Be certain about the food you eat in these uncertain times- order from MothersFood.</p>


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