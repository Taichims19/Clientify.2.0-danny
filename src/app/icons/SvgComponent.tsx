import * as React from "react";
const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#6F6F6F"
      d="M8 1.833a6.667 6.667 0 1 1 0 13.334A6.667 6.667 0 0 1 8 1.833Zm0 9.334A.667.667 0 1 0 8 12.5a.667.667 0 0 0 0-1.333Zm0-6.334A2.417 2.417 0 0 0 5.583 7.25a.667.667 0 1 0 1.334 0 1.083 1.083 0 1 1 1.486 1.006c-.45.18-1.07.642-1.07 1.41v.167a.667.667 0 1 0 1.334 0c0-.162.033-.244.174-.313l.058-.026A2.417 2.417 0 0 0 8 4.834Z"
    />
  </svg>
);
export default SvgComponent;
