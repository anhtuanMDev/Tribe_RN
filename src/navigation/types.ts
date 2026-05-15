import { VerificationPurposeType } from '../config/type';
import { ROUTES } from './params';
import { NavigatorScreenParams } from '@react-navigation/native';

export type FlowCredential = {
  [ROUTES.SIGN_UP]: undefined;
  [ROUTES.SIGN_IN]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.VERIFY_EMAIL]: { purpose: VerificationPurposeType };
  [ROUTES.RESET_PASSWORD]: { purpose: VerificationPurposeType };
};

export type FlowBottom = {
  [ROUTES.HOME]: undefined;
  [ROUTES.NOTIFICATION]: undefined;
};

export type PARAMS = {
  [ROUTES.WALK_THROUGH]: undefined;
  [ROUTES.FLOW_CREDENTAIL]: NavigatorScreenParams<FlowCredential>;
  [ROUTES.FLOW_BOTTOM]: NavigatorScreenParams<FlowBottom>;
  [ROUTES.POST]: undefined;
};

export type NavigateArgs<T extends keyof PARAMS> = undefined extends PARAMS[T]
  ? [screen: T] | [screen: T, params: PARAMS[T]]
  : [screen: T, params: PARAMS[T]];
