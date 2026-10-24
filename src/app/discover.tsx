import { type ComponentRef, useRef } from "react";
import {
  type DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, type ImageSource } from "expo-image";
import { BlurTargetView, BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const chair = require("../../assets/discover/chair.jpg") as ImageSource;
const block = require("../../assets/discover/block.jpg") as ImageSource;
const windows = require("../../assets/discover/windows.jpg") as ImageSource;
const cottage = require("../../assets/discover/cottage.jpg") as ImageSource;
const villa = require("../../assets/discover/villa.jpg") as ImageSource;
const townhouse = require("../../assets/discover/townhouse.jpg") as ImageSource;

type Tile = {
  source: ImageSource;
  left: DimensionValue;
  width: DimensionValue;
  top: DimensionValue;
  height: DimensionValue;
};

const sideColumn = { width: "33.75%" } as const;
const leftColumn = { ...sideColumn, left: "-12%" } as const;
const centerColumn = { left: "24.35%", width: "51.3%" } as const;
const rightColumn = { ...sideColumn, left: "78.25%" } as const;

const tiles: Tile[] = [
  { source: chair, ...leftColumn, top: "-10%", height: "30.4%" },
  { source: cottage, ...leftColumn, top: "21.8%", height: "35.4%" },
  { source: townhouse, ...leftColumn, top: "58.6%", height: "40%" },
  { source: block, ...centerColumn, top: "-8%", height: "35.9%" },
  { source: villa, ...centerColumn, top: "29.3%", height: "28.1%" },
  { source: block, ...centerColumn, top: "58.8%", height: "40%" },
  { source: windows, ...rightColumn, top: "-10%", height: "30.4%" },
  { source: townhouse, ...rightColumn, top: "21.8%", height: "35.4%" },
  { source: cottage, ...rightColumn, top: "58.6%", height: "40%" },
];

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const collageRef = useRef<ComponentRef<typeof View> | null>(null);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <BlurTargetView ref={collageRef} style={StyleSheet.absoluteFill}>
        {tiles.map((tile, index) => (
          <View
            key={index}
            style={[
              styles.tile,
              {
                left: tile.left,
                width: tile.width,
                top: tile.top,
                height: tile.height,
              },
            ]}
          >
            <Image
              accessible={false}
              source={tile.source}
              contentFit="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>
        ))}
      </BlurTargetView>
      <BlurView
        blurTarget={collageRef}
        intensity={100}
        tint="dark"
        blurMethod="dimezisBlurViewSdk31Plus"
        style={styles.sheet}
      >
        <View style={styles.sheetTint} />
        <View
          style={[
            styles.sheetContent,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <Text style={styles.headline}>
            Discover properties beyond{"\n"}the listing.
          </Text>
          <Text style={styles.body}>
            Explore properties, discover content from creators,{"\n"}
            and arrange inspections with confidence.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get started"
            onPress={() => router.replace("/home")}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonLabel}>Get started</Text>
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#EBEBEB",
  },
  tile: {
    position: "absolute",
    overflow: "hidden",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#111111",
    backgroundColor: "#D9D9D9",
  },
  sheet: {
    position: "absolute",
    top: "58%",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: "#111111",
  },
  sheetTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(12, 12, 12, 0.32)",
  },
  sheetContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  headline: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "800",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  body: {
    marginTop: 12,
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  button: {
    height: 42,
    marginTop: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: "#14201F",
    fontSize: 15,
    fontWeight: "500",
  },
});
