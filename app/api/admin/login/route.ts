import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Checked against environment variables
        const adminUser = process.env.ADMIN_USERNAME || "admin";
        const adminPass = process.env.ADMIN_PASSWORD || "admin@d24";

        if (username === adminUser && password === adminPass) {
            const secret = process.env.JWT_SECRET || "default_secret";

            const token = jwt.sign({ username }, secret, {
                expiresIn: "1d",
            });

            const serialized = serialize("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            const response = NextResponse.json({ message: "Login successful" });
            response.headers.set("Set-Cookie", serialized);
            return response;
        }

        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
