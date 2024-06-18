// import axios from 'axios';
// const { apiKey } = require('../constants/index');

// const client = axios.create({
//     headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//     },
// });
// global.Buffer = require('buffer').Buffer;
// const TextCompletionEndPoint = 'https://api-inference.huggingface.co/models/gpt2';
// const ImageGenerationEndPoint = 'https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4';

// export const apicall = async (prompt, messages) => {
//     try {
//         // Make a request to Hugging Face API to check if the prompt is asking for image generation
//         const res = await client.post(TextCompletionEndPoint, {
//             inputs: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt}. Simply answer with a yes or no.`,
//         });
//         console.log("data", res.data);
//         let isArt = res.data[0]?.generated_text.trim().toLowerCase();

//         if (isArt.includes('yes')) {
//             console.log('Call Hugging Face Text Completion');
//             return await TextCompletionApiCall(prompt, messages || []);
//         } else {
//             console.log('Call Hugging Face Image Generation');
//             return await ImageGenerationApiCall(prompt, messages);
//         }
//     } catch (error) {
//         handleError(error);
//         return { Success: false, message: error.message };
//     }
// };

// const TextCompletionApiCall = async (prompt, messages) => {
//     try {
//         const res = await client.post(TextCompletionEndPoint, {
//             inputs: prompt,
//         });
//         console.log('Call Hugging Face Text Completion',res.data[0].generated_text);
//         let answer = res.data[0].generated_text;
//         messages.push({ role: 'assistant', content: answer.trim() });
//         return Promise.resolve({ Success: true, data: messages });
//     } catch (error) {
//         console.log('error in Hugging Face Text Completion', error);
//         handleError(error);
//         return Promise.resolve({ Success: false, message: error.message });
//     }
// };

// const ImageGenerationApiCall = async (prompt, messages) => {
//     try {
//         const response = await axios({
//             url: ImageGenerationEndPoint,
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${apiKey}`,
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             data: { inputs: prompt },
//             responseType: 'arraybuffer',
//         });

//         const mimeType = response.headers['content-type'];
//         const result = response.data;
//         const base64data = Buffer.from(result, 'binary').toString('base64');
//         const img = `data:${mimeType};base64,${base64data}`;
//         console.log('Success, here is image', img);

//         messages.push({ role: 'assistant', content: img });
//         return Promise.resolve({ Success: true, data: messages });
//     } catch (error) {
//         console.log('error in Hugging Face Image Generation', error);
//         handleError(error);
//         return Promise.resolve({ Success: false, message: error.message });
//     }
// };

// const handleError = (error) => {
//     if (error.response) {
//         console.error('Error response:', error.response.data);
//         console.error('Error status:', error.response.status);
//         console.error('Error headers:', error.response.headers);
//         if (error.response.status === 429) {
//             console.error('Rate limit exceeded. Please slow down your requests.');
//         } else if (error.response.status === 400) {
//             console.error('Bad request. Please check your input data and try again.');
//         } else {
//             console.error('Error message:', error.response.data.error?.message);
//         }
//     } else if (error.request) {
//         console.error('Error request:', error.request);
//         console.error('Error message:', error.message);
//     } else {
//         console.error('Error setting up the request:', error.message);
//     }
// };
