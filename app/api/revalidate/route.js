import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * WordPress ISR revalidation webhook.
 *
 * Configure in WordPress (e.g. via a custom plugin or WP Webhooks):
 *   POST https://your-frontend.com/api/revalidate
 *   Header: Authorization: Bearer <REVALIDATE_SECRET>
 *   Body (JSON): { "type": "post"|"page", "slug": "some-slug" }
 */
export async function POST(request) {
    const authHeader = request.headers.get("authorization");
    const secret = process.env.REVALIDATE_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const { type, slug } = body;

    if (!type || !slug) {
        return NextResponse.json(
            { message: "Missing required fields: type, slug" },
            { status: 400 }
        );
    }

    try {
        if (type === "post") {
            revalidatePath(`/blog/${slug}`);
            revalidatePath("/blog");
        } else if (type === "page") {
            revalidatePath(`/${slug}`);
        }

        return NextResponse.json({ revalidated: true, type, slug });
    } catch (err) {
        return NextResponse.json(
            { message: "Revalidation failed", error: err.message },
            { status: 500 }
        );
    }
}
