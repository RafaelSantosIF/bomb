import { SafeAreaView } from "react-native-safe-area-context";
import ListLib from "./(tabs)/listLib";

export default function Index() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: "#A3E635" }}
    >
      <ListLib />
    </SafeAreaView>
  );
}
