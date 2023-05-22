import { Dna } from "react-loader-spinner";
import React from "react";
const LoadingSpinner = ({ loadingText}) => (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary " role="status">
      <Dna
        visible={true}
        height="150"
        width="150"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
        <span className="sr-only">{loadingText}</span>
      </div>
    </div>
  );
  export default LoadingSpinner