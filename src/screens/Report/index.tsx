import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, StyleSheet } from "react-native";
import { NavigationProps } from "../../Route/types";
import { Images } from "../../../assets";
import { useUser } from "../../context";
import { GetReportById } from "../../../axios";
import { IState } from "./IState";
import { Loading } from "../../components/Loading";

export const Report = ({
  route,
  navigation,
}: NavigationProps<"Report">): JSX.Element => {
  const [state, setState] = useState<IState>({
    username: "",
    description: "",
    loading: false,
  });

  const onGetReport = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      await GetReportById(route.params.id).then((response) => {
        setState({
          ...state,
          username: response.CreatedBy,
          description: response.Description,
          loading: false,
        });
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    onGetReport();
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={Images.user} />
        <Text style={styles.title}>{state.username}</Text>
      </View>
      <ScrollView contentContainerStyle={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>{state.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 50,
    paddingVertical: 20,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  title: {
    fontSize: 34,
    color: "#23396F",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
  },
});
