import SendCode from '@/api/services/SendCode'
import ValidateCodeEmail from '@/api/services/ValidateCode'
import Button from '@/components/button'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill } from 'react-native-confirmation-code-field'
import { styles } from './styles'

export default function RecoveryPassword(){
  const { push, back } = useRouter()
  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState({
    email: '',
    tokenRecuperarSenha: ''
  })
  const CELL_COUNT = 5
  const ref = useBlurOnFulfill({value: data.tokenRecuperarSenha, cellCount: CELL_COUNT});

  const getEmailAsyncStorage = async () => {
    const email = await AsyncStorage.getItem('email-code') ?? ''

    setData((prev) => ({...prev, email}))
  }

  useEffect(() => {
    getEmailAsyncStorage()
  }, [])

  const validateCode = async () => {
    try {
      const response = await ValidateCodeEmail(data)

      if(response.error){
        Alert.alert(response.mensagem)
      }else {
        await AsyncStorage.setItem('code', data.tokenRecuperarSenha)
        push('recoveryPassword/reset')
      }
    }catch(err){
      Alert.alert(String(err))
    }
  }

  useEffect(() => {
    if(data.tokenRecuperarSenha.length === 5){
      validateCode()
    }
  }, [data])

  const ResendCode = async () => {
    setLoading(true)
    
    try {
      const response = await SendCode({
        email: data.email,
      })
      
      if(!response.error){
        await AsyncStorage.setItem('email-code', data.email)
        Alert.alert("Código reenviado para o seu email.")
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

      <Text className='text-2xl font-semibold mt-4 mb-2'>Verifique o código</Text>

      <Text className='text-base font-normal mt-1 mb-4 text-gray-600'>
        Verifique o código que enviamos para o email {data.email.replace(/[a-z]{4}/i, '****')}
      </Text>

      <View>
        <View>
          <CodeField
            ref={ref}
            value={data.tokenRecuperarSenha}
            onChangeText={(text) => {
              setData((prev) => ({...prev, tokenRecuperarSenha: text}))
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>

        <View className='mt-4'>
          <Button
            title='Reenviar código' 
            variant="text"
            align='items-start'
            justify='justify-start'
            onPress={() => ResendCode()}
            icon={loading ? 'pending' : undefined}
            loading={loading}
          />
        </View>
      </View>
    </View>
  )
}