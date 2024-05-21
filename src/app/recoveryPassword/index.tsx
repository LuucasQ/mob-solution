import SendCode from '@/api/services/SendCode'
import Button from '@/components/button'
import Input from '@/components/input'
import { RecoveryPasswordType } from '@/types/recovery'
import { MaterialIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, Text, View } from 'react-native'
import * as Yup from 'yup'

export default function RecoveryPassword(){

  const { push, back } = useRouter()

  const [ loading, setLoading ] = useState(false)
 
  
  const methods = useForm<RecoveryPasswordType>({
    resolver: yupResolver(Yup.object({
      email: Yup.string().email('Email inválido').required('Obrigatório'),
    })),
    defaultValues: {
      email: "",
    }
  })
  
  const { handleSubmit, watch } = methods

  const onSubmit = async (data: RecoveryPasswordType) => {
    setLoading(true)
    
    try {
      const response = await SendCode({
        email: data.email,
      })
      
      if(!response.error){
        await AsyncStorage.setItem('email-code', data.email)
        push('recoveryPassword/code')
      }else {
        Alert.alert(response.mensagem.replaceAll('+', ' '))
        setLoading(false)
      }
    }catch (err) {
      setLoading(false)
      Alert.alert(String(err))
    }
  }

  return (
    <View className='flex-1 p-4'>
      <View className='flex flex-row items-center justify-between px-4 m-4 w-2/3'>
        <MaterialIcons name="arrow-back-ios" onPress={() => back()}/>
        <Text className='text-lg font-semibold text-center'>Esqueci a senha</Text>
      </View>

      <Text className='text-2xl font-semibold mt-4 mb-2'>
        Esqueceu a senha?
      </Text>

      <Text className='text-base font-normal mt-1 mb-4 text-gray-600'>
        Insira seu e-mail para enviarmos um código de redefinição de senha
      </Text>

      <FormProvider {...methods}>
        <View>
           <Input
            name="email"
            label=''
            placeholder='Insira seu email'
            icon="mail-outline"
          />
        </View>

        <View className='mt-4'>
          <Button 
            title='Enviar código' 
            variant="contained" 
            onPress={handleSubmit(onSubmit)}
            icon={loading ? 'pending' : undefined}
            loading={loading}
          />
        </View>
      </FormProvider>
    </View>
  )
}