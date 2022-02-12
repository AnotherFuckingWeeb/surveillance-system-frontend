import { View, Text, Image } from "react-native";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Images } from "../../../assets";
import { styles } from "./styles";
import { NavigationProps } from "../../Route/types";

export const Welcome = ({
  navigation,
}: NavigationProps<"Welcome">): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={Images.brandLogo} />
        <View style={{ padding: 5 }}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.description}>
            Sigue los pasos de adelante para poder registrarte en el sistema
            como administrador
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.3,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <PrimaryButton
          text="Adelante"
          OnPress={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
    </View>
  );
};
