import { ScaledSheet } from "react-native-size-matters";
import { VH } from "../../styles/size";

export default ScaledSheet.create({
  container: {
    height: VH(65),
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
  },
  text: {
    fontSize: "18@s",
    fontWeight: "400",
    marginTop: "25@s",
    marginBottom: "25@s",
    textAlign: "center",
  },
});
