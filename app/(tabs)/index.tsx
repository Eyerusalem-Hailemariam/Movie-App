import {ActivityIndicator, Image, ScrollView} from "react-native";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import {icons} from "@/constants/icons";
import SearchBar from "@/app/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

export default function Index() {
  const router = useRouter();

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError } = useFetch(() => fetchMovies({
    query: ''
  }))

  return (
    <View className="flex-1 bg-primary">
      {/* Background image shouldn't intercept touches so ScrollView can receive them */}
      <View pointerEvents="none" className="absolute w-full h-full z-0">
        <Image source={images.bg} className="w-full h-full" />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        className="px-5"
        showsVerticalScrollIndicator={false}
        // use flexGrow so content can expand and allow scrolling when content exceeds screen
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

        {moviesLoading ? (
          <ActivityIndicator 
           size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-red-500 text-center mt-10">{moviesError?.message}</Text>
        ) : (
          <View className="mt-5">
          <SearchBar onPress={() => router.push('/search')}
            placeholder="Search for movies or TV series"
            />

            <>
              <Text className="text-white text-lg font-semibold mt-10 mb-3">
                Latest Movies
              </Text>
            </>
        </View>
        )}


      </ScrollView>
    </View>
  );
}




