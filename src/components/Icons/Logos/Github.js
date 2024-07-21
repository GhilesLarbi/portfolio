import * as React from "react";
const SvgGithub = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g data-testid="github">
      <g className="github_svg__fills">
        <rect
          width={64}
          height={64}
          className="github_svg__frame-background"
          rx={0}
          ry={0}
        />
      </g>
      <g className="github_svg__frame-children">
        <g data-testid="svg-path">
          <path
            d="M7.5 21A1.5 1.5 0 0 0 9 19.5a3 3 0 0 1 .881-2.126s-5.133-.574-6.225-2.779A8.1 8.1 0 0 1 3 11.033 6.46 6.46 0 0 1 4.463 6.75a5.8 5.8 0 0 1-.289-1.807c0-.818-.049-1.193.326-1.943 1.68 0 3 .319 4.264 1.32A14.8 14.8 0 0 1 12 4.013a14.8 14.8 0 0 1 3.236.307C16.5 3.319 17.82 3 19.5 3c.375.731.326 1.125.326 1.943a5.8 5.8 0 0 1-.288 1.807A6.46 6.46 0 0 1 21 11.033a8.1 8.1 0 0 1-.656 3.562c-1.091 2.205-6.225 2.779-6.225 2.779.565.563.882 1.328.881 2.126a1.5 1.5 0 0 0 1.5 1.5"
            className="github_svg__fills"
            style={{
              fill: "none",
            }}
          />
          <g className="github_svg__strokes">
            <path
              d="M7.5 21A1.5 1.5 0 0 0 9 19.5a3 3 0 0 1 .881-2.126s-5.133-.574-6.225-2.779A8.1 8.1 0 0 1 3 11.033 6.46 6.46 0 0 1 4.463 6.75a5.8 5.8 0 0 1-.289-1.807c0-.818-.049-1.193.326-1.943 1.68 0 3 .319 4.264 1.32A14.8 14.8 0 0 1 12 4.013a14.8 14.8 0 0 1 3.236.307C16.5 3.319 17.82 3 19.5 3c.375.731.326 1.125.326 1.943a5.8 5.8 0 0 1-.288 1.807A6.46 6.46 0 0 1 21 11.033a8.1 8.1 0 0 1-.656 3.562c-1.091 2.205-6.225 2.779-6.225 2.779.565.563.882 1.328.881 2.126a1.5 1.5 0 0 0 1.5 1.5"
              className="github_svg__stroke-shape"
              style={{
                fill: "none",
                strokeWidth: 1,
                stroke: "#fff",
                strokeOpacity: 0.6,
              }}
            />
          </g>
        </g>
        <g data-testid="svg-path">
          <path
            d="M9 19.08c-1.5.75-2.366-.161-3.281-.75S4.125 17.531 3 18"
            className="github_svg__fills"
            style={{
              fill: "none",
            }}
          />
          <g className="github_svg__strokes">
            <path
              d="M9 19.08c-1.5.75-2.366-.161-3.281-.75S4.125 17.531 3 18"
              className="github_svg__stroke-shape"
              style={{
                fill: "none",
                strokeWidth: 1,
                stroke: "#fff",
                strokeOpacity: 0.6,
              }}
            />
          </g>
        </g>
        <g data-testid="svg-ellipse">
          <ellipse
            cx={8.554}
            cy={11.895}
            className="github_svg__fills"
            rx={1.196}
            ry={1.808}
            style={{
              fill: "none",
            }}
          />
          <g className="github_svg__strokes">
            <g className="github_svg__inner-stroke-shape">
              <defs>
                <clipPath id="github_svg__b">
                  <use href="#github_svg__a" />
                </clipPath>
                <ellipse
                  id="github_svg__a"
                  cx={8.554}
                  cy={11.895}
                  rx={1.196}
                  ry={1.808}
                  style={{
                    fill: "none",
                    strokeWidth: 2,
                    stroke: "#fff",
                    strokeOpacity: 0.6,
                  }}
                />
              </defs>
              <use clipPath="url(#github_svg__b)" href="#github_svg__a" />
            </g>
          </g>
        </g>
        <g data-testid="svg-ellipse">
          <ellipse
            cx={15.446}
            cy={11.895}
            className="github_svg__fills"
            rx={1.196}
            ry={1.808}
            style={{
              fill: "none",
            }}
          />
          <g className="github_svg__strokes">
            <g className="github_svg__inner-stroke-shape">
              <defs>
                <clipPath id="github_svg__f">
                  <use href="#github_svg__e" />
                </clipPath>
                <ellipse
                  id="github_svg__e"
                  cx={15.446}
                  cy={11.895}
                  rx={1.196}
                  ry={1.808}
                  style={{
                    fill: "none",
                    strokeWidth: 2,
                    stroke: "#fff",
                    strokeOpacity: 0.6,
                  }}
                />
              </defs>
              <use clipPath="url(#github_svg__f)" href="#github_svg__e" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default SvgGithub;
