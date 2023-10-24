---
title: Normalizing Flows Are Awesome
date: 2021-10-08
description: Sample from complex posteriors by just sampling from a simple Gaussian distribution?! Sign me up!
tags: ["machine-learning", "probability"]
---

We want to generate images of elephants :elephant:. Each observation or image occurs within a "universe." A 32x32 pixel image lives in a universe with 1024 dimensions, one for each pixel.

*This grid is 2D representation of the universe of all possible images*

Surprisingly, not all images are elephants. Instead, elephant images are confined to certain regions of the image universe. We can assign a number to each region of the image universe that represents whether that region contains elephant images. This creates a function that specifies the density of elephants at every point in the image universe.[^1] The value will be higher where elephantlike images cluster together and lower everywhere else. 

*Astronauts are not very elephant-like*

This *probability density function* must take *every* pixel into account. This is ridiculously complex. Could you tell me, in terms of pixel values, how to determine the elephantness of *any* possible image? Think of how many different angles, lightings, and environments an elephant could show up in! 

What if the elephants themselves could teach us this information? Maybe we can somehow learn this density function from many representative pictures of elephants, and learn it in a way in which we can generate new pictures of elephants from it (sampling).

More generally, sampling refers to the process of coming up with new images of elephants by picking them from the image universe according to the probability density function. Even if we could write this function out, it would still be very hard to find new pictures. 

However, there are simple density functions that are easy to sample from such as the familiar bell curve distribution which means that new samples will most likely appear around the middle and less likely at the tail values. This begs the question --- can we find a function that takes bell samples and turns them into elephant images? This is more useful to us than finding the elephant density function directly. While we can't use the elephant density function to generate new elephant samples, we *could* make use of a function that makes elephants out of bell samples. Since we can easily generate new bell samples, hopefully our function would learn to turn each of them into different elephants.



 From probability theory, we know that when we apply a function to random variable samples, the samples then appear to come from a different distribution. Thus, one idea would be to generate samples from an easy distribution and find a function that transforms these samples into ones that appear to come from a more complex distribution.

Once again, this function is too complex to develop by hand---we need to learn it from data.

Neural networks are universal function approximators that can be trained using example data. Therefore, we can use a NN model to represent the random variable transformation.

How do we train this NN? As a generative model, it will take bell samples and try to turn them into elephant samples. Thus, we need a way to measure the "elephant-ness" of the output samples and use this as the optimization criterion during training. In other words, we need a way to check if the distribution of our model outputs matches the real distribution of elephant images, as implicitly or empirically defined by our data set.

There are many ways to do this. One way is to use a metric that can estimate the difference between distributions when given batches of samples from each distribution. Maximum Mean Discrepancy (MMD) and Wasserstein distance fall into this category, although MMD produces unimpressive results without some additional network modifications (Li 2015; Goodfellow, 2016, Section 20.10.5), likely caused by the high dimensionality of the distributions being compared.

Alternatively, we could use a second NN to hand out ratings to the first NN (the generator). This network is called a discriminator, and needs to be trained to distinguish good elephant pictures from bad elephant pictures. However, if we just train the model to distinguish elephant images from a lot of images that are clearly not elephants, it won't learn the finer points of what makes an elephant an elephant. It needs to be confronted with examples of "almost-but-not-quite elephants" to learn these details.

Where then can we find lots of fake elephant pictures to use to train the discriminator? We can use the generator. This causes conflict. The generator tries to create images that the discriminator thinks looks like elephants, while the discriminator wants to stay one step ahead by finding the differences between real and fake elephants. While the generator will start out generating very bad pictures, it will learn from the discriminator's feedback. However, as the generator gets better, the discriminator will keep moving the goalposts, setting the bar higher and higher for what makes a real elephant image.

If all goes well, eventually the generator cannot improve because the discriminator cannot move the bar any higher. At this point, the generator is creating images that look just like real elephants as far as the discriminator is concerned.

However, this does not always mean we achieved our goal. For instance, the generator might have stumbled across an image that looks very realistic and begin generating only that image because it fools the discriminator every time. This is called mode collapse; the distribution of the generator's output has collapsed to a single output example or mode.

Wasserstein distance does a better job at avoiding mode collapse. However, we still need to gradually shape our output distribution by comparing it to a data-defined empirical distribution. We cannot directly optimize using maximum likelihood estimation because we cannot explicitly compute the desired target distribution.

Variational Autoencoders (VAE) try to fill this gap. An encoder maps an input observation to the parameters of an easily-sampleable distribution. Samples from this distribution are then mapped back to the observation using a decoder. We essentially try to learn the forward and inverse problems simultaneously using two different models.

Here we enter the world of normalizing flows. A flow is an invertible sequence of random variable transformations. A normalizing flow maps samples from a complex non-standard distribution into normalized distribution. Put another way, a normalizing flow estimates the probability density function (PDF) value of a sample by mapping the sample to a simple distribution where the PDF is easy to directly compute. Of course, because the flow is invertible, samples from the simple distribution can be used to generate new examples from the complex distribution. This is called variational inference, in which we try to estimate the posterior, or joint output, distribution.

This opens the door to directly finding the transformation via maximum likelihood estimation. We no longer have to implicitly compare distributions via some metric but can directly optimize the normalizing flow using our analytical knowledge of the simple distribution.

Of course, there are constraints on how we create the normalizing flow. First, the flow must be invertible. Second, if we are to do density estimation, we need to normalize the transformation using information about the transform's Jacobian, as indicated by the random variable transformation chain rule. For now, we will just focus on the first requirement---invertibility.

We can define one general type of invertible function, coupling functions, in cryptographic terms to help us understand it (Dinh 2014). Coupling functions take two inputs---a variable and a key used to encrypt it. Furthermore, the output of the function can be "decrypted" to recover the input using the same key. Thus, each coupling block consists of two pathways. The first is an identity transform that simply passes the key to the output unchanged. The second pathway takes the input and encrypts it with the key. To invert the block, we simply use the decryption function with the original output and the key.

Obviously we now have to decide where the key will come from. This decision separates the two popular approaches to normalizing flows: coupling flows and autoregressive flows.

Coupling flows choose to split the input into two parts, treating one part as the data and the other part as the key (Dinh 2014; Dinh 2016; Kingma 2018)

Autoregressive flows instead split the input into a sequence of values. In this framework, the data is the current input value (e.g., pixel), and the output is the corresponding value (e.g., pixel) in the transformed output. The key is either all the previous inputs in the sequence (used in Masked Autoregressive Flows, MAF) or all the previous outputs in the sequence (an Inverse Autoregressive Flow, IAF). If the key is all the previous inputs, than the model can be used generate the output sample in parallel--all the necessary information about the input is known up front. In this design, mapping from the output sample back to the normalized sample is a sequential process. Since the key is all the previous inputs, we start by mapping the first output to first input. Then we map the second output to the second input, using the first input we just found as the key. The third input is found from the third output using the first two inputs as the key, and this continues until the entire input (normalized sample) is decoded. In an IAF, the process is reversed. Mapping from the output sample to the input samples can be parallelized because the entire output (used as the key) is known at the start. Going in the generative direction requires sequential steps, since each output sample depends on the current normalized sample and a key made up of the previously generated output samples. 

Within this framework, we can understand coupling flows as a specialization of AR flows that encode/decode more than one dimension per coupling block (Papamakarios 2017). Because of this, coupling flows would appear less representationally powerful while gaining efficient forward and backward computation (Kingma 2016).

[^1]: This is density of *elephant images* not elephants themselves. If you are curious, the density of elephants is $26 \text{ metric tons}/\text m^3$ 

## References

- NICE: Non-linear Independent Components Estimation, Dinh, 2014
- Generative Moment Matching Networks, Li, 2015
- Deep Learning, Goodfellow, 2016
- Density estimation using Real NVP, Dinh, 2016
- Improved Variational Inference with Inverse Autoregressive Flow, Kingma, 2016
- Masked Autoregressive Flow for Density Estimation, Papamakarios, 2017
- Glow: Generative Flow with Invertible 1x1 Convolutions, Kingma, 2018
- Normalizing Flows: An Introduction and Review of Current Methods, Kobyzev, 2020









