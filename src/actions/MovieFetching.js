import Axios from "../Axios/Axios";

export const MovieFetching = (genre,states)=>{
    for(let i = 0; i < genre.length; i++){
        Axios.get(genre[i]).then((response) => {
            states[i](response.data.results);
        }).catch(err=> console.log(err));
    }
}

