---
title: Attention, But Explained Like You're A Normal Human
date: 2021-12-06
tags: ["machine-learning"]
description: We try to avoid a jargon-induced coma. You get to impress your relatives with your new AI knowledge. And then some equations to keep the math people happy.
---

## Disclaimer
If you don't have a deep learning background, everything about this will be confusing if it isn't already. 

Sorry.

Anyway, "attention" in deep learning is a very specific term that refers to a network learning what parts of the input to pay ... attention to. I'll try to explain this more in the rest of this article.

# Steps to Understanding Attention
It's actually quite easy.

1. Read the paper [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)
2. Wake up from coma
3. Read this article instead

(Honestly, the paper is pretty good, so kudos to the authors on that, but you do need a lot of background in machine learning!)

Now that we've got that out of the way, let's get on with it!

# Attention, But Explained Like You're A Normal Human

Your job is to translate a sentence into a different language. Let's think through a very structured way to approach this problem in the hopes that we can make a robot that replaces you. Oops, haha -- don't worry about that last part it's fine.

The first thing you do is take a good look at each word in the original sentence and make some notes about each one based on the words around it. With your notes in hand, you start on the translation and find a scratchpad so you can jot down things as you go.

To generate each successive word of the translation, you first need to figure out which of your notes you should use. You check your scratchpad to see what topic or concept you've been talking about, compare it with all your notes, and then combine the relevant notes into a little cheat sheet. This cuts down on the chances you'll be distracted by irrelevant information.

Next, you use your cheat sheet to update the topic on the scratchpad before finally using the cheat sheet and the scratchpad to pick the next word of the translation. 

The process repeats for the next word. Since you've kept some thoughts on the scratchpad, you can make sure the following word makes sense by pulling the relevant notes, updating the scratchpad, and writing the new word. Repeat this until the end of the sentence and boom, you've got your translation!

To do this with a computer, we show an AI a ton of sentences and teach it how to pick out relevant notes to build its cheat sheet, update the scratchpad, and pick out the next word based on this info. We give it feedback by comparing its translations to the real ones. Now, we can move on to formalizing the attention mechanism a bit more, but first ... 

# You Can Stop Here, It's Fine
You probably shouldn't read anymore unless you've taken a machine learning class. Really. I won't think any less of you. This is more like the fine print insurance section anyway so the machine learning hawks don't accuse me of oversimplifying.[^1] Plus, you've already got plenty to use to pizzazz your relatives with your knowledge of AI at the next family get together. Stop while you're ahead. Also, there's math, so watch out for that.

# Attention, But With Math
... aaaaaand if you're still here, buckle up for some step-by-step instructions and deep learning jargon:

1. Compute a set of annotations ("notes") using a bidirectional recurrent neural network (RNN) that examines the whole sentence from front to back and back to front[^2]

$$
H =
\begin{bmatrix}
\bm{h}_1 & \bm{h}_2 & \cdots & \bm{h}_n
\end{bmatrix}
=
\text{BiRNN}\left(\begin{bmatrix}
\bm{x}_1 & \bm{x}_2 & \cdots & \bm{x}_n
\end{bmatrix}\right)
$$

2. Use another neural network to predict which annotations are relevant to the next word of the translation using the previous hidden state ("scratchpad") and the annotations themselves.

$$
\bm a_i = \text{RelevanceNN}(H, \bm s_i)
$$

3. Combine the annotations according to their predicted relevance to make a context vector ("cheatsheet")

$$
\bm c_i = H \bm a_i
$$

4. Update the hidden state using the previous word, new contect, and previous hidden state

$$
\bm s_i = \text{ScratchpadNN}(\bm y_{i-1}, \bm c_i, \bm s_{i-1})
$$

5. Finally, to generate the next word, use the previous word, a hidden state (the "scratchpad"), and a context vector (the "cheatsheet").

$$
\bm y_i = \text{NextWordNN}(\bm y_{i-1}, \bm s_i, \bm c_i)
$$

Here's a quick diagram that shows all the connections. The dotted lines mean the previous value of the variable, and the arrows pointing into a variable indicate the quantities used to calculate the next value.

![A diagram explaining the relationship between the pieces of the attention algorithm.](attention.jpg "A diagram of the attention mechanism")

# Conclusion

I hope this was a gentle introduction that removes some of shroud of mystery around attention in deep learning, especially in the context of machine translation. I skimmed over the implementations details here, but this should give you the basic idea. For more details, check out the paper I linked to near the top!

[^1]: They probably will still blast me but whatever
[^2]: Look, I warned you. You could've stopped after the last section.