import requests
import bs4

class Entry:

  def __init__(self, pname, ptype, pgeneric, psize, pcompany, pprice):
    if (psize == ""):
        self._fullname = pname
        psize = "NULL"
    else:
        self._fullname = pname + " " + psize
    
    if (ptype == ""):
        ptype = "NULL"
       
    if (pprice == ""):
        pprice = "NULL"
    self._name = pname
    self._type = ptype
    self._generic = pgeneric
    self._size = psize
    self._company = pcompany
    self._price = pprice
            
  def toCSV(self):
    return '{0},{1},{2},{3},{4},{5},{6}'.format(
    self._fullname, self._name, self._type, self._generic, self._size, self._company, self._price)

base = "https://medex.com.bd/brands?page={0}"
i = 1
num_med = 0

ef = open('aci.csv', "a+")
ef.write('fullname,name,type,generic,size,company,price\n')
while (i != 642):
  r = requests.get(base.format(i))
  soup = bs4.BeautifulSoup(r.content, 'html.parser')
  data_rows = soup.select('div.data-row')
  if (len(data_rows) == 0): break
  num_med = num_med + len(data_rows)
  print("({0} - {1}) Num : ".format(i, base.format(i)), num_med)
  i = i + 1
  for data in data_rows:
    name = data.select('.data-row-top')[0].getText().strip().replace(',', '')
    ptype = data.select('.dosage-icon')[0]
    ptype = ptype['title']
    generics = data.select('.col-xs-12')[2].getText().strip().replace(',', '')
    size = data.select('.data-row-strength')[0].getText().strip().replace(',', '')
    company = data.select('.data-row-company')[0].getText().strip().replace(',', '')
    price = data.select('.unit-price')[0].getText().strip().replace(',', '')
    if ("Price Unavailable" in price) or (("Price not available" in price)):
        price = ""
    else:
        price = price.split()[-1].replace(',', '')
    e = Entry(name, ptype, generics, size, company, price)
    #print(e.toCSV())
    ef.write(e.toCSV())
    ef.write('\n')
ef.close()

