import { type ComponentRef, useRef, useState } from "react";
import {
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { BlurTargetView, BlurView } from "expo-blur";

import { Icon, type IconName } from "@/components/icon";
import type { ListingType, Property } from "@/data/properties";

const badgeColors: Record<ListingType, { background: string; text: string }> = {
  Rent: { background: "#E4ECFF", text: "#3D63DD" },
  Sale: { background: "#EEE6FF", text: "#7B4FD6" },
};

export function PropertyCard({ property }: { property: Property }) {
  const photosRef = useRef<ComponentRef<typeof View> | null>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const badge = badgeColors[property.type];

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!width) return;
    const next = Math.round(event.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  return (
    <View style={styles.card} onLayout={onLayout}>
      <BlurTargetView ref={photosRef} style={StyleSheet.absoluteFill}>
        {width > 0 && (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={32}
          >
            {property.photos.map((photo, photoIndex) => (
              <Image
                key={photoIndex}
                source={photo}
                contentFit="cover"
                transition={200}
                style={{ width, height: "100%" }}
              />
            ))}
          </ScrollView>
        )}
      </BlurTargetView>

      <View style={styles.actions}>
        <RoundAction
          label="Share"
          icon={{ ios: "arrowshape.turn.up.right", material: "share" }}
        />
        <RoundAction
          label="More options"
          icon={{ ios: "ellipsis", material: "more_vert" }}
          rotate
        />
      </View>

      <View pointerEvents="none" style={styles.photoMeta}>
        <View style={styles.counter}>
          <Icon
            name={{ ios: "photo", material: "photo_library" }}
            size={11}
            color="#FFFFFF"
          />
          <Text style={styles.counterText}>
            {index + 1}/{property.photos.length}
          </Text>
        </View>
        <View style={styles.dots}>
          {property.photos.slice(0, 3).map((_, dotIndex) => (
            <View
              key={dotIndex}
              style={[
                styles.dot,
                dotIndex === Math.min(index, 2) && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <BlurView
        blurTarget={photosRef}
        intensity={60}
        tint="dark"
        blurMethod="dimezisBlurViewSdk31Plus"
        style={styles.details}
      >
        <View style={styles.detailsTint} />
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: badge.background }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>
              {property.type}
            </Text>
          </View>
          {property.verified && (
            <View style={[styles.badge, styles.verified]}>
              <Icon
                name={{ ios: "checkmark.circle.fill", material: "check_circle" }}
                size={15}
                color="#22B45A"
              />
              <Text style={styles.verifiedText}>Verified listing</Text>
            </View>
          )}
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {property.title}
        </Text>
        <Text numberOfLines={1} style={styles.summary}>
          {property.summary}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{property.price}</Text>
          <Text numberOfLines={1} style={styles.status}>
            {property.status}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}

function RoundAction({
  label,
  icon,
  rotate,
}: {
  label: string;
  icon: IconName;
  rotate?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={({ pressed }) => [styles.roundAction, pressed && styles.pressed]}
    >
      <Icon
        name={icon}
        size={15}
        color="#111111"
        style={rotate && process.env.EXPO_OS === "ios" ? styles.rotated : undefined}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1.2,
    overflow: "hidden",
    borderRadius: 24,
    backgroundColor: "#D9DEDD",
  },
  actions: {
    position: "absolute",
    top: 14,
    right: 14,
    flexDirection: "row",
    gap: 10,
  },
  roundAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  rotated: {
    transform: [{ rotate: "90deg" }],
  },
  pressed: {
    opacity: 0.8,
  },
  photoMeta: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: "43%",
    flexDirection: "row",
    alignItems: "center",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(17, 17, 17, 0.55)",
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
  },
  dots: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  dotActive: {
    backgroundColor: "#FFFFFF",
  },
  details: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 14,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  detailsTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(20, 22, 22, 0.42)",
  },
  badges: {
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    height: 24,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  verified: {
    backgroundColor: "#FFFFFF",
  },
  verifiedText: {
    color: "#111111",
    fontSize: 13,
    fontWeight: "500",
  },
  title: {
    marginTop: 9,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  summary: {
    marginTop: 4,
    color: "rgba(255, 255, 255, 0.62)",
    fontSize: 12,
  },
  footer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  status: {
    flexShrink: 1,
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 12,
  },
});
