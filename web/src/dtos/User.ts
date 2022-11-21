import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

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

export class UserReqSearch extends PagedReq {
  constructor({
    pageNumber = 1,
    pageSize = Common.DEFAULT_PAGE_SIZE,
    orderBy,
    searchText = "",
  }: PagedReq) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
  }
}

export class ChangePasswordRequestDto {
  email?: string = "";
  currentPassword?: string = "";
  newPassword?: string = "";
  confirmNewPassword?: string = "";
}
