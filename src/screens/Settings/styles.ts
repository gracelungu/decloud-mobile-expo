import { ScaledSheet } from "react-native-size-matters";
import colors from "../../styles/colors";

export default ScaledSheet.create({
  container: {
    backgroundColor: colors.lightGray,
  },
  title: {
    fontSize: "18@s",
    fontWeight: "500",
    paddingRight: "15@s",
    paddingLeft: "15@s",
    paddingBottom: "25@s",
  },
  itemContainer: {
    padding: "15@s",
    backgroundColor: colors.white,
    marginBottom: "10@s",
  },
  itemTitle: {
    fontSize: "19@s",
    fontWeight: "400",
    paddingBottom: "8@s",
  },
  itemSubContainer: {
    flexDirection: "row",
    paddingBottom: "5@s",
    paddingTop: "5@s",
    alignItems: "center",
  },
  itemSubtitle: {
    fontSize: "15@s",
    fontWeight: "300",
    paddingLeft: "5@s",
  },
  itemButtonText: {
    fontSize: "13@s",
    fontWeight: "700",
    paddingBottom: "5@s",
    marginTop: "25@s",
    color: colors.primary,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "15@s",
  },
  lowerText: {
    fontSize: "13@s",
    fontWeight: "300",
    paddingTop: "5@s",
    paddingBottom: "5@s",
  },
  switch: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
  action: {
    backgroundColor: "#aaa",
  },
  actionText: {
    textAlign: "center",
    color: colors.white,
  },
  input: {
    height: "40@s",
    backgroundColor: colors.lightGray,
    fontSize: "15@s",
    fontWeight: "300",
    marginBottom: "30@s",
    marginTop: "20@s",
    padding: "10@s",
  },
});
