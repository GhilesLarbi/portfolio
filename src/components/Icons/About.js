import * as React from "react";
const SvgAbout = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <rect width={64} height={64} rx={0} ry={0} />
    <path d="M16 4c3.311 0 6 3.585 6 8s-2.689 8-6 8-6-3.585-6-8 2.689-8 6-8m-5.02 12.73s-5.04 1.345-6.005 4c-1.45 4-.97 7.27-.97 7.27h24s.475-3.27-.97-7.27c-.965-2.655-6.005-4-6.005-4" />
    <path
      d="M16 4c3.311 0 6 3.585 6 8s-2.689 8-6 8-6-3.585-6-8 2.689-8 6-8Zm-5.02 12.73s-5.04 1.345-6.005 4c-1.45 4-.97 7.27-.97 7.27h24s.475-3.27-.97-7.27c-.965-2.655-6.005-4-6.005-4"
      style={{
        fill: "none",
        strokeWidth: 1,
        stroke: "currentColor",
        strokeOpacity: 1,
      }}
    />
  </svg>
);
export default SvgAbout;
