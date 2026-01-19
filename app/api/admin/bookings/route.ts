import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const cookieHeader = request.headers.get("cookie");
        const cookies = parse(cookieHeader || "");
        const token = cookies.admin_token;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET || "default_secret";

        // DEBUG LOGS
        console.log("Admin Bookings API: Checking Auth");
        console.log("Token present:", !!token);

        try {
            jwt.verify(token, secret);
        } catch (e) {
            console.error("Token verification failed:", e);

            // Clear the invalid cookie so middleware doesn't redirect back
            const response = NextResponse.json({ message: "Invalid token" }, { status: 401 });
            response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
            return response;
        }

        const bookings = await prisma.booking.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
