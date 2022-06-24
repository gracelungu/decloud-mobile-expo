import { ScaledSheet } from "react-native-size-matters";
import colors from "../../styles/colors";

export default ScaledSheet.create({
  container: {
    position: "absolute",
    right: "10@s",
    bottom: "20@s",
    justifyContent: "center",
    alignItems: "center",
    width: "50@s",
    height: "50@s",
    borderRadius: "50@s",
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: "50@s",
  },
});
