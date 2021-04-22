import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useLogout() {
    let history = useHistory();

    const logoutUser = async () => {
        try {
           await axios({
                method: 'GET',
                url: `api/users/logout`,
            }).then(res => { 
                console.log(res); 
                window.location.href = '/login';
            })
        } catch(err) {
            console.log(err);
        } 
    }

    return {
        logoutUser
    }

}