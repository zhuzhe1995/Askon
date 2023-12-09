import requests
import datetime
import numpy as np
from urllib.parse import parse_qs,urlparse
from bs4 import BeautifulSoup

class jre_station:
    def __init__(self, stcd, name, url="", addr="", lines=None):
        self.name=name
        self.stcd=stcd
        self.url=url
        self.addr=addr
        self.lines=lines if lines else [];
    def add_line(self,line):
        self.lines.append(line)
    def def_url(self,url):
        self.url=url
    def set_addr(self,addr):
        self.addr=addr

def get_jre_green():
    JRE_lines=[]
    JRE_line_sts=[]
    JRE_sts={}
    with requests.Session() as s:
        auth_url='https://www.jreast.co.jp'
        faci_path='/estation/facility_search.aspx?SearchCategoryCd=1'
        s.headers['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
        s.headers['Referer']= 'https://www.jreast.co.jp/estation/'
        r = s.get(auth_url+faci_path)
        #print(r)
        soup = BeautifulSoup(r.text)
        for line_tb in soup.select('div.basicTable'):
            for line_a in line_tb.select('td.link > a'):
                line_name=line_a.text
                line_path=line_a['href']
                r2=s.get(auth_url+line_path)
                #print(r2)
                soup2 = BeautifulSoup(r2.text)
                JRE_lines.append(line_name)
                JRE_line_sts.append([])
                for st_a in soup2.select('div.basicTable > table > tbody > tr > td.link > a'):
                    st_name=st_a.text
                    st_path=st_a['href']
                    st_cd=parse_qs(urlparse(auth_url+st_path).query)['StationCd'][0]
                    JRE_line_sts[-1].append(st_name)
                    if (st_cd in JRE_sts):
                        JRE_sts[st_cd].add_line(line_name)
                        print(st_name,line_name,len(JRE_sts[st_cd].lines))
                    else:
                        JRE_sts[st_cd]=jre_station(st_cd,st_name)
                        JRE_sts[st_cd].def_url(auth_url+st_path)
                        JRE_sts[st_cd].add_line(line_name)
                        r3=s.get(auth_url+st_path)
                        soup3 = BeautifulSoup(r3.text)
                        for dl in soup3.select('section#el_basic > dl.basicInfo_box'):
                            if ("駅住所" in dl.select('dt')[0].get_text()):
                                JRE_sts[st_cd].set_addr(dl.select('dd')[0].get_text())
                                break
    return JRE_lines, JRE_line_sts, JRE_sts

def save_jre_green_data(fn="jre_green_"+datetime.datetime.now().strftime('%Y%m%d')+".npz"):
    JRE_lines, JRE_line_sts, JRE_sts = get_jre_green()
    np.savez(fn,lines=JRE_lines,line_sts=JRE_line_sts,sts=JRE_sts,dtype=object)
    return JRE_lines, JRE_line_sts, JRE_sts

def load_jre_green_data(fn):
    raw=np.load(fn,allow_pickle=True)
    JRE_lines=raw['lines']
    JRE_line_sts=raw['line_sts']
    JRE_sts=raw['sts'].item()
    return JRE_lines, JRE_line_sts, JRE_sts

def output_sts_info(JRE_sts,fn=None):
    for key in JRE_sts.keys():
        st=JRE_sts[key]
        ostr=st.stcd+','+st.name+','+st.addr
        for line in st.lines:
            ostr+=','+line
        print(ostr+"\n",end='',file=fn)
    return

#Sample executation
#save_jre_green_data("jre_green_database.npz")
#JRE_lines, JRE_line_sts, JRE_sts=load_jre_green_data("jre_green_database.npz")
#output_sts_info(JRE_sts, open("jre_green_stations.csv",'w'))
