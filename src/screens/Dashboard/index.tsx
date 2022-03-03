import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Images } from "../../../assets";
import { DashboardButton } from "../../components/DashboardButton";
import { SecondaryButton } from "../../components/Button/SecondaryButton";
import { IProps } from "../../components/DashboardButton/IProps";
import { NavigationProps } from "../../Route/types";
import { useUser } from "../../context";
import { styles } from "./styles";

export const Dashboard = ({
  navigation,
}: NavigationProps<"Dashboard">): JSX.Element => {
  const { logout } = useUser();

  const DashButtons: Array<IProps> = [
    {
      image: Images.user,
      text: "Administrar vigilantes",
      onPress: () => navigation.navigate("Users"),
    },
    {
      image: Images.user,
      text: "Agregar vigilante",
      onPress: () => navigation.navigate("AddUser"),
    },
    {
      image: Images.camera,
      text: "Administrar cámaras",
      onPress: () =>
        navigation.navigate("Cameras", {
          redirectTo: "manage",
        }),
    },
    {
      image: Images.camera,
      text: "Agregar cámara",
      onPress: () => navigation.navigate("AddCamera"),
    },
    {
      image: Images.camera,
      text: "Observar cámaras",
      onPress: () =>
        navigation.navigate("Cameras", {
          redirectTo: "watch",
        }),
    },
  ];

  const onHandleLogout = async (): Promise<void> => {
    await logout().then(() => {
      navigation.navigate("Login");
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.title}>Panel de administrador</Text>
        {DashButtons.map((dashButton, index): JSX.Element => {
          return (
            <DashboardButton
              key={index}
              image={dashButton.image}
              text={dashButton.text}
              onPress={dashButton.onPress}
            />
          );
        })}
      </ScrollView>
      <SecondaryButton
        text="Cerrar Sesión"
        color="secondary"
        OnPress={onHandleLogout}
      />
    </View>
  );
};
