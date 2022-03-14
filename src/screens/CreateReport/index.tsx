import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { DescriptionInput } from "../../components/CustomInput";
import { ResponseMessage } from "../../components/ResponseMessage";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Images } from "../../../assets";
import { useUser } from "../../context";
import { CreateReport as AddReport } from "../../../axios";
import { IState } from "./IState";
import { Loading } from "../../components/Loading";

export const CreateReport = (): JSX.Element => {
  const [state, setState] = useState<IState>({
    description: "",
    success: false,
    loading: false,
    message: "",
  });
  const { user } = useUser();

  const onCreateReport = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      await AddReport(
        user.id,
        `${user.name} ${user.lastname}`,
        state.description
      ).then((res) => {
        setState({
          ...state,
          message: res,
          success: true,
          loading: false,
        });
      });
    } catch (error) {
      console.error(error);
      setState({
        ...state,
        message: error.message,
        success: false,
        loading: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      {state.message.length !== 0 && (
        <ResponseMessage
          image={Images.user}
          sucess={state.success}
          message={state.message}
        />
      )}
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={Images.camera} />
        <Text style={styles.title}>Crear Reporte</Text>
      </View>
      <View>
        <DescriptionInput
          label="Descripción"
          value={state.description}
          type="default"
          placeholder="Agrega una descripción"
          onChangeText={(val) => setState({ ...state, description: val })}
        />
      </View>
      <PrimaryButton text="Crear Reporte" OnPress={onCreateReport} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
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
