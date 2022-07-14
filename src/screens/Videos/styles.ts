import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "5@s",
    paddingTop: "15@s",
  },
  container: {
    width: "100%",
    paddingRight: "15@s",
    paddingLeft: "15@s",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: "30@s",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "13@s",
    fontWeight: "300",
    paddingBottom: "5@s",
  },
});
