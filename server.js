import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(express.json());

app.get("/api/news", async (req, res) => {
  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: "Missing NEWS_API_KEY in environment" });
  }

  const category = req.query.category || "technology";
  const q = req.query.q;

  const params = new URLSearchParams({
    language: "en",
    apiKey: NEWS_API_KEY,
  });

  let url;
  if (q) {
    params.set("q", q);
    params.set("sortBy", "publishedAt");
    url = `https://newsapi.org/v2/everything?${params.toString()}`;
  } else {
    params.set("category", category);
    url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching NewsAPI:", error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res) => {
      try {
        const url = req.originalUrl;
        const fs = await import("fs");
        const indexHtml = await fs.promises.readFile(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        const template = await vite.transformIndexHtml(url, indexHtml);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        console.error(e);
        res.status(500).end(e.message);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, "dist")));

    app.use("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
