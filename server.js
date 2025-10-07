import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Falta el parámetro ?url=");
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).send("Error al obtener el recurso");
    }

    res.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Error interno: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy funcionando en puerto " + PORT));
