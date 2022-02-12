import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { NavigationProps } from "../../Route/types";
import { Images } from "../../../assets";
import { styles } from "./styles";

export const SucessAccount = ({
  navigation,
}: NavigationProps<"SucessAccount">): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Images.admin} />
        <Text style={styles.title}>Te has registrado en el sistema</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Te has registrado en el sistema como administrador. Tienes acceso
            tanto al control de las camaras como de los usuarios, puedes editar,
            crear y eliminar elementos en el programa.
          </Text>
        </View>
      </View>
      <PrimaryButton
        text="Continuar"
        OnPress={() => navigation.navigate("Dashboard")}
      />
    </View>
  );
};
