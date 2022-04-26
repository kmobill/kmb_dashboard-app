from glob import glob
from sqlite3 import connect
from sys import flags
from flask import Flask,request, request_finished
from unittest import result
import mysql.connector
from mysql.connector import Error
import json

app = Flask(__name__)

fecha=["2022-01-01"]
resultadoAgentes =[""]
resultadoAgentesGestiones=[]
motivo=[]
num_motivos=[]
motivo_total=[]
ciudades=[]
llamadas_por_ciudad=[]
ciudad_llamadas_por_ciudad=[]
data_total=[]

def formatear_arreglo(arreglo):
    result_final=[]
    for res in arreglo:
        result_final.append(res[0])

    return result_final

def consulta(operation):
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

    resultado = []
    print("Empezando consulta: ",operation)            
    cursor = connection.cursor()
    cursor.execute(operation)
    result = cursor.fetchall()
    for x in result:
        resultado.append(x[0])

    if connection.is_connected():
        connection.close()
        cursor.close()
        print("Conexion finalizada")

    return resultado

def consulta_gestiones(Agentes):
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
    print("Empezando consulta...")            
    cursor = connection.cursor()
    result=[]
    result_final=[]
    for Agente in Agentes:
        cursor.execute("SELECT count(ID) FROM campaniasinbound.trx where Agent = '{agente}'".format(agente = Agente))
        result.append(cursor.fetchone())    
    for res in result:
        result_final.append(res[0])

    if connection.is_connected():
        connection.close()
        cursor.close()
        print("Conexion finalizada")
    return result_final

def consulta_gestion_ciudad(ciudades):
    print("Empezando consulta ciudades...") 
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
    if connection.is_connected():
        connection.close()
        cursor.close()
        print("Conexion finalizada")
    return result

def consulta_gestiones_motivo(Agentes,Motivos):
    print("Empezando consulta...")    
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
    if connection.is_connected():
        connection.close()
        cursor.close()
        print("Conexion finalizada")
    return result_total

def consulta_motivo_total(Motivos):
    print("Empezando consulta...")            
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
    if connection.is_connected():
        connection.close()
        cursor.close()
        print("Conexion finalizada")
    return result_total

@app.route("/fecha",methods=['POST','GET'])
def fecha_react():
    if request.method == 'POST':
        request_data_date = json.loads(request.data)
        print("fecha:",request_data_date)        
        fecha[0] = (request_data_date)  
    return {"fecha-POST":fecha[0]}


""" @app.route("/Consultas/Llamadas")
def Llamadas():
    aux = fecha[0]
    return {"date":aux} """

@app.route("/Consultas/Agentes")
def Agentes():
    dateInit = fecha[0]['name']
    resultadoAgentes[0] = consulta("SELECT distinct(Agent) FROM campaniasinbound.trx where (StartedManagement between '{date_init}' and '2022-01-12')".format(date_init = dateInit))
    aux_resultadoAgentes = resultadoAgentes[0]
    resultadoAgentesGestiones = consulta_gestiones(aux_resultadoAgentes)
    return {"agentes":aux_resultadoAgentes,"num_gestiones":resultadoAgentesGestiones}

@app.route("/Consultas/Llamadas")
def Llamadas():
    dateInit = fecha[0]['name']
    ciudades2 = consulta("SELECT distinct(CiudadCliente) from campaniasinbound.trx where CiudadCliente REGEXP'\D' and (StartedManagement between '{date_init}' and '2022-01-12')".format(date_init = dateInit))
    llamadas_por_ciudad= formatear_arreglo(consulta_gestion_ciudad(ciudades2))
    ciudad_llamadas_por_ciudad= {"ciudades":ciudades2,"llamadas_por_ciudad":llamadas_por_ciudad}
    return {"ciudad_llamadas_por_ciudad":ciudad_llamadas_por_ciudad}

@app.route("/Consultas/Motivo")
def Motivo():
    dateInit = fecha[0]['name']
    motivo = consulta("SELECT distinct(MotivoLlamada) FROM campaniasinbound.trx;")
    aux_resultadoAgentes= resultadoAgentes[0] 
    num_motivos = consulta_gestiones_motivo(aux_resultadoAgentes,motivo)#funciona
    motivo_total = consulta_motivo_total(motivo)
    return {"motivo_total":motivo_total,"num_motivos_por_agente":num_motivos}

if __name__ == "__main__":
    app.run(debug=True)
