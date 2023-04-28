import React from 'react';

function HomeView(props) {
  const { securityCameraToggleIndex } = props;
  // const { securityCameraIPs, securityCameraToggleIndex } = props;
  // const asecurityCameraIPs = ['http://192.168.1.155', 'http://192.168.1.169'];
  const securityCameraIPs = ['http://192.168.1.155:5001', 'http://192.168.1.169:5001'];
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
      {console.log(`SECURITY: ${securityCameraIPs.toString()}`)}
      {securityCameras}
    </div>
  );
}

export default HomeView;
