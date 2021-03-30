// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string,
  size?: number,
};

export default function BellIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 20" fill="none">
      <Path
        d="M17.3984 14.1797C16.6562 13.3594 15.2109 12.1484 15.2109 8.125C15.2109 5.11719 13.1016 2.69531 10.2109 2.07031V1.25C10.2109 0.585938 9.66406 0 9 0C8.29688 0 7.75 0.585938 7.75 1.25V2.07031C4.85938 2.69531 2.75 5.11719 2.75 8.125C2.75 12.1484 1.30469 13.3594 0.5625 14.1797C0.328125 14.4141 0.210938 14.7266 0.25 15C0.25 15.6641 0.71875 16.25 1.5 16.25H16.4609C17.2422 16.25 17.7109 15.6641 17.75 15C17.75 14.7266 17.6328 14.4141 17.3984 14.1797ZM2.86719 14.375C3.6875 13.3203 4.58594 11.4844 4.625 8.16406C4.625 8.16406 4.625 8.16406 4.625 8.125C4.625 5.74219 6.57812 3.75 9 3.75C11.3828 3.75 13.375 5.74219 13.375 8.125C13.375 8.16406 13.3359 8.16406 13.3359 8.16406C13.375 11.4844 14.2734 13.3203 15.0938 14.375H2.86719ZM9 20C10.3672 20 11.4609 18.9062 11.4609 17.5H6.5C6.5 18.9062 7.59375 20 9 20Z"
        fill={color}
        fill-opacity="0.6"
      />
    </Svg>
  );
}
