import React, { Fragment } from "react";
import styled from 'styled-components'

const Box = styled.div`
max-width: 70vw;
	padding: -30px;
	margin: 0 auto;
	position: relative;
	top: 50%;
	font-size: 30px;
	line-height: 1.5;
	transform: translateY(-50%);
	perspective: 400px;
`
class Catering extends React.Component {
    render(){
        return(
           <Fragment>
               <Box class="box">
	<p class="split">Animation is the process of creating the illusion of motion and shape change by means of the rapid display of a sequence of static images that minimally differ from each other. The illusion—as in motion pictures in general—is thought to rely on the phi phenomenon. Animators are artists who specialize in the creation of animation.
</p>
	
</Box>
             </Fragment>

        )
    }
}
export default Catering;
