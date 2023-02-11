---
title: Markov Chain Monte Carlo Sampling
date: 2020-09-23
tags: ['probability', 'math']
---

One of my courses recently introduced Markov Chain Monte Carlo (MCMC) sampling, which has a lot of applications. I'd like to dive into those applications in a future post, but for now let's take a quick look at Metropolis-Hastings MCMC.

# A Brief Prologue
Let's say we have a probability distribution function $p_\text{target}(x)$  (within a mulplicative constant) that is very complex. We have an equation, but maybe it is impossible to integrate. Somehow, we'd like to draw samples from this distribution to estimate things like its average (expected value).


# Markov Chains for Sampling

Given a starting state (sample), a Markov chain can tell us the probability of going to each possible next state. So if we have a current state, we can use the Markov chain to tell us the distribution of possible next states.

Hmm. Here's an idea: what if we built a Markov chain such that the distribution of next states exactly matched our target distribution? Then if we had an existing sample, we could use the chain to quickly find another one!

So what would this ideal Markov chain act like? How do we decide what the "right" transitions are? Well, we want transitions that in the long run will cause the distribution of the next sample to become our target distribution. That is, if we pick *any* starting sample and run the Markov chain far into the future, we expect that the probability of states at that far horizon time to mirror our target distribution.

Therefore, after we run the Markov chain a bunch of times, the next sample in the sequence will no longer be coupled or highly dependent on the first sample we started with, but will appear to come from the "stationary distribution," which is our target distribution. The distribution is "stationary" because the Markov chain always ends up there in the long run.

Since we know that the distribution should be stationary, the first step in finding this transition probability is to figure out how to guarantee this. It turns out this is pretty easy. The transition should meet the "detailed balance" requirement, which essential just means that the chance of moving from $x$ to $y$ is the same as that of moving from $y$ to $x$.

Specifically, if we have a distribution *that we know* $p_\text{target}(x)$, we want to find some easily samplable conditional transition $p(x_{n+1} \mid x_n)$ such that 
$$
p_\text{target}(x_{n+1}) p(x_n \mid x_{n+1}) = p_\text{target}(x_n) p(x_{n+1} \mid x_n)
\tag{🌴}
$$

This last expression (:palm_tree:) says that we want the probability of starting at $x_n$ and moving to $x_{n+1}$ (the right hand side) to equal the probability of starting at $x_{n+1}$ and moving to $x_n$.

With all this in mind, we can boil things down to a simple question. **If I have some sample $x_n$ and some $x_{n+1}$, how do I decide if $x_{n+1}$ is a good next sample from the target distribution?**


# The Metropolis-Hastings Algorithm

This sounds like a product of some Superman villain. That might be better than the math we are about to dive into.

Let's start off by deciding how to pick our candidate $x_{n+1}$ given our existing sample $x_n$. We'll opt to draw it from some distribution $p_\text{proposal}(x_{n+1} \mid x_n)$. In practice, this could end up being a simple normal distribution $\mathcal N (x_n, 1)$ or whatever you want. We want the chance that we pick and accept this sample to equal the desired transition probability:

$$
p(x_{n+1} \mid x_n) = \underbrace{p_\text{accept}(x_{n+1}, x_n)}_{\text{chance we accept}} \times \underbrace{p_\text{proposal}(x_{n+1} \mid x_n)}_{\text{chance we pick}}
\tag{🚀}
$$ 

Remember we want to satisfy (:palm_tree:), which we can rearrange to get

$$
\frac {p_\text{target}(x_{n+1})}{p_\text{target}(x_n)} = \frac {p(x_{n+1} \mid x_n)}{p(x_n \mid x_{n+1})}
$$

A quick substitution using (:rocket:) yields 

$$
\frac {p_\text{target}(x_{n+1})}{p_\text{target}(x_n)} = \frac {p_\text{accept}(x_{n+1}, x_n) p_\text{proposal}(x_{n+1} \mid x_n)}{p_\text{accept}(x_n, x_{n+1}) p_\text{proposal}(x_n \mid x_{n+1})}
$$

Moving some terms around gives us a required condition for picking an acceptance distribution:
$$
\frac {p_\text{accept}(x_n, x_{n+1})}{p_\text{accept}(x_{n+1}, x_n)} = \frac {p_\text{target}(x_n) p_\text{proposal}(x_{n+1} \mid x_n)}{p_\text{target}(x_{n+1}) p_\text{proposal}(x_n \mid x_{n+1})}
\tag{🍕}
$$

So now the trick becomes finding an acceptance distribution that satisfies (:pizza:). When should we accept the sample from the proposal, given our current sample, and when should we reject it?

#  :cityscape: The Metropolis Choice
Let's try the *Metropolis choice*:

$$
p_\text{accept}(x_n, x_{n+1}) = \min \left(1, \frac {p_\text{target}(x_n) p_\text{proposal}(x_{n+1} \mid x_n)}{p_\text{target}(x_{n+1}) p_\text{proposal}(x_n \mid x_{n+1})}\right)
$$

Notice now that if $p_\text{accept}(x_n, x_{n+1}) = ⚾ < 1$, then $p_\text{accept}(x_{n+1}, x_n) = \min (1, \frac 1 ⚾) = 1$ and vice versa. Thus, the Metropolis choice satisfies (:pizza:)! Feel free to do the algebra on your own if you're not convinced. It works. Trust me.

This is *really* useful and important! Why? Because *we know all the values needed to calculate* :baseball:!! We know $p_\text{target}(\cdot)$ (within a constant, which disappears due to the fraction), and we know $p_\text{proposal}(\cdot \mid \cdot)$ because we picked it ourselves (likely a normal distribution). Once we have $p_\text{accept}(\cdot, \cdot)$, sampling is easy! We can just draw a uniform $u \in [0, 1)$, then check if $u < p_\text{accept}$ (which will happen exactly $p_\text{accept}$ of the time). If this is true, then $x_{n+1}$ becomes our new starting sample.

Remember, though, that our new samples will only appear to come from the target distribution *in the long run*. So we can't expect our first couple samples to be helpful. Some people talk about *burn-in*, or the amount of iterations needed before the samples actually start to converge to the target distribution. In other words, we have to give the algorithm time to "find" the target distribution.

# Wrapping Up
Whew, that was a whirlwind. Hopefully, sometime soon I'll be able to revisit this to give a higher level overview of sampling and why it is useful, but for now, this rushed explanation of MCMC and Metropolis-Hastings will have to do.

# References
Honestly, the [Wikipedia article](https://en.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm) isn't that bad compared to most math pages, but I probably skimmed a dozen resources to piece together the MCMC and Metropolis-Hastings derivation.

    

