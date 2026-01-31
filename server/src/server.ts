import { createApp } from "./app";
import { connectDb } from "./config/db";
import { ENV } from "./config/env";

async function main() {
    await connectDb();

    const app = createApp();
    app.listen(ENV.PORT, () => {
        console.log(`[server] http://localhost:${ENV.PORT}`);
    });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
