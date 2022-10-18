import React from "react";
import Card from "./card";
import './actionCard.scss';

const ActionCard = (props) => {
  const newTaskDialogFooter = (
    <div className='footer'>
      <div
        className='create-button emphasis button'
        onClick={props.confirmAction}
        >
        {props.confirmText}
      </div>
      <div
        className='close-button secondary button' 
        onClick={props.cancelAction}
        >
        {props.cancelText}
      </div>
    </div>
  );

  return (
    <div id='new-task-dialog' className='center'>
      <Card name={props.name} className="front" lockedPos lockedWidth={`${window.innerWidth}px`} id={-2} zIndex={{ '-2': 2000 }} posX='5%' posY="50%" footer={newTaskDialogFooter}>          
        <div className='card-content'>
          {props.children}
        </div>
      </Card>
    </div>
  )
}

Card.defaultProps = {
  name: 'Action Card',
}


export default ActionCard;