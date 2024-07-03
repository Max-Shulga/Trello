function setTokens(token: string, refreshToken: string):void {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
}
export default setTokens;
