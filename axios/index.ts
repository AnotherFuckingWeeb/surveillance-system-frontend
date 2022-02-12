import axios from "axios";
import { IUser, ICamera, IAuthResponse } from "../types/Types";
import * as SecureStorage from "expo-secure-store";

const ROOT_URL: string = "http://192.168.0.103:8080";

export const Login = async (
  dni: number,
  password: string
): Promise<IAuthResponse> => {
  const response = await axios.post(`${ROOT_URL}/login/`, {
    dni,
    password,
  });

  return response.data;
};

export const SignUp = async (
  dni: number,
  name: string,
  lastname: string,
  password: string
): Promise<IAuthResponse> => {
  const response = await axios.post(`${ROOT_URL}/signup/`, {
    dni,
    name,
    lastname,
    password,
  });

  return response.data;
};

export const GetUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(`${ROOT_URL}/users/`);

  return response.data.users;
};

export const GetUser = async (id: number): Promise<IUser> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.get(`${ROOT_URL}/api/admin/user`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.user;
};

export const CreateUser = async (
  dni: number,
  name: string,
  lastname: string,
  password: string
): Promise<string> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.post(
    `${ROOT_URL}/api/admin/user/`,
    {
      dni,
      name,
      lastname,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.message;
};

export const UpdateUser = async (
  dni: number,
  name: string,
  lastname: string,
  id: number
): Promise<string> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.put(
    `${ROOT_URL}/api/admin/user`,
    {
      dni,
      name,
      lastname,
    },
    {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.message;
};

export const DeleteUser = async (id: number): Promise<string> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.delete(`${ROOT_URL}/api/admin/user`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.message;
};

export const GetCameras = async (): Promise<ICamera[]> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.get(`${ROOT_URL}/api/cameras/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);

  return response.data.cameras;
};

export const GetCamera = async (id: number): Promise<ICamera> => {
  const token = await SecureStorage.getItemAsync("token");
  const response = await axios.get(`${ROOT_URL}/api/camera`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.camera;
};

export const CreateCamera = async (
  brand: string,
  area: string,
  description: string
): Promise<string> => {
  const token = await SecureStorage.getItemAsync("token");
  const response = await axios.post(
    `${ROOT_URL}/api/admin/camera/`,
    {
      brand,
      area,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.message;
};

export const DeleteCamera = async (id: number): Promise<string> => {
  const token = await SecureStorage.getItemAsync("token");
  const response = await axios.delete(`${ROOT_URL}/api/admin/camera`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.message;
};
