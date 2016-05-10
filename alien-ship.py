%matplotlib notebook
import matplotlib.pyplot as plt
import numpy as np
X=[]
Y=[]
i=0
with plt.xkcd():
    num=np.arange(1.0,4.0,1.0)
    x=np.arange(0,2.0,0.001)
    for j in num:
        X.append((1/j)*np.cos(x*np.pi))
        Y.append((1/j)*np.sin(x*np.pi))
    Num=np.arange(0.1,1.,0.1)
    plt.xlim([-0.25,1.25])
    plt.ylim([-0.15,0.15])
    plt.xticks([])
    plt.yticks([])
    plt.annotate('Where I sit',xy=(0.90,0),arrowprops=dict(arrowstyle='->'), xytext=(0.8, 0.1))
    for i in range(0,len(Num)):
        if i<=len(Num)/2:
            plt.plot(Num[i]*np.array(X[1])+Num[i],Num[i]/2*np.array(Y[1]),'r')
        else:
            plt.plot(Num[len(Num)-i]*np.array(X[1])+Num[i],Num[len(Num)-i]/2*np.array(Y[1]),'b')
    plt.title("An Alien Ship ")
