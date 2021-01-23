import React from 'react';
import {connect} from 'react-redux';
import { TeamCard4 } from '../../../content/element/card/card';
const CardStyle4 = (props) => {    
    const {team} = props;
    //const team1 = Object.values(team).slice(3, 6)
    return (        
        <div className="row">
            {
                Object.values(team).slice(3, 6).map((value, key) => {
                    const {imgSrc, expert, id, speach, name, designation} = value;
                    return (
                            <TeamCard4
                                key={id}
                                img={imgSrc}
                                id={id}
                                speach={speach}                                    
                                name={name}
                                designation={designation}
                                expert={expert}
                            />                                                                    
                    )
                })
            }
        </div>                
    )
}

const mapStateToProps = state => {
    return {
        team : state.team
    }
}
export default connect(mapStateToProps)(CardStyle4)