import { Alert, Image, TextInput, Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/Features';
// import Voice from "@react-native-community/voice";
// import { apicall } from '../api/OpenAi';
import { apiKey } from '../constants';
import axios from 'axios';
import Tts from 'react-native-tts';

const ChatScreen = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false); // State to manage the visibility of the stop button

    const ScrollViewRef = useRef();

    const handleButtonClick = async () => {
        setLoading(true);
        try {
            if (inputText.trim().length > 0) {
                setMessages(prev => [...prev, { role: "user", content: inputText }]);

                const response = await axios({
                    // url: 'https://api-inference.huggingface.co/models/gpt2',
                    // url:"https://api-inference.huggingface.co/models/microsoft/phi-2",
                    url:"https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: { 
                        inputs: inputText,
                    }
                });

                console.log('Call Hugging Face Text Completion:', response.data);

                if (response.data && response.data.length > 0) {
                    const assistantResponse = response.data[0].generated_text;
                    setMessages(prev => [...prev, { role: "assistant", content: assistantResponse }]);
                    Tts.speak(assistantResponse);  // Speak the response
                } else {
                    Alert.alert("Error", "Failed to get a response from the API");
                }
                setInputText('');
            } else {
                Alert.alert("Please enter a prompt");
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Error", "An error occurred while fetching the response");
        } finally {
            setLoading(false);
        }
    };

    // Function to stop TTS
    const handleStopSpeaking = () => {
        Tts.stop();
        setIsSpeaking(false);
    };

    useEffect(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.5);

        const onStart = () => setIsSpeaking(true);
        const onFinish = () => setIsSpeaking(false);
        const onCancel = () => setIsSpeaking(false);

        Tts.addEventListener('tts-start', onStart);
        Tts.addEventListener('tts-finish', onFinish);
        Tts.addEventListener('tts-cancel', onCancel);

        // return () => {
        //     Tts.removeEventListener('tts-start', onStart);
        //     Tts.removeEventListener('tts-finish', onFinish);
        //     Tts.removeEventListener('tts-cancel', onCancel);
        // };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View className=" flex-1 bg-white py-6">
                <SafeAreaView className="flex-1 flex mx-5 justify-between">
                    <View className="flex-row justify-center">
                       <View className=" bg-slate-200 rounded-full">
                        <Image style={{ width: wp(25), height: wp(25) }} source={require("../../assets/images/chat1.png")} />
                    </View>
                    </View>
                    {
                        messages.length > 0 ? (
                            <View className="space-y-2 flex-1 ">
                              {/* <View className="w-full justify-center flex items-center"> */}
                                <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
                                    Assistant
                                </Text>
                                {/* </View> */}
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
                                            messages.map((message, index) => (
                                                <View key={index} className={`flex-row justify-${message.role === "assistant" ? "start" : "end"}`}>
                                                    <View style={{ width: wp(70) }} className={`p-2 rounded-xl ${message.role === "assistant" ? "bg-emerald-100 rounded-tl-none" : "bg-white rounded-tr-none"}`}>
                                                        <Text style={{fontWeight:"500",color:"#000000",fontSize:16}}>{message.content}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            </View>
                        ) : (
                            <Features />
                        )
                    }
                     
                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                    {isSpeaking && (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={handleStopSpeaking} className="bg-red-500 mb-4 p-4 rounded-xl">
                                <Text className="text-white font-semibold">Stop Speaking</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                        <TextInput
                                style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 10, color: '#000000',fontWeight:"700" }}
                                placeholderTextColor="Black"
                                placeholder="Type your message"
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
                                        "Send"
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                </SafeAreaView>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({});
