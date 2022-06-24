import { ScaledSheet } from "react-native-size-matters";
import colors from "../../styles/colors";

export default ScaledSheet.create({
  container: {
    padding: "15@s",
    paddingLeft: "25@s",
    paddingRight: "25@s",
    borderRadius: "8@s",
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  title: {
    fontSize: "15@s",
    fontWeight: "500",
    color: colors.white,
  },
});
