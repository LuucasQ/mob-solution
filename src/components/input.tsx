import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View, type TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  name: string
  label?: string
  icon?: keyof typeof MaterialIcons.glyphMap
  children?: ReactNode
}

export default function Input({ name, label, icon, ...props }: InputProps){
  const { control } = useFormContext()

  return (
    <View>
      {label && label !== '' && (
        <Text className="text-sm font-medium text-zinc-700 mb-1">{label}</Text>
      )}

        <Controller 
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <View className={`flex flex-row items-start p-4 gap-2 border-solid border-2 rounded ${fieldState.error ? "border-red-500" : "border-zinc-300"}`}>
                {icon && (
                  <MaterialIcons name={icon} size={24} color="rgba(154, 164, 178, 1)" />
                )}
                <TextInput 
                  {...field}
                  {...props}
                  className="items-center font-normal text-base w-full text-zinc-500"
                  placeholderTextColor={"#697586"} 
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                />
              </View>
              {fieldState.error && (
                <Text className="text-sm font-medium text-red-500 mt-1">{fieldState.error.message}</Text>
              )}
            </View>
            )}
        />
    </View>
  )
}