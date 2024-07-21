import * as React from "react";
const SvgTelegram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g data-testid="telegram">
      <g className="telegram_svg__fills">
        <rect
          width={64}
          height={64}
          className="telegram_svg__frame-background"
          rx={0}
          ry={0}
        />
      </g>
      <g className="telegram_svg__frame-children">
        <g data-testid="svg-line">
          <path
            d="m15 10.5-4.545 5.22"
            className="telegram_svg__fills"
            style={{
              fill: "none",
            }}
          />
          <g className="telegram_svg__strokes">
            <path
              d="m15 10.5-4.545 5.22"
              className="telegram_svg__stroke-shape"
              style={{
                fill: "none",
                strokeWidth: 1,
                stroke: "#fff",
                strokeOpacity: 0.6,
              }}
            />
          </g>
        </g>
        <g data-testid="svg-polygon">
          <path
            d="m18 21 3-18-18 7.5z"
            className="telegram_svg__fills"
            style={{
              fill: "none",
            }}
          />
          <g className="telegram_svg__strokes">
            <g className="telegram_svg__inner-stroke-shape">
              <defs>
                <clipPath id="telegram_svg__b">
                  <use href="#telegram_svg__a" />
                </clipPath>
                <path
                  id="telegram_svg__a"
                  d="m18 21 3-18-18 7.5z"
                  style={{
                    fill: "none",
                    strokeWidth: 2,
                    stroke: "#fff",
                    strokeOpacity: 0.6,
                  }}
                />
              </defs>
              <use clipPath="url(#telegram_svg__b)" href="#telegram_svg__a" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default SvgTelegram;
