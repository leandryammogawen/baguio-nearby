import { View, Text, Image } from "react-native"
import { icons } from "../constants";

const PostCard = ({ creator, avatar, message, image, place }) => {
    return (
        <View className="flex flex-col px-4 mb-14 bg-white">
            <View className="flex flex-row gap-3 items-start mb-2">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-psemibold text-sm text-pblack"
                            numberOfLines={1}
                        >
                            {creator}
                        </Text>
                        <Text
                            className="text-xs text-gray-500 font-pregular"
                            numberOfLines={1}
                        >
                            {place}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            <View className="flex flex-row items-start py-2">
                <Text className="items-start text-sm text-pblack font-pregular">
                    {message}
                </Text>
            </View>

            <Image
                source={{ uri: image }}
                className="w-full h-96 rounded-xl mt-3 "
                resizeMode="cover"
            />
        </View>
    )
}

export default PostCard;