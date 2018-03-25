import React from 'react';
import { connect } from 'react-redux';
import { progressAction } from '../../action/client-movies';

const ProgressBar = ({ uploadProgress }) => {
  const bar = uploadProgress / 100;

  return (
    <div>{ uploadProgress }</div>
  );
};

const mapStateToProps = state => ({
  uploadProgress: state.uploadProgress,
});

export default connect(mapStateToProps)(ProgressBar);
