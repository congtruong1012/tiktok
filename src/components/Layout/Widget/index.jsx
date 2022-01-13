import React from "react";
import PropTypes from "prop-types";

function Widget(props) {
  const { title, children, text } = props;
  return (
    <div className="py-3 border-b border-gray-100 border-solid">
      <h5 className="px-2 mb-3 text-sm text-gray-500 font-medium">{title}</h5>
      {children}
      {text && <button className="px-4 text-sm text-primary">{text}</button>}
    </div>
  );
}

Widget.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.string,
};

export default Widget;
