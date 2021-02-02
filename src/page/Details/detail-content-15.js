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
              src="../assets/img/blog-img-15.jpg"
              alt="mothersfood"
              style={{ maxWidth: "700px", height: "auto" }}
            />
          </div>
        </div>
        <div className="post-content" style={{ marginTop: "5%" }}>
          <div className="post-header">
            <h3>
              <strong>   Why Home-Made Food is the best as compared to Junk Food?</strong>
            </h3>
            <ul className="post-meta d-flex" style={{ marginTop: "3%" }}>
              <li>02-02-2021</li>
            </ul>
          </div>

          <div className="m-bottom-40">
            <p style={{ textAlign: "justify" }}>
            It is 2.30 pm. Shreya has just returned from school with a frown on her face. Her sister enquires if something went wrong in school to which she replies that her demand for schezwan noodles was not fulfilled in the tiffin box today and instead mother had packed chapati and sabzi and hence she just consumed a chocopie from her friend's tiffin. Now imagine! What nutrients does a piece of preserved fried bread and chocolate provide to a growing 15-year-old?
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            Statistics show that 60% of children between the ages of 14-17 consume junk food at least once a day. With new varieties of tiffin treats and junk food coming in everyday children growing up have forgotten the satisfaction of home-cooked meals.
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            Not just kids but more than 90% of adults consume junk food or beverages at least one time a day. These figures are just not shocking but also very scary. The holy Bhagwat Geeta which is one of the oldest scriptures in the world has mentioned various benefits of eating wholesome, nutrient-rich home-cooked food. The food that is cooked in front of one's eye and with monitored balanced ingredients can never be harmful to one's growth or health. Junk food is not just restricted to food available in restaurants or fast food joints. Salted packed snacks, gum candies, chocolates, sweet desserts, fried fast food, sauces, fizzy drinks, stored fruit juices, and noodles all come under the category of junk food. Any food that has been stored by adding preservatives to it comes under junk food. These food products are not only made a long time before their consumption but also have certain direct effects on our mind and body.
              <br />
            </p>
            <p style={{ textAlign: "justify" }}>
            Some of the worst side effects of consuming junk food are:
              <br />
            </p>
            <p style={{ textAlign: "justify" }}><b>1) Lack of Fresh Ingredients:</b></p>
            <p style={{ textAlign: "justify" }}>
            India is a land of freshly grown fruits, vegetables, and spices. All the food that we consume at home is cooked freshly from scratch whereas most food available in different food joints today is frozen and refried. The amount of unhealthy fat, sugar, and calories that junk food contains can make one feel bloated, drowsy, and easily tired. This affects one's ability to do certain physical and mental tasks which are usually very easy. When such food is consumed especially during growth stage of one’s mind and body it leads the mind to believe that we are not capable of doing certain tasks which others can easily perform making one feel lazy and under-confident. <br />
            </p>
            <p style={{ textAlign: "justify" }}><b>2) Affects Sleep and Mental Health:</b></p>

            <p style={{ textAlign: "justify" }}>
            As mentioned in various books of Ayurveda and ancient scriptures "To acquire health and happiness one needs to lead a balanced life" With a dozen of chemicals and preservatives these junk food items cause issues like acidity, gas, and headache thus affecting one's sound sleep. A lot of people have a habit of consuming a bag of chips when they are working or awake in the night and that leads to them not having a sound sleep. A survey amongst 41 countries shows that people who consume junk daily are at a higher risk for depression and anxiety.
              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>3) Effect on one's life span:</b></p>

            <p style={{ textAlign: "justify" }}>
            "Our body is what we eat", "Health is Wealth", these are some proverbs we have been taught as kids. If we see our grandparents and notice how fit they are we surely know that is only because of their simple meals. Their good health is because of the simple home-cooked food that they have consumed all their life and are still consuming. If one consumes greasy junk food daily it is obvious that the organs are going to get affected sooner or later resulting in a decrease in your life span.
              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>4) Leads to Over-Eating and Obesity:</b></p>

            <p style={{ textAlign: "justify" }}>
            All processes of the body are interconnected and somehow they are all connected to what one consumes. Food plays such an important part not just for our body to work but also for our mind to be happy. You may get the best of pizzas and the most authentic of burgers at various joints but nothing beats the satisfaction of simple dal tadka and ghee rice. When one is not satisfied with the food they have eaten they tend to eat more and in excess to fill that void of satisfaction. Because at the end of the day we all work just to have a satisfactory plate of food.
              <br />
            </p>

            <p style={{ textAlign: "justify" }}><b>5) Much Expensive than Home-cooked food:</b></p>
            <p style={{ textAlign: "justify" }}>
            In Indian households, the rule is that nothing goes to waste. Even the peels of different vegetables are converted into something. When compared to restaurant bought food one tends to not consume it more than once only because of how long it has been stored already. Plus the amount of extra oil and spices start to react and make the food unhealthier. The food is then thrown away increasing the wastage and also the cost. Even the basic cost of cooking at home for 3 days is cheaper than a day's packet meal. And when this cost is compared to the side effects the store-bought meal has caused with no satisfaction it makes the food extremely un-worthy.


Home-cooked meals are most often taken for granted. We often realize its value when it is no longer available to us. Home-cooked meals are made with the love and care of the maker and hence are much tastier and closer to heart. The satisfaction and its benefits are unmatchable as compared to the taste one get from eating fast food. Also, home-made food connects one to their family and helps to reduce stress since it stems from nostalgia and the connection to one's roots is always there. So today, decide to give up on unwanted greasy fast food and move towards home-cooked meals which are now easy to order via MothersFood, a platform where mom chefs make healthy hot food in their own kitchen, hygienically prepared and delivered to your doorstep. This pandemic has taught us how important our life is so from today start choosing your Health over Everything.
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
