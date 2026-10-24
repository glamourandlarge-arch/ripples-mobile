import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PropertyCard } from "@/components/home/property-card";
import { Icon } from "@/components/icon";
import { properties } from "@/data/properties";

const ink = "#0B1F1E";
const muted = "#8A9393";
const field = "#F4F5F5";
const brand = "#062528";

const feeds = ["For you", "Properties", "Creators"] as const;
type Feed = (typeof feeds)[number];

const avatar = require("../../../assets/home/avatar.jpg");

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [feed, setFeed] = useState<Feed>("For you");

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change location, currently Lagos, Nigeria"
          style={styles.location}
        >
          <Icon
            name={{ ios: "mappin.circle.fill", material: "location_on" }}
            size={22}
            color="#E5484D"
          />
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <View style={styles.locationValue}>
              <Text style={styles.city}>Lagos, Nigeria</Text>
              <Icon
                name={{ ios: "chevron.down", material: "keyboard_arrow_down" }}
                size={16}
                color={ink}
              />
            </View>
          </View>
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={({ pressed }) => [styles.circle, pressed && styles.pressed]}
          >
            <Icon
              name={{ ios: "bell", material: "notifications" }}
              size={20}
              color={ink}
            />
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Profile">
            <Image source={avatar} contentFit="cover" style={styles.avatar} />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.search}>
          <Icon
            name={{ ios: "magnifyingglass", material: "search" }}
            size={18}
            color={muted}
          />
          <TextInput
            placeholder="Search properties, places, creators..."
            placeholderTextColor={muted}
            returnKeyType="search"
            style={styles.searchInput}
          />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filters"
          style={({ pressed }) => [
            styles.circle,
            styles.filter,
            pressed && styles.pressed,
          ]}
        >
          <Icon
            name={{ ios: "line.3.horizontal.decrease", material: "tune" }}
            size={18}
            color={ink}
          />
        </Pressable>
      </View>

      <View style={styles.chips}>
        {feeds.map((item) => {
          const selected = item === feed;
          return (
            <Pressable
              key={item}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => setFeed(item)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text
                style={[styles.chipText, selected && styles.chipTextSelected]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PropertyCard property={item} />}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.feed,
          { paddingBottom: insets.bottom + 110 },
        ]}
      />
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationLabel: {
    color: muted,
    fontSize: 11,
  },
  locationValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },
  city: {
    color: ink,
    fontSize: 16,
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: field,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F7C948",
  },
  pressed: {
    opacity: 0.75,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 18,
    paddingHorizontal: 16,
  },
  search: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: field,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: ink,
    fontSize: 14,
  },
  filter: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  chips: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  chip: {
    height: 34,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: field,
  },
  chipSelected: {
    backgroundColor: brand,
  },
  chipText: {
    color: ink,
    fontSize: 13,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  feed: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  separator: {
    height: 14,
  },
});
