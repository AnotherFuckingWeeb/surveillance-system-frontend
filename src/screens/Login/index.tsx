import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { CustomInput } from "../../components/CustomInput";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Loading } from "../../components/Loading";
import { Images } from "../../../assets";
import { NavigationProps } from "../../Route/types";
import { IState } from "../Login/IState";
import { styles } from "./styles";
import { useUser } from "../../context";

export const Login = ({
  navigation,
}: NavigationProps<"Login">): JSX.Element => {
  const [state, setState] = useState<IState>({
    dni: "",
    password: "",
    loading: false,
  });

  const { login, user } = useUser();

  const toggleLoading = () => {
    setState({
      ...state,
      loading: !state.loading,
    });
  };

  const Login = async (): Promise<void> => {
    toggleLoading();

    try {
      await login(parseInt(state.dni), state.password).then(() => {
        toggleLoading();

        if (user.role === 0) navigation.navigate("Dashboard");
        else navigation.navigate("Cameras");
      });
    } catch (error) {
      toggleLoading();
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <View style={styles.loginContainer}>
        <Image style={styles.image} source={Images.brandLogo} />
        <Text style={styles.title}>Iniciar sesión</Text>
      </View>
      <View>
        <CustomInput
          label="Cédula de identidad"
          value={state.dni}
          type="number-pad"
          onChangeText={(text) =>
            setState({
              ...state,
              dni: text,
            })
          }
        />
        <CustomInput
          secure
          label="Contraseña"
          value={state.password}
          type="ascii-capable"
          onChangeText={(text) => {
            setState({
              ...state,
              password: text,
            });
          }}
        />
      </View>
      <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
        <PrimaryButton text="Iniciar sesión" OnPress={Login} />
      </View>
    </View>
  );
};
