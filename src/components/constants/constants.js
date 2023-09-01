
let key = process.env.REACT_APP_API_KEY;
export const baseUrl = "https://api.themoviedb.org/3"
export const baseimageUrl = "https://image.tmdb.org/t/p/original"
export const originals = `/discover/tv?api_key=${key}&with_networks=213`
export const action = `/discover/movie?api_key=${key}&with_genres=28`
export const horror = `/discover/movie?api_key=${key}&with_genres=27`
export const trending = `/trending/all/week?&language=en-US&api_key=${key}`
export const comedy = `/discover/movie?api_key=${key}&with_genres=35`
export const romantic = `/discover/movie?api_key=${key}&with_genres=10749`
export const documentaries = `/discover/movie?api_key=${key}&with_genres=99`


