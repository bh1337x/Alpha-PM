class Entry:

  def __init__(self, pname, ptype, pgeneric, psize, pcompany, pprice):
    if (psize == ""):
        self._fullname = pname
        psize = "NONE"
    else:
        self._fullname = pname + " " + psize
    
    if (ptype == ""):
        ptype = "NONE"
       
    if (pprice == ""):
        pprice = "NONE"
        
    self._name = pname
    self._type = ptype
    self._generic = pgeneric
    self._size = psize
    self._company = pcompany
    self._price = pprice
    
  def toCSV(self):
    return '{0},{1},{2},{3},{4},{5},{6}'.format(
    self._fullname, self._name, self._type, self._generic, self._size, self._company, self._price)
            
  def toJSON(self):
    return {
        "fullname": self._fullname,
        "name": self._name,
        "type": self._type,
        "generic": self._generic,
        "size": self._size,
        "company": self._company,
        "price": self._price
    }

ef = open('entrys.csv', 'r')
ef.readline()
of = open('product.csv', 'w')
of.write('fullname,name,type,generic,size,company,price\n')
i = 0
try:
    while(True):
        line = ef.readline()
        if (line == "\n"): break
        tokens = line.split(',')
        e = Entry(tokens[0], tokens[1], tokens[2], tokens[3], tokens[4], tokens[5])
        i = i + 1
        of.write(e.toCSV())
        of.write('\n')
    
    ef.close()
    of.close()
except EOFError:
    ef.close()
    of.close()
    pass