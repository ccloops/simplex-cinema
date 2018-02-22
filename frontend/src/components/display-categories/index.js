import React from 'react';
import { connect } from 'react-redux';
import * as changeDisplay from '../../action/change-display';

const DisplayCategories = ({ handleChangeDisplay }) => {

  const handleUpdate = event => {
    const { name } = event.target;
    handleChangeDisplay(name);
  };

  return (
    <nav>
      <button name='GENRE' onClick={handleUpdate}>
        Genre
      </button>

      <button name='A-Z' onClick={handleUpdate}>
        A - Z
      </button>

      <button name='DIRECTOR' onClick={handleUpdate}>
        Director
      </button>

      <button name='RATING' onClick={handleUpdate}>
        Rating
      </button>

      <button name='UPLOAD' onClick={handleUpdate}>
        Upload
      </button>
    </nav>
  );
};

const mapDispatchToProps = dispatch => ({
  handleChangeDisplay: data => dispatch(changeDisplay.changeDisplayAction(data)),
});

export default connect(null, mapDispatchToProps)(DisplayCategories);
