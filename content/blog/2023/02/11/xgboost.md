---
title: Launching Your Machine Learning Models with XGBoost(ers)
date: 2023-02-11
description: Make a decision tree. Attach RS-25 rocket engines. Initiate launch sequence.
---

Recently, I was asked to pick and explain a predictive machine learning technique for a job application. One such technique is gradient boosted decision trees. I’ll introduce decision trees and then what “boosting” means and how “gradient” fits into this. I’ll use a baseball example of predicting a fielder’s putout rate given the direction, launch angle, and exit velocity of a batted ball and then return to it in more concise and less technical way at the end.

A decision tree is essentially a flow chart where each node asks a yes/no question about the data (e.g., “is the exit velocity > 95 mph?”). It could have multiple layers of “follow-up” questions that increase the resolution of our tree, but eventually we will reach a point where the tree gives us a prediction (e.g., a putout probability of 0.78) instead of asking another question. We can “grow” a decision tree for our prediction problem by first figuring out what input variable and value splits the corresponding target values as evenly as possible. For example, we may find that “launch angle > 40 deg?” splits the data into two groups where the “yes” group was a putout 80% of the time, and the “no” group was a putout 20% of the time. For each group, we could add a second question to further narrow down the prediction. Ideally, we want groups as “pure” as possible, either all putouts or not putouts. However, each new branch of the tree only looks at the remaining examples. Eventually, there will only be one example left in each branch.

We can fix this by using a series of small trees which look at all the data and “fix” (or boost) the previous trees. We start by having our model predict a constant value. For example, our fielder could have a 0.6 putout rate on all balls his direction. Next, we boost this prediction by creating a tree that corrects this constant output. The tree might notice that for “launch angle > 40 deg” 0.6 tends to be too low and output a correction of +0.2. For “launch angle <= 40 deg” the tree may add a correction of -0.4. We can repeat this process to boost the boosted tree. If “launch angle <= 40 deg,” but “exit velocity > 75 mph” the predicted rate of 0.6 – 0.4 = 0.2 may be too low, so the tree adds a second correction of 0.3, and final prediction is 0.6 – 0.4 + 0.3 = 0.5. This is better than a single tree because each successive boosting tree can make its decision by looking at the error across all the data points rather than just those remaining in each branch. 

The last step is defining exactly what “error” each tree should correct. While it might seem obvious that the error is just the difference between actual and predicted, this might vary from problem to problem. A more general approach is to define a “loss function” that we want to minimize (i.e., it tells us the “goodness” of a prediction). The negative gradient of the loss tells us how we should change the prediction to reduce the loss. Thus, we want each successive tree to output the negative gradient (scaled, so we don’t correct too much) to move the prediction a little closer to the goal.

In less technical language:

*Decision trees are flow charts that ask yes/no questions about the input data to make predictions. For example, we could predict a fielder’s putout rate by creating a flow chart asking if the launch angle exceeded 40 deg or if the exit velocity was less than 75 mph and making our prediction based on how the fielder performed in that scenario. However, just one tree (even a big one) has limits, but we can circumvent this by creating many trees that each slightly correct the prediction of the previous one. If our data has relatively few variables, this approach gives us a straightforward, understandable model for making predictions about the fielder’s putout rate.*

## References

- [All You Need to Know about Gradient Boosting Algorithm &ndash; Part 1. Regression](https://towardsdatascience.com/all-you-need-to-know-about-gradient-boosting-algorithm-part-1-regression-2520a34a502)
