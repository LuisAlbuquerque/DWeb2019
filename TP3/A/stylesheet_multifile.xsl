<?xml version="1.0"  encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xhtml" endoding="UTF-8" ident="yes"/>

    <xsl:template match="/">
        <xsl:result-document href ="html/index.html">
            <html>
                <head>
                    <title>Arquivo Sonoro de Ernesto Veiga de Oliveira</title>
                    <meta charset="UTF-8">
                    <xsl:value-of select="."/>
                </head>
                <body>
                    <h1>Arquivo Sonoro de Ernesto Veiga de Oliveira</h1>
                    <h3>Índice de Músicas</h3>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    <xsl:template>

    <xsl:template match="doc" mode="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="arqson-{generate-id()}.html"><xsl:value-of select="tit"</a>

            <xsl:chose>
                <xsl:when test="contains(prov,'Alentejo')">
                    - Música Alentejana
                </xsl:when>
                <xsl:otherwise
                    - Musica não Alentejana
                </xsl:otherwise>
            </xsl:chose>
        </li>
    <xsl:template>

    <xsl:template match="doc">
        <xsl:result-document href ="html/arqson-{generate-id()}.html">
            <html>
                <head>
                    <title>Arquivo Sonoro de Ernesto Veiga de Oliveira</title>
                    <meta charset="UTF-8">
                    <xsl:value-of select="."/>
                </head>
                <body>
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
                        <xsl:apply-templates select="file" />
                    </table>
                    <hr/>
                    <adress>
                        <a href="index.html#{generate-id()}">Voltar à pagina principal</a>
                    </adress>
                </body>
            </html>
        </xsl:result-document>
    <xsl:template>

    <xsl:template match="file">
        <tr>
            <th>Áudio</th>
            <td>
                <a href="{.}">Ficheiro <xsl:value-of="@t"/></a>
            <td>
        </tr>
    <xsl:template>
</xsv:stylesheet>
