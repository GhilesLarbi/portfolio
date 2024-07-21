import * as React from "react";
const SvgHome = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <rect width={64} height={64} rx={0} ry={0} />
    <path d="M4 12v16h24V12L16 4zm16 16V18h-8v10" />
    <path
      d="M4 12v16h24V12L16 4zm16 16V18h-8v10"
      style={{
        fill: "none",
        strokeWidth: 1,
        stroke: "currentColor",
        strokeOpacity: 1,
      }}
    />
  </svg>
);
export default SvgHome;
