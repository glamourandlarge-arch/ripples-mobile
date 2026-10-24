import type { ColorValue, StyleProp, ViewStyle } from "react-native";
import { SymbolView, type SymbolViewProps } from "expo-symbols";

type SymbolName = Extract<SymbolViewProps["name"], { ios?: unknown }>;

export type IconName = {
  ios: NonNullable<SymbolName["ios"]>;
  material: NonNullable<SymbolName["android"]>;
};

type IconProps = {
  name: IconName;
  size?: number;
  color: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export function Icon({ name, size = 22, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: name.ios, android: name.material, web: name.material }}
      size={size}
      tintColor={color}
      style={style}
    />
  );
}
