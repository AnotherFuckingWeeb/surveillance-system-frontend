import React, { FunctionComponent } from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { LengthContainer } from "../../components/LengthContainer";
import { Images } from "../../../assets";
import { DashboardButton } from "../../components/DashboardButton";
import { NavigationProps } from "../../Route/types";

export const Dashboard = ({
  navigation,
}: NavigationProps<"Dashboard">): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de administrador</Text>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <LengthContainer image={Images.user} title="Vigilantes" length={50} />
          <LengthContainer image={Images.camera} title="Camaras" length={10} />
        </View>
        <DashboardButton
          image={Images.user}
          text="Administrar vigilantes"
          onPress={() => {
            navigation.navigate("Users");
          }}
        />
        <DashboardButton
          image={Images.user}
          text="Agregar vigilante"
          onPress={() => navigation.navigate("AddUser")}
        />
        <DashboardButton
          image={Images.camera}
          text="Administrar camaras"
          onPress={() => navigation.navigate("Cameras")}
        />
        <DashboardButton
          image={Images.camera}
          text="Agregar camara"
          onPress={() => navigation.navigate("AddCamera")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
  },
  title: {
    fontSize: 25,
    color: "#23396F",
    fontWeight: "bold",
    marginVertical: 40,
  },
  lengthContainer: {
    width: 150,
    height: 180,
    padding: 4,
    backgroundColor: "#23396F",
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
