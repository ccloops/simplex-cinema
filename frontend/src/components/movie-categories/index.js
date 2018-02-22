import React from 'react';
import { connect } from 'react-redux';
import * as movieCategory from '../../action/movie-category';

const MovieCategories = ({ changeCategory }) => {

  const handleUpdate = event => {
    const { name } = event.target;
    changeCategory(name);
  };

  return (
    <ul>
      <button name='genre' onClick={handleUpdate}>a</button>
      <button name='a-z' onClick={handleUpdate}>b</button>
      <button name='director' onClick={handleUpdate}>c</button>
      <button name='rating' onClick={handleUpdate}>d</button>
    </ul>
  );
};

const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchToProps = dispatch => ({
  changeCategory: data => dispatch(movieCategory.changeCategoryAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCategories);
