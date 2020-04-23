---
title: Using Numpy with Intel MKL on macOS
description: Numpy defaults to OpenBLAS, but conda has automatic MKL support. How can we tell Numpy to skip OpenBLAS and use MKL?
date: 2020-04-23T08:42
tags: ["python", "numpy", "blas"]
---

I've been working on a [project](https://github.com/mbr4477/astroflux) that requires quite a few matrix operations using numpy, including dotting a 24000x2 and a 2x4096 (or larger) `ndarray` of floats. Clearly, optimization would be beneficial. There are several places in the code that I could cut down on multiplications or unnecessary regeneration of arrays using `meshgrid` and `arange` when I could do what I needed in fewer steps, but my through my online searches, I stumbled across the terms BLAS and LAPACK. TL;DR, these are very low level math libraries that can greatly improve matrix multiplication performance. The three major implementations are Intel's MKL, Apple's Accelerate, and OpenBLAS.

If you install numpy through conda, you'll notice that once of the packages installed has `openblas` in the name. If I opened up a terminal and ran `np.show_config()`, I ended up with this output:

```
blas_mkl_info:
    libraries = ['blas', 'cblas', 'lapack', 'pthread', 'blas', 'cblas', 'lapack']
    library_dirs = ['/Users/matthew/miniconda3/lib']
    define_macros = [('SCIPY_MKL_H', None), ('HAVE_CBLAS', None)]
    include_dirs = ['/Users/matthew/miniconda3/include']
blas_opt_info:
    libraries = ['blas', 'cblas', 'lapack', 'pthread', 'blas', 'cblas', 'lapack', 'blas', 'cblas', 'lapack']
    library_dirs = ['/Users/matthew/miniconda3/lib']
    define_macros = [('SCIPY_MKL_H', None), ('HAVE_CBLAS', None)]
    include_dirs = ['/Users/matthew/miniconda3/include']
lapack_mkl_info:
    libraries = ['blas', 'cblas', 'lapack', 'pthread', 'blas', 'cblas', 'lapack']
    library_dirs = ['/Users/matthew/miniconda3/lib']
    define_macros = [('SCIPY_MKL_H', None), ('HAVE_CBLAS', None)]
    include_dirs = ['/Users/matthew/miniconda3/include']
lapack_opt_info:
    libraries = ['blas', 'cblas', 'lapack', 'pthread', 'blas', 'cblas', 'lapack', 'blas', 'cblas', 'lapack']
    library_dirs = ['/Users/matthew/miniconda3/lib']
    define_macros = [('SCIPY_MKL_H', None), ('HAVE_CBLAS', None)]
    include_dirs = ['/Users/matthew/miniconda3/include']
```

A bit cryptic, but it *appeared* that numpy was using MKL. I mean, it says `bias_mkl_info`, right?

Not so fast. Thanks to [this StackOverflow answer](https://stackoverflow.com/questions/37184618/find-out-if-which-blas-library-is-used-by-numpy), we need to check which library is actually being linked with numpy. According to the `show_config()` output, the BLAS library is linked in `/Users/matthew/miniconda3/lib`. I needed to run this bash command:

```bash
$ otool -L /Users/matthew/miniconda3/lib/libblas.3.dylib 
```

Alternatively, if the output is not clear, you can use

```bash
$ readlink /Users/matthew/miniconda3/lib/libblas.3.dylib 
```

Unfortunately, the output showed a link to `openblas`, **not MKL, even though MKL is automatically included in conda.** How interesting. 

The solution, fortunately, is simple. Uninstall numpy, then reinstall it while only installing any BLAS packages that match `mkl`, avoiding any OpenBLAS linkage that might override the default MKL libs.

```bash
$ conda remove numpy
$ conda install numpy libblas=*=*mkl
```

Kudos to [this Github issue](https://github.com/conda-forge/numpy-feedstock/issues/153) for mentioning this solution.

> Removing numpy also removes anything that depended on numpy, so you'll need to also reinstall `matplotlib`, `scipy`, `astropy`, etc.

Now use the `readlink` command we see

```bash
$ readlink /Users/matthew/miniconda3/lib/libblas.3.dylib 
libmkl_rt.dylib
```

The output says `libmkl_rt.dylib`, so it looks like numpy will use MKL now!