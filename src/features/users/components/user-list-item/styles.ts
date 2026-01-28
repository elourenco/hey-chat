import { Colors } from "@app/theme/colors";
import { horizontalScale, verticalScale } from "@app/theme/scaling";
import { StyleSheet } from "react-native";

export const ITEM_HEIGHT = verticalScale(72);
const AVATAR_SIZE = horizontalScale(44);
const STATUS_DOT_SIZE = horizontalScale(8);

export const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
    paddingHorizontal: horizontalScale(12),
    justifyContent: 'center',
  },
  containerPressed: {
    backgroundColor: Colors.gray1Opacity90,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.primaryLighter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: STATUS_DOT_SIZE,
    height: STATUS_DOT_SIZE,
    borderRadius: STATUS_DOT_SIZE / 2,
  },
  statusDotOnline: {
    backgroundColor: Colors.greenBase,
  },
  statusDotOffline: {
    backgroundColor: Colors.gray3,
  },
});
