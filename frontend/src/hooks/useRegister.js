import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"

export const useRegister = () => {

    const [loading, setloading] = useState(false)
    const {setauthUser} = useAuthContext()

    const register = async ({fullname, username, email, password, confirmPassword, profilePic}) => {
        
        console.log(`fullname ${fullname}`);
        console.log(`username ${username}`);
        console.log(`email ${email}`);
        console.log(`password ${password}`);
        console.log(`confirmPassword ${confirmPassword}`);
        console.log(`profilePic ${profilePic}`);

        if (!fullname, !username, !email, !password, !confirmPassword) {
            return console.log("all fields are required");
        }
        if (password != confirmPassword) {
            return console.log("Passwords doesn't match");
        }
        if (password.length < 8) {
            return console.log("password must be 8 characters at least");
        }
        
        setloading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullname, username, email, password, confirmPassword, profilePic})
        })
        const data = await res.json();
        if (data.error) {
            return console.log("something wenrt wrong"); 
        }

        localStorage.setItem("loggedInUser", JSON.stringify(data))
        setauthUser(data)

        console.log(data);
        } catch (error) {
             console.log("some error in register", error.message);
            return console.log("some error in register", error.message);    
        }finally{
            setloading(false)
        }
    }
    return {loading, register}
}