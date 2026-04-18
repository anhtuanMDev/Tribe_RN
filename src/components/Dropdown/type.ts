import { SelectItemType } from "../../config/type";

export type DropdownProps = {
  mode?: 'dock' | 'float';
  values: SelectItemType[];
  disabled?: boolean;
  defaultValue?: SelectItemType;
  onChange?: (value: SelectItemType) => void;
  maxHeight?: number;
};
