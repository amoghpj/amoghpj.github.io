from __future__ import print_function

# PyDSTool imports
from PyDSTool import *
from PyDSTool.Toolbox.ParamEst import LMpest, L2_feature
import numpy as np
# Other imports
import time
from copy import copy

###############################################################################
# Import reference trajectory
PATH='PATH/TO/SCRIPT'
refTraj,=loadObjects(PATH+'input-to-fit.sav')
maxt=10
T=np.linspace(0,maxt,100)
plotData=refTraj(T)['N']
# Plot reference curve
plt.plot(T,plotData,'k',label='Reference Curve')
###############################################################################
# Define Model that you want to fit
# Trying to fit parameters of the logistic growth model
ToEstimateModel=args(algparams={'init_step':0.02, 'strictopt':True},
              varspecs={'N':'r*N*(1-N/K)'},
              xdomain={'N':[0, 100]}, # Unclear why this is important
              tdata=[0,maxt], # From definition of T
              pars={'r':0.01,'K':10},  # initial guess
              checklevel=2, # absolutely no idea what this does
              ics={'N':0.5},
v              name='LogGrowthestimator')
InitialGuessDS=Vode_ODEsystem(ToEstimateModel)
initial_guess_points=InitialGuessDS.compute('iniGue').sample()
# Plot initial Guess
plt.plot(initial_guess_points['t'],initial_guess_points['N'],'g')
###############################################################################

ftol=3e-3

# use L2-norm of data (sum of squares)

L2_similarity_w = L2_feature('L2_similar', pars=args(t_samples=T,
                                                   trange=[0,maxt],
                                                   coord='N',
                                                   tol=ftol,
                                                   debug=True))

pest_condition_w = condition({L2_similarity_w : True})

###########################################################################################
class ext_iface(extModelInterface):
    # holds the data (external from the model)
    pass

class int_iface(intModelInterface):
    # holds the test model
    pass

pest_data_interface_w = ext_iface(refTraj,
                   pest_condition_w)

c = context([ (pest_data_interface_w, int_iface) ])
############################################################################################
testModel_par = embed(Generator.Vode_ODEsystem(ToEstimateModel)) # creating model objject. What does Embed do?


### Function call
pest_pars = LMpest(freeParams=['r','K'], # specifying that r is the target parameter 
                 testModel=testModel_par,
                 context=c
                )

start_time = time.clock()
pestData_par = pest_pars.run(parDict={'ftol': ftol,
                                      'xtol':1e-3},
                             verbose=True)
print('... finished in %.4f seconds\n' % (time.clock()-start_time))

bestFitModel_par = pestData_par['sys_sol']
Nest_plotData_par = bestFitModel_par.sample('test_iface_traj', dt=0.02,
                                                           tlo=0,#min(trange),
                                                           thi=maxt,#max(trange),
                                                precise=True)
plt.plot(Nest_plotData_par['t'],Nest_plotData_par['N'],'r--',label='Query trajectory, best fit')
plt.show()

