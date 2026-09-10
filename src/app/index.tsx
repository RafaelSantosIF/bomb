import { SafeAreaView } from "react-native-safe-area-context";
import List from "./(tabs)/buyList";

export default function Index() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: "#A3E635" }}
    >
      <List />
    </SafeAreaView>
  );
}
