import { createNanoIconSet } from 'react-native-nano-icons';
import glyphMap from './AppIcons.glyphmap.json';

export type IconName = keyof typeof glyphMap.i;
export const Icon = createNanoIconSet(glyphMap);
