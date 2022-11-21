import Common from "../utility/Common";

export class VerifyEmailDto {
  pinCode: string;

  constructor(pinCode: string) {
    this.pinCode = pinCode;
  }
}

export class UserRes {
  userName?: string;
  email?: string;
  emailConfirmed?: boolean;
  profilePictureUrl?: string = Common.DEFAULT_PROFILE_PICTURE;
  roles?: string[];
}

export class ChangePasswordRequestDto {
  email?: string = "";
  currentPassword?: string = "";
  newPassword?: string = "";
  confirmNewPassword?: string = "";
}
