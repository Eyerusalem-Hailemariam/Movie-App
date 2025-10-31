# Movie App

A small Expo + React Native app that shows movies from TMDB and records search metrics to Appwrite.

Quick start
1. Copy `.env` (use values from your TMDB and Appwrite projects).
2. Install deps: `npm install`
3. Start: `npm start` (use `expo start -c` to clear cache)

Essential env variables
- `EXPO_PUBLIC_MOVIE_API_KEY` (TMDB)
- `EXPO_PUBLIC_APPWRITE_ENDPOINT`
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
- `EXPO_PUBLIC_APPWRITE_DATABASE_ID`
- `EXPO_PUBLIC_APPWRITE_COLLECTION_ID`

Where to look
- Screens: `app/(tabs)/index.tsx`, `app/(tabs)/search.tsx`, `app/movies/[id].tsx`
- API: `services/api.tsx` (TMDB), `services/appwrite.ts` (metrics)

Commands
- `npm start` — run dev server
- `npm run android` / `npm run ios` / `npm run web`

Notes
- Appwrite collection must accept `title`, `searchTerm`, `movie_id`, `count`, `poster_url`.
- Wrap text in `<Text>` components (React Native requirement).
