import { getDeck } from "../../utils/deck";

export default async function handler(req, res) {
  const deck = await getDeck();
  res.status(200).json(deck);
}
