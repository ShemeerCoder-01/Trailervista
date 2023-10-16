import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const dbFetching = async () => {
    try {
        const currentUser = localStorage.getItem('user');
        const dbRef = collection(db, 'favorites');
        const queryRef = query(dbRef, orderBy('Favoritelist', 'desc'));
        const response = await getDocs(queryRef);
        const document = response.docs.filter((doc, index) => index === 0);
        let favArrObj = document[0].data();
        let favArr = favArrObj.Favoritelist;
        let favoriteList = favArr.filter(obj => obj.userEmail === currentUser).map(item => item.id);
        console.log(favoriteList);
        localStorage.setItem('favorites', JSON.stringify(favoriteList));
    }
    catch (e) {
        console.log("err is :", e);
    }
}