export const saveToSession = (token:string) => {
    sessionStorage.setItem("user_access_token", token);
}