---
title: The Best Analysis of the Best First Guess in Wordle
description: I take on the entire Internet. Some words are meaningless. You learn a lesson that will serve you well far beyond Wordle. I get to use the word "heuristic" in a sentence.
date: 2022-02-11
tags: ["math"]
---
There has been much ado across the Internet lately
about the best first guess for [Wordle](https://www.powerlanguage.co.uk/wordle/).
I can't review all the proposed words, but a few include 
`roate`, `arose`, `soare`, `later`, and `adieu`.

Unfortunately, none of them are the best initial guess.

Instead, I would like to propose that the best initial guess for Wordle is, unequivocally, ...

... complicated.

Wait, don't leave, I'll explain. 
The whole question hinges on a critically important word 
but *not* a five-letter word. It's the word "best"--a word that is straight-up dangerous at worst and absurdly ambiguous and unhelpful at bes--wait, uh, nevermind.

For Wordle, "best" could mean any number of things. 
The best starting word could be:
- The word that sets you up to solve the puzzle in the fewest number of guesses, on average, 
- The word that gives you the best chance at solving the puzzle within six guesses ("winning the game"),
- The word that sets you up to minimize the worst-case number of guesses, or
- The word that sets you up to solve the puzzle as fast as possible (but risks not solving it at all)

This is not an exhaustive list, either. The point is that is doesn't make sense to claim that a word is the "best" without carefully defining the problem you are solving. With a clear definition, you will be able to tell whether a particular solution is truly the best you can do. 
To make matters even worse,
even if you can define the problem,
that doesn't mean that you can practically find the solution.
If that's the case,
you have to make some simplying assumptions
so the problem becomes "tractable."

Of course, the usefulness of your solution depends on how realistic
your assumptions are.
For example,
in the case of Wordle,
a reasonable assumption might be that solving the puzzle
is nearly equivalent to finding the five letters in the word (regardless of order)
since there aren't many anagrams of the same five letters.
Once you know the letters, you can quickly figure out the solution.
This rule of thumb that simplifies the problem is known as a heuristic.

To be fair, most of the in-depth articles about Wordle starting guesses do recognize that there isn't just one way to approach the question, 
and it's possible that a word could be "best" for multiple objectives.
Personally, I like starting with `arose` or `soare` and the following it up with `unity`. Those words cover the vowels + `y` and some more common consonants.

Obviously, the lesson here isn't limited to Wordle.
We encounter claims of "best" all the time, 
whether in advertising or decision-making.
Properly evaluating these claims requires that we
ask the question, "Best *for what*?" or "Best *in what sense*?"
Discerning the answer is critical for understanding
the significance of the claims
and the action steps that should follow.

Like what word you should guess first in a viral online word game.

## Related Links
- [The mathematically optimal first guess in Wordle](https://medium.com/@tglaiel/the-mathematically-optimal-first-guess-in-wordle-cbcb03c19b0a)
- [The Best Starting Word in Wordle](https://bert.org/2021/11/24/the-best-starting-word-in-wordle/)
- [Wordle Has Turned Fans of Word Games Into Argumentative Strategy Nerds](https://www.wsj.com/articles/wordle-has-turned-fans-of-word-games-into-argumentative-strategy-nerds-11641831311?mod=e2tw)
- [Automatic Wordle Solving](https://towardsdatascience.com/automatic-wordle-solving-a305954b746e)
- [Hacking Wordle](https://towardsdatascience.com/hacking-wordle-f759c53319d0)
- [Building a Wordle Solver](https://blogs.mathworks.com/loren/2022/01/18/building-a-wordle-solver/)
- [The best strategies for Wordle](http://sonorouschocolate.com/notes/index.php?title=The_best_strategies_for_Wordle)

