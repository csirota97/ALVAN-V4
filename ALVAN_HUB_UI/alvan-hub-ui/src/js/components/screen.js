import React from "react";
import '../components/card.scss';
import '../index.scss';
import Card from "./card";
import logo from '../ALVAN_LOGO_SMALL.png';
import logo2 from '../ALVAN_LOGO_SMALL_BLACK.png';
import Clock from "./clock";

export default function Screen () {
  return (
    <>
      <Clock />
      <Card name="Card1" lockedWidth>Test card</Card>
      <Card name="Card2" lockedWidth>Test card 2</Card>
      <Card name="Card3" lockedWidth>Test card 3 Test card 3 Test card 3</Card>
      <img className="logo" src={logo}></img>
      <img className="logo-back" src={logo2}></img>
    </>
  )
};