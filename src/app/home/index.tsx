import Tema, { ResponseTema } from "@/api/services/Tema";
import VisaoGeral, { ResponseVisaoGeral } from "@/api/services/VisaoGeral";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Animated, Pressable, ScrollView, Text, View } from "react-native";

import RNPickerSelect from 'react-native-picker-select';
import { Bar } from "react-native-progress";
import { SceneMap, TabView } from "react-native-tab-view";

export default function Home(){
  const [ picker, setPicker ] = useState('A_Z')
  const [ dataGeral, setDataGeral ] = useState<ResponseVisaoGeral>()
  const [ dataTema, setDataTema ] = useState<ResponseTema>()
  const [ id, setId ] = useState<null | string>(null)
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'geral', title: 'Visão geral' },
    { key: 'tema', title: 'Por tema' },
  ];

  const fetchIduser = async () => {
    const id = await AsyncStorage.getItem('idUser') ?? null

    setId(id)
  }

  useEffect(() => {
    fetchIduser()
  }, [])

  const fetchGeral = async () => {
   try {
    const response = await VisaoGeral({ id: id ?? '' })

    if(response.error){
      Alert.alert(response.mensagem?.replace('+', ' ') ?? '')
    }else {
      setDataGeral(response)
    }
   }catch (err){
    Alert.alert(String(err))
   }
  }

  const fetchTema = async () => {
    try{
      const response = await Tema({ idUsuario: id ?? '', ordenacao: picker as "A_Z" | "Z_A" | "TEMA_MAIS_DOMINADO" | "TEMA_MENOS_DOMINADO" | "TEMA_MAIS_RESPONDIDO" ?? 'A_Z' })

      if(response){
        setDataTema(response)
      }
    }catch(err){
      Alert.alert(String(err))
    }
  }

  useEffect(() => {
    if(id){
      if(index === 0){
        fetchGeral()
      }else {
        fetchTema()
      }
    }
  }, [id, index, picker])


  const GeralRoute = () => (
    <ScrollView className="flex-1">
      {dataGeral && (
        <View className="bg-white p-4">
          <View className="flex flex-row items-center justify-between w-full mt-2 pb-3 border-b border-solid border-b-gray-200">
            <Text className="text-gray-600 text-sm font-normal">Total de questões respondidas</Text>
            <Text className="text-gray-900 text-sm font-semibold">{dataGeral.qtdRespondidas}</Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mt-2 pb-3 border-b border-solid border-b-gray-200">
            <Text className="text-gray-600 text-sm font-normal">Questões corretas</Text>
            <Text className="text-gray-900 text-sm font-semibold">{dataGeral.qtdAcertos}</Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mt-2 pb-3 border-b border-solid border-b-gray-200">
            <Text className="text-gray-600 text-sm font-normal">Média de acertos</Text>
            <Text className="text-gray-900 text-sm font-semibold">{(dataGeral.qtdAcertos / dataGeral.qtdRespondidas * 100).toFixed(0)}%</Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mt-2 pb-3 border-b border-solid border-b-gray-200">
            <Text className="text-gray-600 text-sm font-normal">Tema mais dominado</Text>
            <Text className="text-gray-900 text-sm font-semibold">{dataGeral.temaDominado.nome}</Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mt-2 pb-3 border-b border-solid border-b-gray-200">
            <Text className="text-gray-600 text-sm font-normal">Tema menos dominado</Text>
            <Text className="text-gray-900 text-sm font-semibold">{dataGeral.temaMenosDominado.nome}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );

  const TemaRoute = () => (
    <ScrollView className="flex-1 px-4 py-3">
      <View className="w-3/6 px-3 py-2 mb-3 mt-3 border border-gray-300 rounded">
        <RNPickerSelect
          placeholder={{}}
          value={picker}
          onValueChange={(value) => setPicker(value)}
          items={[
            {label: 'Ordem alfabética', value: "A_Z" },
            {label: 'Alfabética-invertida', value: "Z_A" },
            {label: 'Tema mais dominado', value: "TEMA_MAIS_DOMINADO" },
            {label: 'Tema menos dominado', value: "TEMA_MENOS_DOMINADO" },
            {label: 'Tema mais respondido', value: "TEMA_MAIS_RESPONDIDO"}
          ]}
          Icon={() => (
            <MaterialIcons name="arrow-back-ios" className="-rotate-90" />
          )}
        />
      </View>

      {dataTema && dataTema.listaEstatisticasTemas.map((lista) => (
          <View key={lista.tema.id} className="flex flex-col rounded px-4 py-3 border border-gray-300 mb-4">
          <Text>{lista.tema.nome.replaceAll('+', ' ')}</Text>

          <View className="mt-3 mb-3">
            <View className="flex flex-row items-center gap-2 mb-2">
              <Text className="text-gray-900 font-semibold text-base">{lista.qtdRespondidas}/{lista.qtdRespondidasGeral}</Text>
              <Text>total de questões respondidas</Text>
            </View>

            <View className="flex flex-row w-full">
              <Bar progress={Number.isNaN(Number((lista.qtdRespondidas / lista.qtdRespondidasGeral).toFixed(2))) ? 0 : Number((lista.qtdRespondidas / lista.qtdRespondidasGeral).toFixed(2))} height={10} color="rgba(9, 90, 136, 1)" />
            </View>
            <View />
          </View>

          <View>
            <View className="flex flex-row items-center gap-2 mb-2">
              <Text className="text-gray-900 font-semibold text-base">{lista.qtdAcertos}/{lista.qtdAcertosGeral}</Text>
              <Text>respostas corretas</Text>
            </View>

            <View className="flex flex-row w-full">
              <Bar progress={Number.isNaN(Number((lista.qtdAcertos / lista.qtdAcertosGeral).toFixed(2))) ? 0 : Number((lista.qtdAcertos / lista.qtdAcertosGeral).toFixed(2))} height={10} color="rgba(9, 90, 136, 1)" />
            </View>
            <View />
          </View>
        </View>
        )
      )}
    </ScrollView>
  );

  
  const renderScene = SceneMap({
    geral: GeralRoute,
    tema: TemaRoute,
  });


  return (
    <View className='flex-1'>
      <View className='items-center px-4 m-2'>
        <Text className='text-lg font-semibold'>Minhas estatísticas</Text>
      </View>

      <View className="flex-1">
        <TabView
          className="bg-white"
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <View key={props.navigationState.index} className="bg-white flex flex-row">
              {props.navigationState.routes.map((route, i) => {
                return (
                  <Pressable
                    key={route.title}
                    className={`items-center p-3 w-2/4 ${props.navigationState.index === i ? 'border-b-4 border-sky-800' : ''}`}
                    onPress={() => setIndex(i)}>
                    <Animated.Text className={`text-sky-800 text-base font-semibold ${props.navigationState.index === i ? 'text-sky-800' : 'text-gray-500'}`}>{route.title}</Animated.Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
      </View>
    </View>
  )
}