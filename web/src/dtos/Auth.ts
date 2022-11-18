export class AuthenticationResponseDto {
  email?: string;
  roles?: string[];
  accessToken?: string;
  emailConfirmed: boolean = false;
  accountId?: string;
}

export class UserLoginDto {
  email?: string;
  password?: string;

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterUserDto {
  username?: string = "";
  email?: string = "";
  password?: string = "";
  confirmPassword?: string = "";

  constructor(username?: string, email?:string, password?: string, confirmPassword?: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

export class ForgotPasswordDto {
  email?: string;

  constructor(email?: string) {
    this.email = email;
  }
}

export enum Roles {
  Admin = "Admin",
  Manager = "Manager",
  User = "User",
  Owner = "Owner",
}

