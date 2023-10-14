export const setToken=(token)=>{
    localStorage.setItem("jwt",token)
}

export const getToken=()=>{
    return localStorage.getItem("jwt")
}

export const deleteToken=()=>{
    localStorage.removeItem("jwt")
}

