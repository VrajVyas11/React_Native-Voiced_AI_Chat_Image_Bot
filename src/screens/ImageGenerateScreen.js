import { Alert, Image, TextInput, Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/Features';
// import { dummyMessages } from '../constants';
// import Voice from "@react-native-community/voice"
// import { apicall } from '../api/OpenAi';
import axios from 'axios';
import { apiKey } from '../constants';

// Global buffer requirement
global.Buffer = require('buffer').Buffer;

async function query(QueryData) {
    try {
        const response = await axios({
            url: 'https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: QueryData,
            responseType: 'arraybuffer',
        });

        const mimeType = response.headers['content-type'];
        const result = response.data;

        const base64data = Buffer.from(result, 'binary').toString('base64');
        const img = `data:${mimeType};base64,${base64data}`;

        return img;
    } catch (error) {
        console.error('Error making the request:', error);
        throw error;
    }
}

const ImageGenerationScreen = () => {
    const [inputText, setInputText] = useState('');
    const [imageData, setImageData] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([])


    const ScrollViewRef = useRef()

    const handleButtonClick = async () => {

        setLoading(true);
        try {
            if (inputText.trim().length > 0) {
                setMessages(prev => [...prev, { role: "user", content: inputText }])
                const data = { inputs: inputText };
                const response = await query(data);
                // Handle the image response
                console.log('Image Response:', response);
                setImageData(response);
                setMessages(prev => [...prev, { role: "assistant", content: response }])
                setInputText('')
                setLoading(false)
            }
            else {
                Alert.alert(" please enter a prompt")
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View className=" flex-1 bg-white py-4">
                <SafeAreaView className="flex-1 flex mx-5">
                <View className="flex-row justify-center">
                       <View className=" bg-slate-200 rounded-full">
                        <Image style={{ width: wp(25), height: wp(25) }} source={require("../../assets/images/chat1.png")} />
                    </View>
                    </View>
                    {
                        messages.length > 0 ? (
                            <View className="space-y-2 flex-1">
                                <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
                                    Assistant
                                </Text>
                                <View
                                    style={{ height: hp(58) }}
                                    className="bg-neutral-200 rounded-3xl p-4"
                                >
                                    <ScrollView
                                        ref={ScrollViewRef}
                                        bounces={false}
                                        className="space-y-4"
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {
                                            messages.map((message, index) => {
                                                if (message.role == "assistant") {
                                                    return (
                                                        <View key={index} className="flex-row justify-start">
                                                            <View
                                                                className="p-2 flex bg-emerald-100  rounded-2xl rounded-tl-none ">
                                                                <Image
                                                                    source={{ uri: message.content }}
                                                                    className="rounded-2xl"
                                                                    resizeMode='contain'
                                                                    style={{ height: wp(60), width: wp(60) }}
                                                                />
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <View key={index} className="flex-row justify-end">
                                                            <View style={{ width: wp(70) }}
                                                                className="bg-white p-2 rounded-xl rounded-tr-none ">
                                                                <Text >{message.content}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }

                                            })
                                        }
                                    </ScrollView>
                                </View>

                            </View>
                        ) : (
                            <Features />
                        )
                    }

                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <TextInput
                                style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 10 }}
                                placeholder="Blackhole"
                                value={inputText}
                                onChangeText={setInputText}
                            />
                            <TouchableOpacity
                                disabled={loading}
                                onPress={handleButtonClick}
                                className={` rounded-xl p-4 ml-4 ${!loading ? "bg-emerald-500" : "bg-gray-500"}`}>
                                <Text className="text-white font-semibold">
                                    {loading ? (
                                        <ActivityIndicator size="small" color="#00ff00" />
                                    ) : (
                                        "send"
                                    )}
                                </Text>
                            </TouchableOpacity>
                            {/* <Button className="p-2" title="Submit"  /> */}
                        </View>
                        {/* {loading ? (
                            <ActivityIndicator size="large" color="#00ff00" />
                        ) : (
                            imageData && (
                                <Image
                                    source={{ uri: `${imageData}` }}
                                    style={{ width: 300, height: 300 }}
                                />
                            )
                        )} */}
                    </View>



                </SafeAreaView>
            </View>

        </SafeAreaView>
    );
};

export default ImageGenerationScreen;
