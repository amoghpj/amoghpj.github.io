
# coding: utf-8

# In[1]:

get_ipython().magic(u'matplotlib notebook')
from PyDSTool import *
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.animation as animation
import numpy.random as random


# In[2]:

recurdef=args()
num_oscillators=15
recurdef.pars={'omega':0.1,'K':0.009}#
#recurdef.varspecs={'z[j]': 'for(j, 0, 1, 2*z[j+1] + p[j])','z2': '-z0 + p2 '}
recurdef.varspecs={'x[i]':'for(i,0,'+str(num_oscillators-2)+',omega+K*sum(j,0,'+str(num_oscillators-2)+',sin(x[j]-x[i])))', #if([j]==[i],0,sin(x[j]-x[i]))
                  'x'+str(num_oscillators-1):'omega+K*sum(i,0,'+str(num_oscillators-1)+',sin(x[i]-x'+str(num_oscillators-1)+'))'}
#recurdef.varspecs={'x[i]':'for(i,0,3,omega+K*sum(j,0,3,sin(x[j]-x[i])))','x4':'omega+K*sum(i,0,4,sin(x[i]-x4))'}
recurdef.tdata=[0,50*np.pi]
recurdef.ics={}
varnamedict=[]
#recurdef.ics={'z0':1,'z1':1,'z2':1}#ics=
for i in range(0,num_oscillators):
    varname=str('x'+str(i))
    varnamedict.append(varname)
    recurdef.ics[varname]=random.uniform(0,2*np.pi)
#recurdef.ics={'x0':0,'x1':np.pi/2,'x2':3*np.pi/2,}
recurdef.name='testmacro'


# In[3]:

MacroDS=Generator.Vode_ODEsystem(recurdef)
traj=MacroDS.compute('test')
pts=traj.sample(dt=1)
f,ax=plt.subplots(figsize=(6,6),dpi=100)
ax.set_xlim([-1.1,1.1])
ax.set_ylim([-1.1,1.1])
line,=ax.plot([],[],'o')

Ox=[[]]
Oy=[[]]
time=list(pts['t'])
for i in range(0,len(time)):
    x_summ=[]
    y_summ=[]
    for name in varnamedict:
        x_summ.append(np.cos(pts[name][i]))
        y_summ.append(np.sin(pts[name][i]))
    Oy.append(y_summ)
    Ox.append(x_summ)  
def animate(i):
    line.set_xdata(Ox[i][:])
    line.set_ydata(Oy[i][:])
    return line,
#def init(i):
#    line.set_data([],[])
#    return line,
ani1 = animation.FuncAnimation(f, animate, frames=np.arange(0,len(time)),#init_func=init,
                              interval=30)#,blit=True)
theta=np.arange(0,2.1*(np.pi),0.1)
plt.plot(np.cos(theta),np.sin(theta),'k', linestyle='dashed')
ani1.save('/home/amogh/Documents/python-experiments/automated_kuramoto_out/kuramoto_N15_K009.png',writer='imagemagick')
plt.show()


# In[ ]:



