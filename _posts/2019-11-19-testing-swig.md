---
title: ""Testing SWIG: Using C modules in python""
excerpt: "faster functions in C, maybe."
tags: 
    - python
---

# Table of Contents

    1.  [Create header and module file](#orgfce8b7e)
    2.  [Now make a .i file that SWIG needs](#org182df55)
    3.  [Create the wrapper files](#org8511553)
    4.  [Test](#org94c55ea)
I came across Dave Beazely's SWIG last week. Opens a whole new
world of possiblities in terms of fast code using custom C modules,
instead of using python definitions! 

Here I define a simple C file containing a function `py_by_2()`
which uses a global variable `PI`, and divides this value by 2.

The following has worked so far.


<a id="orgfce8b7e"></a>

## Create header and module file

```C
#define PI 4.0
extern float pi_by_2();
```

```C
#include<stdio.h>
#include "pitest.h"

float pi_by_2()
{return PI/2;}

void main(){
  printf("answer is %f\n",pi_by_2());
  return;
}
```


<a id="org182df55"></a>

## Now make a .i file that SWIG needs

```C
%module pitest
%{
#include "pitest.h"
%}

#include "pitest.h"
extern float pi_by_2();
```


<a id="org8511553"></a>

## Create the wrapper files

```bash
swig -python pitest.i # this will generate pitest_wrap.c
gcc -c -fpic pitest.c pitest_wrap.c -I/usr/include/python3.6/
gcc -shared pitest.o pitest_wrap.o -o _pitest.so # not sure what this does
```


<a id="org94c55ea"></a>

## Test

```python
import pitest
print(pitest.pi_by_2())
```

Finally, run the python script

```sh
python3.6 python_call_pitest.py
```

It works!


<!----- Footnotes ----->

