import axios from "axios";
import { IUser, ICamera, IAuthResponse, IUserInfo } from "../types/Types";
import * as SecureStorage from "expo-secure-store";

const ROOT_URL: string = "http://192.168.0.103:8080";

export const Login = async (
  dni: number,
  password: string
): Promise<IAuthResponse> => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(`${ROOT_URL}/login/`, {
      dni,
      password,
    });

    if (response) {
      resolve(response.data);
    } else {
      reject("something went wrong");
    }
  });
};

export const SignUp = async (
  dni: number,
  name: string,
  lastname: string,
  password: string
): Promise<string> => {
  const response = await axios.post(`${ROOT_URL}/signup/`, {
    dni,
    name,
    lastname,
    password,
  });

  return response.data.message;
};

export const GetUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(`${ROOT_URL}/users/`);

  return response.data.users;
};

export const GetUser = async (id: number): Promise<IUserInfo> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.get(`${ROOT_URL}/api/admin/user`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { user, cameras } = response.data;

  return {
    user,
    cameras,
  };
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
  assignedCameras: ICamera[],
  removedCameras: ICamera[],
  id: number
): Promise<string> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.put(
    `${ROOT_URL}/api/admin/user`,
    {
      dni,
      name,
      lastname,
      assignedCameras,
      removedCameras,
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

  const response = await axios.get(`${ROOT_URL}/api/admin/cameras/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.cameras;
};

export const GetCamerasByUid = async (uid: number): Promise<ICamera[]> => {
  const token = await SecureStorage.getItemAsync("token");

  const response = await axios.get(`${ROOT_URL}/api/cameras`, {
    params: {
      uid,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export const UpdateCamera = async (
  brand: string,
  area: string,
  description: string,
  id: number
): Promise<string> => {
  const token = await SecureStorage.getItemAsync("token");
  const response = await axios.put(
    `${ROOT_URL}/api/admin/camera`,
    {
      brand,
      area,
      description,
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

export const GetStats = async (): Promise<{
  users: number;
  cameras: number;
}> => {
  let users = (await GetUsers()).length;
  let cameras = (await GetCameras()).length;

  return {
    users,
    cameras,
  };
};
