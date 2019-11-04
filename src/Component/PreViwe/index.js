import React from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
class PreViwe extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <>
        <div className="previwe-wrap">
          <ProgressBar
            variant="flat"
            now={this.props.now}
            label={`${this.props.now}% Loading...`}
          />
        </div>
      </>
    );
  }
}

export default PreViwe;
