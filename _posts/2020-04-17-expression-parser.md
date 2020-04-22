---
title: "A Boolean expression to polynomial generator"
description: "Useful for bulk converting Boolean rules"
layout: post
blog: true
tag:
- python
---

*Note:*

-   *I've been looking for a python implementation that converts a Boolean expression stored as a string, to a polynomial, also returned as a string. The hardest part of this conversion was writing a parser for arbitrarily nested expressions. Here is my implementation. Doesn't handle `xor` yet!*
-   *This document uses the noweb syntax. Please tangle the [source org file](/assets/files/2020-04-17-expression-parser.org) to generate parser.py*


# Outline

Objective: Given a nested Boolean expression, parse and construct a nested syntax tree, and convert the tree into a polynomial

Approach:

1.  Parse expression and represent as tree
2.  Use tree as input to construct the polynomial

Challenges:

-   What format to use to represent the tree: Nested dictionary, but this might become clumsy very quickly. Another option is definine node classes that can point to another node object as an attribute.
-   The two level problem of constructing a nested expression, as well as storing the LEFT and RIGHT arguments to a Boolean operator.

Solution:

-   Define a class `Node` which stores the operator, the left and the right arguments
-   The left and right arguments will be other `Node` objects if they are not simple strings
-   Two special cases:
    -   `not` only has a right argument. The left argument in this case is an empty  string.
    -   A Boolean rule with a single input node assigns the node as the 'operator'. In this case, the `Node` object will have empty strings as left and right arguments, and the input as  the operator.
-   The `constructPolynomial()` function handles the conversion to the polynomial.

```python
import numpy as np
import pandas as pd
import sys
```


# Get delimiter positions of nested expressions

Operate on a string `s`

1.  Split on whitespace, get positions of separators:
    
    ```python
    tokenlist = s.split()
    separatordict = {'open':[],'close':[]}
    for i, t in enumerate(s):
        if t == '(':
            separatordict['open'].append(i)
        elif t == ')':
            separatordict['close'].append(i)
    ```
2.  Get paren positions
    
    ```python
    separatordict = {'open':[],'close':[]}
    for i, t in enumerate(tokenlist):
        if t == '(':
            separatordict['open'].append(i)
        elif t == ')':
            separatordict['close'].append(i)
    ```
3.  Check validity: Length of open should be equal to close, otherwise imbalanced
    
    ```python
    if len(separatordict['open']) != len(separatordict['close']):
        print(separatordict, tokenlist)
        print('Imbalanced expession!')
        sys.exit()
    ```
4.  Get tuples for the ranges spanning separators. The logic here is
    that you find the first closing position `c`, and then find the
    largest opening position `o` less than `c`. The ordered pair (`o`, `c`)
    corresponds to one nested expression. Pop these, and repeat
    
    ```python
    explocations = []
    separatordict['close'].reverse()
    while len(separatordict['open']) > 0:
        c = separatordict['close'].pop()
        o = max([l for l in separatordict['open'] if l < c])
        separatordict['open'].remove(o)
        explocations.append((o,c))
    
    ```
5.  Print all subexpressions
    
    ```python
    for o, c in explocations:
        print(o,c,tokenlist[o:c+1])
    ```


# Simplify subexpressions in placed

How I would do it manually:

1.  First clean up expression so everything is space separated, then split the expression on the whitespace
    -   Accomplish this by add a pre- and post- space for every delimiter. 
        
        ```python
        s = s.replace('(', ' ( ')
        s = s.replace(')', ' ) ')
        # remove trailing whitespace
        s = s.strip()
        tokenlist = [t for t in s.split(' ') if t != '']
        ```
2.  Read the expression from left to right to create a map of the nesting levels. 
    -   Explanation:
        
        1.  Get delimiters
        2.  If the outermost delimiters span the token list, remove them, test again
        3.  return tokenlist
        
        ```python
        delimiters = self.getDelimiterPositions(tokenlist)
        if len(delimiters) > 0:
            for o, c in delimiters:
                if o == 0:
                    break
            if o == 0 and len(tokenlist) == c + 1 + o:
                tokenlist = list(tokenlist[1:-1])
                delimiters = self.getDelimiterPositions(tokenlist)
                # Call itself again
                tokenlist = self.removeDelimiters(list(tokenlist))
        return(tokenlist)
        ```
    -   Get to the first non-nested operator
        
        ```python
        if len(delimiters) > 0:
            for o, c in delimiters:
                if o == 0:
                    break
            if o == 0:
                tokenind = c + 1
        ```
    -   Format the left and right arguments
        
        ```python
        argumentdict = {}
        for k, v in zip(['left','right'],[left,right]):
            if type(v) is str:
                argumentdict[k] = v
                argumentdict[k+'str'] = ''
            elif type(v) is list and len(v) == 1:
                argumentdict[k] = v[0]
                argumentdict[k+'str'] = ''        
            else:
                argumentdict[k+'str'] =  '(' + ' '.join(v) + ')'
                argumentdict[k] = self.createBoolTree(v)
        ```
    -   <del>Ignore the nesting problem.</del> Identify the location of the first operator, create a left and right argument, repeat this step on the right hand argument
        
        ```python
        if tokenlist is None:
            tokenlist = self.tokenlist
        tokenlist = self.removeDelimiters(tokenlist)
        delimiters = self.getDelimiterPositions(tokenlist)
        tokenind = 0
        while tokenind < len(tokenlist):
        
            print(tokenlist, tokenind)
            if len(delimiters) > 0:
                for o, c in delimiters:
                    if o == 0:
                        break
                if o == 0:
                    tokenind = c + 1
            if tokenlist[tokenind] in self.operators:
                break
            else:
                tokenind += 1
        if tokenind == len(tokenlist):
            return Node('', tokenlist[-1], '')
        t = tokenlist[tokenind]
        if t == 'not':
            left = ''
            right = tokenlist[tokenind+1:]
        else:
            left = tokenlist[:tokenind]
            right = tokenlist[tokenind+1:]
        
        argumentdict = {}
        for k, v in zip(['left','right'],[left,right]):
            if type(v) is str:
                argumentdict[k] = v
                argumentdict[k+'str'] = ''
            elif type(v) is list and len(v) == 1:
                argumentdict[k] = v[0]
                argumentdict[k+'str'] = ''        
            else:
                argumentdict[k+'str'] =  '(' + ' '.join(v) + ')'
                argumentdict[k] = self.createBoolTree(v)
        return Node(argumentdict['left'], t, argumentdict['right'],
                    leftstr=argumentdict['leftstr'],
                    rightstr=argumentdict['rightstr'])
        ```
3.  Utility to get number of parentheses
    
    ```python
    parencount = 0
    for t in tokenlist:
        if t == '(':
            parencount += 1
        if t == ')':
            parencount -= 1
    return parencount
    ```

Putting it all together

```python
import numpy as np
import pandas as pd
import sys 
class Node():
    def __init__(self, left, op, right, leftstr='', rightstr=''):
        self.left = left
        self.right = right
        self.op = op
        self.rightstr = rightstr
        self.leftstr = leftstr

class BoolParser():
    def __init__(self, expr):
        self.expr = expr
        self.operators = ['and', 'or', 'not']
        self.tokenlist = self.preprocessExpression()

    def preprocessExpression(self):
        s = self.expr
        s = s.replace('(', ' ( ')
        s = s.replace(')', ' ) ')
        # remove trailing whitespace
        s = s.strip()
        tokenlist = [t for t in s.split(' ') if t != '']
        return tokenlist

    def createBoolTree(self, tokenlist=None):
        if tokenlist is None:
            tokenlist = self.tokenlist
        tokenlist = self.removeDelimiters(tokenlist)
        delimiters = self.getDelimiterPositions(tokenlist)
        tokenind = 0
        while tokenind < len(tokenlist):

            print(tokenlist, tokenind)
            if len(delimiters) > 0:
                for o, c in delimiters:
                    if o == 0:
                        break
                if o == 0:
                    tokenind = c + 1
            if tokenlist[tokenind] in self.operators:
                break
            else:
                tokenind += 1
        if tokenind == len(tokenlist):
            return Node('', tokenlist[-1], '')
        t = tokenlist[tokenind]
        if t == 'not':
            left = ''
            right = tokenlist[tokenind+1:]
        else:
            left = tokenlist[:tokenind]
            right = tokenlist[tokenind+1:]

        argumentdict = {}
        for k, v in zip(['left','right'],[left,right]):
            if type(v) is str:
                argumentdict[k] = v
                argumentdict[k+'str'] = ''
            elif type(v) is list and len(v) == 1:
                argumentdict[k] = v[0]
                argumentdict[k+'str'] = ''        
            else:
                argumentdict[k+'str'] =  '(' + ' '.join(v) + ')'
                argumentdict[k] = self.createBoolTree(v)
        return Node(argumentdict['left'], t, argumentdict['right'],
                    leftstr=argumentdict['leftstr'],
                    rightstr=argumentdict['rightstr'])

    def getParenCount(self, tokenlist):
        parencount = 0
        for t in tokenlist:
            if t == '(':
                parencount += 1
            if t == ')':
                parencount -= 1
        return parencount

    def removeDelimiters(self, tokenlist):
        delimiters = self.getDelimiterPositions(tokenlist)
        if len(delimiters) > 0:
            for o, c in delimiters:
                if o == 0:
                    break
            if o == 0 and len(tokenlist) == c + 1 + o:
                tokenlist = list(tokenlist[1:-1])
                delimiters = self.getDelimiterPositions(tokenlist)
                # Call itself again
                tokenlist = self.removeDelimiters(list(tokenlist))
        return(tokenlist)

    def printBoolTree(self, currnode):
        l = currnode.left
        r = currnode.right

        if type(currnode.left) is not str:
            l = currnode.leftstr
            self.printBoolTree(currnode.left)

        if type(currnode.right) is not str:
            r = currnode.rightstr
            self.printBoolTree(currnode.right)
        print(l, currnode.op, r)

    def constructPolynomial(self, currnode):
        l = currnode.left
        r = currnode.right

        if type(currnode.left) is not str:
            l = self.constructPolynomial(currnode.left)

        if type(currnode.right) is not str:
            r= self.constructPolynomial(currnode.right)
        expr = ''
        if currnode.op == 'or':
            expr = '(1. - (1. - ' +l + ')*(1. - ' + r + '))'
        elif currnode.op == 'and':
            expr = '(' + l +'*' + r + ')'
        elif currnode.op == 'not':
            expr = '(1. - ' + r + ')'
        else:
            expr = currnode.op
        return expr

    def getDelimiterPositions(self, tokenlist):
        separatordict = {'open':[],'close':[]}
        for i, t in enumerate(tokenlist):
            if t == '(':
                separatordict['open'].append(i)
            elif t == ')':
                separatordict['close'].append(i)
        if len(separatordict['open']) != len(separatordict['close']):
            print(separatordict, tokenlist)
            print('Imbalanced expession!')
            sys.exit()
        explocations = []
        separatordict['close'].reverse()
        while len(separatordict['open']) > 0:
            c = separatordict['close'].pop()
            o = max([l for l in separatordict['open'] if l < c])
            separatordict['open'].remove(o)
            explocations.append((o,c))

        return explocations

testlist = [
    # 'a or b or c',
    # 'not a',
    # 'a and not b',
    # '(a or b)',
    # '(a or b) or (c or d)',
    # '((a or b))'
    # 'UGR and not (NR5A1 or WNT4)',
    # '(WNT4 and CTNNB1) and not (DMRT1 or SOX9)'
    'not (g7)',
    '( g1 )',
    '( g2 )',
    '( g3 )',
    '( g4 )',
    '( g5 )',
    '( g6 or g7)',
]
for t in testlist:
    print('testing:', t)
    parser = BoolParser(t)
    tree = parser.createBoolTree()
    #parser.printBoolTree(tree)
    print(parser.constructPolynomial(tree))
    print('------------')
```


# Test

```python
testlist = [
    # 'a or b or c',
    # 'not a',
    # 'a and not b',
    # '(a or b)',
    # '(a or b) or (c or d)',
    # '((a or b))'
    # 'UGR and not (NR5A1 or WNT4)',
    # '(WNT4 and CTNNB1) and not (DMRT1 or SOX9)'
    'not (g7)',
    '( g1 )',
    '( g2 )',
    '( g3 )',
    '( g4 )',
    '( g5 )',
    '( g6 or g7)',
]
for t in testlist:
    print('testing:', t)
    parser = BoolParser(t)
    tree = parser.createBoolTree()
    #parser.printBoolTree(tree)
    print(parser.constructPolynomial(tree))
    print('------------')
```


# Footer


<!----- Footnotes ----->

