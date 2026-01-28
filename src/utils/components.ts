import type { StyleProp, ViewStyle } from 'react-native';

type Map = { [key: string]: { [key: string]: StyleProp<ViewStyle> } };

export const JustifyMap: Map = {
  vstack: {
    leading: { justifyContent: 'flex-start' },
    center: { justifyContent: 'center' },
    trailing: { justifyContent: 'flex-end' },
    'space-between': { justifyContent: 'space-between' },
    'space-around': { justifyContent: 'space-around' },
    'space-evenly': { justifyContent: 'space-evenly' },
  },
  hstack: {
    leading: { justifyContent: 'flex-start' },
    center: { justifyContent: 'center' },
    trailing: { justifyContent: 'flex-end' },
    'space-between': { justifyContent: 'space-between' },
    'space-around': { justifyContent: 'space-around' },
    'space-evenly': { justifyContent: 'space-evenly' },
  },
} as const;

export const AlignmentMap: Map = {
  vstack: {
    leading: { alignItems: 'flex-start' },
    center: { alignItems: 'center' },
    trailing: { alignItems: 'flex-end' },
  },
  hstack: {
    top: { alignItems: 'flex-start' },
    center: { alignItems: 'center' },
    bottom: { alignItems: 'flex-end' },
  },
  zstack: {
    center: { justifyContent: 'center', alignItems: 'center' },
    leading: { justifyContent: 'center', alignItems: 'flex-start' },
    trailing: { justifyContent: 'center', alignItems: 'flex-end' },
    top: { justifyContent: 'flex-start', alignItems: 'center' },
    bottom: { justifyContent: 'flex-end', alignItems: 'center' },
    topLeading: { justifyContent: 'flex-start', alignItems: 'flex-start' },
    topTrailing: { justifyContent: 'flex-start', alignItems: 'flex-end' },
    bottomLeading: { justifyContent: 'flex-end', alignItems: 'flex-start' },
    bottomTrailing: { justifyContent: 'flex-end', alignItems: 'flex-end' },
  },
} as const;
