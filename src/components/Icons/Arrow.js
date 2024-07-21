import * as React from "react";
const SvgArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44.5}
    height={13}
    fill="none"
    viewBox="437.5 290.5 44.5 13"
    {...props}
  >
    <path
      d="m475 301.5 5-4.5-5-4.5m5 4.5h-40.5"
      className="arrow_svg__fills"
      fill="currentColor"
      style={{
        fillOpacity: .5,
      }}

    />
    <path
      d="m475 301.5 5-4.5-5-4.5m5 4.5h-40.5"
      className="arrow_svg__stroke-shape"
      style={{
        fill: "none",
        strokeWidth: 1,
        stroke: "currentColor",
        strokeLinecap: "round",
      }}
    />
  </svg>
);
export default SvgArrow;
