import React from "react";
import "./Navbar.css";
import FileUpload from "../upload";

const Navbar = () => {
  return (
    <div classname="head">
      <FileUpload />
      <button className="second">Search</button>
      <button className="third">Download</button>
    </div>
  );
};

export default Navbar;
