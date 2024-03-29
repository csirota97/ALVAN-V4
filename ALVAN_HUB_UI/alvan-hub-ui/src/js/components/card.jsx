/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const {
    name, children, lockedWidth, posX, posY, zIndex, hasBeenClicked, lockedPos, id, footer, className,
  } = props;

  const [positionX, setPositionX] = useState(posX || 0);
  const [positionY, setPositionY] = useState(posY ? posY + 110 : 110);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownPosX, setMouseDownPosX] = useState(0);
  const [mouseDownPosY, setMouseDownPosY] = useState(0);
  const [touchDown, setTouchDown] = useState(false);
  const [touchDownPosX, setTouchDownPosX] = useState(0);
  const [touchDownPosY, setTouchDownPosY] = useState(0);
  const [cardZIndex, setCardZIndex] = useState((zIndex && id) ? zIndex[id] : 50);
  const defaultLockedWidth = lockedWidth === 'default' ? '250px' : lockedWidth;
  const width = lockedWidth ? defaultLockedWidth : 'fit-content';

  useEffect(() => { setCardZIndex(zIndex[id]); }, [props.render, zIndex, id]);

  const _onMouseMove = (e) => {
    // e.stopPropagation();
    if (mouseDown && !lockedPos) {
      setPositionX(positionX + e.nativeEvent.offsetX - mouseDownPosX);
      setPositionY(positionY + e.nativeEvent.offsetY - mouseDownPosY);
      setCardZIndex(75);
    }
  };

  const _onMouseDown = (e) => {
    if (!lockedPos) {
      setMouseDownPosX(e.nativeEvent.offsetX);
      setMouseDownPosY(e.nativeEvent.offsetY);
      setMouseDown(true);
      hasBeenClicked(id);
    }
  };
  const _onMouseUp = () => {
    if (!lockedPos) {
      setMouseDown(false);
      setCardZIndex(zIndex[id]);
    }
  };

  const _onTouchMove = (e) => {
    if (touchDown && !lockedPos) {
      const rect = e.target.getBoundingClientRect();
      setPositionX(positionX + (e.targetTouches[0].pageX - rect.left) - touchDownPosX);
      setPositionY(positionY + (e.targetTouches[0].pageY - rect.top) - touchDownPosY);
      setCardZIndex(75);
    }
  };

  const _onTouchStart = (e) => {
    if (!lockedPos) {
      const rect = e.target.getBoundingClientRect();
      setTouchDownPosX(e.targetTouches[0].pageX - rect.left);
      setTouchDownPosY(e.targetTouches[0].pageY - rect.top);
      setTouchDown(true);
      hasBeenClicked(id);
    }
  };

  const _onTouchEnd = () => {
    if (!lockedPos) {
      setTouchDown(false);
      setCardZIndex(zIndex[id]);
    }
  };

  if (positionX < 0) {
    setPositionX(0);
  }

  return (
    <div
      className={`card-base nonselectable ${className}`}
      style={{
        top: positionY, left: positionX, width, zIndex: cardZIndex,
      }}
      onMouseMove={_onMouseMove}
      onMouseDown={_onMouseDown}
      onMouseUp={_onMouseUp}
      onTouchMove={_onTouchMove}
      onTouchStart={_onTouchStart}
      onTouchEnd={_onTouchEnd}
    >
      <div className="card-header">
        <div className="padding">
          {name}
        </div>
        <div className="card-divider" />
        <div className="angle-absolute">
          <div className="card-divider-angle" />
        </div>
      </div>
      <div className="padding">
        {children}
      </div>

      {footer

    && (
      <div className="card-footer flipped">
        <div className="padding">
          <div className="flipped footer-content">
            {footer}
          </div>
        </div>
        <div className="card-divider" />
        <div className="angle-absolute">
          <div className="card-divider-angle" />
        </div>
      </div>
    )}
    </div>
  );
}

Card.defaultProps = {
  name: '',
  children: '',
  lockedWidth: undefined,
  posX: undefined,
  posY: undefined,
  zIndex: {},
  id: undefined,
  hasBeenClicked: () => {},
  lockedPos: false,
};

Card.propTypes = {
  /**
   * The name to be displayed at the top of the card
   */
  name: PropTypes.string,

  /**
   * The child object to be displayed on the card
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),

  /**
   * The size at which to lock the width of the card, can be null
   */
  lockedWidth: PropTypes.string,

  /**
   * The relative X position of the card
   */
  posX: PropTypes.number,

  /**
   * The relative Y position of the card
   */
  posY: PropTypes.number,

  /**
   * An object containing key value pairs of card-id: z-index
   */
  zIndex: PropTypes.object,

  /**
   * id of card
   */
  id: PropTypes.number,

  /**
   * Callback function to alert parent component if card has been clicked
   */
  hasBeenClicked: PropTypes.func,

  /**
   * Boolean for weather or not the position of the card is locked
   */
  lockedPos: PropTypes.bool,
};

export default Card;
