import React from 'react';

function HomeView(props) {
  const { securityCameraIPs, securityCameraToggleIndex } = props;
  const securityCameras = securityCameraIPs.length > 0 ? securityCameraIPs.map((ip, index) => {
    if (securityCameraToggleIndex[index] === undefined) {
      securityCameraToggleIndex[index] = false;
    }
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    return <iframe src={ip} />;
  })
    : null;

  return (
    <div>
      {securityCameras}
    </div>
  );
}

export default HomeView;
