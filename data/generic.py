import json

ifile = open("generic.json", "r")
ofile = open("generic.csv", "w+")
ofile.write("name\n")
jo = json.loads(ifile.readline())
d = dict()
for en in jo:
    t = en['generic']
    if t not in d:
        d[t] = 1
    else:
        d[t] += 1

i = 0

for k in d:
    ofile.write("{0}\n".format(k))
    i += d[k]


ofile.write("END")
print("processed : ", i)

ifile.close()
ofile.close()
