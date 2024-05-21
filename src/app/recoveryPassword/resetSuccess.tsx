import Button from "@/components/button";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function ResetSuccess(){
  const { push } = useRouter()

  const returnLogin = async () => {
    await AsyncStorage.removeItem('code')
    await AsyncStorage.removeItem('email-code')
    push('/')
  }

  return (
    <View className="flex-1 flex-col p-4 bg-cyan-50">
      <View className="flex-1 flex-col items-center justify-center">
        <MaterialIcons name="check-circle" size={148} color="rgba(87, 182, 235, 1)" />
        <Text className="text-3xl font-semibold">Senha redefinida!</Text>
        <Text className="text-base font-normal">Sua senha foi redefinida com sucesso.</Text>
        <Text className="text-base font-normal">Clique abaixo para fazer o login</Text>

      </View>
      <Button 
        title="Login"
        variant="contained"
        onPress={returnLogin}
      />
    </View>
  )
}