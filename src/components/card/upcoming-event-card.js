import React from 'react';
import {connect} from 'react-redux';
import { UpcomingEvent } from '../../../content/element/card/card';
const Event = (props) => {    
    const {event} = props;
   
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {
                        Object.values(event).map((value, key) => {
                            const {id, date, title, time, duration} = value;
                            return (
                                <UpcomingEvent
                                    key={id}                                   
                                    id={id}                                    
                                    date={date}
                                    title={title}
                                    time={time}
                                    duration={duration}
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
export default connect(mapStateToProps)(Event)