<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">                 
        <xsl:apply-templates/>
    </xsl:template>
    
   
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href ="ARQ/arq-{generate-id()}.xml">
            <ARQELEM>
                <xsl:apply-templates/>
            </ARQELEM>
        </xsl:result-document>
    </xsl:template>
    
    <!--xsl:template match="ARQELEM">
        <ARQELEM>
            <xsl:apply-templates/>
        </ARQELEM>      
    </xsl:template-->
    
    <xsl:template match="TIPO">
        <TIPO ASSUNTO="{./@ASSUNTO}"/>
    </xsl:template>
    
    <xsl:template match="IDENTI">
        <IDENTI>
            <xsl:apply-templates/>
        </IDENTI>      
    </xsl:template>
    
    <xsl:template match="DESCRI">
        <DESCRI>
            <xsl:apply-templates/>
        </DESCRI>      
    </xsl:template>
    
    <xsl:template match="LIGA">
        <LIGA TERMO="{./@TERMO}">
            <xsl:apply-templates/>
        </LIGA>      
    </xsl:template>
    
    <xsl:template match="LUGAR">
        <LUGAR>
            <xsl:apply-templates/>
        </LUGAR>      
    </xsl:template>
    
    <xsl:template match="FREGUE">
        <FREGUE>
            <xsl:apply-templates/>
        </FREGUE>      
    </xsl:template>
  
    <xsl:template match="CONCEL">
        <CONCEL>
            <xsl:apply-templates/>
        </CONCEL>      
    </xsl:template>
    
    <xsl:template match="CODADM">
        <CODADM>
            <xsl:apply-templates/>
        </CODADM>      
    </xsl:template>
    
    <xsl:template match="LATITU">
        <LATITU>
            <xsl:apply-templates/>
        </LATITU>      
    </xsl:template>
    
    <xsl:template match="LONGIT">
        <LONGIT>
            <xsl:apply-templates/>
        </LONGIT>      
    </xsl:template>
    
    <xsl:template match="ALTITU">
        <ALTITU>
            <xsl:apply-templates/>
        </ALTITU>      
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <ACESSO>
            <xsl:apply-templates/>
        </ACESSO>      
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <ACESSO>
            <xsl:apply-templates/>
        </ACESSO>      
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <DESARQ>
            <xsl:apply-templates/>
        </DESARQ>      
    </xsl:template>
    
    <xsl:template match="INTERP">
        <INTERP>
            <xsl:apply-templates/>
        </INTERP>      
    </xsl:template>
    
    <xsl:template match="DEPOSI">
        <DEPOSI>
            <xsl:apply-templates/>
        </DEPOSI>      
    </xsl:template>
    
    <xsl:template match="BIBLIO">
        <BIBLIO>
            <xsl:apply-templates/>
        </BIBLIO>      
    </xsl:template>
    
    <xsl:template match="AUTOR">
        <AUTOR>
            <xsl:apply-templates/>
        </AUTOR>      
    </xsl:template>
    
    <xsl:template match="DATA">
        <DATA>
            <xsl:apply-templates/>
        </DATA>      
    </xsl:template>
    
    
</xsl:stylesheet>
