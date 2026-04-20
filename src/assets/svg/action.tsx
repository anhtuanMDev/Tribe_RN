import Svg, { Path } from "react-native-svg";
import { SvgProps } from "./type";

const AddSVG = ({ width = 24, height = 24, fill = "#fff" }: SvgProps) => (
    <Svg
        width={width}
        height={height}
        fill={'none'}
    >
        <Path
            fill={fill}
            d="M10.857 16.571a3.429 3.429 0 0 0-3.428-3.428H5.143a1.143 1.143 0 0 1 0-2.286h2.286a3.428 3.428 0 0 0 3.428-3.428V5.143a1.143 1.143 0 0 1 2.286 0v2.286a3.429 3.429 0 0 0 3.428 3.428h2.286a1.143 1.143 0 0 1 0 2.286h-2.286a3.429 3.429 0 0 0-3.428 3.428v2.286a1.143 1.143 0 0 1-2.286 0v-2.286Z"
        />
    </Svg>
)

export { AddSVG };