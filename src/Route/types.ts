import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  AddCamera: undefined;
  AddUser: undefined;
  CameraInfo: { id: number };
  UserInfo: { id: number };
  Camera: { id: number };
  Cameras: { redirectTo: "manage" | "watch" };
  Users: undefined;
  SucessAccount: undefined;
  CreateReport: undefined;
  Reports: undefined;
  Report: { id: number };
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
