import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar as StatusBarDimensions,
} from "react-native";
import { Images } from "../../../assets";
import { StatusBar } from "expo-status-bar";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { SecondaryButton } from "../../components/Button/SecondaryButton";
import { Information } from "../../components/Information";
import { ElementList } from "../../components/ElementList";
import { DataListModal } from "../../components/DataListModal";
import { Loading } from "../../components/Loading";
import { GetUser, DeleteUser, UpdateUser, GetCameras } from "../../../axios";
import { IState } from "./IState";
import { NavigationProps } from "../../Route/types";
import { ICamera } from "../../../types/Types";
import { ResponseMessage } from "../../components/ResponseMessage";

export const UserInfo = ({
  route,
  navigation,
}: NavigationProps<"UserInfo">): JSX.Element => {
  const [state, setState] = useState<IState>({
    isEditable: false,
    isModalVisible: false,
    loading: false,
    success: false,
    name: "",
    lastname: "",
    dni: "",
    message: "",
    cameras: [],
    deletedCameras: [],
  });

  const fetchUser = async (): Promise<void> => {
    setState({ ...state, loading: true });

    try {
      await GetUser(route.params.id).then((res) => {
        const { user, cameras } = res;

        setState({
          ...state,
          name: user.name,
          lastname: user.lastname,
          dni: user.dni.toString(),
          cameras: cameras ? cameras : [],
          loading: false,
        });
      });
    } catch (error) {
      console.error(error);
      setState({ ...state, loading: false });
    }
  };

  const onHandleDelete = async (): Promise<void> => {
    setState({ ...state, loading: true });

    try {
      await DeleteUser(route.params.id).then((message) => {
        setState({ ...state, loading: false });

        alert(message);
        navigation.navigate("Dashboard");
      });
    } catch (error) {
      console.error(error);
      setState({ ...state, loading: false });
    }
  };

  const onHandleUpdate = async (): Promise<void> => {
    setState({ ...state, loading: true });
    try {
      const res = await UpdateUser(
        parseInt(state.dni),
        state.name,
        state.lastname,
        state.cameras,
        state.deletedCameras,
        route.params.id
      );

      setState({
        ...state,
        message: res,
        success: true,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      setState({
        ...state,
        message: error,
        success: true,
        loading: false,
      });
    }
  };

  const pushCamera = (newCamera: ICamera): void => {
    const chosenCamera = state.cameras.find((camera) => {
      return camera.id === newCamera.id;
    });

    if (chosenCamera) {
      alert(`${chosenCamera.area} ya ha sido asignado a este usuario`);
      return;
    }

    setState({
      ...state,
      cameras: [...state.cameras, newCamera],
      isModalVisible: false,
    });
  };

  const popCamera = (id: number): void => {
    const deletedCamera = state.cameras.filter((camera) => {
      return camera.id === id;
    });

    const _cameras = state.cameras.filter((camera) => {
      return camera.id !== id;
    });

    setState({
      ...state,
      cameras: _cameras,
      deletedCameras: [...state.deletedCameras, ...deletedCamera],
    });
  };

  const assignCameras = async (): Promise<void> => {
    try {
      const response = await GetCameras();

      setState({
        ...state,
        cameras: response,
        isModalVisible: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      {state.cameras !== null && (
        <DataListModal
          header="Asignar Cámaras"
          elementImage={Images.camera}
          isModalVisible={state.isModalVisible}
          onClose={() =>
            setState({
              ...state,
              isModalVisible: false,
            })
          }
          onPressElement={pushCamera}
          onAssignAll={assignCameras}
        />
      )}
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Image style={styles.image} source={Images.user} />
          <Text style={styles.title}>{`${state.name} ${state.lastname}`}</Text>
        </View>
        {state.message.length !== 0 && (
          <ResponseMessage
            message={state.message}
            image={Images.user}
            sucess={state.success}
          />
        )}
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
          header="Cédula de identidad"
          info={state.dni.toString()}
          isEditable={state.isEditable}
          type="numeric"
          onChangeText={(text) => {
            setState({
              ...state,
              dni: text,
            });
          }}
        />
        <Information
          header="Nombre"
          info={state.name}
          isEditable={state.isEditable}
          type="default"
          onChangeText={(text) => {
            setState({
              ...state,
              name: text,
            });
          }}
        />
        <Information
          header="Apellido"
          info={state.lastname}
          isEditable={state.isEditable}
          type="default"
          onChangeText={(text) => {
            setState({
              ...state,
              lastname: text,
            });
          }}
        />
        <ElementList
          readOnly={state.isEditable}
          header="Cámaras asignadas"
          dataIcon={Images.camera}
          cameras={state.cameras}
          onPressButton={() => {
            setState({
              ...state,
              isModalVisible: true,
            });
          }}
          onPressCancellableButton={popCamera}
        />
        <View style={{ marginTop: 10, alignSelf: "center" }}>
          <PrimaryButton text="Guardar Cambios" OnPress={onHandleUpdate} />
        </View>
      </ScrollView>
      <StatusBar animated backgroundColor="#FFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBarDimensions.currentHeight,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    color: "#23396F",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});
