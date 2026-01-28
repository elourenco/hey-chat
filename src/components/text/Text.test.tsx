import type React from 'react';
import type { TextStyle } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { Colors } from '../../app/theme/colors';
import { fontSizes } from '../../app/theme/typography';
import Text from './Text';

const flattenStyle = (style?: TextStyle | TextStyle[]) => {
  if (!style) {
    return {};
  }
  if (!Array.isArray(style)) {
    return style;
  }
  return style.reduce<TextStyle>((acc, item) => {
    if (!item) {
      return acc;
    }
    return { ...acc, ...item };
  }, {});
};

const renderText = (jsx: React.ReactElement) => {
  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(jsx);
  });
  return renderer!;
};

const getTextStyle = (renderer: ReactTestRenderer.ReactTestRenderer) => {
  const tree = renderer.toJSON();
  if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
    throw new Error('Expected a single Text node.');
  }
  return flattenStyle(tree.props?.style as TextStyle | TextStyle[] | undefined);
};

describe('Text', () => {
  it('renders children', () => {
    const renderer = renderText(<Text>Hello</Text>);
    const tree = renderer.toJSON();
    if (!tree || Array.isArray(tree) || typeof tree !== 'object') {
      throw new Error('Expected a single Text node.');
    }
    expect(tree.children).toEqual(['Hello']);
  });

  it('applies default color and font weight', () => {
    const renderer = renderText(<Text>Default</Text>);
    const style = getTextStyle(renderer);
    expect(style.color).toBe(Colors.gray9);
    expect(style.fontWeight).toBe('400');
  });

  it('applies provided size and color', () => {
    const renderer = renderText(
      <Text size="lg" color="primary">
        Styled
      </Text>,
    );
    const style = getTextStyle(renderer);
    expect(style.fontSize).toBe(fontSizes.lg);
    expect(style.color).toBe(Colors.primary);
  });

  it('applies capitalization when enabled', () => {
    const renderer = renderText(<Text capitalize>Hello</Text>);
    const style = getTextStyle(renderer);
    expect(style.textTransform).toBe('capitalize');
  });

  it.each([
    ['regular', '400'],
    ['medium', '500'],
    ['bold', '700'],
  ] as const)('maps type %s to fontWeight %s', (type, fontWeight) => {
    const renderer = renderText(<Text type={type}>Weight</Text>);
    const style = getTextStyle(renderer);
    expect(style.fontWeight).toBe(fontWeight);
  });
});
