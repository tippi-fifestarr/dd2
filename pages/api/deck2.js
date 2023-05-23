const deck = require("../../utils/deck.json");

export default async function handler(req, res) {
  res.status(200).json(deck);
}
