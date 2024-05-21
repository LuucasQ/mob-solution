import "@/styles/global.css";
import { Slot } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from "react-native-safe-area-context";

export default function Layout(){
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar style="dark"/>
        <Slot />
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
