import React from 'react';
import ForgotPasswordScreen from '../../../screens/ForgotPasswordScreen';
import SignInScreen from '../../../screens/SignInScreen';
import SignUpScreen from '../../../screens/SignUpScreen';
import VerifyEmailScreen from '../../../screens/VerifyEmailScreen';
import { ROUTES } from '../../params';
import { CredentialStack, screenOptions } from '../../utils';
import { CredentialProvider } from './context';

function CredentialFlow() {
  return (
    <CredentialProvider>
      <CredentialStack.Navigator screenOptions={screenOptions}>
        <CredentialStack.Screen name={ROUTES.SIGN_IN} component={SignInScreen} />
        <CredentialStack.Screen name={ROUTES.SIGN_UP} component={SignUpScreen} />
        <CredentialStack.Screen
          name={ROUTES.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <CredentialStack.Screen
          name={ROUTES.VERIFY_EMAIL}
          component={VerifyEmailScreen}
        />
      </CredentialStack.Navigator>
    </CredentialProvider>
  );
}

export default CredentialFlow
