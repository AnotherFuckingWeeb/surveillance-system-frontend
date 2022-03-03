import * as Font from "expo-font";
import { ROOT_URL } from "../axios";

const customFonts = {
  "OpenSans-Regular": `${ROOT_URL}/public/fonts/OpenSans-Regular.ttf`,
  "OpenSans-Bold": `${ROOT_URL}/public/fonts/OpenSans-Bold.ttf`,
  "OpenSans-Light": `${ROOT_URL}/public/fonts/OpenSans-Light.ttf`,
  "OpenSans-LightItalic": `${ROOT_URL}/public/fonts/OpenSans-LightItalic.ttf`,
  "OpenSans-Italic": `${ROOT_URL}/public/fonts/OpenSans-Italic.ttf`,
  "OpenSans-SemiBold": `${ROOT_URL}/public/fonts/OpenSans-SemiBold.ttf`,
  "OpenSans-SemiBoldItalic": `${ROOT_URL}/public/fonts/OpenSans-SemiBoldItalic.ttf`,
  "OpenSans-Medium": `${ROOT_URL}/public/fonts/OpenSans-Medium.ttf`,
  "OpenSans-MediumItalic": `${ROOT_URL}/public/fonts/OpenSans-MediumItalic.ttf`,
  "OpenSans-ExtraBold": `${ROOT_URL}/public/fonts/OpenSans-ExtraBold.ttf`,
  "OpenSans-ExtraBoldItalic": `${ROOT_URL}/public/fonts/OpenSans-ExtraBoldItalic.ttf`,
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
