import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  FunctionComponent,
} from "react";
import { ContextType } from "./IContext";
import { IUser } from "../../types/Types";
import { Login, SignUp } from "../../axios";
import * as SecureStore from "expo-secure-store";

const UserContext = createContext<ContextType>({} as ContextType);

const InitialState: IUser = { id: 0, dni: 0, role: 0, name: "", lastname: "" };

export const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [user, setUser] = useState<IUser>(InitialState);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (dni: number, password: string): Promise<void> => {
    setLoading(true);

    await Login(dni, password).then(async (auth) => {
      await SecureStore.setItemAsync("token", auth.token);
      setUser({
        id: auth.user.id,
        role: auth.user.role,
        dni: auth.user.dni,
        name: auth.user.name,
        lastname: auth.user.lastname,
      });
      setLoading(false);
    });
  };

  const signUp = async (
    dni: number,
    name: string,
    lastname: string,
    password: string
  ): Promise<void> => {
    toggleLoading();

    await SignUp(dni, name, lastname, password).then(async (auth) => {
      setUser(auth.user);
      await SecureStore.setItemAsync("token", auth.token);
      toggleLoading();
    });
  };

  const logout = async (): Promise<void> => {
    toggleLoading();

    await SecureStore.deleteItemAsync("token").then(() => {
      setUser(InitialState);
      toggleLoading();
    });
  };

  const toggleLoading = (): void => {
    setLoading(!loading);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      signUp,
      login,
      logout,
      toggleLoading,
    }),

    [user, loading]
  );

  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext<ContextType>(UserContext);
};
