<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <html>
            <head>
                <!--link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/-->       
                <style> 
                    table { 
                    border-collapse: collapse; 
                    margin: 20;
                    } 
                    th { 
                    
                    } 
                    th, td { 
                    padding:15px;
                 
                    
                    } 
                    .geeks { 
                    border-right:hidden; 
                    } 
                    .gfg { 
                    border-collapse:separate; 
                    } 
                    h1 { 
                    //color:green;
                    text-align : center;
                    } 
                    h3{
                    margin: 30;
                    }
                    
                </style> 
            </head>
            <body>
                <h1> Project Record </h1>
                <hr/>
                
                <xsl:apply-templates />
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="metadata">
       
        <table width="100%" border="0" calss="w3-table">
            
                <tr>
                    <td width="50%">
                        <b>
                            KEY NAME:
                        </b>
                        
                        <Font>
                            <xsl:value-of select="keyname"/>
                        </Font>
                        
                        
                    </td>
                    
                    <td width="50%">
                        <b>
                            BEGIN DATE:
                        </b>
                        
                        <Font>
                            <xsl:value-of select="bdate"/>
                        </Font>
                        
                    </td>
                </tr>
                
                <tr>
                    <td width="50%">
                        <b>
                            TITLE:
                        </b>
                        
                        <Font>
                            <xsl:value-of select="title"/>
                        </Font>
                        
                    </td>
                    
                    <td width="50%">
                        <b>
                            END DATE:
                        </b>
                        
                        <Font>
                            <xsl:value-of select="edate"/>
                        </Font>
                        
                    </td>
                </tr>
                
                <tr>
                    <td width="50%">
                        <b>
                            SUBTITLE:
                        </b>
                        
                        <Font>
                            <xsl:value-of select="subtitle"/>
                        </Font>
                        
                    </td>
                    
                    <td width="50%">
                        <b>
                            SUPERVISOR:
                        </b>
                        
                        <Font color="#000080">
                            <a href="{supervisor/@homepage}">
                                <xsl:value-of select="supervisor"/>
                            </a>
                        </Font>
                        
                    </td>
                </tr>
            
        </table>
        <hr/>
        <hr/>
        
    </xsl:template>
    
    <xsl:template match="workteam">
        <h3> Workteam: </h3>
        <table>
            <tr>
                <td>
                    <b>
                        IDENTIFIER
                    </b>
                </td>
                
                <td>
                    <b>
                        NAME
                    </b>
                </td>
                
                <td>
                    <b>
                        EMAIL
                    </b>
                </td>
                
                <td>
                    <b>
                        GIT
                    </b>
                </td>
                
            </tr>
            <xsl:apply-templates/>
        </table>
        <hr/>
        <hr/>
        
        
    </xsl:template>
    
    <xsl:template match="worker" >

        <tr>
            <td>
                <xsl:value-of select="identifier"/>
            </td>
            
            <td>
                <xsl:value-of select="name"/>
            </td>
            
            <td>
                <xsl:value-of select="email"/>
            </td>
            
            <td>
                <xsl:value-of select="git"/>
            </td>
            
        </tr>

        
    </xsl:template>
    
    <xsl:template match="abstract" >
        <h3> ABSTRACT:</h3>
        <p>
            <xsl:apply-templates/>
        </p>
        <hr/>
        <hr/>
               
    </xsl:template>
    
    <xsl:template match="deliverables">
        <h3> DLIVERABLES:</h3>
        <ol>
            <xsl:apply-templates/>
        </ol>
        <hr/>
        <hr/>
        
    </xsl:template>
    
    <xsl:template match="deliverable" >
        <li>
            <a href="{./@path}">
                <xsl:apply-templates/>
            </a>
        </li>
        
    </xsl:template>
    
    <xsl:template match="i" >
        <i>   
            <xsl:apply-templates/>           
        </i>
        
    </xsl:template>
    
    <xsl:template match="b" >
        <b>   
            <xsl:apply-templates/>           
        </b>
        
    </xsl:template>
    
    
   
    
</xsl:stylesheet>