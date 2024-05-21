import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonProps = PressableProps & {
  title: string
  variant: 'contained' | 'text'
  icon?: keyof typeof MaterialIcons.glyphMap
  loading?: boolean
  align?: 'items-start' | 'items-end' | 'items-center' | 'items-baseline' | 'items-stretch'
  justify?: 'justify-normal' | 'justify-start' | 'justify-end' | 'justify-center' | 'justify-between' | 'justify-around' | 'justify-evenly' | 'justify-stretch' 
  color?: string
}

export default function Button({ title, variant, icon, loading, align, justify, color, ...props }: ButtonProps){
  return (
    <Pressable
      className={`flex-row ${align ?? 'items-center'} ${justify ?? 'justify-center'} disabled:bg-gray-500 ${variant === 'contained' ? 'p-3 bg-sky-600 rounded' : 'p-0'}`}
      disabled={loading}
      {...props}
    >
      {icon && (
        <MaterialIcons name={icon} size={21} />
      )}
      
      {!loading && (
        <Text className={variant === 'contained' ? `${color ?? 'text-white'} text-base font-semibold` : `${color ?? 'text-sky-600'} text-base font-semibold`}>{title}</Text>
      )}
    </Pressable>
  )
}