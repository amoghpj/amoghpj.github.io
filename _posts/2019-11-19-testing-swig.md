---
title: "Testing SWIG: Using C modules in python"
layout: post
description: "faster functions in C, maybe."
blog: true
tags: 
- python
---

I came across Dave Beazely's SWIG last week. Opens a whole new
world of possiblities in terms of fast code using custom C modules,
instead of using python definitions! 

Here I define a simple C file containing a function `py_by_2()`
which uses a global variable `PI`, and divides this value by 2.

The following has worked so far.


## Create header and module file
Header file
```C
#define PI 4.0
extern float pi_by_2();
```

Module file
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

## Now make a .i file that SWIG needs

```C
%module pitest
%{
#include "pitest.h"
%}

#include "pitest.h"
extern float pi_by_2();
```

## Create the wrapper files

```bash
swig -python pitest.i # this will generate pitest_wrap.c
gcc -c -fpic pitest.c pitest_wrap.c -I/usr/include/python3.6/
gcc -shared pitest.o pitest_wrap.o -o _pitest.so # not sure what this does
```


## Test

```python
import pitest
print(pitest.pi_by_2())
```

Finally, run the python script

```sh
python3.6 python_call_pitest.py
```

Result: `2.0`

It works!



