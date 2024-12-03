import * as React from "react";

const IconVectorClear = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 308 2"
    fill="none"
    {...props} // Permite pasar propiedades de estilo dinámicas
  >
    <path stroke="#F4F4F4" d="M0 1h308" />
  </svg>
);

export default IconVectorClear;
