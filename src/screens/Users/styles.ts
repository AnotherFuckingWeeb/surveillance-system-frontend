import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#23396F",
    paddingVertical: 45,
    paddingHorizontal: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    marginTop: 20,
    borderRadius: 4,
    margin: 5,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    fontSize: 18,
    color: "#23396F",
    fontWeight: "800",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: "#808080",
  },
  elevation: {
    elevation: 20,
    shadowColor: "black",
  },
});
