import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { useRouter } from 'expo-router'
import useFetch from "@/services/useFetch"
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import Searchbar from '@/components/SearchBar'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {data : movies,
     loading,
      error,
      refetch: loadMovies,
      reset,
    } = useFetch(() => fetchMovies ({query:searchQuery}) , false)

  useEffect(()=> {
    const timeoutID = setTimeout( async() =>{
          if(searchQuery.trim()){
      await loadMovies();
    } else {
      reset();
    }
    }, 500)
    return () => clearTimeout(timeoutID)
  },[searchQuery])
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0 ' resizeMode='cover'></Image>
      <FlatList 
      data={movies} 
      renderItem={({item}) => <MovieCard {...item}></MovieCard>}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle = {{
        justifyContent: 'center',
        gap : 16,
        marginVertical:16,
      }}
      contentContainerStyle={{
        paddingBottom: 100
      }}
      ListHeaderComponent={
        <>
        <View className='w-full flex-row justify-center mt-20 items-center'>
          <Image source={icons.logo} className='2-12 h-10'></Image>
        </View>
        <View className='my-5'>
          <Searchbar 
          placeholder='Search Movie'
          value = {searchQuery}
          onChangeText = {(text : string) => setSearchQuery(text)}
          ></Searchbar>
        </View>
        {loading && (<ActivityIndicator size={'large'} color={'#0000ff'} className='my-3'></ActivityIndicator>)}
        {error && (<Text className='red-500'>{error.message}</Text>)}
        {
          !loading && !error && searchQuery.trim() && movies?.length> 0 && (
            <Text className='text-xl text-white font-bold'>
              Search Results for {''}
              <Text className='text-accent'>{searchQuery}</Text>
            </Text>
          )
        }
        </>
      }
      ListEmptyComponent={
        !loading && !error ? (
          <View className='mt-10 px-5 '>
            <Text className='text-center text-gray-500'>
              {searchQuery.trim() ? 'No movies Found' : 'Search For a movie'}
            </Text>
          </View>
        ) : null
      }
      >
      </FlatList>
    </View>
  )
}

export default search