import React from 'react';
import { connect } from 'react-redux';
import { PostCard1Con } from '../../../content/element/card/card';

const PostCard = (props) => {    
    const {blog} = props;
    const blog1 = Object.values(blog).slice(3, 6)
    return (
        <div className="post--card1">
            <div className="container">
                <div className="row">
                    {
                        Object.values(blog1).map((value, key) => {
                            const {imgSrc, id, content, date, title, industry} = value;
                            return (
                                <PostCard1Con
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

const mapStateToProps = (state) => {
    return {
        blog : state.blog
    }
}

export default connect(mapStateToProps)(PostCard) 