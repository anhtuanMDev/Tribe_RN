export const fonts = {
  nunito: {
    regular: 'NunitoSans-Regular',
    italic: 'NunitoSans-Italic',
    bold: 'NunitoSans-Bold',
  },

  literata: {
    extraLight: 'Literata-ExtraLight',
    extraLightItalic: 'Literata-ExtraLightItalic',
    lightItalic: 'Literata-LightItalic',
    regular: 'Literata-Regular',
    semiBold: 'Literata-SemiBold',
    semiBoldItalic: 'Literata-SemiBoldItalic',
    extraBold: 'Literata-ExtraBold',
    extraBoldItalic: 'Literata-ExtraBoldItalic',
  },
} as const;

export const VerificationPurpose = {
  REGISTER: "register",
  RESET_PASSWORD: "reset_password",
  DELETE_ACCOUNT: "delete_account",
  CHANGE_PASSWORD: "change_password",
} as const;

export type Alpha =
  | 0
  | 5
  | 10
  | 15
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
  | 50
  | 55
  | 60
  | 65
  | 70
  | 75
  | 80
  | 85
  | 90
  | 95
  | 100;

export const alphaHexMap: Record<Alpha, string> = {
  0: '00',
  5: '0D',
  10: '1A',
  15: '26',
  20: '33',
  25: '40',
  30: '4D',
  35: '59',
  40: '66',
  45: '73',
  50: '80',
  55: '8C',
  60: '99',
  65: 'A6',
  70: 'B3',
  75: 'BF',
  80: 'CC',
  85: 'D9',
  90: 'E6',
  95: 'F2',
  100: 'FF',
};
