import { UserLoginDTO } from '@store/slices/user-slice/types';
import { sanitizePhoneNumber } from './sanitize-phone-number';

export const sanitizedUser = (user: UserLoginDTO) => ({
  ...user,
  phoneNumber: user.phoneNumber && sanitizePhoneNumber(user.phoneNumber),
});
