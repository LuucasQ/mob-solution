import ResetPassword from '@/api/services/ResetPassword'
import Button from '@/components/button'
import Input from '@/components/input'
import { ResetPasswordType } from '@/types/recovery'
import { MaterialIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, Text, View } from 'react-native'
import * as Yup from 'yup'

export default function RecoveryPassword(){

  const { push, back } = useRouter()

  const [ loading, setLoading ] = useState(false)
 
  
  const methods = useForm<ResetPasswordType>({
    resolver: yupResolver(Yup.object({
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      tokenRecuperarSenha: Yup.string().required('Obrigatório'),
      novaSenha: Yup.string().trim().required('Obrigatório').test('validatePassword', 'Senha inválida', (value) => value.length >= 8 && /\d/.test(value) && /[a-z]/i.test(value) && /\W|_/.test(value)),
    })),
    defaultValues: {
      email: "",
      tokenRecuperarSenha: "",
      novaSenha: "",
    }
  })
  
  const { handleSubmit, watch, setValue } = methods

  const getInfoAsyncStorage = async () => {
    const email = await AsyncStorage.getItem('email-code') ?? ''
    const code = await AsyncStorage.getItem('code') ?? ''

    setValue('email', email)
    setValue('tokenRecuperarSenha', code)
  }

  useEffect(() => {
    getInfoAsyncStorage()
  }, [])

  const onSubmit = async (data: ResetPasswordType) => {
    setLoading(true)
    
    try {
      const response = await ResetPassword(data)
      
      if(response.erro){
        setLoading(false)
        Alert.alert(response.mensagem)
      }else {
        Alert.alert(response.mensagem.replace('+', ' '))
        push('recoveryPassword/resetSuccess')
      }
    }catch(err){
      setLoading(false)
      Alert.alert(String(err))
    }
  }

  const requirements = [
    { label: "Ser diferente da senha anterior", valid: true },
    { label: "Conter pelo menos 8 caracteres", valid: watch('novaSenha').length >= 8 },
    { label: "Conter pelo menos um número", valid: /\d/.test(watch('novaSenha')) },
    { label: "Conter pelo menos uma letra", valid: /[a-z]/i.test(watch('novaSenha'))},
    { label: "Conter pelo menos um caractere especial (!@#$%^&*)", valid: /\W|_/.test(watch('novaSenha')) },
  ]

  return (
    <View className='flex-1 p-4'>
      <View className='flex flex-row items-center justify-between px-4 m-4 w-2/3'>
        <MaterialIcons name="arrow-back-ios" onPress={() => back()}/>
        <Text className='text-lg font-semibold text-center'>Esqueci a senha</Text>
      </View>

      <Text className='text-2xl font-semibold mt-4 mb-2'>
        Redefina sua senha
      </Text>

      <Text className='text-base font-normal mt-1 mb-4 text-gray-600'>
        Sua nova senha deve ser diferente de senhas utilizadas previamente
      </Text>

      <FormProvider {...methods}>
        <View className='flex-1 flex-col justify-between'>
          <View>
            <Input
              name="novaSenha"
              label=''
              placeholder='Insira sua nova senha'
              icon="lock-outline"
              secureTextEntry
            />

            <Text className='mt-4 mb-2'>Pré-requisitos</Text>
            {requirements.map((requirement) => (
              <View className='flex flex-row items-center'>
                <MaterialIcons name={requirement.valid ? 'check-circle-outline' : 'cancel'} color={requirement.valid ? 'green' : 'red'} size={20} />
                <Text className={`text-sm font-normal ml-1 ${requirement.valid ? 'text-green-600' : 'text-red-500'}`}>{requirement.label}</Text>
              </View>
            ))}
         </View>

          <Button 
            title='Redefinir senha' 
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