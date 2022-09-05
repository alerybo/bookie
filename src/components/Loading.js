import React from "react";

const Loading = () => {
  return (
    <section className="section">
      <div className="btn-container">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
