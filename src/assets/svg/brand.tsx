import Svg, { Path } from 'react-native-svg';
import { SvgProps } from './type';
import { pallet } from '../../config/pallet';

const PineTreeSVG = ({
  width = 24,
  height = 24,
  fill = pallet.primary,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      fill={fill}
      d="M13.733 21h-3.466v-3.6H4L7.556 12H5.778L12 3l6.222 9h-1.778L20 17.4h-6.267V21m-6.4-5.4h3.556H9.2h5.6-1.689 3.556-9.334m0 0h9.334l-3.556-5.4H14.8L12 6.15 9.2 10.2h1.689l-3.556 5.4"
    />
  </Svg>
);

export { PineTreeSVG };
