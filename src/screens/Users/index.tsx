import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { NavigationProps } from "../../Route/types";
import { StatusBar } from "expo-status-bar";
import { Images } from "../../../assets";
import { ElementLink } from "../../components/ElementLink";
import { Loading } from "../../components/Loading";
import { EmptyPlaceholder } from "../../components/EmptyPlaceholder";
import { GetUsers } from "../../../axios";
import { IState } from "./IState";
import { styles } from "./styles";

export const Users = ({ route, navigation }: NavigationProps<"Cameras">) => {
  const [state, setState] = useState<IState>({
    users: [],
    loading: true,
  });

  const getUsers = async (): Promise<void> => {
    setState({ ...state, loading: true });

    try {
      await GetUsers().then((users) => {
        setState({
          users,
          loading: false,
        });
      });
    } catch (error) {
      console.error(error);
      setState({ ...state, loading: false });
    }
  };

  const UserList = (): JSX.Element => {
    return (
      <View>
        <Text style={{ fontSize: 28, color: "white" }}>Vigilantes</Text>
        <ScrollView>
          {state.users.map((user, index): JSX.Element => {
            return (
              <ElementLink
                key={index}
                header={`${user.name} ${user.lastname}`}
                subHeader={user.dni.toString()}
                image={Images.user}
                onPress={() => {
                  navigation.navigate("UserInfo", {
                    id: user.id,
                  });
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      {state.users ? (
        <UserList />
      ) : (
        <EmptyPlaceholder text="No hay vigilantes disponibles" />
      )}
      <StatusBar animated backgroundColor="#23396F" />
    </View>
  );
};
