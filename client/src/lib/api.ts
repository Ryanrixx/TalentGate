const API_BASE = import.meta.env.VITE_API_URL as string;

export async function apiGet<T>(path: string): Promise<T> {
    const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`GET ${url} failed: ${res.status} ${res.statusText} ${text}`);
    }

    return res.json() as Promise<T>;
}
