import { ISignIn } from './ISignIn';

interface ISignUp extends ISignIn {

  confirmPassword: string;
}
export default ISignUp;
