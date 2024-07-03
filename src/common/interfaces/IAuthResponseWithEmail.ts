import { IAuthResponse } from './IAuthResponse';

interface IAuthResponseWithEmail extends IAuthResponse {
  email: string;
}
export default IAuthResponseWithEmail;
