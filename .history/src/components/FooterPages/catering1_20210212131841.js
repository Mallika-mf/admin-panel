import React, { Fragment,useState,useRef } from "react";
import styled from 'styled-components'
import gsap from 'gsap';
import { TextPlugin } from 'gsap/dist/TextPlugin';

const Box = styled.div`
max-width: 70vw;
	padding: 30px;
	margin-top: 4%;
	position: relative;
	top: 50%;
	font-size: 30px;
	line-height: 1.5;
	transform: translateY(-50%);
	perspective: 400px;
`
const Catering =()=> {
    const [text, setText] = useState('wow');
    const element = useRef(null);
    gsap.registerPlugin(TextPlugin);

    const onMouseOverHandler = () => {

        const tl = new gsap.timeline();

        gsap.to(element.current, {
            duration: 1,
            text: 'Gustavo',
            ease: 'none'
        });
        
        tl.to(element.current, {
            duration: 0.1,
            call: () => {
                setText('G');
            }
        })
            .to(element.current, {
                duration: 0.1,
                call: () => {
                    setText('Gu');
                }
            })
            .to(element.current, {
                duration: 0.1,
                call: () => {
                    setText('Gus');
                }
            })
            .to(element.current, {
                duration: 0.1,
                call: () => {
                    setText('Gust');
                }
            })
            .to(element.current, {
                duration: 0.1,
                call: () => {
                    setText('Gusta');
                }
            })
            .to(element.current, {
                duration: 0.1,
                call: () => {
                    setText('Gusta');
                }
            })
            .to(element.current, {
                duration: 0.1,
                call: () => {
                    setText('Gustav');
                }
            })
            .to(element.current, {
                duration: 0.1,
                call: () => {
                    setText('Gustavo');
                }
            });
    };
   
        return(
           <Fragment>
              <div ref={element} onMouseOver={onMouseOverHandler}>
            {text}
        </div>
             </Fragment>

        )
    
}
export default Catering;
