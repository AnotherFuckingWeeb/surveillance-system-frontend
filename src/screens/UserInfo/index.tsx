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
import { ElementList } from "../../components/ElementList";
import { DataListModal } from "../../components/DataListModal";
import { Loading } from "../../components/Loading";
import { GetUser, DeleteUser, UpdateUser } from "../../../axios";
import { IState } from "./IState";
import { NavigationProps } from "../../Route/types";
import { ICamera } from "../../../types/Types";

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
    password: "",
    cameras: [],
  });

  const fetchUser = async (): Promise<void> => {
    setState({ ...state, loading: true });

    try {
      await GetUser(route.params.id).then((user) => {
        setState({
          ...state,
          name: user.name,
          lastname: user.lastname,
          dni: user.dni.toString(),
          password: user.password,
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
      await UpdateUser(
        parseInt(state.dni),
        state.name,
        state.lastname,
        route.params.id
      ).then((message) => {
        setState({
          ...state,
          message,
          success: true,
          loading: false,
        });

        fetchUser();
      });
    } catch (error) {
      setState({
        ...state,
        message: error.message,
        success: false,
        loading: false,
      });

      console.error(error);
    }
  };

  const pushCamera = (newCamera: ICamera): void => {
    const chosenCamera = state.cameras.find((camera) => {
      return camera.id === newCamera.id;
    });

    if (chosenCamera) {
      alert("");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <DataListModal
        header="Asignar Camaras"
        elementImage={Images.camera}
        isModalVisible={state.isModalVisible}
        onClose={() =>
          setState({
            ...state,
            isModalVisible: false,
          })
        }
        onPressElement={(data) => {
          const existingCamera = state.cameras.find((camera) => {
            return camera.id === data.id;
          });

          if (existingCamera) {
            alert(`${existingCamera.area} ya ha sido asignado a este usuario`);
            return;
          }

          console.log(data);

          setState({
            ...state,
            cameras: [...state.cameras, data],
            isModalVisible: false,
          });
        }}
      />
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Image style={styles.image} source={Images.user} />
          <Text style={styles.title}>{`${state.name} ${state.lastname}`}</Text>
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
          header="Cedula de identidad"
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
        <Information
          header="Contrase;a"
          info={state.password}
          isEditable={state.isEditable}
          type="default"
          onChangeText={(text) => {
            setState({
              ...state,
              password: text,
            });
          }}
        />
        <ElementList
          readOnly={state.isEditable}
          header="Camaras asignadas"
          dataIcon={Images.camera}
          cameras={state.cameras}
          onPressButton={() => {
            setState({
              ...state,
              isModalVisible: true,
            });
          }}
          onPressCancellableButton={(id: number) => {
            setState({
              ...state,
              cameras: state.cameras.filter((camera) => {
                return camera.id !== id;
              }),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
