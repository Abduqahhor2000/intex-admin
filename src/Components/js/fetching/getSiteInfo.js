import { https } from "../../../axios"
import{removeUser} from "../../../redux/userReducer"

export async function getSiteInfo (token, dispatch, addAllSiteInfo, navigate) {
    if(!token) return;
    try{
        const {data} = await https({
            method: 'get',
            url: `/api/site/`,
            headers:{
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch(addAllSiteInfo(data?.data[0]))
        return(data?.data)
    }catch(err){
        console.log(err)
        if(err.response.status === 401){
            dispatch(removeUser()); 
            navigate("/login")
        }
        if(err.response.status === 0){
            navigate("/noconnect")
        }
        return(err)
    }
}