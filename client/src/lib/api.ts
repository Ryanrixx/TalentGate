const API_BASE = import.meta.env.VITE_API_URL as string;

function buildUrl(path: string) {
    return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parseError(res: Response) {
    const text = await res.text().catch(() => "");
    // Try to extract message from JSON errors too
    try {
        const json = JSON.parse(text);
        return json?.message ? String(json.message) : text;
    } catch {
        return text;
    }
}

export async function apiGet<T>(path: string, opts?: { token?: string }): Promise<T> {
    const url = buildUrl(path);

    const res = await fetch(url, {
        method: "GET",
        headers: {
            ...(opts?.token ? { Authorization: `Bearer ${opts.token}` } : {}),
        },
    });

    if (!res.ok) {
        const msg = await parseError(res);
        throw new Error(`GET ${url} failed: ${res.status} ${res.statusText} ${msg}`);
    }

    return res.json() as Promise<T>;
}

export async function apiPost<TResponse, TBody extends object>(
    path: string,
    body: TBody,
    opts?: { token?: string }
): Promise<TResponse> {
    const url = buildUrl(path);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(opts?.token ? { Authorization: `Bearer ${opts.token}` } : {}),
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const msg = await parseError(res);
        throw new Error(`POST ${url} failed: ${res.status} ${res.statusText} ${msg}`);
    }

    return res.json() as Promise<TResponse>;
}
