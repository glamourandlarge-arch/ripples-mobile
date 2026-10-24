import { Stack } from "expo-router";

const background = "#062528";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: { backgroundColor: background },
      }}
    />
  );
}
