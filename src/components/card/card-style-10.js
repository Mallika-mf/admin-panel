import React from 'react';
import {connect} from 'react-redux';
import { CardStyleTeen } from '../../../content/element/card/card';
const CardStyle2 = (props) => {
    const {team} = props;
    //const team1 = Object.values(team).slice(3, 6)
    return (
        <div className="card-style-teen">
            <div className="container">
                <div className="row">
                    {
                        Object.values(team).slice(19, 22).map((value, key) => {
                            const {imgSrc, expert, id, speach, name, designation} = value;
                            return (
                                    <CardStyleTeen
                                        key={key}
                                        img={imgSrc}
                                        id={id}
                                        speach={speach}
                                        title={name}
                                        designation={designation}
                                        expert={expert}
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
        team : state.team
    }
}
export default connect(mapStateToProps)(CardStyle2)