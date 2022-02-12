import { useEffect } from "react";
import { Animated, View } from "react-native";
import { Images } from "../../../assets";
import { PulseAnimation } from "../../animations/PulseAnimation";
import { _loadFontAsync } from "../../../assets";
import axios from "axios";
import { GetUsers } from "../../../axios";
import { NavigationProps } from "../../Route/types";
import { styles } from "./styles";

export const Splash = ({
  navigation,
}: NavigationProps<"Splash">): JSX.Element => {
  const animation = new Animated.Value(1);

  const readDB = async (): Promise<void> => {
    const users = await GetUsers();

    if (!users) {
      navigation.navigate("Welcome");
    } else {
      navigation.navigate("Login");
    }
  };

  const Init = async (): Promise<void> => {
    try {
      await _loadFontAsync().then(async () => {
        await readDB();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    PulseAnimation(animation, 0, 1);
    setTimeout(() => {
      Init();
    }, 5000);
  }, []);

  const animatedStyle = {
    opacity: animation,
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, animatedStyle]}
        source={Images.logo}
      />
    </View>
  );
};
