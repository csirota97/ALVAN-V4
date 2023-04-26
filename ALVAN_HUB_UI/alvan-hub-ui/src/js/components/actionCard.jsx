import React from 'react';
import Card from './card';
import './actionCard.scss';

function ActionCard(props) {
  const newTaskDialogFooter = (
    <div className="footer">
      { props.confirmAction && props.confirmText
        ? (
          <div
            className="create-button emphasis button"
            onClick={props.confirmAction}
          >
            {props.confirmText}
          </div>
        ) : (
          <div
            className="create-button button button-spacer"
          >
            {props.confirmText}
          </div>
        )}
      <div
        className="close-button secondary button"
        onClick={props.cancelAction}
      >
        {props.cancelText}
      </div>
    </div>
  );

  return (
    <>
      <link rel="stylesheet" href="./actionCard.scss" />
      <div className="action-card-background" onClick={props.cancelAction} />
      <div id="new-task-dialog" className="center action-card">
        <Card
          name={props.name}
          className="front"
          lockedPos
          lockedWidth={`${window.innerWidth}px`}
          id={-2}
          zIndex={{ '-2': 2000 }}
          posX="5%"
          posY="50%"
          footer={newTaskDialogFooter}
        >
          <div className="card-content">
            {props.children}
          </div>
        </Card>
      </div>
    </>
  );
}

Card.defaultProps = {
  name: 'Action Card',
};

export default ActionCard;
