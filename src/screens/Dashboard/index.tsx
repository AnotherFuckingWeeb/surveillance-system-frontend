import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { LengthContainer } from "../../components/LengthContainer";
import { Images } from "../../../assets";
import { DashboardButton } from "../../components/DashboardButton";
import { Loading } from "../../components/Loading";
import { IProps } from "../../components/DashboardButton/IProps";
import { NavigationProps } from "../../Route/types";
import { GetStats } from "../../../axios";
import { IState } from "./IState";
import { styles } from "./styles";

export const Dashboard = ({
  navigation,
}: NavigationProps<"Dashboard">): JSX.Element => {
  const [state, setState] = useState<IState>({
    users: 0,
    cameras: 0,
    loading: false,
  });

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
      text: "Administrar camaras",
      onPress: () =>
        navigation.navigate("Cameras", {
          redirectTo: "manage",
        }),
    },
    {
      image: Images.camera,
      text: "Agregar camara",
      onPress: () => navigation.navigate("AddCamera"),
    },
    {
      image: Images.camera,
      text: "Observar camaras",
      onPress: () =>
        navigation.navigate("Cameras", {
          redirectTo: "watch",
        }),
    },
  ];

  const fetchData = async (): Promise<void> => {
    setState({ ...state, loading: true });
    try {
      await GetStats().then((res) => {
        if (res.users === null) {
          setState({
            ...state,
            users: 0,
            loading: false,
          });
        } else if (res.cameras === null) {
          setState({
            ...state,
            cameras: 0,
            loading: false,
          });
        }

        setState({
          users: res.users,
          cameras: res.cameras,
          loading: false,
        });
      });
    } catch (error) {
      setState({ ...state, loading: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.users, state.cameras]);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.title}>Panel de administrador</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <LengthContainer
            image={Images.user}
            title="Vigilantes"
            length={state.users}
          />
          <LengthContainer
            image={Images.camera}
            title="Camaras"
            length={state.cameras}
          />
        </View>
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
    </View>
  );
};
