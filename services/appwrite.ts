import { Client, Databases, ID, Query } from 'react-native-appwrite';
import { TMDB_CONFIG } from './api';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;


const client =  new Client().setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query:string, movie: Movie) => {
    try {
    const  result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ]);

    console.log(result);

        if (result.documents.length > 0) {
            const exisitngMovie = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, exisitngMovie.$id, {
                // ensure required fields are present per collection schema
                title: exisitngMovie.title ?? movie.title,
                searchTerm: query,
                movie_id: exisitngMovie.movie_id ?? movie.id,
                poster_url: exisitngMovie.poster_url ?? (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null),
                count: (exisitngMovie.count ?? 0) + 1,
            } as any);
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                // include required attributes expected by the collection
                title: movie.title,
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            } as any);
        }
} 
catch (error) {
    console.error("Error updating search count:", error);
    throw error;
}
}

export const getTrendingMovies = async(): Promise<TrendingMovie[]| undefined> => {
    try {
        const  result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.limit(5),
        Query.orderDesc('count'),

    ]);

    return result.documents as unknown as TrendingMovie[];
    } catch(error) {
        console.error("Error fetching trending movies:", error);
        return  undefined;
    }
}

export const fetchMovieDetails = async(movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.Headers,

        });
        if (!response.ok) throw new Error("failed to fetch movie detail")
        const data = await response.json();

        return data;
        } catch(error) {
        console.log(error);
        throw error;
    }
}