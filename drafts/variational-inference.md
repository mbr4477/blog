---
title: Let's Talk About Variational Inference
date: 2021-10-16
tags: ["math", "probability", "machine-learning"]
---

Previously on this blog I've discusses Markov chain Monte Carlo (MCMC) and how we can use it to estimate a complex posterior distribution we cannot directly solve for. I'll recap some of the motivations for this and then introduce how variational inference can help us solve the same problem. True to form, I'll stick to hand-wavy explanations without math first before introducing a more technical description.

# Problem Definition

In the real world, we often encounter uncertainty. There are things we want to measure or know, but we often can't pin them down to an exact value for any number of reasons. Maybe we can't directly measure the quantity we are interested in (e.g., temperature at the center of the earth) or maybe the value itself might appear to randomly fluctuate (e.g., the total yards of offense of The Ohio State Buckeyes college football team). We can't just say "Ohio State will have exactly 412 yards of total offense," because it varies from game to game (sometimes erratically). Thus, we need to describe total offensive yards as a random variable and specify how likely different values are for this variable using a probability distribution. This distribution enables us to capture uncertainty about the quantity we are interested in.

However, sometimes these random variables are not just output values to describe, but are also the inputs to another process. Maybe the core temperature of the earth affects plate tectonics and the earth's magnetic field or maybe the total yards of the Buckeye offense is one variable that affects their likelihood to make the College Football Playoff. In both cases, the variable is just one of many inputs that is used to calculate the final result. Furthermore, this combination of random variables means that the output is also a random variable with it's own probability distribution that describes it.

Once we have descriptions of all the inputs and the model that combines them to generate the output, we can run simulations to figure out the distribution of the output variable. If we fix the distribution of total yards, we can pick different values according to the distribution and use our model to compute whether Ohio State makes the playoff. If we do this enough times, we'll have a good feel for how much the outcome could vary.

Of course, many times we don't have information about the inputs directly, like the Earth's core temperature from the other example. Rather, we have information about the downstream outcomes, like seismological events we can directly measure. In that case, we start with the outcome and need to predict the distribution of the input values. Most of the time, we can't separate the inputs and treat them independently, which means we have to lump them together in one big random variable that describes them all at once. If that wasn't hard enough already, we also only have the forward model of our problem (from inputs to outputs), so we can't just "run the model backwards" to find out what the inputs were that produced our observations.

This brings us to a key question. Given observations and a model we think describes how they came about, how do we figure out the combined distribution of all the inputs that would've generated these observations ("explain" them)? Solving this problem is called "inference."

I should be a little more specific about what we are exactly trying to find. We will settle for either:

- A collection of "samples" that each represent one possible set of input values. Values that appear in many samples are more likely to better "explain" how the outcomes we observed were generated.
- A "friendly," easy to work with mathematical expression that approximates the input value distribution

In my MCMC blog posts, we looked at one way to do the former. By carefully and sequentially selecting possible values of the inputs in a certain way, we could eventually create a set of samples that appeared as if they came from the true complex distribution even though we couldn't directly describe that distribution.

An alternative method is variational inference, which tackles the latter goal of finding an easier representation of the input value mega-distribution.

# Variational Inference

The key idea of variational inference is to define a simpler distribution with some knobs we can twist to tune it as close as we can get to the real distribution. Here's how we do it:

1. Randomly pick a set of possible input values
2. Run these inputs through our model and assign a score to the output based on how close the simulated outputs are to what we observed (the training data)
3. Use the tunable, simple distribution to try to compute a similar score directly from the input values
4. If the two scores are very different, tweak the knobs of the simple distribution to produce better predictions closer to what the model says.
5. Repeat this until the simple distribution's predictions stop improving

When we finish this process, we have a simpler description of the complex mega-distribution of inputs that we can use to better understand them. The catch is that since the simpler distribution is, well, simpler, it may not capture all the details of the true distribution--it's just the closest we could get given our constraints.

# Quick . . . to the Math!

We'll represent the model inputs as $\bm z$ and the outputs as $\bm x$. These symbols could represent a group of inputs or outputs, not just single values. We will refer to the model as a function $\bm x = f(\bm z)$. The inputs and outputs follow probability distributions $p(\bm z)$ and $p(\bm x)$ which assign a probability score to each possible value of $\bm z$ and $\bm x$, respectively.

We are interested in $p(\bm z \mid \bm x)$, which is the distribution of inputs given some set of observed outputs--we say that the input distribution is "conditioned" on these observations. According to Bayes' Rule, we can say
$$
p(\bm z \mid \bm x) = \frac{p(\bm x \mid \bm z)p(\bm z)}{p(\bm x)}
$$
We can pick whatever we want for $p(\bm z)$, which reflects our initial guess about the inputs without any observations. For example, we might know that Ohio State's yards typically fall between 200 and 700. This doesn't have to be super accurate; we just want to constrain our simulations to "reasonable" values to avoid wasting time evaluating ridiculous inputs. We call this our "prior belief" about the inputs.

We can also estimate $p(\bm x \mid \bm z)$. If we pick a specific set of parameters and generate some outputs, we can estimate $p(\bm x \mid \bm z)$ by calculating how close the simulated outputs are to the training data. 

However, $p(\bm x)$ is the worst. One way to calculate this is with an integral:
$$
p(\bm x) = \int p(\bm x \mid \bm z)p(\bm z) d\bm z
$$
This equation says we have to add up the value of the expression inside the integral across *every single possible combination of $\bm z$ values.* If we more than just a couple simple input variables, this is impossible to do in an efficient way. In technical terms, we say this is "intractable."

To address this, we can notice that $p(\bm x)$ stays the same and rewrite our problem as
$$
p(\bm z \mid \bm x) \propto p(\bm x \mid \bm z)p(\bm z)
$$
The right hand side isn't exactly what we want, but it is correct within a scale factor. We can estimate it as
$$
p(\bm x \mid \bm z)p(\bm z) = p(\bm x, \bm z) = \mathbb E_{\bm z \sim p(\bm z)}[p(\bm x \mid \bm z)]
$$

$$
p(\bm x \mid \bm z) = \mathbb E_{\bm z \sim p(\bm z)}[p(\bm x \mid \bm z)]
$$



