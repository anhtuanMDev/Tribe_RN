import { VerificationPurpose } from "./constants";

export type SelectItemType = {
  label: string;
  value: any;
}

export type VerificationPurposeType = typeof VerificationPurpose[keyof typeof VerificationPurpose];

export interface ScreenDimensions {
  width: number;
  height: number;
  safeWidth: number;
  safeHeight: number;
  isLandscape: boolean;
}