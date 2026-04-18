import { ViewProps, TextProps } from "react-native";
import { SelectItemType } from "../../config/type";

export type CheckboxContextValue = {
  values: SelectItemType[];
  onChange: (val: SelectItemType) => void;
  name: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  values: SelectItemType[];
  onChange: (val: SelectItemType) => void;
  name: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
  disabled?: boolean;
};

export type CheckboxItemProps = {
  value: SelectItemType;
  style?: ViewProps['style'];
  label?: string;
};

export type CheckboxLabelProps = {
  children: React.ReactNode;
  style?: TextProps['style'];
  disabled?: boolean;
};
