import { useEffect, useRef, useSyncExternalStore } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const background = "#062528";
const word = "Ripples";

const subscribe = () => () => {};

export default function WelcomeScreen() {
  const booted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const moved = useRef(false);

  useEffect(() => {
    if (!booted || moved.current) {
      return;
    }

    const timeout = setTimeout(() => {
      moved.current = true;
      router.replace("/discover");
    }, 1600);

    return () => clearTimeout(timeout);
  }, [booted]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.stage}>
        {booted ? (
          <>
            <Ripple delay={180} />
            <Ripple delay={460} />
            <View
              accessibilityRole="header"
              accessibilityLabel={word}
              style={styles.word}
            >
              {word.split("").map((letter, index) => (
                <WrittenLetter
                  key={`${letter}-${index}`}
                  letter={letter}
                  index={index}
                />
              ))}
            </View>
          </>
        ) : (
          <Text accessibilityRole="header" style={[styles.title, styles.hidden]}>
            {word}
          </Text>
        )}
      </View>
    </View>
  );
}

function Ripple({ delay }: { delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 1600, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.12, 1], [0, 0.55, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.35, 2.6]) }],
  }));

  return <Animated.View pointerEvents="none" style={[styles.ripple, style]} />;
}

function WrittenLetter({ letter, index }: { letter: string; index: number }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);
  const scale = useSharedValue(0.92);

  useEffect(() => {
    const delay = 320 + index * 60;
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 380, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 14, stiffness: 170, mass: 0.7 }),
    );
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 12, stiffness: 180, mass: 0.7 }),
    );
  }, [index, opacity, scale, translateY]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.Text accessible={false} style={[styles.title, style]}>
      {letter}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: background,
  },
  stage: {
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    position: "absolute",
    width: 148,
    height: 148,
    marginLeft: -74,
    marginTop: -74,
    left: "50%",
    top: "50%",
    borderRadius: 74,
    borderWidth: 1.5,
    borderColor: "rgba(214, 244, 242, 0.9)",
  },
  word: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  hidden: {
    opacity: 0,
  },
});
