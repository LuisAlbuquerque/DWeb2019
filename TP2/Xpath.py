#! /usr/bin/env python
import os
import sys
import xml

def xpath (query, output, flags=None):
    if(not flags):
        #xml_out = os.popen("xmllint --xpath '" +  query +"' '"+ output +"' ").read()
        os.system("xmllint --xpath '" +  query +"' '"+ output +"' ")
        #print(xml.dom.minidom.parseString(xml_out).toprettyxml())
    else:
        fd = open(query,"r")
        querys = fd.read().split("\n")
        map(lambda queryI :os.system("xmllint --format --xpath '" +  queryI  +"' '"+ output +"' "), querys )

def main():
    if(len(sys.argv)<3):
        print("missing arguments")
    elif(len(sys.argv) == 3):
        xpath (sys.argv[1],sys.argv[2])
    else:
        xpath (sys.argv[2],sys.argv[3],sys.argv[1])
main()



                
