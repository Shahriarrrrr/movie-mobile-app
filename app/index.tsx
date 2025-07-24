import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-dark-200 font-bold">MOOOVIE!</Text>
      <Link href="/onboarding">Onboarding</Link>
      <Link className="text-white text-2xl bg-slate-600" href="/movie/avengers">Avenger Movie</Link>
    </View>

  );
}
