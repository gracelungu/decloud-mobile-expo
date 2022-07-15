import { ScaledSheet } from "react-native-size-matters";
import colors from "../../styles/colors";

export default ScaledSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: "90%",
    padding: "20@s",
    backgroundColor: colors.white,
    borderRadius: "5@s",
  },
  title: {
    fontSize: "20@s",
    fontWeight: "500",
    marginBottom: "10@s",
  },
  text: {
    fontSize: "16@s",
    fontWeight: "400",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonText: {
    fontSize: "16@s",
    fontWeight: "500",
  },
});
