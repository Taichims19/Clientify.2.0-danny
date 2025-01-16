import * as React from "react";
const IconArrowTop = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path fill="#525252" d="M5.833 11.667 10 7.5l4.167 4.167H5.833Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 4a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default IconArrowTop;
