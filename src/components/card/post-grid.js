import React, { Fragment } from 'react';
import { PostCard1Con } from '../../../content/element/card/card';

const PostGrid = (props) => {
    const blog  = props;
    //console.log(props.masonary)
    return (
        <Fragment>
            {  
                Object.values(blog).map((value, key) => {
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
        </Fragment>
    )

}
export default PostGrid;