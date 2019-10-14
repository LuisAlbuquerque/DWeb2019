<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>       
                <style> 
                    table { 
                    border-collapse: collapse; 
                    } 
                    th { 
                    //Color:white; 
                    } 
                    th, td { 
                    //text-align:center; 
                    //border:1px solid black; 
                    padding:15px 
                    
                    } 
                    .geeks { 
                    border-right:hidden; 
                    } 
                    .gfg { 
                    border-collapse:separate; 
                    //border-spacing:0 15px; 
                    } 
                    h1 { 
                    color:green; 
                    } 
                </style> 
            </head>
            <body>
               <xsl:apply-templates />
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <div class="w3-card-4">
            <h1 align="center" class="w3-red">
                <xsl:value-of select="IDENTI"/>
            </h1>
            
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
        <hr/>
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
