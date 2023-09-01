
import axios from "axios";
import { baseUrl } from "../components/constants/constants";

const Axios = axios.create({
    baseURL:baseUrl
  });

  export default Axios;