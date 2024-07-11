import { connectToDatabase } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();

        const categories = await Category.find({});

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}