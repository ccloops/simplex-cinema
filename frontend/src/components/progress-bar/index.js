import './_progress-bar.scss';
import React from 'react';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
    };
    this.showBar = this.showBar.bind(this);
  }

  showBar() {
    this.setState({isUploading: !this.state.isUploading});
  }

  render() {
    const { uploadProgress } = this.props;
    const bar = uploadProgress + '%';
    console.log(uploadProgress);
  
    return (
      <div className="progress">
        <div className={this.state.isUploading ? 'bar' : ''} style={{width: bar}}></div>
      </div>
    );
  }
}

