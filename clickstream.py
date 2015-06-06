import pandas as pd

# http://ewulczyn.github.io/Wikipedia_Clickstream_Getting_Started/
# http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=15580374&inprop=url

DATA_DIR = 'data/'

cs = pd.DataFrame.from_csv(DATA_DIR+'2015_02_clickstream.tsv', sep='\t').reset_index()
cs = cs[['prev_id', 'curr_id', 'n']]
cs = cs.dropna()

curr_views = cs.groupby('curr_id').n.sum()
curr_views = curr_views.drop(15580374) # Wikipedia home page
curr_views.sort(ascending=False)

# NUM = 1000
NUM = 10000
top_cs = cs[cs.curr_id.isin(curr_views.iloc[:NUM])]
top_cs = top_cs[top_cs.prev_id.isin(top_cs.columns)]

M = top_cs.pivot(index='prev_id', columns='curr_id', values='n').fillna(0)
M = M.divide(M.sum(axis=1), axis=0)
w = pd.Series(1./len(M), index=M.index)

for _ in xrange(100):
    w = w.dot(M)

w.sort(ascending=False)