import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './modal.scss'
const Modal = props => {

    const [active, setactive] = useState(false);

    useEffect(() => {
        setactive(props.active);
    },[props.active])
    return (
        <div id={props.id}
        className={`modal ${active ? active: ''}`}
        >{props.children}
        </div>
    )
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export const ModalContent= (props) =>{
    const contentRef = useRef(null);

    const closeModal = () =>{
        //console.log(contentRef.current.parentNode)
        contentRef.current.parentNode.classList.remove('active');
        if(props.onclose) props.onclose();
    }

    return (
        <div className='modal__content' ref={contentRef}>
            {props.children}
            <div className='modal__content__close' onClick={closeModal}>
                <i className='bx bx-x'></i>
            </div>
        </div>
    )
}


ModalContent.propTypes = {
    onClose:PropTypes.func
}

export default Modal