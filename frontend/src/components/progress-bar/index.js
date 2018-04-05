import './_progress-bar.scss';
import React from 'react';

const ProgressBar = ({ uploadProgress }) => {
  const bar = uploadProgress + '%';
  console.log(uploadProgress);

  return (
    <div className="progress">
      <div className="bar" style={{width: bar}}></div>
    </div>
  );
};

export default ProgressBar;
