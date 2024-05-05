export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUserProfile {
  name: string;
  address: string;
  phone: string;
  userCredentialId: string;
}
