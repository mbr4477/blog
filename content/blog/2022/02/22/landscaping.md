---
title: Deep Landscaping
date: 2022-02-22
description: Deep learning needs a model, data, and optimization algorithm. Visualizing AI like a landscape can help build intuition for how these components interact. I plant some imaginary trees.
tags: ["math", "machine-learning"]
---

Deep learning can be split into three parts that must all work together to learn the desired task (like recognizing images, generating text, or detecting machine failures):

1. **The model** is essentially a massive algebraic equation that takes an input and calculates some output. Ultimately, we want this model to perform some specific task like mapping an image into the probability that it shows [a large bear that breaks into homes in California and skipped hibernation for pizza](https://www.nytimes.com/2022/02/20/us/lake-tahoe-bear.html). The exact equation is so complicated that we can't just write it by hand, so we set up the model as the right *type* of function but make it start out as random.
2. **The data** is the body of examples that we think contains the information needed to define the task. We can't define the task directly -- if we could, we could probably define the solution equation directly -- so we *implicitly* define the task through the data (lots of input-output pairs). Essentially, we are saying, "We don't *really* know what's going on here, but if the model match these examples, it probably learned what we wanted it to."
3. **The optimization algorithm** is how we use the data to update the model. The most popular category is *backpropagation* and gradient descent. The basic idea is to compare the model's outputs to the real outputs and use the error to tweak the inside of the model to move the output towards the ground truth. Bigger error means we tweak the model more, and smaller error means we tweak it less.

All three of these elements affect the final result. [Just a few good examples could make a huge model perform well](https://spectrum.ieee.org/andrew-ng-data-centric-ai), while a ton of bad data could make the same model fail miserably. Changing up the optimization algorithm could let us find a good solution faster or miss it entirely. Using a model designed for the wrong task will put the whole system behind the sticks from the start, regardless of how good the data or optimization is.

One way to visualize this whole process is designing a landscape so that if you randomly drop a marble it will always end up at the exact spot you want it to go to. The marble is the solution that deep learning achieves, and we want it to end up at the target location no matter where it starts. The target location represents the solution we want it to find. The world that we build controls what happens to the marble and how consistently close it can get to the desired destination.

The data defines the mountains and valley of the landscape. With good, clean data, we might have terrain that directs the marble to the right solution every single time. However, we likely have noisy data that translates into bumpy ground that might even have big holes that could swallow up our marble before it gets close to the goal.

Changing the model might involve putting constraints on what the solutions can look like. This would be like planting a row of trees in some areas of the landscape that physically prevent the marble from reaching those positions. This keeps the marble from exploring regions that we know are pointless. (In technical terms, models have *inductive bias* that limits the possible solutions they can find.) 

Changing the optimization algorithm would be like changing the physics of this imaginary world. Maybe the marble rolls faster, which means it could get to the desired destination quickly but then overshoot the target. Alternatively, the marble might roll slowly enough to always hit the right solution, but so slowly the approach isn't practical.

Making deep learning models do the right thing means sculpting this imaginary landscape and recognizing that each part of the system influences the overall success. As an example, one area of deep learning recognizing something even if you only have a few examples of it (few-shot learning). While you could train a model on a bunch of examples of things you know about, that model will not do well when shown examples of things it hasn't seen before. Instead, we can switch up the approach to the data by showing the network a few examples of a *lot of different* things during training. The model then learns more about what differentiates things rather than the specific characteristics of a few categories. We didn't change the model at all, but the resulting solution is much better suited for our desired task. 

Visualizing deep learning as a virtual landscape that can be molded and tweaked helps me build intuition for how all these factors work together. Maybe recognizing the interconnectedness of these three aspects of deep learning can help us explore new, unique research ideas that could solve some of the biggest problems in artificial intelligence today. 

Or maybe I should just go into landscaping :seedling:



