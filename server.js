import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Falta el parámetro ?url=");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
        "Referer": "http://localhost",
        "Origin": "http://localhost",
        "Accept": "*/*",
        "Connection": "keep-alive",
      }
    });

    if (!response.ok) {
      return res.status(response.status).send("Error al obtener el recurso (" + response.status + ")");
    }

    res.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    response.body.pipe(res);

  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error interno: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Proxy funcionando en puerto " + PORT));
