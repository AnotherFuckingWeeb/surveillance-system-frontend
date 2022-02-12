import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  imageContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    color: "#23396F",
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
  },
  descriptionContainer: {
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "OpenSans-Regular",
  },
});
