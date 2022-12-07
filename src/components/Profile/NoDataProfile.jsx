import PropTypes from "prop-types";
import React from "react";
import IconUser from "../../icons/IconUser";

function NoDataProfile(props) {
  const { className, title, description } = props;
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <IconUser className="w-40 h-40 text-gray-300 mb-6" />
      <h3 className="font-bold text-2xl">{title}</h3>
      <span className="mt-2 text-base">{description}</span>
    </div>
  );
}

NoDataProfile.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default NoDataProfile;
