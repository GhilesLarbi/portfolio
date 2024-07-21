import * as React from "react";
const SvgTechs = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <rect
      width={64}
      height={64}
      className="techs_svg__frame-background"
      rx={0}
      ry={0}
    />
    <path d="M4 10v12l12 6 12-6V10L16 4zm12 6 12-6M16 28V16m12 6-12-6M4 22l12-6M4 10l12 6m0-12v12" />
    <path
      d="M4 10v12l12 6 12-6V10L16 4zm12 6 12-6M16 28V16m12 6-12-6M4 22l12-6M4 10l12 6m0-12v12"
      style={{
        fill: "none",
        strokeWidth: 1,
        stroke: "currentColor",
        strokeOpacity: 1,
      }}
    />
  </svg>
);
export default SvgTechs;
