import * as Font from "expo-font";

const customFonts = {
  "OpenSans-Regular":
    "http://192.168.0.103:8080/public/fonts/OpenSans-Regular.ttf",
  "OpenSans-Bold": "http://192.168.0.103:8080/public/fonts/OpenSans-Bold.ttf",
  "OpenSans-Light": "http://192.168.0.103:8080/public/fonts/OpenSans-Light.ttf",
  "OpenSans-LightItalic":
    "http://192.168.0.103:8080/public/fonts/OpenSans-LightItalic.ttf",
  "OpenSans-Italic":
    "http://192.168.0.103:8080/public/fonts/OpenSans-Italic.ttf",
  "OpenSans-SemiBold":
    "http://192.168.0.103:8080/public/fonts/OpenSans-SemiBold.ttf",
  "OpenSans-SemiBoldItalic":
    "http://192.168.0.103:8080/public/fonts/OpenSans-SemiBoldItalic.ttf",
  "OpenSans-Medium":
    "http://192.168.0.103:8080/public/fonts/OpenSans-Medium.ttf",
  "OpenSans-MediumItalic":
    "http://192.168.0.103:8080/public/fonts/OpenSans-MediumItalic.ttf",
  "OpenSans-ExtraBold":
    "http://192.168.0.103:8080/public/fonts/OpenSans-ExtraBold.ttf",
  "OpenSans-ExtraBoldItalic":
    "http://192.168.0.103:8080/public/fonts/OpenSans-ExtraBoldItalic.ttf",
};

export const Images = {
  brandLogo: require("./NTN-Consultores-Corpoelec-logo-2.png"),
  logo: require("./NTN-Consultores-Corpoelec-logo-1024x226.png"),
  name: require("./icons8-nombre-100.png"),
  password: require("./icons8-contraseña-1-100.png"),
  dni: require("./icons8-tarjeta-de-empleado-100.png"),
  camera: require("./external-camera-smart-home-wanicon-lineal-color-wanicon.png"),
  user: require("./icons8-hombre-policía-100.png"),
  admin: require("./icons8-ingeniero-100.png"),
};

export const _loadFontAsync = async (): Promise<void> => {
  try {
    await Font.loadAsync(customFonts);
  } catch (error) {
    console.log("Error");
  }
};
