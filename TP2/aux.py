import os
lines = set()
for x in range(700):
    lines.add(os.popen('echo "du //ARQELEM['+str(x)+']" | xmllint --shell arq.xml').read().replace(" ","").strip(">").strip("<"))
lines = list(filter(lambda x: x!="LIGA",lines))
print(len(lines))    
lines = list( map( lambda x: x.split("\n"), lines ) )
print(lines)
for line in lines: print(line)
#print(len(lines))    
