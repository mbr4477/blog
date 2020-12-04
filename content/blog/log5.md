---
date: 2020-12-03
title: Estimating Baseball Event Probabilities With log5
tags: ["baseball", "probability", "math"]
---

In his 1981 and 1983 *Baseball Abstracts*, pioneering sabermetrician Bill James proposed the log5 method for mixing event probabilities, which is [similar to metrics used in other fields](https://angrystatistician.blogspot.com/2013/03/baseball-chess-psychology-and.html). Here are two motivating scenarios:

- Team A has winning percentage $P_A$. Team B has winning percentage $P_B$. What is the expected winning percentage of Team A against Team B?
- A pitcher strikes out 20% of batters he faces. A batter strikes out 10% of the time. What is the expected strikeout rate in this matchup?

# Winning Percentages

Let's start with the Team A vs. Team B scenario. We can derive the log5 formula easily. First, we observe that the winning percentages are essentially probabilities:
$$
\begin{aligned}
p(A) &= \text{probability that A wins} \\
p(B) &= \text{probabilties that B wins} \\
\end{aligned}
$$
 For convenience, we also can define the complement of each:
$$
\begin{aligned}
p(\bar A) &= \text{probability that A loses} = 1 - p(A) \\
p(\bar B) &= \text{probabiltiy that B loses} = 1 - p(B)
\end{aligned}
$$
Obviously, there are only two outcomes:

1. A wins & B loses ($A$ and $\bar B $ occur together)
2. B wins & A loses ($\bar A$ and $B$ occur together)

Next we ask, what's the chance that A wins a game *and* B loses a game? That would be
$$
p(A,\bar B) = p(A)p(\bar B)
$$
And what's the chance that A loses a game *and* B also wins a game? Simply
$$
p(\bar A, B) = p(\bar A)p(B)
$$
This essentially tells us, given that A and B both play a game on the same day *not necessarily against each other*, what is the chance of them achieving opposite outcomes? For example, if A wins 55% of games, and B wins 60% of games, the probability they play independent games on the same day, and A wins, but B loses is:
$$
p(A, \bar B) = 0.55 \times (1 - 0.6) = 0.22
$$
On the flip side, the chance that they play independent games on the same day, and A loses, but B wins is:
$$
p(\bar A, B) = (1 - 0.55) \times 0.6 = 0.27
$$
Here's the twist. If we know that A is playing B on this day, we know the events are not independent. Specifically, we know that *these are the only two possible outcomes.* A and B can't both win or both lose. To make this a valid probability distribution then, the two outcomes must add up to one, which we can guarantee by dividing each probability by their sum. So for A we could write:
$$
p(A \mid \text{A plays B}) = \frac {p(A,\bar B)} {p(A, \bar B) + p(\bar A, B)}
$$
Continuing the example, the probability of A winning is $0.22 / (0.22 + 0.27) = 0.45$. Of course, we can substitute in our previous definitions to get
$$
\begin{aligned}
p(A \mid \text{A plays B}) &= \frac{p(A)p(\bar B)}{p(A)p(\bar B) + p(\bar A)p(B)} \\
&= \frac{p(A)(1 - p(B))}{p(A)(1 - p(B)) + (1 - p(A))p(B)}
\end{aligned}
$$
I find this a more understandable formulation of the core log5 idea. You could come across the equivalent expression on some websites:
$$
p(A \mid \text{A plays B}) = \frac{p(A) - p(A)p(B)}{p(A) + p(B) - 2 p(A) p(B)}
$$
but this is make no intuitive sense when looking at it. 

# Pitcher vs. Batter Matchups

But this doesn't always make sense, especially for pitcher and hitter matchups. We'll look at strikeout rates. Notice that in this case, the stats we have for pitchers and batters refer to the same event, so we don't have to invert one. A basic implementation would be
$$
p(\text{SO} \mid \text{pitcher vs. batter}) = \frac{p_\text{pitcher}(\text{SO}) p_\text{batter}(\text{SO})}{p_\text{pitcher}(\text{SO}) p_\text{batter}(\text{SO}) + p_\text{pitcher}(\overline{\text{SO}}) p_\text{batter}(\overline{\text{SO}})}
$$
What if the pitcher's strikeout rate is 20% and the batter's is 15%?
$$
p(\text{SO}) = \frac{0.2\cdot0.15}{0.2 \cdot 0.15 + 0.8 \cdot 0.85} = 0.042
$$
Hmm. That doesn't seem right. To find out why, think about what information the stats are actually telling us. The pitcher's strikeout rate says, that on average, he strikes out 20% of batters. "On average," means that we assume if he faced an average batter, the strikeout rate would be 20%. Similarly, the batter's strikeout rate of 15% means that, if facing an average pitcher, the batter would strikeout 15% of the time. Thus, what we really need to do is normalize the stats by the league average (which represents both the average pitcher and average batter). Let's see how this changes our equation:
$$
p(\text{SO} \mid \text{pitcher vs. batter}) = \frac{p_\text{pitcher}(\text{SO})p_\text{batter}(\text{SO})/p_\text{league}(\text{SO})}{p_\text{pitcher}(\text{SO}) p_\text{batter}(\text{SO})/p_\text{league}(\text{SO}) + p_\text{pitcher}(\overline{\text{SO}}) p_\text{batter}(\overline{\text{SO}})/p_\text{league}(\overline{\text{SO}})}
$$
This equation is unwieldy. For convenience, let $P = p_\text{pitcher}(\text{SO})$, $B = p_\text{batter}(\text{SO})$, $L = p_\text{league}(\text{SO})$. Then we have:
$$
\text{SO\%} = \frac{PB/L}{PB/L + (1-P)(1-B)/(1-L)}
$$
Notice that we only divide by $L$, not $L^2$, because we only need to normalize one of the rates (pitcher or batter). To see how this works, assume the league average rate is 15%, the same as the batter's. Then we get:
$$
\begin{aligned}
\text{SO\%} &= \frac{0.2 \cdot 0.15/0.15}{0.2 \cdot 0.15/0.15 + 0.8 \cdot 0.85 / 0.85} \\
&= \frac{0.2}{0.2 + 0.8} \\
&= 0.2
\end{aligned}
$$
Which is exactly what we expect! The pitcher strikes out 20% of average batters. The batter, with a rate of 15%, is average. Thus, we should get a strikeout rate of 20% for the matchup. What if the batter is better than league average, with a rate of 10%?
$$
\begin{aligned}
\text{SO\%} &= \frac{0.2 \cdot 0.10/0.15}{0.2 \cdot 0.10/0.15 + 0.8 \cdot 0.9 / 0.85} \\
&= 0.136
\end{aligned}
$$
A rate of 13.6% once again lines up with expectations. The batter is better than average, so the pitcher's strikeout rate is brought down. Alternatively, the pitcher's strikeout rate is higher than average, so the batter's strikeout rate is brought up.

# Why Did We Ignore League Averages for Teams?

"Hold on a second," you may be thinking. "Why didn't we need league averages for the Team A vs. Team B scenario?" In that situation, we would use the league average winning percentage, which is 0.5. (Think about it. In the whole season, across all teams, the number of wins and losses will be equal. Every win has a corresponding loss by the opponent.) Plugging into the equation, we have:
$$
\begin{aligned}
p(A \mid \text{A plays B}) &= \frac{p(A)p(\bar B)/L}{p(A)p(\bar B)/L + p(\bar A)p(B)/(1-L)} \\
&= \frac{p(A)p(\bar B)/0.5}{p(A)p(\bar B)/0.5 + p(\bar A)p(B)/0.5} \\
&= \frac{0.5}{0.5}\frac{p(A)p(\bar B)}{p(A)p(\bar B) + p(\bar A)p(B)} \\
&= \frac{p(A)p(\bar B)}{p(A)p(\bar B) + p(\bar A)p(B)} \\
\end{aligned}
$$
which is the same as our previous equation for the team vs. team matchup. Notice that this hinges on the fact that $L = 1 - L$ when $L = 0.5$. 

# Odds Ratios

We can rework the equation a little more, with some gratuitous algebra, to get something called an odds ratio:
$$
\begin{aligned}
\frac{\text{SO\%}}{1 - \text{SO\%}} &= \frac{PB/L}{PB/L + (1-P)(1-B)/(1-L)} \frac{PB/L + (1-P)(1-B)/(1-L)}{(1-P)(1-B)/(1-L)} \\
&= \frac{PB/L}{(1-P)(1-B)/(1-L)} \\
&= \frac{PB(1-L)}{(1-P)(1-B)L} \\
&= \underbrace{\frac{P}{1-P}}_{\text{odds from pitcher against league avg}}\times\underbrace{\frac{B/L}{(1-B)/(1-L)}}_{\text{odds from batter, normalized to league avg}} \\
\end{aligned}
$$
This conveniently splits our calculation up into independent terms for pitcher and (normalized) batter. We can use this to easily chain new factors. For example, if a pitcher has a homerun rate of 2%, and the batter has a league average homerun rate (roughly 3.5%, according to baseball-reference.com), then typically the matchup rate will be 2%. However, if the ballpark is Coors Field, which has a homerun factor of 1.147 (from [ESPN](http://www.espn.com/mlb/stats/parkfactor/_/sort/HRFactor)), which means the odds are 1.147 HR to 1 HR in the average ballpark. Combining all this gives:
$$
\frac{\text{HR\%}}{1 - \text{HR\%}} = \frac{0.02}{0.98} \times \frac{0.035/0.035}{0.965/0.935} \times \frac{1.147}{1} = 0.023
$$
which corresponds to a rate of 2.3%. Thus, the ballpark causes the pitcher to perform slightly worse than usual against the average batter. 

Thus, thanks to Bill James and log5 you can evaluate specific pitcher vs. batter matchups and even include park factors or other environmental conditions. This method is restricted to binary events, but by creating a binary tree, it is possible to simulate all the outcomes of an at bat.