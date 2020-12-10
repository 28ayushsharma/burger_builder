import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux_1';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) =>{
    return(
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'transalateY(0)' : 'transalateY(-100vh)',
                display: props.show ? 'block' : 'none'
        }}>
            {props.children}
        </div>
    </Aux>
    );
}

export default modal;