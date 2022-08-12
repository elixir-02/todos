import React from "react";

export const Navbar = ({ title }) => {
  return (
    <>
      <div class="topnav">
        <a href="/">{title}</a>
      </div>
    </>
  );
};
