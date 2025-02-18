import { useEffect, useState } from "react";
import { useNotifications } from "@context/notificationsContext";
import Loader from "@components/loader/Loader";

const UserInfo = () => {
    const [loading, setLoading] = useState(false);
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
                setLoading(true);
                const User = user;

                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/userinfo`, {
                    method: 'GET',
                    credentials: true
                });
                const responseJSON = await response.json();

                setLoading(false);
            }catch(err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
        {loading && (
            <Loader/>
        )}
        </>
    )
};

export default UserInfo;