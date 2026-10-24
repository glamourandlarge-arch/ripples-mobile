import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  TabList,
  type TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  type TabTriggerSlotProps,
} from "expo-router/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon, type IconName } from "@/components/icon";

const ink = "#0B1F1E";
const muted = "#6E7878";
const brand = "#062528";

export default function TabsLayout() {
  return (
    <Tabs style={styles.root}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <TabBar>
          <TabTrigger name="home" href="/home" asChild>
            <TabButton
              label="Home"
              icon={{ ios: "house.fill", material: "home" }}
            />
          </TabTrigger>
          <TabTrigger name="search" href="/search" asChild>
            <TabButton
              label="Search"
              icon={{ ios: "magnifyingglass", material: "search" }}
            />
          </TabTrigger>
          <View style={styles.createSlot}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create"
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.pressed,
              ]}
            >
              <Icon
                name={{ ios: "plus", material: "add" }}
                size={26}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
          <TabTrigger name="saved" href="/saved" asChild>
            <TabButton
              label="Saved"
              icon={{ ios: "bookmark", material: "bookmark" }}
            />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton
              label="Profile"
              icon={{ ios: "person", material: "person" }}
            />
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}

function TabBar({ style, children, ...props }: TabListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        style,
        styles.bar,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
    >
      {children}
    </View>
  );
}

type TabButtonProps = Omit<TabTriggerSlotProps, "ref"> & {
  label: string;
  icon: IconName;
};

function TabButton({ label, icon, isFocused, ...props }: TabButtonProps) {
  const color = isFocused ? ink : muted;

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
    >
      <Icon name={icon} size={24} color={color} />
      <Text style={[styles.tabLabel, { color }, isFocused && styles.focused]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slot: {
    flex: 1,
  },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "rgba(246, 247, 247, 0.97)",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  focused: {
    fontWeight: "700",
  },
  createSlot: {
    flex: 1,
    alignItems: "center",
  },
  createButton: {
    width: 68,
    height: 68,
    marginTop: -30,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    backgroundColor: brand,
  },
  pressed: {
    opacity: 0.8,
  },
});
