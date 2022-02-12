import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { NavigationProps } from "../../Route/types";
import { StatusBar } from "expo-status-bar";
import { Images } from "../../../assets";
import { ElementLink } from "../../components/ElementLink";
import { Loading } from "../../components/Loading";
import { GetUsers } from "../../../axios";
import { IState } from "./IState";

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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
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
      <StatusBar animated backgroundColor="#23396F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#23396F",
    paddingVertical: 45,
    paddingHorizontal: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    marginTop: 20,
    borderRadius: 4,
    margin: 5,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    fontSize: 18,
    color: "#23396F",
    fontWeight: "800",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: "#808080",
  },
  elevation: {
    elevation: 20,
    shadowColor: "black",
  },
});
