---
title: Yes, But What Exactly Is The Blockchain?
description: LEGOs. The blockchain is made of LEGOs. And only the tallest towers matter. Do you trust the United States? Plus, a quick lesson in economics and a shoutout to Matt Damon.
tags: ["blockchain", "crypto"]
date: 2022-02-25
---

The blockchain is a list of transactions. However, this list is not stored in one common place but is copied across many computers, none of which are considered the "true" copy. Each computer keeps its own version of the list, so the list is distributed and no single person can assume control. The trick is keeping all the computers in sync.

## Blockchain as a LEGO Tower

Let's pretend the blockchain is a LEGO tower, and the network of computers is a group of friends. They don't want one person to be in control of adding new blocks to the tower, because that person could just take over and build whatever they want. To prevent this, each person builds a copy of the tower and adds new blocks to it independently. Every time a person adds a block, that person lets everyone else know and specifies which block the new one should go on top of. Everyone then adds the block to their personal tower to keep things in sync.

What happens if two people add a new block at the same time? Which block should we use? We use both, and the tower temporarily splits.  When someone adds the next block, they will have to pick which branch to build on top of.  Once they pick a branch, we will discard the other, shorter branch. We always pick the tallest tower.

However, even with this approach, one person could still monopolize construction. In fact, they could erase and rebuild whole sections of the tower by picking an old block to start from and adding enough new blocks on top of it to make this new branch the tallest one. Everyone else would then discard the original (and now shorter) branch of the tower in favor of the new one. Thus, if one person wanted to replace the last five blocks of the tower, that person would just pick the fifth block from the top as the new starting point and add six new blocks before anyone else added one block to the original tower.

The most popular method of preventing this is called *proof of work*, which means that we make it difficult and time-consuming to add new blocks. If it takes a long time to make a new block, the chance of a bad actor[^1] making six blocks before anyone else makes just one is extremely low. The bad actor would need more computing power than everyone else combined.

## What About Crypto?

How do cryptocurrencies use the blockchain? For crypto, each block of the tower contains a list of recent transactions. If we follow the transactions from the base of the tower up to the tallest branch, we can trace the flow of all the "money" and figure out how much everyone has in their wallets right now. When someone initiates a new transaction, they add it to a list of pending transactions. Once this list gets long enough, people in the network try to "mine" a new block that contains the transactions and that fits onto the top of the tower. Creating a block takes a long time because the new block must perfectly fit onto the existing top of the tower.  Thanks to some math from cryptography (hence the name crypto), it is pretty easy to check *if* a block fits on the tower but impossible to calculate a block ahead of time that you *know* will fit. Thus, you have to use trial and error to look for a valid block, which takes a long time and a lot of computing power.

The difficulty of finding valid blocks means that once a block of transactions is added to the crypto chain, it is virtually impossible to go back and "undo" old transactions to steal back any money. This would require that you go back to the block you want to replace, re-mine it *and all of the blocks that come after it* before anyone else mines just one more block on top of the original chain. This is absurdly difficult.

## But Why?

Why go through all the trouble of building a blockchain? For many people, the appeal of a blockchain (and crypto, by extension) is that no single person is "in charge" of the chain. It is decentralized. Since no one is in control, you don't have to trust anyone who participates in the chain. In contrast, if a central bank keeps a record of transactions to decide how much money you have, you have to trust the bank's accounting. If the bank nefariously decides to undo a transaction (or if someone hacks into it), you're sunk. Of course, in an economy where people have the freedom of choosing a bank, a bank that occasionally dips into your funds would quickly fold since people would just hop to another bank as quickly as possible. However, if you are particularly paranoid that the government will take control of the financial system or freeze your funds, crypto might seem worth a look. 

Clearly, crypto itself has no intrinsic value. The worth is dictated by how valuable people decide this decentralized currency idea is. If you trust the centralized governments that issue and sustain the value of traditional currency, then crypto is a bit ridiculous. Why would you give up the security of a currency backed by the United State of America in favor of digital monopoly money? However, if you *don't* trust the governments of the world to regulate the value of currency, then crypto might be appealing. The tradeoff is that the value of your digital assets is now at the mercy of a distributed network that lacks a central authority declaring it legal tender.

In economic terms, if we collectively decide that the idea behind crypto is important, the value will go up because we will be willing to spend more dollars to get the same amount of crypto. However, if we decide crypto isn't useful, we won't be willing to convert our dollars into it, and supply and demand dictates that the value of the crypto will have to drop to reenergize demand.

Obviously, a high level overview like this can't fully capture the nuances of blockchain and crypto. However, understanding the mechanics of the blockchain can clear up the confusion around this trendy topic and remind everyone that getting into crypto doesn't have much to do with you being the next bold explorer.

Should we tell Matt Damon?

[^1]: Probably Nicholas Cage.