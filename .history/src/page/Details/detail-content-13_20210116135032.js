import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
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
                    <img src="../assets/img/blog-img-13.jpeg" alt="mothersfood" />
                </div>
            </div>
            <div className="post-content">
                <div className="post-header">
                    <h3><strong>Top 25 Delhi Famous Foods</strong></h3>
                    <ul className="post-meta d-flex">
                        <li>09-01-2021</li>
                    </ul>
                </div>

                <div className="m-bottom-40">
                    <p style={{ textAlign: "justify" }}>Delhi culture is a mix of different cultures and traditions which thus reflect in Delhi flavors, cuisines and food as well. It is mostly a mix of Mughlai, Persian and Punjabi cuisines. <br/></p>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Rich mutton and chicken gravies to sweets which are flavourful and full of ghee are few of Delhi famous foods and are what put out Delhi on the food ranking. 
                        </li >
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Delhi food is slightly inclined towards the Mughlai cuisine as the base for most of the recipes is from the Mughal era. Especially their kebabs- Kathi Kebab, Boti Kebab, Shami Kebab, are top class and Delhi’s famous food items. Then come their tandoor dishes which are loved by the whole country. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Delhi, as stated earlier that it has a mix of cuisines, the desserts- kulfi, street food- chat, pani puri, samosas, jalebi, kachori are loved by people in Delhi and the tourists, these are few of the most famous street food in Delhi.
                        </li >
                    </ul>
                    <h5 style={{ textAlign: "justify" }}>Paranthas 
                    <br/></h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Paranthas are a staple food and Delhi special food. They are consumed for breakfast, lunch, snacks and dinner. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Ask anyone who has lived in or is currently living in Delhi will rave about the parathas that keep them going. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Paranthas are served in every household and every famous food outlet in Delhi for breakfast, snacks, as they are considered healthy and filling breakfast to start the day with. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            It serves as a great lunch option for working people and the best snack for college students and is the most popular food in Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            The paranthas types and recipes are innumerable. The dough of the paranthas is made with different flours such as atta (wheat flour), maida, ragi etc. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            For example, there are stuffed paranthas, fried parathas, roasted parathas, plain paranthas. Stuffed paranthas come in various types and you can choose your stuffing- Chicken, mutton, eggs, potatoes, bananas, cauliflower, methi, pudina, coriander etc.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            You can find paranthas anywhere in Delhi special food places, famous food in Laxmi nagar, famous food outlets in Lajpat nagar Delhi etc
                        </li>

                    </ul>
                    <h5 style={{ textAlign: "justify" }}> Chaat </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Next comes Chaat, it is a famous food to eat in Delhi and is one of the popular foods in Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chaat is every body’s favourite snack for its intense mix of great flavours and consistencies. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chaat is truly loved and consumed a lot in Delhi and is Delhi’s famous veg food. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chaat is an amalgamation of different items- samosa ragada, samosa kachori, pani puri, dahi puri, sev puri and what. There are numerous stalls and shops of chaat in almost every other 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chaat is available in many places such as -CP, Lajpat nagar, Chandni Chowk, South Delhi etc.
                        </li>

                    </ul>

                    <h5 style={{ textAlign: "justify" }}> Pav Bhaji  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Pav Bhaji we can say is “Delhi ka famous food”, “purani Delhi ki famous food” and is one of the most delicious items that is available in chaat, a famous street food in south Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Pav is the soft bread and bhaji is the delicious mixed vegetable curry- potatoes, carrot, beans, cauliflower, capsicum, peas, tomatoes etc; that goes with the pav.  
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            This bhaji is very flavourful as many spices are used in its preparation along with a special pav bhaji masala powder. It is cooked and served with generous amounts of butter, onions, coriander, lemon. The bhaji is prepared well in advance and is served with steaming hot pav which is toasted lightly with butter.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            People love pav bhaji for breakfast and snack. It is a very heavy dish which will keep you feeling full for long hours. It is available in all Delhi special food places, at famous food places near new Delhi railway station, street food in Laxmi nagar, street food in Dwarka Delhi etc. 
                        </li>
                        
                        
                    </ul>

                    
                    <h5 style={{ textAlign: "justify" }}> Aloo Tikki  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Aloo Tikki is the next favourite famous street food in Delhi and is available in all famous food outlets in Delhi, Laxmi nagar, Paharganj, Lajpat nagar and south Delhi as well..
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                             As we already know, aloo means potato. Tikki means a cutlet / croquette. Aloo tikki is a great vegetarian snack at parties or small gatherings. We can say that aloo tikki is the Indianized version of a hash brown. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Aloo tikki is basically an amalgamation of boiled potatoes, peas and spices of various kinds. The veggies are boiled, mixed well with all the necessary spices, made into tikkis or cutlets and then deep fried in oil. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            They are served with pudina chutney, curd or tamarind sauce. Delhiites love aloo tikki as a light evening snack and it is one of the most popular street foods in Delhi.
                        </li>
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}> Kachori  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Kachori With Sabzi is a very popular snack item with chai and a special food available at famous food outlets in Chandni chowk Delhi, street food in cp, Lajpat nagar, Laxmi nagar etc. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Kachori, a famous street food in Delhi is basically a flattened ball of dough (made with maida, ghee, water and salt) which has stuffing made out of moong dal, both of them are deep fried and served with a spicy tangy tamarind sauce, green chutney or fried chillies. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            The moong dal is first boiled and then cooked with oil and various spices. Small balls are made out of this mixture and placed in the flattened dough already prepared. The dough is sealed with the stuffing and rolled for a bit more and then deep fried.  
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Kachori with eaten with mostly aloo sabzi and is available in every street food or chaat stalls in Delhi. It is considered a “CP Delhi famous food” and a famous food of old Delhi.
                        </li>
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}> Butter Chicken  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Butter Chicken is again another favourite of the people of Delhi and is one of the famous non veg foods in Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            It was initially made at the Moti Mahal in 1950s. The cooks would try to prepare another dish from the left-over chicken juices by adding butter and tomato. This is how butter Chicken was born.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                             It is creamy thick, slightly sweet, red tomato gravy filled with lots of butter and chicken. The chicken in butter chicken is just melt-in-mouth consistency, exactly why it is favourite all over the country and is one of the Delhi special food items. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Butter chicken tastes best with tandoori roti or naan or any kind of chapati. There are many places in Delhi which serve the best butter chicken.
                        </li>
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}> Dahi Bhalle  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Dahi Bhalle is again another authentic, traditional yet most loved snack items or chaat items and is a famous street food in Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Bhalla means vada. Dahi means curd. Basically, Dahi Bhalla means, a vada is deep fried and soaked in spiced curd with herbs. This recipe can however be traced back to the roots of Mughal cuisine.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            To make this delicacy, soaked urad dal is grinded with herbs and spices and deep fried in oil. Then these bhallas are soaked in curd and for toppings- cumin powder, black salt, sweet tamarind chutney and green chutney are put over the curd. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            This is the very famous dahi Bhalla and is a famous food in Chandni chowk Delhi, in sadar bazar and one of the popular street foods in Delhi. 
                        </li>
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}> Samosa  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Samosa is again an extremely loved, one of the popular foods and most consumed chaat items in Delhi. It is the most famous food of Delhi. And one of the famous street foods in Delhi.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                        Delhi samosas with chai makes a terrific combination. Samosas is basically a deep-fried dumpling with a spicy filling made out of- beef, chicken, mutton kheema, potatoes, onions, peas, cheese, or lentils. Usually, the samosas take a triangular shape. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            This popular street food in Delhi is available at many famous street food outlets in Delhi as well as big restaurants in South Delhi as well. It is a famous food in Chandni chowk Delhi, sadar bazar Delhi.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            This popular street food in Delhi is available at many famous street food outlets in Delhi as well as big restaurants in South Delhi as well. It is a famous food in Chandni chowk Delhi, sadar bazar Delhi.
                        </li>
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}> Chur-Chur Naan  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chur-Chur Naan is flat bread recipe which is most famous in Delhi and comes under Delhi special food items and is a famous food near new Delhi railway station. It is basically a crushed naan. It is called chur chur naan for its unique layered, flaky texture. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chur chur naan is made with a dough made of maida, curd, ghee, salt, water and flavourful spices like- coriander seeds, garam masala, cumin powder, chilli powder, aamchur and pepper powder. Chur chur naan is best served with any vegetable curry, curd, or any starter.
                        </li>
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Ram Ladoo  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Ram Ladoo is gain one of the most popular street food Delhi delicacy and is known as “purani Delhi famous food’.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            It is a tangy, sweet and spicy chaat recipe with is served with tamarind sauce, green chutney, onions. The ingredient which sets aside this unique tasting dish is radish. Julienned radish is served after the ram ladoo is deep fried. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Moong dal and chana dal are soaked and grinded along with lots of spices, made into small balls and then deep fried, served with radish. Ram ladoo is easy to make and can be made in very less time, hence it is preferred by most of the people. 
                        </li>
                        
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Rolls  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Rolls is another on the go, famous street food in Delhi which is available in almost every other street food outlet. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Rolls or kathi roll is the most famous in Delhi however its origin credit has to be given to Kolkata. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            This Delhi famous food has its own acquired or developed recipes and delicious variants of the kathi rolls. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Different types of rolls are available in the streets of Delhi like- vegetable rolls, kheema rolls, spring rolls, potato rolls, etc. Most college students in Delhi prefer rolls as an evening snack for its availability and easy to eat.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Available at famous street food outlets in south Delhi, Dwarka, Lajpat nagar etc.
                        </li>
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Kebabs  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Delhi has some good Kebabs which have the taste and authenticity of both Hyderabad and Lucknow. Rolls are a very famous non veg food in Delhi. And available at every famous street outlets and popular food outlets as well.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            The types, versions and recipes of the kebabas available are plenty. Few of them are-  seekh kebab, sutli kebab,  kakori, chicken malai tikka. Mughal kebabs are one of the most famous and delicious kebabs out of all. Kebabs are very on the go and be consumed while on a two-wheeler or car. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Kebabs are basically very simple to make however marination is a long process. Minced meat of mutton, chicken or sea food is taken and mixed with fresh and flavourful spices and herbs and marinated for hours long and then skewed to skewers and slow cooked on coal. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Oil or ghee is added as it ensures the masala and the meat cooks well. Kebabs are hence outstandingly mouth-watering.
                        </li>
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Matar Kulcha  </h5>
                    <ul className="bullet--list2">
             
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Matra Kulcha is also known as matar kulcha is a new Delhi famous food and is one of the famous veg foods in Delhi.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            In Delhi the popular for version is called matra kulcha, served in every other street food stall and is “CP Delhi famous food”. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chole Khulcha is similar to chole bhatura. The only difference is that instead of the deep fried bhatura it is served with kulchas here. It is a Chandni chowk Delhi famous food.
                        </li>
                       
                        
                        
                    </ul>

                    

                    <h5 style={{ textAlign: "justify" }}>Chole Bhature  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chole Bhature, a famous street food in Delhi is again one of the versatile dishes and comes under Delhi famous food items is a lip-smacking breakfast, lunch or even a snack. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Especially a famous street food in south Delhi and dish that you must try is chole bhature. Every other street corner and street food outlet in Delhi has a stall serving chole bhaturas, hot from the pan. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chole is the curry made with chick peas soaked over night and cooked in some spicy flavourful masalas and is served with bhature. Bhature is similar to puris but the size varies and is slightly bigger in size. This deep fried bhatura makes a delicious combination with the chole curry prepared.
                        </li>
                        
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Chole Kulchha  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chole Khulcha is similar to chole bhatura. The only difference is that instead of the deep fried bhatura it is served with kulchas here. It is a Chandni chowk Delhi famous food.
                        </li>
       
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Biryani  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Biryani is an all-time favourite of most of the Indians. Invented by Persians and modified according to Indian masalas and taste by the Mughal Emperors, Biryani is the number one dish in Delhi, comes under Delhi special food items too and is today enjoyed all over India. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Biryani can be made with various base dishes such as- chicken, mutton, eggs, fish, prawns, vegetables, paneer, mushroom etc. Delhi biryani is rich in spices, flavours and aromas. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Delhi biryani might slightly vary in taste and preparation process from the Hyderabad biryani however it is equally delicious and is available at Delhi special food places.
                        </li>
               
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Nihari  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Nihari or nalli nihari, a famous non veg food in Delhi is a rich delicious mutton stew which is cooked over low flame for long hours. It is called nalli nihari as it is cooked using the bone marrow bones of the mutton meat. It is one of the signature dishes of Delhi, a famous food of old Delhi and is one of the famous foods to eat in Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Nalli nihari is a rich, spicy, stew or broth of slow cooked meat which was served in the royal families for breakfast.  In the fast-moving generation like today, it provides an ideal nourishment and a perfect breakfast. It is usually served with naans or rotis or bun. 
                        </li>
                       
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Momos </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Momos, a Delhi famous fast food and one of best famous foods in Delhi, are the most eaten, and most famous street food of Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Steaming hot momos complement Delhi’s weather perfectly making it a must try for all the tourists out there, a Delhi special street food. Momos are also available near many offices since most people prefer momos for its convenience to eat and abundance of availability and it keeps the stomach full for long hours.  
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Momos are tasty dumplings available in lots of variants- chicken, fish, prawns, veggies, mushroom, paneer, tandoori, schezwan etc. Momos are best paired with fiery spicy red sauce. 
                        </li>     
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Pakode  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Pakode or pakoras are another deep-fried famous street food of Delhi. One dish which can be named under Delhi famous food is pakode.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Besan batter batter is used to deep fry pakoras. Pakoras come in many variants- onion, palak, kaju etc. All these items are dipped in besan batter which is seasoned with different spices and then deep fried. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Pakoras make the best snack during chilly and rainy evenings. Chai and pakode is the most enjoyed combination in Delhi and is a famous food near new Delhi railway station as well.
                        </li>
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Besan Ka Chila  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Besan Ka Chilla is a delicious savoury, a Delhi famous veg food similar to pancakes made with besan or gram flour. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            It becomes a very nutritious recipe when finely chopped or grated veggies are added to it. Cabbage, tomato and carrot, fenugreek, spinach also can be added. To the besan all the veggies, spices and herbs are added and mixed well. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Water is added according to the runny consistency required and then poured in the form of pancakes and cooked with very little oil and served hot.
                        </li>
                       
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Mutton Korma </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Mutton Korma, a famous non veg food in Delhi, a purani Delhi famous food, is a rich spicy and flavourful gravy made with mutton meat, spices, fresh greens and other ingredients. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            It was cooked in the royal kitchen of the Mughals. Mutton korma is very rich in its gravy consistency and the preparation process. It is consumed with naan, rotis and with steamed rice. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            The mutton is slow cooked and is very tender. Many people in Delhi love this dish and prefer to eat it for lunch or dinner. Mutton dish is a must in many functions, famous food outlets in Delhi, food outlets in South Delhi, Lajpat Nagar and events of Delhi.
                        </li>
                       
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Murgh Musallam  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Murgh Musallam, a famous non veg food in Delhi is a chicken gravy dish.
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chicken musallam is unique and versatile in its cooking process and a new Delhi special food.                             </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Chicken is slow cooked with aromatic herbs, spices and other ingredients. The gravy is rich in spices and chicken juices and the chicken pieces are tender as well.                             </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            This dish is considered one of the best chicken curries in Delhi, one of the famous foods to eat in Delhi and is eaten with rotis, naans, steamed or boiled rice.                            </li>
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Rabri Faluda  </h5>
                    <ul className="bullet--list2">
                    <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Rabri Falooda, “Delhi ki famous food” is an ice cream dessert which is very popular due to its rich taste and versatile mix of ingredients used and is one of famous foods of old Delhi. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Many ingredients like- condensed milk, vermicelli, sabja seeds, ice cream, chilled milk, rose syrup, pistas. This is the authentic falooda recipe. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            However, Delhi’s falooda is a different version of the authentic falooda. It is made richer by adding rabri to the falooda ice cream making it even more delicious and rich.  Falooda is also a new Delhi special food and CP Delhi famous food.
                        </li>
                        
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Kulfi  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Kulfi, a new Delhi special food, a famous food near new Delhi railway station, is a rich frozen dessert made out of dried / evaporated milk. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Kulfi in Persia refers to a covered cup. Kulfi in consistency is a lot denser and creamier than ice-cream. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Delhi summers are extremely hot and a day is incomplete without a kulfi and this is exactly why in Delhi there are kulfi shops at almost every corner. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Delhi weddings are incomplete without kulfi in the dessert section. Kulfi, a most popular food in Delhi, comes in different flavours like- coconut, pista, mango, custard apple etc.
                        </li>
                       
                        
                        
                    </ul>

                    <h5 style={{ textAlign: "justify" }}>Jalebis  </h5>
                    <ul className="bullet--list2">
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Jalebis are the nation’s favourite and a Delhi famous food. Especially in Delhi, the jalebi walas around every corner, every street food outlet, serve hot crispy juicy jalebis. Jalebis are made with fermented maida batter, deep fried and then dipped in sugar syrup. 
                        </li>
                        <li className="bullet_list" style={{ textAlign: "justify" }}>
                            Again, this is one of the most loved dessert in Delhi and in Delhi weddings this is a must.
                        </li>

                    </ul>
                  

                    <p style={{ textAlign: "justify" }}>
                    These are the top 25 dishes of Delhi in no particular order. All of these lip smacking delicacies are available at <NavLink to='/' ><strong style={{textShadow: "1px 1px 1px yellow", fontWeight:600,fontFamily: "Helvetica, Arial, sans-serif"}}>MothersFood</strong></NavLink>  at great prices</p>
                   
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