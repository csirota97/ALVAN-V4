import React, { useState, useEffect, useRef } from "react";
export default function Card (props) {
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
  const width = lockedWidth ? "250px" : "fit-content";

  const _onMouseMove = (e) => {
    // e.stopPropagation(); 
    if (mouseDown) {
      console.log("mouseMove");
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

  const _onTouchMove = (e) => {
    // console.log(touchDown, touchDownPosY, touchDownPosX);
    if (touchDown) {
      console.log("touchMove");
      console.log(positionX, e.targetTouches[0].pageX, touchDownPosX);
      const rect = e.target.getBoundingClientRect();
      setPositionX(positionX+(e.targetTouches[0].pageX - rect.left)-touchDownPosX);
      setPositionY(positionY+(e.targetTouches[0].pageY - rect.top)-touchDownPosY);
      setZIndex(75);
    }
  }

  const _onTouchStart = (e) => {
    console.log(1234, e.targetTouches[0]);
    const rect = e.target.getBoundingClientRect();
    setTouchDownPosX(e.targetTouches[0].pageX - rect.left);
    setTouchDownPosY(e.targetTouches[0].pageY - rect.top);
    setTouchDown(true);
    console.log('down');
  }

  const _onTouchEnd = (e) => {
    console.log(4321);
    setTouchDown(false);
    console.log('up');
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