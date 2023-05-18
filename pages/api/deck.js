import deck from "../utils/deck1.json";

export default async function handler(req, res) {
  res.status(200).json(deck);
}
