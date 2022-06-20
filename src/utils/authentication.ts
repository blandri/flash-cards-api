import * as jwt from "jsonwebtoken";
import * as dotenv from"dotenv"

dotenv.config()

export const SECRET = "GraphQL-is-aw3some";

export interface AuthTokenPayload {  // 1
    userId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload { // 2
    const token = authHeader.replace("Bearer ", "");  // 3

    if (!token) {
        throw new Error("No token found");
    }
    return jwt.verify(token,SECRET) as AuthTokenPayload;  // 4
}