# Open-source Web3 Card Game

DDEUX © 2023 by [Tippi Fifestarr](https://devpost.com/tippi-fifestarr) is licensed under [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1)

## The Goal

Build a uniquely web3 card game, with quick turn-based deduction-based gameplay, fun lore written by Tippi Fifestarr, and progressive decentralized scaling possiblities!

> helped by https://blog.developerdao.com/create-nft-smart-contract-with-thirdweb-and-chainlink
> quickly adapted the [thirdweb starter template](https://next-javascript-starter.thirdweb-example.com/) to be perfect for the home page of D-Deuce.
> make your own cards/decks, coming soon

Step 1. Start Screen.

1. Play => Access Key => Choose OG Deck
2. Vote (disabled) => DaDeux? DeDeuce? => Optimistic Governance with Veto
3. Create => Contribute/Apply => Coming soon

- [ ] merge with original dd repo (web3 branch?)?
- [x] use the existing template structure to write new copy explaining the game and prompting the user to "choose a deck"
- [x] load the game page wrapped in thirdweb
- [x] enable the claim button for access key (link to gitbooks documentation)
- [ ] conditionally render "choose a deck" if user has access key
- [x] visually & functionally disable placeholder buttons
- [ ] outro music video in the "detail view" (image and text on time with music)
- [ ] decide on an open-source license (it should be easy to contribute to and repurpose, but I don't want someone to take this idea and code and compete against me or trick people, which is why we need public ledger of the official spellings for the name of DaDeuce, maybe sell some franchises for each name, and give first dibs to the proposer of that vote, which will be me for the first few probably lol)
- [ ] write warning for deck uploader that ownership rules haven't been finalized
- [ ] add the UNOFFICIAL deck creator (maker) function
- [ ] Post to Lens (discuss integrating)

## Getting Started

On `pages/_app.js`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

- [ ] Get the thing running, yarn install & yarn dev
- [ ] Look over the code and get a sense of how things flow for the user
- [ ] Check out **the goal** above to find an unfinished goal to get started on
- [ ] Announce to the team somehow (Discord or here in GH) that you're starting
- [ ] Check back for feedback and update us...

> useful guidance from Thirdweb can be found in the Discord and throughout their blog and documentation. <br> https://blog.thirdweb.com/guides/early-access-nft-with-typescript/ <br> https://portal.thirdweb.com/auth/how-auth-works/sign-in-with-wallet

### Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb JavaScript Documentation](https://docs.thirdweb.com/react) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com/react) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
