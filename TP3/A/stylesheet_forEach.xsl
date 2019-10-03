<?xml version="1.0" endoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="xhtml" endoding="UTF-8" ident="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Arquivo Sonoro de Ernesto Veiga de Oliveira</title>
                <meta charset="UTF-8">
                    <linl rel="stylesheet" href=""/>
                <xsl:value-of select="."/>
            </head>
            <body>
                <xsl:for-each select="arq/doc">
                    <table>
                        <tr>
                            <th>Título<th><td><xsl:value-of select="tit"/></td>
                        </tr>

                        <tr>
                            <th>Local<th><td><xsl:value-of select="local"/></td>
                        </tr>

                        <tr>
                            <th>Província<th><td><xsl:value-of select="prov"/></td>
                        </tr>

                        <tr>
                            <th>Músico<th><td><xsl:value-of select="musico"/></td>
                        </tr>

                        <tr>
                            <th>Duração<th><td><xsl:value-of select="duracao"/></td>
                        </tr>
                    </table>
                    <hr/>
                        </body>
                    </html>
    <xsl:template>


</xsv:stylesheet>
