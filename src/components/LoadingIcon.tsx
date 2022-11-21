import { FunctionComponent } from "react";

import classNames from "../utils/classNames";

interface ILoadingIconProps {
  className?: string;
  fill?: string;
  width?: number;
  height?: number;
}

const LoadingIcon: FunctionComponent<ILoadingIconProps> = (props) => {
  const { className, fill = "#fff", width = 18, height = 18 } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={classNames("animate-spin", className ?? "")}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"
      />
    </svg>
  );
};

export default LoadingIcon;
