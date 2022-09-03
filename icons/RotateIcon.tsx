import { SVGProps } from "react";

const RotateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    width={24}
    {...props}
  >
    <path d="M1 4v6h6" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

export default RotateIcon;
