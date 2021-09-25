export interface AuthStateType {
  token: any;
  tokenType: any;
  isLoggedIn: any;
  role: string;
  roleName: string;
  branchAccess: any;
  user: {
    branch: string;
    branchCode: string;
    lastLogin: string;
    type: string;
    firstName: string;
    lastName: string;
    middleName: string;
    id: string;
  };
}

export interface ActionType {
  type: string;
  payload: any;
}

export interface AuthContextType {
  authState: AuthStateType;
  login: any;
  logout: any;
  isLoggedIn: any;
}
