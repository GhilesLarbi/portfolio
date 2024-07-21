import * as React from "react";
const SvgTwitter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g data-testid="twitter">
      <g className="twitter_svg__fills">
        <rect
          width={64}
          height={64}
          className="twitter_svg__frame-background"
          rx={0}
          ry={0}
        />
      </g>
      <g className="twitter_svg__frame-children" data-testid="svg-path">
        <path
          d="M21 6.172a25 25 0 0 0-3.041-.273 3.655 3.655 0 0 0-6.21 3.341c-3.03-.154-5.325-1.71-7.47-4.024-.293.57-.848 2.389-.416 3.702a7.16 7.16 0 0 0 2.531 3.221 9.8 9.8 0 0 1-3.195-.694c.528 1.736 2.343 4.256 5.197 4.65a7.3 7.3 0 0 1-4.526 1.571 7 7 0 0 1-.87-.041 10.27 10.27 0 0 0 5.587 1.646c6.702 0 10.369-5.583 10.369-10.429v-.476Z"
          className="twitter_svg__fills"
          style={{
            fill: "none",
          }}
        />
        <g className="twitter_svg__strokes">
          <g className="twitter_svg__inner-stroke-shape">
            <defs>
              <clipPath id="twitter_svg__b">
                <use href="#twitter_svg__a" />
              </clipPath>
              <path
                id="twitter_svg__a"
                d="M21 6.172a25 25 0 0 0-3.041-.273 3.655 3.655 0 0 0-6.21 3.341c-3.03-.154-5.325-1.71-7.47-4.024-.293.57-.848 2.389-.416 3.702a7.16 7.16 0 0 0 2.531 3.221 9.8 9.8 0 0 1-3.195-.694c.528 1.736 2.343 4.256 5.197 4.65a7.3 7.3 0 0 1-4.526 1.571 7 7 0 0 1-.87-.041 10.27 10.27 0 0 0 5.587 1.646c6.702 0 10.369-5.583 10.369-10.429v-.476Z"
                style={{
                  fill: "none",
                  strokeWidth: 2,
                  stroke: "#fff",
                  strokeOpacity: 0.6,
                }}
              />
            </defs>
            <use clipPath="url(#twitter_svg__b)" href="#twitter_svg__a" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default SvgTwitter;
