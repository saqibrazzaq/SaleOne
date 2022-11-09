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

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export enum Roles {
  Admin = "Admin",
  Manager = "Manager",
  User = "User",
  Owner = "Owner",
}