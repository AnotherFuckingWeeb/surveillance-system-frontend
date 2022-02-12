import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontFamily: "OpenSans-Regular",
    fontSize: 34,
    fontWeight: "bold",
    color: "#23396F",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    color: "#28282B",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
