import Axios from "../Axios/Axios";

export const MovieFetching = (genre,states,setMoviesData)=>{
    let arr = [];
    for(let i = 0; i < genre.length; i++){
        Axios.get(genre[i]).then((response) => {
            states[i](response.data.results);
            if(arr.length < 8){
                arr.push(response.data.results);
            }
        }).catch(err=> console.log(err));
    }
    setMoviesData(arr);
}

