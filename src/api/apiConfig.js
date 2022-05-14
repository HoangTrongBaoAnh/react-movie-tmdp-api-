const apiConfig = {
    baseUrl:'https://api.themoviedb.org/3/',
    apiKey:'315d9d52e75b1c95c9114e5eab1fbb39',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,

}

export default apiConfig;