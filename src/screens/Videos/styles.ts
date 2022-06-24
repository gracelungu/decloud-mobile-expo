import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    width: "100%",
    paddingRight: "15@s",
    paddingLeft: "15@s",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  title: {
    paddingTop: "60@s",
    fontSize: "30@s",
    fontWeight: "600",
    paddingBottom: "3@s",
  },
  subtitle: {
    fontSize: "15@s",
    fontWeight: "300",
    paddingBottom: "5@s",
  },
});
