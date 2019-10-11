<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href ="arqweb/index.html">
            
            <html>
                <head>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>       
                    <style> 
                        body {
                            background: #2F4F4F;
                        }
                        table { 
                            border-collapse: collapse; 
                        } 
                        th { 
                        } 
                        th, td {  
                            padding:15px 
                        
                        } 
                     
                        h1 { 
                            color: white; 
                            text-align: center;
                            font-size: 350%;
                        } 
                        ol{
                            padding: 20px;
                            
                        }
                        
                        ol li {
                           padding: 5px;
                           margin-left: 55px;
                           color: white;
                        }
                        a:hover{
                            background: #ffe5e5;
                            color: black;
                        }
                        a {
                            text-decoration: none;
                        }
                    </style> 
                </head>
                <body>
                    <h1> Arqueossitios </h1>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM[not(preceding::CONCEL=./CONCEL)]">
                            <xsl:sort select="normalize-space(CONCEL)"></xsl:sort>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
            
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:variable name="c" select="CONCEL"/>
        <li>
            <xsl:value-of select="CONCEL"/>
            <ol>
                <xsl:apply-templates select="//IDENTI[../CONCEL=$c]">
                    <xsl:sort select="."></xsl:sort>
                </xsl:apply-templates>
            </ol>
        </li>
    </xsl:template>
    
    <xsl:template match="IDENTI">
        <li>
            <xsl:value-of select="."/>
        </li>
        
    </xsl:template>
    
    <!--xsl:template match="text()" priority="-1"/-->
        
    
</xsl:stylesheet>