<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>       
            </head>
            <body>
               <xsl:apply-templates />
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <h2 align="center">
            <xsl:value-of select="IDENTI"/>
        </h2>
        <table calss="w3-table">
            <tr class="w3-red">
                <th>Lugar</th>
                <td>
                    <xsl:value-of select="LUGAR"/>
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
            
            <tr>
                <th>LONGIT</th>
                <td>
                    <xsl:value-of select="LONGIT"/>
                </td>
            </tr>
            
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
            
            
        </table>
        <hr/>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <b>
            <xsl:apply-templates/>  
        </b>
    </xsl:template>
    
</xsl:stylesheet>