<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href ="web/index.html">
            
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
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
            
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="arq-{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href ="web/arq-{generate-id()}.html">
            <html>
                <head>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>       
                    <style> 
                        table { 
                            border-collapse: collapse; 
                        } 
                        th { 
                        } 
                        th, td { 
                        
                            padding:15px 
                        
                        } 
                       
                        h1 { 
                            color:green; 
                        } 
                        
                        adress{
                            margin-left: 20px;
                            margin-top: 0px;
                            margin-botton: 0px;
                            display: block;
                            
                        }
                        
                        a {
                            text-decoration: none;
                        }
                    </style> 
                </head>
                <body>
                    <div class="w3-card-4">
                        <h1 align="center" class="w3-red">
                            <xsl:value-of select="IDENTI"/>
                        </h1>
                        
                        
                        <adress>
                            <a href="index.html#{generate-id()}">Voltar à pagina principal</a>
                        </adress>
                        <hr/>
                        
                        <table calss="w3-table w3-striped w3-bordered">
                            <tr class="w3-red">
                                <th>Lugar</th>
                                <td>
                                    <xsl:value-of select="LUGAR"/>
                                </td>
                            </tr>
                            <hr/>
                            
                            <tr>
                                <th>TIPO</th>
                                <td>
                                    <xsl:value-of select="TIPO/@ASSUNTO"/>
                                </td>
                            </tr>
                            
                            <xsl:choose>
                                <xsl:when test="IMAGEM/@NOME">
                                    <tr>
                                        <th>IMAGEM</th>
                                        <td>
                                            <img src="{IMAGEM/@NOME}"> 
                                                <xsl:value-of select="IMAGEM/@NOME"/>
                                            </img>
                                            
                                        </td>
                                    </tr>
                                    
                                </xsl:when>
                                
                            </xsl:choose>
                            
                            <tr>
                                <th>DESCRI</th>
                                <td>
                                    <xsl:value-of select="DESCRI"/>
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>FREGUE</th>
                                <td>
                                    <xsl:value-of select="FREGUE"/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>CONCEL</th>
                                <td>
                                    <xsl:value-of select="CONCEL"/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>CODADM</th>
                                <td>
                                    <xsl:value-of select="CODADM"/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>LATITU</th>
                                <td>
                                    <xsl:value-of select="LATITU"/>
                                </td>
                            </tr>
                            
                            <xsl:choose>
                                <xsl:when test="LONGIT">
                                    <tr>
                                        <th>LONGIT</th>
                                        <td>
                                            <xsl:value-of select="LONGIT"/>
                                        </td>
                                    </tr>
                                    
                                    
                                </xsl:when>
                                
                            </xsl:choose>
                            
                            
                            <tr>
                                <th>ALTITU</th>
                                <td>
                                    <xsl:value-of select="ALTITU"/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>ACESSO</th>
                                <td>
                                    <xsl:value-of select="ACESSO"/>
                                </td>
                            </tr>
                            
                            
                            <tr>
                                <th>QUADRO</th>
                                <td>
                                    <xsl:value-of select="QUADRO"/>
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>DESARQ</th>
                                <td>
                                    <xsl:value-of select="DESARQ"/>
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>DEPOSI</th>
                                <td>
                                    <xsl:value-of select="DEPOSI"/>
                                    <xsl:apply-templates/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>BIBLIO</th>
                                <td>
                                    <ol>
                                        <xsl:apply-templates select="BIBLIO" mode="biblio"/>  
                                    </ol>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>AUTOR</th>
                                <td>
                                    <xsl:value-of select="AUTOR"/>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>DATA</th>
                                <td>
                                    <xsl:value-of select="DATA"/>
                                </td>
                            </tr>
                            
                            
                            
                        </table>
                    </div>
                </body>
            </html>
            
            <hr/>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <b>
            <xsl:apply-templates/>  
        </b>
    </xsl:template>
    
    <xsl:template match="BIBLIO" mode="biblio">
        <li>
            <xsl:value-of select="."/>          
        </li>     
    </xsl:template>
    
    
    
</xsl:stylesheet>
