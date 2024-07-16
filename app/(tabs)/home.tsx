import { FlatList, Text, View,Image } from 'react-native';
import React, {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser } from '@/services/helpers';
import { images } from '@/constants';
import { icons } from '@/constants';
import SearchInput from '@/components/SearchInput';
import LatestPosts from '@/components/LatestPosts';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: string;
}


const Home = () => {
  const [user, setuser] = useState<User | null>(null);
  useEffect(()=>{
    const fetchUser = async()=>{
           const fetchedUser = await getUser();
           setuser(fetchedUser);
    };

    fetchUser();
  },[])
  
    return (
      <SafeAreaView className='bg-primary'>
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome back
                  </Text>
                  <Text className="font-bold text-sky-200 text-2xl">
                    {user ? user.name : "loading..."}
                  </Text>
                </View>
                <View className='mt-1.5'>
                    <Image source={icons.user}  className='w-9 h-10' resizeMode='contain' tintColor={'white'} />

                </View>
              </View>
              <SearchInput />

              <LatestPosts posts={[{id:1},{id:2}]} />
            </View>
          )}
        />
      </SafeAreaView>
    );
}

export default Home
