---
title: Pro(ish) Tips On How To Code Machine Learning Models
date: 2021-10-01
description: My deep distaste for Google Colab becomes apparent. Jump from Jupyter Notebooks to real coding. Embrace the command line. Code like a software engineer, not a scientist.
---

With the amount of Python coding I do for machine learning, I have stumbled across some workflow tips that have greatly improved my standard of living. Check out these recommendations when developing your next breakthrough deep learning model.

# Log Everything From Day One
It is difficult for the human mind to comprehend how wonderful it is to have all your training runs fully logged and backed up, ready for generating figures or testing trained networks. Take it a step further and find an online service that backs it up remotely and shows you live plots during training. Try [neptune.ai](https://neptune.ai) if you're not sure where to start.

# Support CPU and GPU Execution
Testing locally with a CPU is super helpful and building in GPU support will ensure you can drop your code on a remote GPU machine (e.g., from your university) and take advantage of the extra power. If you don't have access to GPU resources, there are some online options you could try. You might be tempted to use Google Colab notebooks but

# Don't Use Jupyter Notebooks
That includes Google Colab, even with the allure of free GPUs. Let us enumerate the reasons:
- Organization. Grouping code into cells and throwing in some markdown headers is not code organization. I don't want to scroll through an entire notebook to make changes when I could easily have a handful of tabs open in VS Code and get a side-by-side view.
- Reusability. You can't import notebook code into another notebook. You'll end up copying and pasting (or rewriting) code you use a lot, which leads to fragmentation as you tweak it each time for your changing use cases.
- Command Line Arguments. Touching code everytime you really just want to tweak a hyperparameter or setting is bad. It becomes hey what if I change this value oh it seemed to work what if I tweak this other value and maybe this one too wow these results look good but wait did I change that variable back or not great now I have to rerun my 36 hour test again because I got lost in my notebook cells. Simply changing the arguments you use when calling your script is way better.
- Autocompletion and Type Checking. If you've never used a real IDE, before let me introduce you to the killer app. Forgot the arguments to that function? Just type it and an open parenthesis and boom, the options magically appear next to your cursor. Accidentally pass a string to that float argument? "Hey!" your IDE will yell. "You can't do that!" the red squiggly line will say. This is the future. You can live it now.
- Git. Colab and notebooks only kinda work with Git. If you are a Git user--and you should be a Git user--stick with regular script and code files. This is how code was intended to be managed.
- GPUs. If you are a student or faculty member, your university likely has a computing center with remote GPU access (possibly for free!). You can't run a notebook on these easily, if at all. Don't leave a several-thousand-dollar GPU on the table just because you don't like `.py` files.

    *Stares down Google Colab with malice*:

- Transferring Input/Output: Using Colab is a great way to waste 3 hours of your life uploading your image data set every time you open your notebook. "But Google Drive integration!" you might say. The authentication process is annoying. That might be petty, but hey, add that to the list of issues I already have with notebooks and see ya, Colab!

Jupyter Notebooks are good for exactly three things:
- Tutorials
- Plotting data and results
- Scratch calculations

That's it.

# Use Command Line Arguments
See previous discussion under my notebook rant. If you could conceivably want to tweak a parameter, make it a command line argument.

# Use Git
See previous discussion under said notebook rant. When used with GitHub, you get code backup and change tracking. Use branches. Ruin your model by trying to change up the architecture?  `git checkout before-i-messed-it-up`.

# Use PyTorch Lightning
PyTorch is nice for customizing models and training loops. The simplicity you can get from Keras (and therefore TensorFlow) might seem cool, but why not have PyTorch *and* that convenience? PyTorch Lightning is awesome and makes logging, training, testing, checkpoint loading, GPU usage, and really just about everything so much easier. [Check it out!](https://www.pytorchlightning.ai/)

# Find a Code Formatter and Tell Your IDE to Run It on Save
I use `black`, and VS Code formats my file every time I hit save. This does wonders for keeping your code organized, readable, and consistent. It makes me like looking at my code.

# Add a Reasonable Amount of Docstrings
Don't go overboard, since your code is a living document, but if you have some utils or cryptic function names and argument lists, it doesn't hurt to throw in a Google-style docstring comment:

```python
def my_cool_function(
    out: torch.Tensor, 
    target: torch.Tensor, 
    flux_factor: float, 
    gravity_scaling: float):
    """Computes the potential energy difference of a 
    semi-massive charged particle on a moon with gravity 
    given as a multiple of Europa's with a fudge factor 
    to account for the magnetic field flux of who knows what.

    Args:
        out (torch.Tensor): Model prediction.
        target (torch.Tensor): Target values.
        flux_factor (float): Fudge factor to account 
            for magnetic field.
        gravity_scaling (float): Ambient gravitational 
            acceleration normalized to that of Europa
    """
    throw RuntimeException("This is a useless function")
```

With a handy IDE, your documentation will popup whenever you call your function so you don't accidently pass in gravity normalized by Titan instead of Europa (as one does).

# Use Typing
Use the `typing` library and Python's support for type annotations. Besides making code easier to read, this will let the IDE flag any possible problems. Let it help you.

# Conclusion
To be fair, I've been rather direct in my criticism for effect. However, even if you don't agree on every point, make sure you continue to explore ways to improve your code organization and management along with workflow efficiency!