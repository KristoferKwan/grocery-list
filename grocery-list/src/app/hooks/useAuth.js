import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  


export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    //set user
    const setUserContext = async () => {
        return await axios.get('/api/users', {withCredentials: true}).then(res => {         
            setUser(res.data.currentUser);  
            window.location.href = '/grocerylist';                    
            }).catch((err) => {
            setError(err.response.data);
        })
    }

    //register user  
    const registerUser = async (data) => {
        const { email, password} = data;
            return await axios.post(`/api/users/register`, {
                email, password
              }, {withCredentials: true}).then(async () => {
                console.log('wat')
                window.location.href = '/grocerylist';    
                })
                .catch((err) => {
                console.log(err);
                  return setError(err.response.data);
            })
        };

    //login user 
    const loginUser = async (data) => {
        const { email, password } = data;
            return await axios.post('/api/users/login', {
                email,
                password,
            }, {withCredentials: true}).then(async () => {
                await setUserContext();
            }).catch((err) => {
                setError(err.response.data);
            })
        };

    return {
        registerUser,
        loginUser,
        error
    }
}