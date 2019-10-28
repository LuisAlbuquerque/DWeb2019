<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text"/>

    <xsl:template match="/">
        <xsl:apply-templates />
    </xsl:template>
    
    <xsl:template match="arq">
        [
        <xsl:apply-templates />
        ]
    </xsl:template>

    <xsl:template match="doc">
        {
            <xsl:apply-templates />
        }
    </xsl:template>

    <xsl:template match="prov">
        "prov" : "<xsl:apply-templates />",
    </xsl:template>

    <xsl:template match="local">
        "local" : "<xsl:apply-templates />",
    </xsl:template>

    <xsl:template match="tit">
        "tit" : "<xsl:apply-templates />",
    </xsl:template>

    <xsl:template match="musico">
        "musico" : "<xsl:apply-templates />",
    </xsl:template>

    <xsl:template match="file">
        "file" : { 
        "@t" : " <xsl:value-of select="./@t"/>",
        "#text" : "<xsl:value-of select="."/>"
        },
    </xsl:template>

    <xsl:template match="duracao">
        "duracao" : "<xsl:apply-templates />",
    </xsl:template>

    <xsl:template match="obs">
        "<xsl:value-of select="name(.)"/>": {
        "text":[
        <xsl:for-each select="./text()">
            "<xsl:value-of select="normalize-space(.)"/>"<xsl:if test="not(position()=last())">,</xsl:if>
        </xsl:for-each>
        ]<xsl:if test="not(count(./*) = 0)">,</xsl:if>
        <xsl:apply-templates select="*"/>}<xsl:if test="following-sibling::*">,</xsl:if>
    </xsl:template>


</xsl:stylesheet>
