import React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";

function Scrollbar(props) {
  const { children, ...rest } = props;
  return (
    <OverlayScrollbarsComponent
      options={{
        overflowBehavior: {
          x: "hidden",
          y: "scroll",
        },
        scrollbars: {
          autoHide: "leave",
          autoHideDelay: 100,
        },
      }}
      {...rest}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

export default Scrollbar;
