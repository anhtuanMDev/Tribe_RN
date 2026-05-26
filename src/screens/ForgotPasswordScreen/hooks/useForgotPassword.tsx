import {
  useRequestVerifyEmailCode,
  useConfirmVerification,
} from '../../../hooks';
import { navigate } from '../../../navigation/utils';
import { ROUTES } from '../../../navigation/params';
import { VerificationPurpose } from '../../../config/constants';
import { toast } from '../../../store';

export const useForgotPassword = () => {
  const { mutate: requestCode, status: requestStatus } =
    useRequestVerifyEmailCode();
  const { mutate: confirmCode, status: confirmStatus } = useConfirmVerification(
    () => {
      toast.show({
        variant: 'success',
        title: 'Code verified. You can reset your password now.',
        position: 'bottom',
      });
      navigate(ROUTES.FLOW_CREDENTAIL, {
        screen: ROUTES.RESET_PASSWORD,
        params: { purpose: VerificationPurpose.RESET_PASSWORD },
      });
    },
  );

  const sendCode = (email: string) => {
    requestCode({ email, purpose: VerificationPurpose.RESET_PASSWORD });
  };

  const verifyCode = (email: string, code: string) => {
    confirmCode({ email, code, purpose: VerificationPurpose.RESET_PASSWORD });
  };

  return {
    sendCode,
    verifyCode,
    requestStatus,
    confirmStatus,
  };
};
