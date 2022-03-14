import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { ROOT_URL } from "../axios";
import RNFetchBlob from "rn-fetch-blob";
import { PermissionsAndroid } from "react-native";

export const downloadFile = async (uri: string): Promise<void> => {
  const fileUri: string = `${FileSystem.documentDirectory}/manual.pdf`;
  const downloadedFile = await FileSystem.downloadAsync(uri, fileUri).then(
    () => {
      console.log(fileUri);
    }
  );
};
