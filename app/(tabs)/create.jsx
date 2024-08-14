import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { icons } from "../../constants"
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createPost } from '../../lib/appwrite'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
    const { user } = useGlobalContext()

    const [uploading, setUploading] = useState()

    const [form, setForm] = useState({
        place: '',
        message: '',
        image: null
    })

    const openPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.canceled) {
            setForm({ ...form, image: result.assets[0] })
        }
    }

    const submit = async () => {
        if (!form.message || !form.image || !form.place) {
            return Alert.alert("Please fill in all the fields")
        }

        setUploading(true)

        try {
            await createPost({
                ...form, userId: user.$id
            })

            Alert.alert('Success', 'Post uploaded successfully')
            router.push('/home')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setForm({
                place: '',
                message: '',
                image: null
            })

            setUploading(true)
        }
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="px-4 my-6">
                <View className="flex justify-between items-start flex-row">
                    <Text className="text-3xl font-psemibold text-black">
                        Create a Post
                    </Text>
                </View>

                <FormField
                    title="Location"
                    placeholder="San to?"
                    value={form.place}
                    handleChangeText={(e) => setForm({ ...form, place: e })}
                    otherStyles="mt-10"
                />

                <FormField
                    title="Message"
                    value={form.message}
                    placeholder="Share mo lang?"
                    handleChangeText={(e) => setForm({ ...form, message: e })}
                    otherStyles="mt-5"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-black font-pmedium">
                        Image
                    </Text>

                    <TouchableOpacity onPress={() => openPicker()}>
                        {form.image ? (
                            <Image
                                source={{ uri: form.image.uri }}
                                resizeMode="cover"
                                className="w-full h-64 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-white rounded-2xl border-2 border-gray-200 flex justify-center items-center flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    alt="upload"
                                    className="w-5 h-5"
                                />
                                <Text className="text-sm text-black font-pmedium">
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <CustomButton
                    title="Submit & Publish"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create