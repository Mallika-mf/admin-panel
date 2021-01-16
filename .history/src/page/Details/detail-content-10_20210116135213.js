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
                    <img src="../assets/img/blog-img-9.jpg" alt="mothersfood" />
                </div>
            </div>
            <div className="post-content">
                <div className="post-header">
                    <h3><strong>How many Types of Indian Breads are there?</strong></h3>
                    <ul className="post-meta d-flex">
                        <li>18-12-2020</li>
                    </ul>
                </div>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>The most heard of breads or the most consumed breads nationally might be 3 or 4. However, there are over 25 types of breads in India. These breads are usually eaten as a savoury or are had as a main meal. Due to cultural influences in various states, breads differ in the styles they are made and consumed. Few breads among these different types of breads are-<br/></p>
                    <p style={{ textAlign: "justify" }}>Chapati /Phulka/Roti- Almost every Indian household diet consists of chapati or phulka or roti. It is made with kneading together wheat flour, oil, water, and a pinch of salt. It is proven one of the healthiest Indian breads and is consumed with curries made with any vegetable.
                    <br/></p>
                    <p style={{ textAlign: "justify" }}>
                    A paratha we can say is the upgraded version of roti. Paratha separates into different layers and is usually made with stuffing of vegetables, spices, potatoes, paneer, cheese, sugar and dals. Parathas are thicker than rotis and are considered as heavy food. Parathas are most Indians’ staple and favourite. <br/></p>
                    <p style={{ textAlign: "justify" }}>Naan means bread in Persian. Naan is a soft, spongy bread from Central Asia and is a part of Mughlai food. Naan is a bread and hence is kneaded with milk rather than water to make it softer and is cooked in a tandoor.<br/></p>
                    <p style={{ textAlign: "justify" }}>Puri is kneaded similar to roti- made with whole-wheat dough or coarse wheat flour or refined wheat flour but unlike roti, puri is deep fried. Salt, cumin (in some places) is used while kneading the dough which is then made flat and deep fried. Puri is served with all veggies as well as sweet savouries such as kheer, halwa but puri and boiled potato vegetable (puri-bhaji) is the most famous.  <br/></p>
                    <p style={{ textAlign: "justify" }}>Bhakr is a thick bread made from flours of different grains such as Ragi, Bajra, Rice, Jowar. It is a thick bread and is most consumed in the regions of Maharashtra, Gujarat, and Rajasthan. It is thicker than roti or chapati and is served with gravies of veggies or chutneys <br/></p>
                    <p style={{ textAlign: "justify" }}>Luchi is a different variant in the puri family and is consumed mostly in Bengal. Refined flour is used to make luchi instead of whole wheat flour. <br/></p>
                    <p style={{ textAlign: "justify" }}>Kulcha is again a type of flat bread made with refined flour and cooked in tandoor just like naan. It can be made simply with flour or with stuffing. Kulcha as we can say is a Punjabi variation of naan.<br/></p>
                    <p style={{ textAlign: "justify" }}>Bhatura is nothing but a variant in the puri family. Bhatura is again a bread which is crispy, deep fried in butter or oil and  and larger than poori. it is served with chole (chick peas) gravy in most places known as the famous “chole bhature”.  
                        <br/></p>
                    <p style={{ textAlign: "justify" }}>
                    Thepla is one among the staples and most loved dishes of Gujarat. Fenugreek leaves is the game changer in thepla along with mild spices which are used while kneading the dough. Thepla is served commonly with pickle or any vegetable gravy.                          <br/></p>
                     <p style={{ textAlign: "justify" }}>
                     Roomali is an extremely thin flat bread. Rumal which means a handkerchief and hence the name roomali as the bread is as thin as a handkerchief. Roomali is a combination of maida and whole wheat atta and is cooked on top of a Kadhai.                         <br/></p>
                     <p style={{ textAlign: "justify" }}>
                     Sheermal is again a bread cooked in tandoor and has Persian origins but now is a part of traditional Awadhi and Nizami cuisine. It is baked in an iron tandoor and is kneaded with ghee, flour, saffron and yeast, and milk. Sheermal is chewy, faintly aromatic and slightly sweet sheermal. It is consumed mostly with kebabs and niharis, and also with a cup of tea                         <br/></p>
                     <p style={{ textAlign: "justify" }}>
                     Litti is a traditional dish in Jharkhand and Bihar. It is famous with some spicy chokha (mashed and spiced potato). Litti is smaller compared to all other breads is stuffed with roasted chana dal flour along with spices before being roasted and tossed in ghee.                          <br/></p>
                     <p style={{ textAlign: "justify" }}>
                     Laccha paratha is a speciality of Punjab. The dough is similar to regular dough. Only difference is lachha parathas have lot of layers. It is served with gravy of almost every vegetable.                         <br/></p>
                     <p style={{ textAlign: "justify" }}>
                     These are few types of Indian breads that are most commonly consumed and are staple foods in almost many states in India. There are other Indian breads too which are prepared using traditional ingredients and recipies.                        </p>
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