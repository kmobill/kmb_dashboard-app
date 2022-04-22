from unittest import result
import mysql.connector
from mysql.connector import Error
import json

 
try:
    connection = mysql.connector.connect(host='172.19.10.78',
                                                user='kimobill',
                                                password='sIst2m1s2020',
                                                database='campaniasinbound',
                                                port='3306'
    )
        
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Conexion exitosa... MySQL version:", db_Info)            

except Error as e:
        print("Error al conectarse a MySQL", e)
    
def abrirConexion():
    try:
        connection = mysql.connector.connect(host='172.19.10.78',
                                                    user='kimobill',
                                                    password='sIst2m1s2020',
                                                    database='campaniasinbound',
                                                    port='3306'
        )            
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Conexion exitosa... MySQL version:", db_Info)
    except Error as e:
        print("Error al conectarse a MySQL", e)



def consulta(operation):
    res = []
    print("Empezando consulta...")            
    cursor = connection.cursor()
    #operation= "SELECT count(ID) FROM campaniasinbound.trx"
    cursor.execute(operation)
    result = cursor.fetchall()
    for x in result:
        res.append(x[0])
    return res

def consulta_gestiones(Agentes):
    print("Empezando consulta...")            
    cursor = connection.cursor()
    result=[]
    result_final=[]
    for Agente in Agentes:
        cursor.execute("SELECT count(ID) FROM campaniasinbound.trx where Agent = '{agente}'".format(agente = Agente))
        result.append(cursor.fetchone())    
    for res in result:
        result_final.append(res[0])

    return result_final

def formatear_arreglo(arreglo):
    result_final=[]
    for res in arreglo:
        result_final.append(res[0])

    return result_final

def consulta_motivo_total(Motivos):
    print("Empezando consulta...")            
    cursor = connection.cursor()
    result_total=[]
    result_consultas=[]
    aux =[]
    for Motivo in Motivos:         
        cursor.execute("SELECT count(ID) FROM campaniasinbound.trx where MotivoLlamada = '{motivo}'".format( motivo= Motivo))
        result_consultas.append(cursor.fetchone())
    aux= formatear_arreglo(result_consultas)
    result_consultas=[]
    """ print("cant consulta:",aux) """
    result_total.append(aux)
    """ print("resultado: ",result_total) """
    return result_total

def consulta_gestiones_motivo(Agentes,Motivos):
    print("Empezando consulta...")            
    cursor = connection.cursor()
    result_total=[]
    result_agente=[]
    aux =[]


    for Agente in Agentes:
        for Motivo in Motivos:
            cursor.execute("SELECT count(ID) FROM campaniasinbound.trx where Agent = '{agente}' and MotivoLlamada = '{motivo}'".format(agente = Agente, motivo= Motivo))
            result_agente.append(cursor.fetchone())
        aux= formatear_arreglo(result_agente)
        result_agente=[]
        """ print(aux) """
        result_total.append(aux)
    """ print("resutlado final: ",result_total) """
    return result_total
def consulta_gestion_ciudad(ciudades):
    print("Empezando consulta ciudades...")            
    cursor = connection.cursor()
    result=[]
    result_ciudades=[]
    aux =[]
    
    for Ciudad in ciudades:
        cursor.execute("Select count(ID) FROM campaniasinbound.trx where CiudadCliente = '{ciudad}'".format(ciudad = Ciudad))
        result_ciudades.append(cursor.fetchone())
        aux= formatear_arreglo(result_ciudades)
        result_ciudades=[]
        """ print(aux) """
        result.append(aux)
    """ print("resultad cantidad de llamadas por ciudad: ",result) """
    return result

def finalizar():
    if connection.is_connected():
        connection.close()
        print("Conexion finalizada")
def message_succesfull():
    print('exito!')