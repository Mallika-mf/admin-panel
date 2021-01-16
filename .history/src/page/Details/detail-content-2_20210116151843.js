import React, { Fragment } from 'react';
// import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
// const noAction = (e) => {
//     e.preventDefault()
// }
const DetailsContent = (props) => {
    // const { title, content, date, blog } = props;

    return (
            <Fragment>
                <div className="post-details">
                <div className="post-head" style={{marginLeft:"-5%"}}>
                        <div className="post-images">
                            <img src="../assets/img/blog-img-1.jpg" alt="mothersfood" style={{width:"700px"}}/>
                        </div>
                    </div>
                    <div className="post-content" style={{marginTop:"5%"}}>
                        <div className="post-header">
                            <h3><strong>Benefits of Eating Homemade Food</strong></h3>
                            <ul className="post-meta d-flex"style={{marginTop:"3%"}}>
                                <li>10-07-2020</li>
                            </ul>
                        </div><hr/>

                        <div className="m-bottom-40">
                            <p style={{ textAlign: "justify" }}>We all can agree that food is the only thing that can make anyone drool without any racial differences. When tasty,
                            delicious food goes down the throat, that heavenly feeling can melt the soul. Then don't you think we should be
                            careful enough while choosing the food that is not just tasty but also healthy? But nowadays, it has become almost
                            impossible to find healthy and delicious food that is just like homemade. Well, why like homemade? MothersFood
got the actual and real homemade food delivered at your doorstep for you.<br /></p>
                            <p style={{ textAlign: "justify" }}>Now, let us take the privilege of sharing more benefits of homemade food and taking you on the route to a healthy
and happy lifestyle:</p>
                            <p style={{ textAlign: "justify" }}><br /><ol>
                                <li style={{ textAlign: "justify" }}>Tasty treat:
        <ul>
                                        <li style={{ textAlign: "justify" }}>How Much Ever you can spend, when it comes to food, taste is the only thing that can value money, and
                                        homemade food is something that knows how to do that. Sure, the roadside food feels tastier than
                                        homemade sometimes. But don't worry. MothersFood has got the awesome chefs with restaurant-like
skills to bring you the same taste as outside junk food at home.</li>
                                    </ul>
                                    <br /></li>
                                <li style={{ textAlign: "justify" }}>Pocket-friendly:
        <ul>
                                        <li style={{ textAlign: "justify" }}>
                                            Have you ever compared your favorite meal price at a restaurant, and it's the actual value at home? If yes,
                                            you might get what we're trying to convey. Homemade meals are cheaper than restaurant-made foods
                                            because of food processing, extra chefs, staff costs, maintenance, and a lot more things that are not to
                                            worry about if homemade. So, what can stop you from opting for budget-friendly homemade meals than
                                            expensive yet unsatisfactory restaurant food?
            </li>
                                        <br /></ul>
                                    <li style={{ textAlign: "justify" }}>Quality:
            <ul>
                                            <li style={{ textAlign: "justify" }}>
                                                Do you know how well your veggies are cooked? Do your restaurant people use natural spices or
                                                processed ones? Too oily or too spicy, restaurant foods can get unpredictable when it comes to quality.
                                                But the word Homemade itself can answer the whole scenario. The quality of the ingredients, the process
                                                of cooking, and everything else is aligned up to deliver tasty and quality to food.
                </li>
                                        </ul>
                                    </li>
                                    <br /></li>
                                <li style={{ textAlign: "justify" }}>Healthy:
        <ul>
                                        <li style={{ textAlign: "justify" }}>
                                            There's nothing called unhealthy homemade food. Whatever made at home, despite the calories, it's still
                                            healthier than outside foods. Well, why not? Moms always want the best for their kids and do not
                                            compromise on their health. Hence, healthy and tasty food, even if it's pizza or pasta.
            </li>
                                    </ul>
                                    <br /></li>
                                <li style={{ textAlign: "justify" }}>Hygienic:
        <ul>
                                        <li style={{ textAlign: "justify" }}>
                                            If you've looked at the hotel kitchen at all, you'll understand how well you can appreciate homemade
                                            food. Hygiene is something religiously maintained at home kitchen.
            </li>
                                    </ul>
                                </li>
                            </ol><br /></p>
                            <p style={{ textAlign: "justify" }}><b>Conclusion:</b><br /></p>
                            <p style={{ textAlign: "justify" }}>Sure, restaurant-made food is luring. But once you adopt the homemade food, there's no turning back. Also, in the
                            current situation, it's vital to look beyond the taste for health and hygiene. So wait not, place your order from
MothersFood, and thank us later!</p>

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