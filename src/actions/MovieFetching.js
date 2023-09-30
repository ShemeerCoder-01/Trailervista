import Axios from "../Axios/Axios";

export const MovieFetching = async(genre,states)=>{
    let arr = [];
    for(let i = 0; i < genre.length; i++){
        try{
            const response = await Axios.get(genre[i]);
            states[i](response.data.results);
            if(arr.length < 8){
                arr.push(response.data.results);
            }
        }catch(err){
            console.log(err)
        }
    }
    localStorage.setItem('movies',JSON.stringify(arr));
    
}

