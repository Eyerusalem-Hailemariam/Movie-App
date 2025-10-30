import React, { useEffect } from 'react'
import { View, FlatList, ActivityIndicator, Image, Text } from 'react-native'
import { images } from '@/constants/images'
import MovieCard from '../components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from "@/app/components/SearchBar";
import { useState } from 'react'
import { updateSearchCount } from '@/services/appwrite'

export default function Search() {

	const [searchQuery, setSearchQuery] = useState('');

	const { 
	data: movies, 
	error,
	refetch: loadMovies,
	reset,
	loading, 
} = useFetch(() => fetchMovies({
	query: searchQuery
  }))

	// debounce search input -> load movies
		useEffect(() => {
			const timeoutId = setTimeout(async () => {
				if (searchQuery.trim()) {
					try {
						await loadMovies();
					} catch (e) {
						
						console.error('loadMovies error', e);
					}
				} else {
					reset();
				}
			}, 500);

			return () => clearTimeout(timeoutId);
			
		}, [searchQuery]);

	useEffect(() => {
		if (searchQuery.trim() && movies && movies.length > 0) {
			if (movies?.length > 0 && movies?.[0]) {
				updateSearchCount(searchQuery, movies[0]).catch((e) => {
					console.error('updateSearchCount failed', e);
				});
			}
		}
	}, [movies, searchQuery]);

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

			<FlatList 
				data={movies} 
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				className='px-5'
				numColumns={3}
				columnWrapperStyle={{ 
					justifyContent: 'center',
					gap: 16,
					marginVertical: 16
				}}
				contentContainerStyle={{ marginBottom: 100 }}
	ListHeaderComponent={
		<>
			<View className='w-full flex-row justify-center mt-20 items-center mb-5'>
				<Image
					source={icons.logo}
					className='w-12 h-10'
				/>
			</View>

			<View className='my-5'>
				<SearchBar placeholder='Search movies...'
				value={searchQuery}
				onChangeText={(text: string) => setSearchQuery(text)}
				/>
			</View>

			{loading && (
				<ActivityIndicator size="large" color="#0000ff" className='my-3' />
			)}

			{error && (
				<Text className="text-red-500 px-5 my-3">
					Error: {error.message}
				</Text>
			)}

			{!loading && !error && searchQuery.trim() && movies?.length > 0 && (
				<Text className='text-xl text-white font-bold'>
					Search Results for {''}
					<Text className='text-accent'>{searchQuery}</Text>
				</Text>
			)}
		</>
	}
	ListEmptyComponent={
		!loading && !error ? (
			<View>
				<Text className='text-center text-gray-500'>
					{searchQuery.trim() ? 'NO movies found' : 'Search for movies'}
				</Text>
			</View>
		) : null
	}
/>
		</View>
	)
}
