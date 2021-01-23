import React from 'react';
import {connect} from 'react-redux';
import { CardStyle } from '../../../content/element/card/card';
const CardStyle2 = (props) => {    
    const {blog} = props;
    const blog1 = Object.values(blog).slice(3, 6)
    return (
        <div className="card-style-two">
            <div className="container">
                <div className="row">
                    {
                        Object.values(blog1).map((value, key) => {
                            const {imgSrc, id, content, date, title, industry} = value;
                            return (
                                <CardStyle
                                    key={id}
                                    img={imgSrc}
                                    id={id}
                                    content={content}
                                    date={date}
                                    title={title}
                                    industry={industry}
                                 />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        blog : state.blog
    }
}
export default connect(mapStateToProps)(CardStyle2)