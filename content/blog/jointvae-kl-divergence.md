---
date: 2020-09-24
title: Disentangling VAEs, KL Divergence, and Mutual Information
tags: ['probability', 'math', 'machine-learning', 'jointvae']
---

I've recently been reading about the JointVAE model proposed by Emilien Dupont in the paper [Learning Disentangled Joint Continuous and Discrete Representations](https://papers.nips.cc/paper/7351-learning-disentangled-joint-continuous-and-discrete-representations.pdf). The paper builds on the development of variational autoencoders (VAEs). As a quick overview, *autoencoders* are neural networks that take an input, generate some "secret" representation of it, then try to use that "secret" code to reconstruct the input. If it can do that well, then we have found a secret code that summarizes the important features of the original input, but is likely easier to work with. 

In variational autoencoders, instead of directly generating the secret code from the input, we generate the parameters of a probability distribution (like the mean and variance) and then pick a random vector from this distribution that will be our secret vector. This could be useful if we are interested in the random variation that could be present in the secret code, or if we want a *generative model* which can give us fake version of the original input based on a secret code we manually pick. Thus the basic idea is
$$
\text{input} \to \text{distribution parameters of secret code} \to \text{sampled secret code} \to \text{reconstructed input}
$$
In basic VAEs, there's no constraint on how the network learns the parameters of the secret code distribution. In fact, we could end up with a distribution in which the individual secret code values are *entangled* or dependent on each other. Maybe the first value could be any number from zero to one, but the second value is always the first value squared. Thus the two values are entangled.

Is this bad? Not necessarily, but it may be very unhelpful depending on our application goal. Let's say we want a generative model. A typical example in the field is human faces. If we train our VAE on a bunch of face images, we could manually pick secret codes to generate new fake faces. Unfortunately, with a vanilla VAE approach the faces we generate would be essentially random. This is not great. It would be way better if we could "control" each major aspect of the headshot&mdash;hair color, shape, expression, etc. 

So how do we make sure that the secret reflects these separate features instead of being all tangled up and seemingly random?

# $\beta$-VAE

I'm glad you asked. One approach is $\beta$-VAE, which rests on a pretty basic principle of probability distributions. When you have more than one variable in a distribution (i.e., it is multivariate), you no longer just have a variance. Instead you have a *covariance matrix* which tells you the dependencies between each pair of variables in the distribution. The values running down the diagonal of the matrix give the independent variance of each variable (i.e, the variance that cannot be explained away by the values of the other variables) while the off-diagonal elements give the interdependency between different pairs of variables. With this in mind, you might say, "Hey! Is there a way we can keep the variance parameters of the secret code to be more like a diagonal matrix with ones on the diagonal and zeros everywhere else to get rid of any interdependency?" Yes! We can add a penalty term during training that compares the secret code distribution to the disentangled distribution to encourage the secret code distribution parameters to be independent (factorizable).

Returning to our idea of controlling fake facial features, we make the assumption that if we find a bunch of independent secret code values, each value will control an independent feature of the headshot, and BOOM, suddenly the code values have become *semantically meaningful*, which is a fancy way of saying that each value has a meaning we can pinpoint and understand like hair color, etc.

# JointVAE

It turns out that $\beta$-VAE isn't bad for continuous features. For example, we might be able to use it to find features that control the angle of a headshot or zoom level. However, it doesn't really apply for things that are discrete. In the context of the frequently used MNIST handwritten digits data set, $\beta$-VAE might be good at predicting the thickness or angle of the digits, but not great at finding a feature that controls the digit value itself. Why? Well there's not a smooth transition between each digit. They are essentially 10 disconnected classes. 

JointVAE is a way to handle these discrete classes. The idea is essentially the same as $\beta$-VAE, but proposes a new way to calculate the entanglement of the discrete parameters so we can train a network to disentangle them. This hinges on the use of the *Gumbel softmax* distribution.

# And Now, ... the Math

If all that kind of made sense, you can stop there and feel good about what you've learned, and wow your friends with your AI knowledge. The next section is rather math heavy, so be warned. Feel free to pull the ejection handle and blast out of here while you can.

If you are still here, it's time to get into the weeds!

We're going to start in a completely different area, but I promise we'll work our way back to JointVAE.

## Information

Intuitively, you might realize that if some event occurs pretty often, we get less information out of it than if the event occurs less frequently. For example, "NASA landed on the moon again" is a lot more informative than "Monday Night Football is happening on Monday night this week." I could've guessed that last statement, so it doesn't really carry much information. It would be handy to capture this numerically. Ideally, an event that has a probability of zero carries a ton of information, while an event that has a probability of one has zero information. With that in mind, we define
$$
I(\text x = x) = - \log P(\text x = x)
$$
which says that the information encoded when some random state $\text x$ is $x$ is the negative log of the probability of $x$ occurring. If $P(\text x = x) = 1$, this expression is zero. If $P(\text x = x) = 0$, the expression is $\infty$. Practically this is okay since we will never calculate the information of an event that will never happen.

> **This definition is essentially arbitrary!** There's not necessarily any theory your missing that would make this an obvious choice to you. The real benefit to this definition is that it turns out to have some practical meaning if we talk about information encoded in bits, and it makes some of our calculations easier since the log can turn multiplications and divisions into additions and subtractions, respectively.

## Entropy

So if $I(\text x = x)$ which I'll shorten to $I(x)$ is the information in a single event, what about the information encoded in the whole distribution $P$? One way to quantify this is via *entropy*, which is the *expected information* that $P$ produces if we randomly pick a sample from $P$ (I'm shortening $P(\text x = x)$ to $P(x)$):
$$
\begin{aligned}
H(P) &= \mathbb E_{x \sim P}[I(x)] \\
&= \mathbb E_{x \sim P}[-\log P(x)]
\end{aligned}
$$
So how exactly do we calculate the expected value? The idea is pretty simple, the expected value will be the sum of each $I(x)$ for each possible outcome $x$ in $P$ **times the probability that the outcome occurs**. So the entropy is the weighted sum of all the individual event information, where the weights are the chance the event actually occurs. Think about that for a minute, and hopefully it makes sense. Even if an event has a *ton* of information, if it doesn't happen very often, it really won't contribute much information in the long run. For a discrete distribution, we can write the entropy as
$$
\begin{aligned}
H(P) &= \sum_x P(x)I(x) \\
&= \sum_x P(x)(- \log P(x)) \\
&= - \sum_x P(x)\log P(x)
\end{aligned}
$$
where $\sum_x$ means the sum across every possible event $x$.

## Kullback-Liebler Divergence

A natural question at this point is, "Can we use entropy and information to compare two distributions?" For example, maybe we have some event $x$ and we want to find the difference in information between two distributions of $x$, $P$ and $Q$. In others, if $x$ occurs from distribution $P$, does this event have more or less information than the information $x$ has according to distribution $Q$? We can write this as
$$
\begin{aligned}
\mathbb E_{x \sim P}[I_P(x) - I_Q(x)] &= \mathbb E_{x \sim P}[I_P(x)] - \mathbb E_{x \sim P}[I_Q(x)] \\
&= H(P) - H(P,Q)
\end{aligned}
$$
We can substitute our previous definition of $H(P)$, and we define a new expression $H(P,Q)$ as the *cross-entropy* between $P$ and $Q$. It is the information from distribution $Q$, but weighted and summed based on the probability of the event happening according to the other distribution $P$. Take a deep breath, and read that a couple times. 

Returning to the full expression, which we term *Kullback-Liebler (KL) divergence*, and write
$$
D_{KL}(P \parallel Q)
$$
 we can see that if the event has the same information in both distributions, then $-\log P(x) = -\log Q(x)$ (remember the definition of information), and we can infer that $P(x) = Q(x)$. So if we randomly pick an $x$ from $P$ and the expected value of the information difference is zero, we can take a guess that the two distributions are pretty much identical *from the perspective of $P$*. This last part is really important. It says that all the events that might reasonably occur in $P$ occur at a similar frequency in $Q$ if the KL divergence is close to zero. It does *not* say that events that reasonably occur in $Q$ will occur at a similar frequency in $P$. Think about if $P$ is a standard bell curve, but $Q$ is a bell curve with a really long tail on one side. If we pick events from $P$, we will mainly get events near the center of the bell curve. At this point, both $P$ and $Q$ are pretty similar, so the KL divergence will be near zero. In a sense, because $P$ has shorter tails, it will not explore the regions in which it is more different than $Q$. Thus, in the perspective of $P$, it is pretty similar to $Q$. 

$Q$, however, does not think so. When we flip the divergence around to find $D_{KL}(Q \parallel P)$, we are taking samples from $Q$. Because it has a longer tail, it is more likely to draw samples from the region in which it is different from $P$. Thus, the expected value of the information difference is now higher, the KL divergence is higher, and the two distributions are therefore more different from the perspective of $Q$.

# Returning to Disentanglement

Now we have the information (no pun intended) we need to revisit the idea of disentangling a distribution. Reframing the problem, we have some distribution of secret code values that might be interdependent. The basic idea is to penalize the secret code distribution if it drifts too far from the ideal, disentangled distribution. Wait, do I hear you suggesting we might be able to use KL divergence to measure this?! How insightful!
$$
\text{minimize this} \to D_{KL}\big(Q(z) \parallel P(z)\big)
$$
$Q(\boldsymbol z)$ is the probability distribution of the secret code $\boldsymbol z$, and $P(\boldsymbol z)$ is a distribution with our desired disentanglement. Now, in practice we can't do this directly. Why not? Well, in reality, we feed an input $\boldsymbol x$ into our VAE and this input generates our secret code distribution. Thus our pick of $\boldsymbol z$ is dependent on the choice of input, and we end up with
$$
\text{minimize this?} \to D_{KL}\big(Q( z \mid x) \parallel P(z)\big)
$$
Now the question becomes, if we minimize this across random samples drawn from the input data distribution, do we actually end up minimizing the thing we want from the previous equation? We can figure this out by looking at the expected value of this most recent equation over values we pull from the input. Buckle up for this one.
$$
\begin{aligned}
\mathbb E_{x \sim P_\text{data}}\bigg[D_{\text{KL}}\big(Q(z \mid x) \parallel P(z) \big)\bigg]
&= \mathbb E_{x \sim P_\text{data}}\bigg[\mathbb E_{z \sim Q(z\mid x)}[\log Q(z \mid x) - \log P(z)]\bigg] \\
&= \mathbb E_{x \sim P_\text{data}}\bigg[\mathbb E_{z \sim Q(z\mid x)}\left[\log \frac{Q(z \mid x)}{P(z)}\right]\bigg] \\
&= \mathbb E_{x \sim P_\text{data}}\bigg[\mathbb E_{z \sim Q(z\mid x)}\left[\log \frac{Q(z \mid x)}{Q(z)}\frac{Q(z)}{P(z)}\right]\bigg] \\
&= \mathbb E_{x \sim P_\text{data}}\bigg[\mathbb E_{z \sim Q(z\mid x)}\left[\log \frac{Q(z \mid x)}{Q(z)} + \log \frac{Q(z)}{P(z)}\right]\bigg] \\
&= \mathbb E_{x,z \sim Q'(x,z)}\left[\log \frac{Q(z \mid x)}{Q(z)}\right] + \mathbb E_{x,z \sim Q'(x,z)}\left[ \log \frac {Q(z)}{P(z)}\right] \\
&= \mathbb E_{x,z \sim Q'(x,z)}\bigg[\log \frac{Q'(x,z)}{P_\text{data}(x)Q(z)}\bigg] + \mathbb E_{x,z \sim Q'(x,z)}\left[ \log \frac {Q(z)}{P(z)}\right] \\
&= \underbrace{D_\text{KL}\big(Q'(z,x) \parallel P_\text{data}(x)Q(z)\big)}_{\text{how far is the joint from independent?}} + \mathbb E_{x,z \sim Q'(x,z)}\left[ \log \frac {Q(z)}{P(z)}\right] \\
&= \underbrace{I(x,z)}_{\text{shared/mutual information}} + \underbrace{\mathbb E_{z \sim Q(z)}}_{\text{we only need } z}\left[ \log \frac {Q(z)}{P(z)}\right] \\
&= \underbrace{I(x,z)}_{\text{shared/mutual information}} + \underbrace{D_\text{KL}\big(Q(z) \parallel P(z) \big)}_{\text{divergence between marginals}} \\
&= \underbrace{I(x,z)}_{\text{maximize this}} + \underbrace{D_\text{KL}\big(Q(z) \parallel P(z) \big)}_{\text{minmize this}} \\
\end{aligned}
$$
Let's step through this carefully. First we expand the KL divergence definition and do some algebra to rearrange things. The first big thing happens when we convert
$$
\mathbb E_{x \sim P_\text{data}}\big[\mathbb E_{z \sim Q(z \mid x)}[\cdot]\big]
= \mathbb E_{z,x \sim Q'(z,x)}[\cdot]
$$
which essentially says the expected value of drawing a value from the data, then the expected value of drawing a value from the secret code distribution based on this input is the same as drawing both samples at once from the *joint* distribution $Q'$ of both the input and the secret code together.

Next we use Bayes' Rule to convert
$$
Q( z \mid x) = \frac{Q'(x,z)}{P_\text{data}(x)}
$$
(I'm planning to blog about Bayes' Rule soon.)

Next we can use the definition of KL divergence to rewrite
$$
\mathbb E_{x,z \sim Q'(x,z)}\bigg[\log \frac{Q'(x,z)}{P_\text{data}(x)Q(z)}\bigg] = D_\text{KL}\big(Q'(z,x) \parallel P_\text{data}(x)Q(z)\big)
$$
which as the note says is a measure of how the joint distribution of $z$ and $x$ is from the distribution in which $z$ and $x$ are independent. If the joint is very close to the distribution with separate independent factors, than $x$ and $z$ and pretty independent and the *mutual information* between them is very low. However, if the joint distribution is far from the independent, factorized distribution, then $x$ and $z$ are entangled in some way and share information. 

This is important to catch. **We want $x$ and $z$ to be entangled and share information, since that means that the secret code is capturing the same information as the original input. This is good. However, we *do not* want the individual parts of $z$ to be entangled with each other.**

We can apply the KL divergence definition one more time to find out that the find expression is the sum of the mutual information between the input and secret code (which we want to maximize) and the divergence between the secret code and the desired disentangled goal (which we want to minimize).

All this to say, if we minimize $D_{KL}\big(Q( z \mid x) \parallel P(z)\big)$, we end up minimizing what we want, which is the last term $D_{KL}\big(Q(z) \parallel P(z)\big)$, but we also inadvertently minimize $I(x,z)$, which will end up hurting our ability to reconstruct the input from the secret code. Remember that reconstruction is a key objective of autoencoders.

This brings us to a key problem of $\beta$-VAE. There is a tradeoff between minimizing reconstruction error and minimizing the entanglement of the secret codes.

# Adjusting Capacity

One straightforward way to counteract this would be to see if we can subtract $I(x,z)$ from the expression before we minimize it so we can keep the mutual information. To try this, we just need to find a way to estimate $I(x, z)$ as we go through training. Intuitively, we believe that the mutual information should start close to zero at the beginning and slowly increase as the model learns to reconstruct the inputs better and better. With that in mind we can change our object to minimizing
$$
D_{KL}\big(Q( z \mid x) \parallel P(z)\big) - C
$$
where $C$ is a capacity parameter that gradually increases during training to counteract the increase in mutual information. Ideally, $C$ maxes out at the maximum amount of mutual information. If it goes above this, it will counteract the mutual information but also "eat into" the real entanglement metric we want to minimize. Thus, our network will think it is doing a good job minimizing entanglement when in reality we just let $C$ get too high, and the values could still be entangled.

# Bringing It Back Around To JointVAE Loss

*Now* we're ready to look at the JointVAE loss function that we want to minimize:
$$
\begin{aligned}\mathcal L(x, \hat x, z_c, z_d) &= 
\overbrace{\mathcal L_{\text{MSE}}(x, \hat x)}^{\text{reconstruction loss}} \\
&+ \gamma \bigg[ \overbrace{D_{\text{KL}}\bigg(q(z_c \mid x) \parallel p( z_c)\bigg)}^{\text{divergence from factorized prior}} - C_d \bigg] \\
&+ \gamma \bigg[ \overbrace{D_{\text{KL}}\bigg(q(z_d \mid x) \parallel p(z_d)\bigg)}^{\text{divergence from factorized prior}} - C_c\bigg]
\end{aligned}
$$
We have two secret codes here: $z_c$ for the continuous values and $z_d$ for the discrete values, and $\hat x$ is the reconstructed input value. The hyperparameter $\gamma$ controls the balanced between focusing on reconstruction or disentanglement. If we pick the right, gradually increasing values of $C_d$ and $C_c$ during training, we can preserve the mutual information of the continuous and discrete variables while minimizing the entanglement. According to the JointVAE paper, the max $C_d$ value can be the maximum capacity of the discrete variables based on the number of classes, while the max $C_c$ value is hard to calculate and should be set as high as possible without "fooling" the minimization algorithm into settling for lower disentanglement as mentioned in the last section.

# Conclusion

Thanks for reading! Even if you don't work much with JointVAE, I hope this post gave you an overview of VAEs, the entanglement problem, how we get KL divergence, and the potential tradeoff problems with vanilla $\beta$-VAE.

# Further Reading

The JointVAE paper by Emilien Dupont is [Learning Disentangled Joint Continuous and Discrete Representations](https://papers.nips.cc/paper/7351-learning-disentangled-joint-continuous-and-discrete-representations.pdf).

Using the capacity parameters may not be the best approach. One alternative for continuous secret codes (*latent vectors*) is proposed by [Disentangling by Factorising](https://arxiv.org/pdf/1802.05983.pdf).

I would be remiss for not mentioning that I drew much help from Goodfellow, Bengio, and Courville's classic reference, [*Deep Learning*](https://www.amazon.com/Deep-Learning-Adaptive-Computation-Machine/dp/0262035618/ref=sr_1_3?dchild=1&keywords=deep+learning&qid=1600958151&sr=8-3). 