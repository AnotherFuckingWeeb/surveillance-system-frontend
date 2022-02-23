import { FunctionComponent, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { CustomInput } from "../../components/CustomInput";
import { Loading } from "../../components/Loading";
import { IProps } from "./IProps";

export const OnBoardingItem: FunctionComponent<IProps> = ({
  image,
  title,
  end,
  inputs,
  scrollTo,
  onFinishCallback,
}): JSX.Element => {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState<boolean>();

  return (
    <View style={[styles.container, { width }]}>
      {loading && <Loading />}
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          {inputs.map((input, index) => {
            return (
              <CustomInput
                key={index}
                type={input.type}
                secure={input.secure}
                value={input.value}
                placeholder={input.placeholder}
                onChangeText={input.onChangeText}
              />
            );
          })}
        </View>
      </View>
      <PrimaryButton
        text={end ? "Crear Administrador" : "Continuar"}
        OnPress={() => {
          setLoading(true);
          if (end) onFinishCallback();
          scrollTo();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    margin: 20,
  },
  title: {
    fontFamily: "OpenSans-Medium",
    fontSize: 24,
    color: "#23396F",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
