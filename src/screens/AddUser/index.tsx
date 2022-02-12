import React, { useState } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { useUser } from "../../context";
import { Images } from "../../../assets";
import { CustomInput } from "../../components/CustomInput";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Loading } from "../../components/Loading";
import { ResponseMessage } from "../../components/ResponseMessage";
import { NavigationProps } from "../../Route/types";
import { CreateUser } from "../../../axios";
import { styles } from "./styles";
import { IState } from "./IState";

export const AddUser = ({
  route,
  navigation,
}: NavigationProps<"AddUser">): JSX.Element => {
  const [state, setState] = useState<IState>({
    dni: "",
    name: "",
    lastname: "",
    password: "",
    message: "",
    loading: false,
    success: false,
  });

  const onHandleSignUp = async (): Promise<void> => {
    setState({ ...state, loading: true });

    try {
      await CreateUser(
        parseInt(state.dni),
        state.name,
        state.lastname,
        state.password
      ).then((data) => {
        setState({
          ...state,
          message: data,
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
    <ScrollView contentContainerStyle={styles.container}>
      {state.loading && <Loading />}
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={Images.user} />
        <Text style={styles.title}>Agregar Vigilante</Text>
      </View>
      {state.message.length !== 0 && (
        <ResponseMessage
          sucess={state.success}
          image={Images.user}
          message={state.message}
        />
      )}
      <View>
        <CustomInput
          label="Cedula de identidad"
          value={state.dni}
          type="numeric"
          placeholder="Cedula de identidad del vigilante"
          onChangeText={(text) => {
            setState({
              ...state,
              dni: text,
            });
          }}
        />
        <CustomInput
          label="Nombre"
          value={state.name}
          type="default"
          placeholder="Nombre del vigilante"
          onChangeText={(text) => {
            setState({
              ...state,
              name: text,
            });
          }}
        />
        <CustomInput
          label="Apellido"
          value={state.lastname}
          type="default"
          placeholder="Apellido del vigilante"
          onChangeText={(text) => {
            setState({ ...state, lastname: text });
          }}
        />
        <CustomInput
          label="Contrase;a"
          value={state.password}
          type="default"
          placeholder="Contrase;a del vigilante"
          onChangeText={(text) => {
            setState({ ...state, password: text });
          }}
        />
      </View>
      <PrimaryButton text="Agregar Vigilante" OnPress={onHandleSignUp} />
    </ScrollView>
  );
};
