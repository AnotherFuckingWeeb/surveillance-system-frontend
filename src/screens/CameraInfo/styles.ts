import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    color: "#23396F",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});
