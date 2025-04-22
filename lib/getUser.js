import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

export async function getUserByCookie() {
    const cookie = await cookies()
    
    const fetchedCookie = cookie.get('budgetingApp')?.value

    if(fetchedCookie){
        try {
            const decoded = jwt.verify(fetchedCookie, process.env.JWT_SECRET)
            return decoded
            
        } catch (error) {
            return null
        }
    }

    }