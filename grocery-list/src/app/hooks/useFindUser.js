import { useState, useEffect } from 'react';
import axios from 'axios'; 

export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        async function findUser() {
        await axios.get('/api/users')
        .then(res => {
            setUser(res.data.data);
            setLoading(false);
        }).catch(err => {
            //console.log(err);
            setLoading(false);
        });
        }
        
        findUser();  
    }, []);
    
    return {
        user,
        setUser,
        isLoading
    }
}