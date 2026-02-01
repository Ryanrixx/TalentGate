const KEY = "tg_demo_mode";

export function getDemoMode(): boolean {
    return localStorage.getItem(KEY) === "1";
}

export function setDemoMode(v: boolean) {
    localStorage.setItem(KEY, v ? "1" : "0");
}
