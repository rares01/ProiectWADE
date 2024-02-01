import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../models/decoded-token.model";

export class JwtUtil {

    public static decodeToken(token: string): DecodedToken | null {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }
}