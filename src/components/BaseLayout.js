import React from "react";
import AppBar from "./AppBar";
import Footer from "./Footer";

const BaseLayout = props => {
  return (
    <div style={{ height: "100%" }}>
      <AppBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
