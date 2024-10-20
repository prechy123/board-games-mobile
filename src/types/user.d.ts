export interface IUser {
  email: string;
  profilePictureUrl: string;
  username: string;
  playerId: string;
}

export interface PlayerState {
  userName: string | null;
  profilePictureUrl: string | null;
}

export interface AuthState extends IUser {
  isAuthenticated: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

export interface RootState {
  auth: AuthState;
}
