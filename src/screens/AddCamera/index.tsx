import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { Images } from "../../../assets";
import { CustomInput, DescriptionInput } from "../../components/CustomInput";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Loading } from "../../components/Loading";
import { ResponseMessage } from "../../components/ResponseMessage";
import { CreateCamera } from "../../../axios";
import { NavigationProps } from "../../Route/types";
import { IState } from "./IState";
import { styles } from "./styles";

export const AddCamera = ({
  route,
  navigation,
}: NavigationProps<"AddCamera">): JSX.Element => {
  const [state, setState] = useState<IState>({
    brand: "",
    area: "",
    description: "",
    message: "",
    loading: false,
    success: false,
  });

  const onHandleCreateCamera = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    if (state.brand === "" || state.area === "") {
      setState({
        ...state,
        message: "Rellene todos los campos",
        success: false,
        loading: false,
      });

      return;
    }

    await CreateCamera(state.brand, state.area, state.description).then(
      (res) => {
        setState({
          ...state,
          message: res,
          success: true,
          loading: false,
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={Images.camera} />
        <Text style={styles.title}>Agregar Camara</Text>
      </View>
      {state.message.length !== 0 && (
        <ResponseMessage
          image={Images.camera}
          sucess={state.success}
          message={state.message}
        />
      )}
      <View>
        <CustomInput
          label="Modelo"
          value={state.brand}
          type="default"
          placeholder="Modelo de la cámara"
          onChangeText={(text) => {
            setState({
              ...state,
              brand: text,
            });
          }}
        />
        <CustomInput
          label="Area"
          value={state.area}
          type="default"
          placeholder="Localidad de la cámara"
          onChangeText={(text) => {
            setState({ ...state, area: text });
          }}
        />
        <DescriptionInput
          label="Descripción"
          value={state.description}
          type="default"
          placeholder="Agrega una descripción"
          onChangeText={(text) => {
            setState({
              ...state,
              description: text,
            });
          }}
        />
      </View>
      <PrimaryButton text="Agregar Cámara" OnPress={onHandleCreateCamera} />
    </View>
  );
};
