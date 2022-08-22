import smilegirl from "../../img/smilegirl.jpg"
import girlvsboy from "../../img/girlvsboy.jpg"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { addUser, removeUser } from "../../redux/userReducer";
import { useState, useEffect } from "react";
import { https } from "../../axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function Login() {
    const [dateRandom] = useState((new Date().getMilliseconds() % 2) === 0 ? true : false)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [resStatus, setResStatus] = useState("")
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(()=>{
        if(user.token){
          navigate("/products")
        }
      }, [user, navigate])

    const getLogin = async () => {
        if(!((userName.length > 3) && (password.length > 3))){
            setReqError(true)
            return
        }

        try{
            const {data} = await https.post("/auth/login",
                {
                    "username": userName,
                    "password": password,
                }
            )
            dispatch(addUser(data))
        }catch(err){
            if(err.response.status === 404){
                setPassword("")
            }
            setResStatus(err.response.status)
            dispatch(removeUser())
        }
    }

    return (
        <>  
            {
                dateRandom ? <div className="w-screen h-screen bg-cover bg-no-repeat bg-center blur-sm" style={{"backgroundImage" : `url(${smilegirl})`}}></div> 
                            :<div className="w-screen h-screen bg-cover bg-no-repeat bg-center blur-sm" style={{"backgroundImage" : `url(${girlvsboy})`}}></div>
            }  
            <div className="absolute flex flex-col items-center w-2/3 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-slate-100 p-12 pt-9 rounded-3xl" style={{"width": "620px"}}> 
                <h1 className="text-5xl text-center font-semibold" style={{"color":"rgb(0, 147, 152)"}}>
                    INTEX-MARKET.UZ
                </h1>
                {
                    resStatus === 404 ? <p className="text-center font-bolder text-xl text-red-500 mt-5 mb-16">Username yoki password xato!</p> : <p className="text-center font-bolder text-xl text-gray-400 mt-5 mb-9">Введите имя пользователя и пароль, чтобы получить доступ к системе.</p>
                }
                <input value={userName} maxLength={15} onChange={(e) =>{ setUserName(e.target.value); setResStatus(false);}} className={`w-full h-14 outline-none border-2 border-solid shadow-lg rounded-2xl pl-4 text-2xl text-center ${reqError && (userName.length < 4) ? "border-rose-600" : "mb-8 border-transparent"}`} placeholder="Имя пользователя" type="text"/>
                <span className={`w-10/12 pl-3 h-8 text-red-500 ${reqError && (userName.length < 4) ? "" : "hidden"}`}>Username 4ta belgidan kam bo'lmasligi kerak!</span>
                <div className="flex justify-between w-full">
                    <input value={password} maxLength={24} onChange={(e) =>{ setPassword(e.target.value); setResStatus(false);}} className={`w-10/12 h-14 outline-none border-2 border-solid shadow-lg rounded-2xl pl-4 text-2xl text-center ${reqError && (password.length < 4) ? "border-rose-600" : "mb-8 border-transparent"}`} placeholder="Пароль" type={passwordOpen ? "text" : "password"}/>
                    <span onClick={() => setPasswordOpen(!passwordOpen)} className="w-14 cursor-pointer h-14 rounded-2xl bg-white shadow-lg text-4xl p-2.5">
                        {
                            passwordOpen ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                        }
                    </span>
                </div>
                <span className={`w-10/12 pl-3 h-8 text-red-500 ${reqError && (password.length < 4) ? "" : "hidden"}`}>Password 4ta belgidan kam bo'lmasligi kerak!</span>
                <span onClick={()=> {getLogin()}} className="block w-60 h-12 rounded-2xl py-3 text-center text-white font-semibold mt-8 cursor-pointer" style={{"backgroundColor" : "rgb(0, 147, 152)"}}>Войти</span>
            </div>
        </>
    )
}