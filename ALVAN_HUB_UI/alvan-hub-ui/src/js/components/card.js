import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';

function Card (props) {
  const {name, children, lockedWidth, posX, posY} = props;

  const [positionX, setPositionX] = useState(posX ? posX + 0 : 0);
  const [positionY, setPositionY] = useState(posY ? posY + 110 : 110);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownPosX, setMouseDownPosX] = useState(0);
  const [mouseDownPosY, setMouseDownPosY] = useState(0);
  const [touchDown, setTouchDown] = useState(false);
  const [touchDownPosX, setTouchDownPosX] = useState(0);
  const [touchDownPosY, setTouchDownPosY] = useState(0);
  const [zIndex, setZIndex] = useState(50);
  const cardRef = useRef(null);
  const defaultLockedWidth = lockedWidth === "default" ? "250px" : lockedWidth; 
  const width = lockedWidth ? defaultLockedWidth : "fit-content";

  const _onMouseMove = (e) => {
    // e.stopPropagation(); 
    if (mouseDown) {
      setPositionX(positionX+e.nativeEvent.offsetX-mouseDownPosX);
      setPositionY(positionY+e.nativeEvent.offsetY-mouseDownPosY);
      setZIndex(75);
    }
  }

  const _onMouseDown = (e) => {
    setMouseDownPosX(e.nativeEvent.offsetX);
    setMouseDownPosY(e.nativeEvent.offsetY);
    setMouseDown(true);
  }
  const _onMouseUp = (e) => {
    setMouseDown(false);
    setZIndex(50);
  }

  const _onTouchMove = (e) => {
    if (touchDown) {
      const rect = e.target.getBoundingClientRect();
      setPositionX(positionX+(e.targetTouches[0].pageX - rect.left)-touchDownPosX);
      setPositionY(positionY+(e.targetTouches[0].pageY - rect.top)-touchDownPosY);
      setZIndex(75);
    }
  }

  const _onTouchStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    setTouchDownPosX(e.targetTouches[0].pageX - rect.left);
    setTouchDownPosY(e.targetTouches[0].pageY - rect.top);
    setTouchDown(true);
  }

  const _onTouchEnd = (e) => {
    setTouchDown(false);
    setZIndex(50);
  }

  return (
  <div
    className="card-base"
    style={{top: positionY, left: positionX, width: width, zIndex: zIndex}}
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
      <div className="card-divider"></div>
      <div className="angle-absolute">
        <div className="card-divider-angle"></div>
      </div>
    </div>
    <div className="padding">
      {children}
    </div>
  </div>);
};

Card.defaultProps = {
  name: '',
  children: '',
  lockedWidth: undefined,
  posX: undefined,
  posY: undefined
}

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
    PropTypes.object
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
}

export default Card;