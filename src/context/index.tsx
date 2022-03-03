import React, {
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import { IUser, ICamera } from "../../types/Types";
import { Login, SignUp } from "../../axios";
import * as SecureStorage from "expo-secure-store";
import { IContext } from "./IContext";

const Context = createContext<IContext>({} as IContext);

export const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [cameras, setCameras] = useState<ICamera[]>([]);

  const login = async (
    dni: number,
    password: string
  ): Promise<string | void> => {
    try {
      const response = await Login(dni, password);

      if (response.user) {
        console.log("recibiendo el user de la promesa", response.user);

        await SecureStorage.setItemAsync("token", response.token);

        setUser({
          id: response.user.id,
          dni: response.user.dni,
          name: response.user.name,
          lastname: response.user.lastname,
          role: response.user.role,
        });
        console.log("actualizando el state", user);
      } else {
        console.log(response.message);
      }

      return response.message;
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (
    dni: number,
    name: string,
    lastname: string,
    password: string
  ): Promise<string> => {
    try {
      const response = await SignUp(dni, name, lastname, password);

      return response;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStorage.deleteItemAsync("token");
    setUser({
      id: 0,
      dni: 0,
      name: "",
      lastname: "",
      role: 0,
    });
  };

  const addCamera = (newCamera: ICamera): void => {
    setCameras([...cameras, newCamera]);
  };

  return (
    <Context.Provider
      value={{ user, cameras, addCamera, login, signup, logout }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUser = () => {
  return useContext(Context) as IContext;
};
