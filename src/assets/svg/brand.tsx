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

const LeafSVG = ({
  width = 24,
  height = 24,
  fill = pallet.primary,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      fill={fill}
      d="M11.745 20a7.118 7.118 0 0 1-1.56-.176 10.52 10.52 0 0 1-1.608-.505 13.664 13.664 0 0 1 1.643-5.31 16.136 16.136 0 0 1 3.497-4.347 14.815 14.815 0 0 0-4.471 3.477 12.282 12.282 0 0 0-2.64 4.934 1.644 1.644 0 0 1-.177-.152l-.176-.177a7.72 7.72 0 0 1-1.678-2.466A7.241 7.241 0 0 1 4 12.434c0-1.065.211-2.083.634-3.054a8.325 8.325 0 0 1 1.76-2.584c1.267-1.27 2.91-2.095 4.929-2.48 2.018-.383 4.85-.418 8.496-.105.282 3.744.235 6.598-.14 8.564-.376 1.966-1.19 3.575-2.442 4.829a8.359 8.359 0 0 1-2.57 1.773 7.206 7.206 0 0 1-2.922.623"
    />
  </Svg>
);

export { PineTreeSVG, LeafSVG };
