import {
    View,
    TextInput,
    Text,
    TextInputProps,
    TouchableOpacity,
    Image
  } from "react-native";

  interface LatestPostsProps {
    posts: { id: number }[];
  }

  const LatestPosts: React.FC<LatestPostsProps> = ({ posts }) => {
    return (
        <View className="w-full flex-1 pt-5 pb-8">
            <Text className="text-lg font-pregular text-sky-200">Latest Posts</Text>

        </View>
    );
};

export default LatestPosts