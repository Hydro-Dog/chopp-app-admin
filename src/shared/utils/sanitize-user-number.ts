import { UserLoginDTO } from "@store/slices/user-slice/types";
import { removeDashesFromPhoneNumber } from "./remove-dashes-from-phoneNumber";

export const sanitizedUser = (user: UserLoginDTO) => ({
    ...user,
    phoneNumber:
      user.phoneNumber && removeDashesFromPhoneNumber(user.phoneNumber),
});
