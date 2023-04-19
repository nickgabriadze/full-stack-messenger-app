"use client"
import { retrieveToken } from "@/app/utils/retrieveToken";

export const AccountPage = () => {
    console.log(retrieveToken())
    return <div>MESSAGE THE WORLD</div>
}

export default AccountPage;