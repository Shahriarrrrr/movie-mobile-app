export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers : {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}


export const fetchMovies =  async ({query} : {query: string}) => {
    const endpoint = 
    query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
    `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    })
    if (!response.ok){
        throw new Error('Failded to fetch movies')
    }
    const data = await response.json()
    return data.results
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
