export default async function handler(req, res) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: "Missing NEWS_API_KEY in environment" });
  }

  const { category = "technology", q } = req.query;

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
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching NewsAPI:", error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
