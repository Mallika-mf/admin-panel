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
                <div className="post-head">
                    <div className="post-audio">
                        <img
                            src="../assets/img/blog-img-19.jpg"
                            alt="mothersfood"
                            style={{ maxWidth: "700px", height: "auto" }}
                        />
                    </div>
                </div>
                <div className="post-content" style={{ marginTop: "5%" }}>
                    <div className="post-header">
                        <h3>
                            <strong> Leafy Green Vegetables in your meals and their benefits</strong>
                        </h3>
                        <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
                            <li>16-02-2021</li>
                        </ul>
                    </div>

                    <div className="m-bottom-40">
                        <p style={{ textAlign: "justify" }}>
                            Leafy green vegetables form an important part of a healthy diet.Available all round the year these healthy greens boost metabolism and ensure the smooth functioning of our body.They are not only great for our body but also are very easy to digest thus making them a power packed food source.They’re packed with vitamins, minerals and fibre but  low in calories.
            <br />
                        </p>
                        <p style={{ textAlign: "justify" }}>
                            Eating a diet rich in leafy greens can offer numerous health benefits including reduced risk of obesity, heart disease, high blood pressure and mental decline.Boosting gut health,Immunity and eyesight is something they are known for.They can be consumed by people of all age group and benefits everyone in their own ways.Hence Greens are known as God Food and should be included in every way possible.
                        <br />
                        </p>

                        <p style={{ textAlign: "justify" }}>
                            Some of the power packed greens are:     <br />     </p>

                        <p style={{ textAlign: "justify" }}><b>1)Spinach:</b></p>

                        <p style={{ textAlign: "justify" }}>
                            As kids we regularly saw Popeye the sailor man consume a can of spinach and suddenly become very strong.In a similar way spinach plays lots of different roles are a healer vegetable.It is usually a dreaded vegetable because of its slightly bitter taste but when cooked well and with the right amount of spices it leaves a flavour like no other.Spinach is rich in iron and has folate which is great to be consumed during pregnancy.An easy to incorporate vegetable it is easily consumed as a vegetable with roti, mixed with cottage cheese and also in smoothies.It leaves a nice natural green colour making it even more appealing.           <br />
                        </p>



                        <p style={{ textAlign: "justify" }}><b>2)Broccoli:</b></p>

                        <p style={{ textAlign: "justify" }}>
                            Another power packed green broccoli has a nice crunch and flavour to it.Packed with the goodness of Vitamin A and Vitamin C.It is one if the most nutrient dense vegetables due to its high amount of mineral,,vitamin and antioxidants.One of the easiest ways to have broccoli is to sauté it as a vegetable and then sprinkle it with some salt and pepper.Another tasty way to have it is by mixing it in pasta because with pasta it gives a nice woody nutty flavour.Also good to consume as a salad broccoli has many uses and different ways in which it can be consumed.           <br />
                        </p>

                        <p style={{ textAlign: "justify" }}><b>3)Fenugreek:</b></p>

                        <p style={{ textAlign: "justify" }}>
                            Widely known as methi in India it is a winter staple vegetable in most Indian households.Methi in regular days is also consumed in the form of Kasuri methi that it helps to enhance the flavour of the vegetable.In India even the seeds of fenugreek widely known as meethi dana are used as different spices in different  recipes. Not only for the body but methi is also great for Skin and Hair.It helps in solving:
                        <br />
                        </p>
                        <p style={{ textAlign: "justify" }}>-Menopause issues</p>
                        <p style={{ textAlign: "justify" }}>-Arthritis Palms</p>
                        <p style={{ textAlign: "justify" }}>-Malfunctioning of Kidney</p>
                        <p style={{ textAlign: "justify" }}>-Digestive disorders</p>
                        <p style={{ textAlign: "justify" }}>-Skin and Hair problems. </p>
                        <p style={{ textAlign: "justify" }}>The best way to include methi in regular diet is to have it in the form of kasuri methi or seeds.During winter season one can also consume it in the form of vegetable that is cooked and also in the form of roti/parathas/theplas.<br /></p>



                        <p style={{ textAlign: "justify" }}><b>4)Curry Leaves/Sweet Neem:</b></p>
                        <p style={{ textAlign: "justify" }}>
                            Neem is know to have highly bitter flavour to an extent that it is nor edible but with sweet neem and because of its nutritional properties it is one of the pure superfoods. Curry leaves can also be used for weight loss. They are rich in Vitamin A, B, C and B2. Curry leaves are also said to be good sources of iron and calcium. Because of this reason, curry leaves are used as part of folklore medicine to treat calcium deficiency and several other conditions.They promote hair growth, digestion and good gut health. To increase their consumption, you can munch on dried curry leaves or add fresh or dried curry leaves to your meals. You can also add to your salad. Consume curry leaves along with a healthy diet and exercise regularly for strong gut health.             <br />
                        </p>

                        <p style={{ textAlign: "justify" }}>Greens are not only power packed food but also very easy to consume because they are made with a lot of water content.Doctors and nutritionists constantly lay importance on the consumption of these greens and also especially for kids or infants. Fortunately, many leafy greens can be found year round, and they can easily be incorporated into your meals — in surprising and diverse ways.<br /></p>
                        <p style={{ textAlign: "justify" }}>
                            To avail the many impressive health benefits of leafy greens, make sure to include a variety of these vegetables in your diet.
                          <br />
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
