import * as React from "react";
const ArrowIconBottom = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fontSize={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#6F6F6F"
        d="M7.04 8.333a.5.5 0 0 0-.353.854l2.96 2.96a.5.5 0 0 0 .707 0l2.96-2.96a.5.5 0 0 0-.354-.854H7.04Z"
      />
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
export default ArrowIconBottom;
