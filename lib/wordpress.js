const WP_API_URL = process.env.WORDPRESS_API_URL;

if (!WP_API_URL && typeof window === "undefined") {
    console.warn("WORDPRESS_API_URL is not set in environment variables.");
}

// ---------------------------------------------------------------------------
// Base fetcher
// ---------------------------------------------------------------------------

async function fetchAPI(endpoint, { params = {}, revalidate = 60 } = {}) {
    const url = new URL(`${WP_API_URL}/wp-json/wp/v2/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
    });

    const res = await fetch(url.toString(), {
        next: { revalidate },
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error(
            `WordPress API error [${endpoint}]: ${res.status} ${res.statusText}`
        );
    }

    const data = await res.json();

    // Expose total pages from response headers when available
    const totalPages = res.headers.get("X-WP-TotalPages");
    const total = res.headers.get("X-WP-Total");

    if (Array.isArray(data)) {
        data._paginationMeta = {
            totalPages: totalPages ? Number(totalPages) : null,
            total: total ? Number(total) : null,
        };
    }

    return data;
}

// ---------------------------------------------------------------------------
// Site info
// ---------------------------------------------------------------------------

export async function getSiteInfo() {
    const res = await fetch(`${WP_API_URL}/wp-json`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch site info");
    return res.json();
}

// ---------------------------------------------------------------------------
// Navigation — top-level published pages sorted by menu_order
// For full menu management install WP API Menus plugin and swap this out.
// ---------------------------------------------------------------------------

export async function getMenuItems() {
    return fetchAPI("pages", {
        params: {
            parent: 0,
            orderby: "menu_order",
            order: "asc",
            per_page: 20,
            status: "publish",
            _fields: "id,title,slug",
        },
        revalidate: 300,
    });
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function getPosts({ perPage = 10, page = 1, category } = {}) {
    const params = {
        per_page: perPage,
        page,
        _embed: true,
        _fields:
            "id,title,excerpt,slug,date,featured_media,categories,_links,_embedded",
    };
    if (category) params.categories = category;
    return fetchAPI("posts", { params });
}

export async function getPostBySlug(slug) {
    const posts = await fetchAPI("posts", {
        params: { slug, _embed: true },
    });
    return posts[0] ?? null;
}

export async function getAllPostSlugs() {
    const posts = await fetchAPI("posts", {
        params: { per_page: 100, _fields: "slug" },
        revalidate: 300,
    });
    return posts.map((p) => p.slug);
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export async function getPageBySlug(slug) {
    const pages = await fetchAPI("pages", {
        params: { slug, _embed: true },
    });
    return pages[0] ?? null;
}

export async function getAllPageSlugs() {
    const pages = await fetchAPI("pages", {
        params: { per_page: 100, _fields: "slug" },
        revalidate: 300,
    });
    return pages.map((p) => p.slug);
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function getCategories() {
    return fetchAPI("categories", {
        params: { per_page: 100, _fields: "id,name,slug,count" },
        revalidate: 300,
    });
}
