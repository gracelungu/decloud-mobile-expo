import { ScaledSheet } from "react-native-size-matters";
import colors from "../../styles/colors";
import { VW } from "../../styles/size";

export default ScaledSheet.create({
  videoStyle: {
    width: VW(44),
    height: 150,
    marginTop: "15@s",
    backgroundColor: colors.white,
    resizeMode: "cover",
  },
});
