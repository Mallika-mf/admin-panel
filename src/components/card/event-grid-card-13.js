import React from 'react';
import {connect} from 'react-redux';
import { EventGrid13 } from '../../../content/element/card/card';
const EventGrid = (props) => {    
    const {event} = props;
   
    return (
        <div className="card--thirteen">
            <div className="container">
                <div className="row">
                    {
                        Object.values(event).map((value, key) => {
                            const {id, date, imgSrc, title, time, duration, category} = value;
                            return (
                                <EventGrid13
                                    key={id}                                   
                                    id={id}                                    
                                    date={date}
                                    title={title}
                                    time={time}
                                    duration={duration}
                                    img={imgSrc}
                                    category={category}
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
        event : state.event
    }
}
export default connect(mapStateToProps)(EventGrid)