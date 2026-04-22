import React from 'react';
import { CredentialStack, screenOptions } from '../../utils';
import { CredentialProvider } from './context';
import { ROUTES } from '../../params';
import WalkThroughScreen from '../../../screens/WalkThroughScreen';
import SignInScreen from '../../../screens/SignInScreen';
import SignUpScreen from '../../../screens/SignUpScreen';
import ForgotPasswordScreen from '../../../screens/ForgotPasswordScreen';

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
      </CredentialStack.Navigator>
    </CredentialProvider>
  );
}

export default CredentialFlow
