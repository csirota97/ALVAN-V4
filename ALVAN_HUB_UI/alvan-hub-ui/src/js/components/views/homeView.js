import React, { useState, useEffect } from 'react';
import Card from '../card';
import WeatherContainer from '../weatherCardContainer';

import mockCalendarCall from '../../utils/mockCalendarCalls';
import getConstants from '../../utils/constants';
import serviceFactory from '../../utils/service-factory';

function HomeView(props) {
  const {securityCameraIPs, securityCameraToggleIndex} = props;
  const constants = getConstants();
  const securityCameras = securityCameraIPs.length > 0 ? securityCameraIPs.map((ip, index) => {
      if (securityCameraToggleIndex[index] === undefined) {
        securityCameraToggleIndex[index] = false
      }
      return <iframe src={ip} />
    }) :
    <></>;
  

  return (
    <div>
      {securityCameras}
    </div>
  )
}

export default HomeView;