import Login from '@/api/services/Login'
import Button from '@/components/button'
import Input from '@/components/input'
import { LoginType } from '@/types/login'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, Text, View } from 'react-native'
import * as Yup from 'yup'

export default function Home(){
  const [ loading, setLoading ] = useState(false)
  const { push } = useRouter()

  const methods = useForm<LoginType>({
    resolver: yupResolver(Yup.object({
      login: Yup.string().email('Email inválido').required('Obrigatório'),
      senha: Yup.string().required('Obrigatório'),
    })),
    defaultValues: {
      login: "",
      senha: ""
    }
  })

  const { handleSubmit, watch, setValue } = methods

  const onSubmit = async (data: LoginType) => {
    setLoading(true)
    
    try {
      const response = await Login(data)

      if(response.error && response.mensagem){
        Alert.alert(response.mensagem.replaceAll('+', ' '))
      }else {
        await AsyncStorage.setItem('idUser', '8')
        Alert.alert(`Bem vindo, ${response.nome ? response.nome.replaceAll('+', ' ') : ''}!`)
        push('home')
      }

      setLoading(false)
    }catch (err){
      Alert.alert(String(err))
      setLoading(false)
    }
  }

  const verifyIduser = async () => {
    const id = await AsyncStorage.getItem('idUser') ?? null

    if(id){
      push('home')
    }
  }


  useEffect(() => {
    verifyIduser()
  }, [])

  return (
    <View className='flex-1 p-4'>
      <View className='items-center px-4 m-4'>
        <Text className='text-lg font-semibold'>Login</Text>
      </View>

      <Text className='text-2xl font-semibold mt-4 mb-2'>Bem vindo(a) de volta!</Text>

      <FormProvider {...methods}>
        <View>
          <Input
            name="login"
            label='Email'
            placeholder='Email'
            icon="mail-outline"
          />
        </View>

        <View className='mt-2 mb-8'>
          <Input
            name="senha"
            label='Senha'
            placeholder='Senha'
            icon="lock-outline"
            secureTextEntry
          />
        </View>


        <View className='mb-2'>
          <Button 
            title='Entrar' 
            variant="contained" 
            onPress={handleSubmit(onSubmit)}
            icon={loading ? 'pending' : undefined}
            loading={loading}
          />
        </View>

          <Button 
            title='Esqueci a senha' 
            variant="text" 
            color="text-black"
            onPress={() => push('recoveryPassword')}
          />
        </FormProvider>
    </View>
  )
}