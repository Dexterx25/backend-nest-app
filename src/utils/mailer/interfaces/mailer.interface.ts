export interface IRecoverPass {
  buttonTitle: string;
  headerTitle: string;
  message: string;
  email: string;
  url: string;
}

export interface IMail {
  advertisement: string;
  buttonTitle?: string;
  headerTitle: string;
  greeting: string;
  farewell: string;
  message: string;
  url?: string;
}

export interface ISign {
  meeting: string;
  message: string;
  signal: string;
  url: string;
}
