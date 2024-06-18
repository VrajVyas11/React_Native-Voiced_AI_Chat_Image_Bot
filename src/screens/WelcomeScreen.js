import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation=useNavigation()
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
     <View className="space-y-2">
         <Text style={{fontSize:wp(10)}} className="text-center  font-bold text-gray-700">
            Transgression
            </Text>
            <Text style={{fontSize:wp(4)}} className="text-center tracking-wider text-gray-600 font-semibold">
                the Future is Here Prowered By AI
            </Text>
         </View>
         <View className="flex-row justify-center mt-10">
        <Image style={{width:wp(60),height:wp(60)}}  source={require("../../assets/images/chat1.png")}/>
         </View>
         <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
         <TouchableOpacity
         onPress={()=>navigation.navigate('Home')}
          className="bg-emerald-600  py-4 px-2 rounded-xl">
            <Text className="text-center font-bold text-xl text-white">Start Search Chat</Text>
         </TouchableOpacity>
         <TouchableOpacity
         onPress={()=>navigation.navigate('Image')}
          className="bg-emerald-600 ml-5  py-4 px-2 rounded-xl">
            <Text className="text-center font-bold text-xl text-white">Generate Images</Text>
         </TouchableOpacity>
         </View></View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})