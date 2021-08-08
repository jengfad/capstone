import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df=pd.read_csv('time_series_data.csv')
df.head()

# Updating the header
df.columns=["Month","Sales"]
df.head()
df.describe()
df.set_index('Month',inplace=True)

from pylab import rcParams
rcParams['figure.figsize'] = 15, 7
df.plot()

from statsmodels.tsa.stattools import adfuller
test_result=adfuller(df['Sales'])

def adfuller_test(sales):
    result=adfuller(sales)
    labels = ['ADF Test Statistic','p-value','#Lags Used','Number of Observations']
    for value,label in zip(result,labels):
        print(label+' : '+str(value) )

    if result[1] <= 0.05:
        print("strong evidence against the null hypothesis(Ho), reject the null hypothesis. Data is stationary")
    else:
        print("weak evidence against null hypothesis,indicating it is non-stationary ")

adfuller_test(df['Sales'])


df['Sales First Difference'] = df['Sales'] - df['Sales'].shift(1)
df['Seasonal First Difference']=df['Sales']-df['Sales'].shift(12)
df.head()

# Again testing if data is stationary
adfuller_test(df['Seasonal First Difference'].dropna())

df['Seasonal First Difference'].plot()

from pandas.plotting import autocorrelation_plot
autocorrelation_plot(df['Sales'])
plt.show()

