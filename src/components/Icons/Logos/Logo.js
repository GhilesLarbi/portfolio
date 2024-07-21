import * as React from "react";
const SvgLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    {...props}
  >
    <g data-testid="Group">
      <g data-testid="Ellipse">
        <circle
          cx={20}
          cy={15}
          r={15}
          className="logo_svg__fills"
          style={{
            fill: "#b1b2b5",
            fillOpacity: 0.1,
          }}
        />
        <g className="logo_svg__strokes">
          <g className="logo_svg__inner-stroke-shape">
            <defs>
              <clipPath id="logo_svg__b">
                <use href="#logo_svg__a" />
              </clipPath>
              <circle
                id="logo_svg__a"
                cx={20}
                cy={15}
                r={15}
                style={{
                  fill: "none",
                  strokeWidth: 2,
                  stroke: "#fff",
                  strokeOpacity: 0.4,
                }}
              />
            </defs>
            <use clipPath="url(#logo_svg__b)" href="#logo_svg__a" />
          </g>
        </g>
      </g>
      <circle
        cx={12}
        cy={23}
        r={12}
        className="logo_svg__fills"
        data-testid="Ellipse"
        style={{
          fill: "#b7b7ba",
          fillOpacity: 1,
        }}
      />
    </g>
  </svg>
);
export default SvgLogo;
