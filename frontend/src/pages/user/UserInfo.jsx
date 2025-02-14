import { useEffect, useState } from "react";
import { useNotifications } from "@context/notificationsContext";

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const notify = useNotifications();
    
    const handleSuccess = (msg) => {
        notify('success', msg);
    };

    const handleFail = (msg) => {
        notify('fail', msg);
    };

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const User = user;

                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/userinfo`, {
                    method: 'GET',
                    credentials: true
                });
                const responseJSON = await response.json();
                
            }catch(err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return(
        <></>
    )
};

export default UserInfo;