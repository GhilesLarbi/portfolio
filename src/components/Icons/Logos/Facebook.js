import * as React from "react";
const SvgFacebook = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g data-testid="facebook">
      <g className="facebook_svg__fills">
        <rect
          width={64}
          height={64}
          className="facebook_svg__frame-background"
          rx={0}
          ry={0}
        />
      </g>
      <g className="facebook_svg__frame-children">
        <g data-testid="svg-path">
          <path
            d="M10.5 21V7.5Q10.5 3 15 3"
            className="facebook_svg__fills"
            style={{
              fill: "none",
            }}
          />
          <g className="facebook_svg__strokes">
            <path
              d="M10.5 21V7.5Q10.5 3 15 3"
              className="facebook_svg__stroke-shape"
              style={{
                fill: "none",
                strokeWidth: 1,
                stroke: "#fff",
                strokeOpacity: 0.6,
              }}
            />
          </g>
        </g>
        <g data-testid="svg-line">
          <path
            d="M15 9H8.25"
            className="facebook_svg__fills"
            style={{
              fill: "none",
            }}
          />
          <g className="facebook_svg__strokes">
            <path
              d="M15 9H8.25"
              className="facebook_svg__stroke-shape"
              style={{
                fill: "none",
                strokeWidth: 1,
                stroke: "#fff",
                strokeOpacity: 0.6,
              }}
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default SvgFacebook;
