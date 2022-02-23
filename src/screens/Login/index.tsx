import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { CustomInput } from "../../components/CustomInput";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Loading } from "../../components/Loading";
import { ResponseMessage } from "../../components/ResponseMessage";
import { Images } from "../../../assets";
import { NavigationProps } from "../../Route/types";
import { IState } from "../Login/IState";
import { useUser } from "../../context";
import { styles } from "./styles";

export const Login = ({
  navigation,
}: NavigationProps<"Login">): JSX.Element => {
  const [state, setState] = useState<IState>({
    dni: "",
    password: "",
    responseMessage: "",
    loading: false,
  });

  const { login, user } = useUser();

  const handleLogin = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      const response = await login(parseInt(state.dni), state.password);

      if (!response) {
        if (user.role === 1) {
          navigation.navigate("Dashboard");
        } else {
          navigation.navigate("Cameras", { redirectTo: "watch" });
        }
      } else {
        setState({
          ...state,
          responseMessage: response,
          loading: false,
        });
      }
    } catch (error) {
      console.error(error);
      setState({
        ...state,
        loading: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <View style={styles.loginContainer}>
        <Image style={styles.image} source={Images.brandLogo} />
        <Text style={styles.title}>Iniciar sesión</Text>
      </View>
      {state.responseMessage.length !== 0 && (
        <ResponseMessage
          image={Images.user}
          sucess={false}
          message={state.responseMessage}
        />
      )}
      <View style={{ marginTop: 20 }}>
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
        <PrimaryButton text="Iniciar sesión" OnPress={handleLogin} />
      </View>
    </View>
  );
};
