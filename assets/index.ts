import * as Font from "expo-font";

const customFonts = {
  "OpenSans-Regular": require("./fonts/OpenSans-Regular.ttf"),
  "OpenSans-Bold": require("./fonts/OpenSans-Bold.ttf"),
  "OpenSans-Light": require("./fonts/OpenSans-Light.ttf"),
  "OpenSans-LightItalic": require("./fonts/OpenSans-LightItalic.ttf"),
  "OpenSans-Italic": require("./fonts/OpenSans-Italic.ttf"),
  "OpenSans-SemiBold": require("./fonts/OpenSans-SemiBold.ttf"),
  "OpenSans-SemiBoldItalic": require("./fonts/OpenSans-SemiBoldItalic.ttf"),
  "OpenSans-Medium": require("./fonts/OpenSans-Medium.ttf"),
  "OpenSans-MediumItalic": require("./fonts/OpenSans-MediumItalic.ttf"),
  "OpenSans-ExtraBold": require("./fonts/OpenSans-ExtraBold.ttf"),
  "OpenSans-ExtraBoldItalic": require("./fonts/OpenSans-ExtraBoldItalic.ttf"),
};

export const Images = {
  brandLogo: require("./NTN-Consultores-Corpoelec-logo-2.png"),
  logo: require("./NTN-Consultores-Corpoelec-logo-1024x226.png"),
  name: require("./icons8-nombre-100.png"),
  password: require("./icons8-contraseña-1-100.png"),
  dni: require("./icons8-tarjeta-de-empleado-100.png"),
};

export const _loadFontAsync = async (): Promise<void> => {
  await Font.loadAsync(customFonts);
};
