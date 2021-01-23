import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { CardGrid2 } from '../../../content/element/card/card';

class Card extends React.Component {
    // pagination
    state = {
        count : 0
    }
    render () {
        
        const project = Object.values(this.props.project).slice(this.state.count*4, this.state.count*4+4);    
        const length = Object.values(this.props.project).length;
        const item_length = Math.ceil(length / 4);             
        const item = () => {
            return (
                Object.values(this.props.project).map((value, key) => {                                        
                    return (
                        key <= item_length-1 &&
                        <li key={key} className={`page-item click ${key === 0 && "active"}`}><NavLink className="page-link" to="#">{key + 1}</NavLink></li>
                    )
                })
            )      
        }
    
        setTimeout(() => {
            const li = document.querySelectorAll('.page-item');
            const click = document.querySelectorAll('.click');
            click.forEach((value, key) => {
                value.addEventListener('click', () => {
                    li.forEach((li_item, li_key) => {
                        li_item.classList.remove('active');
                    })
                    value.classList.add('active');
                    this.setState({
                        count : key
                    })
                })
            })
        
            var next = document.querySelector('.next');
            var prev = document.querySelector('.prev');
            next.addEventListener('click', () => {
                document.querySelector('.page-item.active').nextElementSibling.click();
            })

            prev.addEventListener('click', () => {
                document.querySelector('.page-item.active').previousElementSibling.click();
            })

        }, 500);

        // pagination

       return ( 
           <Fragment>
               <div className="row">
                   {
                       project.map((value, key) => {
                           const {imgSrc, subtitle, id, content, title} = value;
                           return (
                               <CardGrid2
                                   key={id}
                                   img={imgSrc}
                                   id={id}
                                   content={content}                                    
                                   title={title}                                
                                   subtitle={subtitle}
                               />                                                                    
                           )
                       })
                   }
               </div>
               <div className="project-pagination m-top-40">
                   <div className="pagination-area">
                       <nav aria-label="Page navigation pagination-left">
                           <ul className="pagination justify-content-center">
                               <li className="page-item prev"><NavLink className="page-link" to="#">Previous</NavLink></li>
                               { 
                                   item()                                
                                }
                               
                               <li className="page-item next"><NavLink className="page-link" to="#">Next</NavLink></li>
                           </ul>
                       </nav>
                   </div>{/*<!-- ends: .pagination-wrapper -->*/}
               </div>
           </Fragment>              
       )

   }
    
}

const mapStateToProps = state => {
    return {
        project : state.project
    }
}


export default connect(mapStateToProps)(Card)