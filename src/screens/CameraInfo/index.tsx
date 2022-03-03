import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Images } from "../../../assets";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../components/Button/SecondaryButton";
import { Information } from "../../components/Information";
import { Loading } from "../../components/Loading";
import {
  DeleteCamera,
  GetCamera,
  UpdateCamera,
  UpdateUser,
} from "../../../axios";
import { NavigationProps } from "../../Route/types";
import { IState } from "./IState";
import { styles } from "./styles";

export const CameraInfo = ({
  route,
  navigation,
}: NavigationProps<"CameraInfo">): JSX.Element => {
  const [state, setState] = useState<IState>({
    isEditable: false,
    isModalVisible: false,
    loading: false,
    brand: "",
    area: "",
    description: "",
  });

  const fetchCamera = async (): Promise<void> => {
    setState({ ...state, loading: true });

    try {
      await GetCamera(route.params.id).then((camera) => {
        setState({
          ...state,
          brand: camera.brand,
          area: camera.area,
          description: camera.description,
          loading: false,
        });
      });
    } catch (error) {
      console.error(error);
      setState({
        ...state,
        loading: false,
      });
    }
  };

  const onHandleDelete = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      await DeleteCamera(route.params.id).then(() => {
        setState({
          ...state,
          loading: false,
        });

        alert("La cámara ha sido eliminada");
        navigation.navigate("Dashboard");
      });
    } catch (error) {
      setState({
        ...state,
        loading: true,
      });
      console.error(error);
    }
  };

  const onHandleUpdate = async (): Promise<void> => {
    setState({
      ...state,
      loading: false,
    });

    try {
      UpdateCamera(
        state.brand,
        state.area,
        state.description,
        route.params.id
      ).then((res) => {
        setState({
          ...state,
          loading: false,
        });
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      console.error(error);
    }
  };

  useEffect(() => {
    fetchCamera();
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Image style={styles.image} source={Images.camera} />
          <Text style={styles.title}>{state.brand}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            text={state.isEditable ? "Cancelar" : "Editar"}
            color="primary"
            OnPress={() =>
              setState({
                ...state,
                isEditable: !state.isEditable,
              })
            }
          />
          <SecondaryButton
            text="Eliminar"
            color="secondary"
            OnPress={onHandleDelete}
          />
        </View>
        <Information
          header="Modelo"
          info={state.brand}
          isEditable={state.isEditable}
          type="default"
          onChangeText={(text) => {
            setState({
              ...state,
              brand: text,
            });
          }}
        />
        <Information
          header="Area"
          info={state.area}
          isEditable={state.isEditable}
          type="default"
          onChangeText={(text) => {
            setState({
              ...state,
              area: text,
            });
          }}
        />
        <Information
          header="Descripción"
          info={state.description}
          isEditable={state.isEditable}
          type="default"
          multiText
          onChangeText={(text) => {
            setState({
              ...state,
              description: text,
            });
          }}
        />
        <View style={{ marginTop: 10, alignSelf: "center" }}>
          <PrimaryButton text="Guardar Cambios" OnPress={onHandleUpdate} />
        </View>
      </ScrollView>
    </View>
  );
};
