import { User } from "firebase/auth";
import { ReactNode, createContext, useContext, useReducer } from "react";

type AuthState = {
  user: User | null;
  isLogged: boolean;
};
type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };
type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        isLogged: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isLogged: false,
      };
    default:
      return state;
  }
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLogged: false,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
