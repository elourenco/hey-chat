import { Dimensions, PixelRatio } from 'react-native';

// Dimensões de referência (iPhone 11/12/13/14 base ~375x812)
const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const defaultScale = (size: number, based = 'height') => {
  const wscale = SCREEN_WIDTH / GUIDELINE_BASE_WIDTH;
  const hscale = SCREEN_HEIGHT / GUIDELINE_BASE_HEIGHT;

  const newSize = based === 'height' ? size * hscale : size * wscale;
  return Number(PixelRatio.roundToNearestPixel(newSize).toPrecision(2));
};

const horizontalScale = (size: number, based = 'width') => {
  return defaultScale(size, based);
};

const verticalScale = (size: number, based = 'height') => {
  return defaultScale(size, based);
};

type Percentage = string;

const widthPercentageToDP = (widthPercent: Percentage) => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * Number.parseFloat(widthPercent)) / 100);
};

const heightPercentageToDP = (heightPercent: Percentage) => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * Number.parseFloat(heightPercent)) / 100);
};

const normalize = (size: number, based = 'width') => {
  return defaultScale(size, based);
};
const fontScale = (size: number, factor = 0.5) =>
  Number((size + (horizontalScale(size) - size) * factor).toPrecision(2));

export {
  horizontalScale,
  verticalScale,
  fontScale,
  normalize,
  widthPercentageToDP,
  heightPercentageToDP,
};
