import { TextProps, ViewProps } from 'react-native';
import { SelectItemType } from '../../config/type';

export type RadioContextValue = {
  value: SelectItemType;
  onChange: (val: SelectItemType) => void;
  name: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  value: SelectItemType;
  onChange: (val: SelectItemType) => void;
  name: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
  disabled?: boolean;
};

export type RadioItemProps = {
  style?: ViewProps['style'];
} & SelectItemType;

export type RadioLabelProps = {
  disable?: boolean;
  children: React.ReactNode;
  style?: TextProps['style'];
};
