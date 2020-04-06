const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/api/entries", (req, res) => {
  db.getEntries()
    .then(entries => {
      // only return the last 10 entries
      res.json(entries.slice(Math.max(entries.length - 10, 0)));
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.get("/api/allowed", (req, res) => {
  db.shouldOpenDoor()
    .then(allow => {
      res.sendStatus(allow ? 200 : 404);
    })
    .catch(() => res.sendStatus(500));
});

router.post("/api/allow", (req, res) => {
  db.allowDoor()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

router.post("/api/disallow", (req, res) => {
  db.disallowDoor()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
