import React, { useState, useEffect, useRef } from "react";
export default function Card (props) {
  const {name, children, lockedWidth} = props;

  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(110);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownPosX, setMouseDownPosX] = useState(0);
  const [mouseDownPosY, setMouseDownPosY] = useState(0);
  const [zIndex, setZIndex] = useState(50);
  const cardRef = useRef(null);
  const width = lockedWidth ? "150px" : "fit-content";

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
    console.log('down');
  }
  const _onMouseUp = (e) => {
    setMouseDown(false);
    console.log('up');
    setZIndex(50);
  }

  return (
  <div
    className="card-base"
    style={{top: positionY, left: positionX, width: width, zIndex: zIndex}}
    onMouseMove={_onMouseMove}
    onMouseDown={_onMouseDown}
    onMouseUp={_onMouseUp}> 
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