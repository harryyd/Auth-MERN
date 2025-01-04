import { create } from 'zustand';
// import { persist } from 'zustand/middleware';


// export const SearchIconStore = create((set) => ({
// 	SearchIcon: true,
// 	setSearchIcon: (type) => set({ SearchIcon: type }),
// }));

export const SearchIconStore = create((set) => ({
    SearchIcon: true,
    isInputOpen : false , 
    setSearchIcon: (type) => set({ SearchIcon: type }),
    setIsInputOpen :(type) => set({ isInputOpen: type })
  }));


export const useContentStore = create((set) => ({
	contentType: "Home",
	setContentType: (type) => set({ contentType: type }),
}));



export const HomeDataStore = create((set) => ({
    data1 : [] ,
    trendingSingleMovie : {} ,
    trendingTvShows : [] ,
    favourites :[] ,
    trendingMovies : [] , 
    topRatedMovies : [] ,  
    setData : (newdata) => set({data1: newdata}),
    setTrendingSingleMovie : (newdata) => set({trendingSingleMovie: newdata}),
    setTrendingTvShows : (newdata) => set({trendingTvShows: newdata}),
    setFavourites : (newdata) => set({favourites : newdata}) ,
    setTrendingMovies :(newdata) => set({trendingMovies : newdata}),
    setTopratedMovies : (newdata) => set({topRatedMovies : newdata})
    // need to persists the value of favourites according to the user data and not the whole store
}))

// const useStore = create(
//     persist(
//         (set) => ({
//             isLogin: false,
//             setlogin: () => set({ isLogin: true }),
//             setlogout: () => set({ isLogin: false }),
//         }),
//         {
//             name: 'auth-store', // key for localStorage
//             getStorage: () => localStorage, // where the state should be saved
//         }
//     )
// )

const useStore = create((set) => ({
    isLogin: false,
    loading : true ,
    user : {} , 
    setlogin: () => set({ isLogin: true }),
    setlogout: () => set({ isLogin: false }),
    setloading  :(state) => set({loading : state}),
    setUser :(state) => set({user : state})
}))


export default useStore;

