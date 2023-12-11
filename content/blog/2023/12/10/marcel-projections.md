---
title: Marcel Projections
date: 2023-12-10
tags: ["math", "baseball"]
---



Let’s breakdown [Marcel projections](http://tangotiger.net/marcel). When projecting a player, Marcel combines two estimates: a player-level estimate and a league-level estimate.

$$
\text{Marcel} =  \alpha \times \text{(player-level)} 
+ (1 - \alpha)\times\text{(league-level)}
$$
The $\alpha$ value is the “reliability” of the player-level estimate. It quantifies the tradeoff between trusting the player-level estimate versus falling back to the league-level estimate.

# Finding the Player-Level Estimate

We find the player-level estimate through a weighted average of performance over the past three years:
$$
\text{(player-level)} = \frac{3n_3x_3 + 4n_2x_2 + 5n_1x_1}
{3n_3 + 4n_2 + 5n_1}
$$
where $n_i$ is the player’s “opportunities” (PA for batting) from $i$ years ago  and $x_i$ is the player’s “rate stat” (# / opportunity) from $i$ years ago.

> Juan Soto had 196, 654, and 664 PA in 2020-2023 and hit 13, 29, and 27 HR. His rate stats are then 0.066, 0.044, and 0.041 HR/PA for those three years. His player-level estimate for 2023 would be:
> $$
> \begin{aligned}
> \text{2023 HR/PA} &= \frac{3(13) + 4(29) + 5(27)}{3(196) + 4(654) + 5(664)} \\
> &= 0.044
> \end{aligned}
> $$

# Finding the League-Level Estimate

The league-level estimate is also a weighted average of the past three years. Tango’s Marcel method includes the player’s PA in weights (see comment #25 on [this page](http://www.tangotiger.net/archives/stud0346.shtml) that shows an example). While it doesn’t explain why this player information is included in the league-level weights–somewhat counterintuitively in my opinion–my best guess is is that it captures the “relevance” of each year’s league average. If a player had 0 PA one year, maybe we don’t want to include it in the league-level estimate since he wasn’t in the population of players that produced that estimate. I don’t quite buy this since the point of the league-level estimate is to capture information unrelated to the specific player. Regardless, here’s the Marcel league-level estimate:
$$
\text{(league-level)} = \frac{3n_3x'_3 + 4n_2x'_2 + 5n_1x'_1}
{3n_3 + 4n_2 + 5n_1}
$$
where $x'_i$ is the league-level rate stat.

>
>
>There were 66304, 181115, and 181574 PA in 2020-2022 along with 2304, 5944, and  5215 HR. The league-level rate stats are then 0.035, 0.033, and 0.029. The league-level estimate is then:
>$$
>\begin{aligned}
>\text{2023 HR/PA} &= \frac{3(196)(0.035) + 4(654)(0.033) + 5(664)(0.029)}{3(196) + 4(654) + 5(664)} \\
>&= 0.031
>\end{aligned}
>$$

# Finding the Reliability

Somewhat arbitrarily, Marcel calculates the reliability as:
$$
\alpha = \frac{3n_3 + 4n_2 + 5n_1}{3n_3 + 4n_2 + 5n_1 + 1200}
$$
where the 1200 essentially means we want to add 1200 weighted PA of league-level to the player’s weighted number of PA. The 1200 weighted PA is like 100 PA for each of the past three years since $3(100) + 4(100) + 5(100) = 1200$.

> Juan Soto’s weighted PA is $3(196) + 4(654) + 5(664) = 6524$. His reliability score is then
> $$
> \alpha = \frac{6524}{6524 + 1200} = 0.84
> $$
> Putting all this together, we get Soto’s projected 2023 HR/PA to be
> $$
> (0.84)(0.044) + (1 - 0.84)(0.031) = 0.042
> $$

# Adjusting for Age

Marcel adds a simple age adjustment to the rate projections:
$$
\text{(age adjustment)} = \begin{cases}
0.006\times(29-x),& x<29 \\
0.003\times(29-x),& x\geq 29
\end{cases}
$$
where $x$ is the player’s age.

> Juan Soto was 25 in 2023. His age adjustment is then $0.006 \times (29 - 24) = 0.024$. Adding this to his projected 2023 HR/PA, we get an adjusted rate of 0.066.

# Estimating PA and Final Projection

To get the final non-rate estimate, we need to estimate the player’s expected PA. Marcel’s formula for this is simple:
$$
\text{xPA} = 200 + 0.1n_2 + 0.5n_1
$$

> Juan Soto’s 2023 xPA would be $200 + 0.1(654) + 0.5(664) = 597$. Combining this with the estimated rate stat of 0.066 HR/PA, we can project his 2023 HR to be $0.066\times597 = 39$ (to 2 significant figures). Soto actually hit 35.

# An Alternate League-Level Estimate

As I mentioned before, I don’t quite buy Marcel’s weighting of league-level rate stats with the *player’s* PA in those years. Instead, I’d weight them with the *league’s* total PA:
$$
\text{(league-level)} = \frac{3n'_3x'_3 + 4n'_2x'_2 + 5n'_1x'_1}
{3n'_3 + 4n'_2 + 5n'_1}
$$
where $n'_i$ is the total PA in the season $i$ years ago. I have two reasons for proposing this:

1. It prevents a divide by zero error for rookies that have 0 PA in each of the past three years. (Go back to the original league-level estimate formula and try it with $n_1 = n_2 = n_3 = 0$).

2. By using the total PA weights instead of removing the PA component altogether we can handle shortened seasons like 2020. 

   We don’t want as much weight on the 2020 season, and weighting by total PA helps account for this. The higher-than-average rate in 2020 pulls the estimate up to 0.032. Including total PA weights gives $[3(2304) + 4(5944) + 5(5215)] / [3(66304) + 4(181115) + 5(181574)] = 0.031$. Without the PA component, the 2020-2023 league-level HR rate would be $[3(0.035) + 4(0.033) + 5(0.029)] / 12 = 0.032$. The higher-than-average rate in 2020 has an outsized affect on the total rate, increasing it by 0.001. 

> For the Juan Soto example, we can use the new 0.031 estimate instead of the previous value of . . . 0.031 ?! Why are the league-level HR values the same despite this change? It’s because Soto is an everyday player, so his PA reflects the total league PA. If the league PA goes up, so does his. If the league PA goes down, his does too. The difference would become more apparent for bench players whose PA more independent from the league PA.

How does this alternate approach change the projections overall? Well, on the Lahman database of batting stats, the correlation between the original Marcel and the alternate Marcel is 0.997, roughly meaning that 99.7% of the variation in the original Marcel is still captured in the alternate version. The biggest difference is 0.76-0.78 HR on players with  the lowest PA (<100). So the alternate version isn’t that different from the original while also being a bit more robust and applicable to rookies.
