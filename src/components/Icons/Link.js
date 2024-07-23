import * as React from "react";
const SvgLink = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <rect width={64} height={64} rx={0} ry={0} />
    <path d="M12.25 19.25h-3.5a5.25 5.25 0 0 1 0-10.5h3.5m3.5 0h3.5a5.25 5.25 0 0 1 0 10.5h-3.5m-7-5.25h10.5" />
    <path
      d="M12.25 19.25h-3.5a5.25 5.25 0 0 1 0-10.5h3.5m3.5 0h3.5a5.25 5.25 0 0 1 0 10.5h-3.5m-7-5.25h10.5"
      style={{
        fill: "none",
        strokeWidth: 1,
        stroke: "currentColor",
      }}
    />
  </svg>
);
export default SvgLink;
