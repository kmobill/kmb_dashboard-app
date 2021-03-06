from glob import glob
import re
from sqlite3 import connect
from sys import flags
from flask import Flask,request, request_finished
from connect_mysql import *
from unittest import result
import mysql.connector
from mysql.connector import Error


app = Flask(__name__)
cumulative=["fecha"]


def finalizar():
    if connection.is_connected():
        connection.close()
        print("Conexion finalizada")

def consulta_gestion_ciudad2(ciudades):
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
        aux= formatear_arreglo2(result_ciudades)
        result_ciudades=[]
        """ print(aux) """
        result.append(aux)
    return result

def consulta_motivo_total2(Motivos):
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
    aux= formatear_arreglo2(result_consultas)
    result_consultas=[]
    """ print("cant consulta:",aux) """
    result_total.append(aux)
    """ print("resultado: ",result_total) """
    return result_total

def formatear_arreglo2(arreglo):
    result_final=[]
    for res in arreglo:
        result_final.append(res[0])

    return result_final


def sumNums(num1,num2):
    res = num1+num2
    return res

def consulta2(operation):
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
    res = []      
    cursor = connection.cursor()
    #operation= "SELECT count(ID) FROM campaniasinbound.trx"
    cursor.execute(operation)
    result = cursor.fetchall()
    for x in result:
        res.append(x[0])
    finalizar()
    return res

def consulta_gestiones2(Agentes):
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
    result_final=[]
    for Agente in Agentes:
        cursor.execute("SELECT count(ID) FROM campaniasinbound.trx where Agent = '{agente}'".format(agente = Agente))
        result.append(cursor.fetchone())    
    for res in result:
        result_final.append(res[0])

    return result_final
def consulta_gestiones_motivo2(Agentes,Motivos):
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

    """ print("Empezando consulta motivos")    """         
    cursor = connection.cursor()
    result_total=[]
    result_agente=[]
    aux =[]


    for Agente in Agentes:
        for Motivo in Motivos:
            cursor.execute("SELECT count(ID) FROM campaniasinbound.trx where Agent = '{agente}' and MotivoLlamada = '{motivo}'".format(agente = Agente, motivo= Motivo))
            result_agente.append(cursor.fetchone())
        aux= formatear_arreglo2(result_agente)
        result_agente=[]
        """ print(aux) """
        result_total.append(aux)
    """ print("resutlado final: ",result_total) """
    return result_total
""" @app.route("/Dashboard")
def dashboard():    
    return {"data":resultadoCampa??as} """

@app.route("/Consultas/Agentes")
def Agentes():
    resultadoAgentes2 = consulta2("SELECT distinct(Agent) FROM campaniasinbound.trx ")
    resultadoAgentesGestiones2 = consulta_gestiones2(resultadoAgentes2)
    data2 = {"nombre_agente":resultadoAgentes2,"gestiones_agente":resultadoAgentesGestiones2,"fecha":cumulative[0]['name']}
    print("la data es:",data2)
    return {"data":data2}

""" @app.route("/Consultas/Motivos")
def Motivos():
    resultadoAgentes2 = consulta2("SELECT distinct(Agent) FROM campaniasinbound.trx ")
    resultadoAgentesGestiones2 = consulta_gestiones2(resultadoAgentes2)#funciona
    motivo2 = consulta2("SELECT distinct(MotivoLlamada) FROM campaniasinbound.trx;")
    num_motivos2 = consulta_gestiones_motivo2(resultadoAgentes2,motivo2)#funciona
    motivo_total2 = consulta_motivo_total2(motivo2)
    data2 = {"nombre_agente":resultadoAgentes2,"num_motivos_por_agente":num_motivos2,"nombre_motivo":motivo2 ,"gestiones_agente":resultadoAgentesGestiones2,"motivo_total":motivo_total2}
    return {"nombre_agente":data2}



@app.route("/Consultas/Llamadas")
def Llamadas():
    ciudades2 = consulta2("SELECT distinct(CiudadCliente) from campaniasinbound.trx where CiudadCliente REGEXP'\D'")
    llamadas_por_ciudad2= formatear_arreglo2(consulta_gestion_ciudad2(ciudades2))
    ciudad_llamadas_por_ciudad2= {"ciudades":ciudades2,"llamadas_por_ciudad":llamadas_por_ciudad2}
    data2 = {"ciudad_llamadas_por_ciudad":ciudad_llamadas_por_ciudad2}
    print("la data es: ",data2)
    return {"date":data2} """

@app.route("/DataCompleta")
def data():          
    resultadoAgentes2 = consulta2("SELECT distinct(Agent) FROM campaniasinbound.trx ")
    resultadoAgentesGestiones2 = consulta_gestiones2(resultadoAgentes2)#funciona
    motivo2 = consulta2("SELECT distinct(MotivoLlamada) FROM campaniasinbound.trx;")
    num_motivos2 = consulta_gestiones_motivo2(resultadoAgentes2,motivo2)#funciona
    motivo_total2 = consulta_motivo_total2(motivo2)
    ciudades2 = consulta2("SELECT distinct(CiudadCliente) from campaniasinbound.trx where CiudadCliente REGEXP'\D'")
    llamadas_por_ciudad2= formatear_arreglo2(consulta_gestion_ciudad2(ciudades2))
    ciudad_llamadas_por_ciudad2= {"ciudades":ciudades2,"llamadas_por_ciudad":llamadas_por_ciudad2}            
    data2 = {"nombre_agente":resultadoAgentes2,"num_motivos_por_agente":num_motivos2,"nombre_motivo":motivo2 ,"gestiones_agente":resultadoAgentesGestiones2,"motivo_total":motivo_total2,"ciudad_llamadas_por_ciudad":ciudad_llamadas_por_ciudad2}
    print("la data es: ",data2)
    return {"date":data2}


@app.route("/FechaREACT",methods=['POST'])
def fecha_react():
    if request.method == 'POST':
        request_data_date = json.loads(request.data)
        print("data date",request_data_date)        
        cumulative[0] = (request_data_date)
        

        """ query_example = consulta2("SELECT distinct(Agent) FROM campaniasinbound.trx")        
        resultadoCampa??as2 = consulta2("SELECT distinct(Cooperativa) FROM campaniasinbound.trx")
        resultadoAgentes2 = consulta2("SELECT distinct(Agent) FROM campaniasinbound.trx ")
        resultadoAgentesGestiones2 = consulta_gestiones2(resultadoAgentes2)#funciona
        motivo2 = consulta2("SELECT distinct(MotivoLlamada) FROM campaniasinbound.trx;")
        num_motivos2 = consulta_gestiones_motivo2(resultadoAgentes2,motivo2)#funciona
        motivo_total2 = consulta_motivo_total2(motivo2)
        ciudades2 = consulta2("SELECT distinct(CiudadCliente) from campaniasinbound.trx where CiudadCliente REGEXP'\D'")
                #print("CIUDADES:",ciudades2)
        llamadas_por_ciudad2= formatear_arreglo2(consulta_gestion_ciudad2(ciudades2))
        ciudad_llamadas_por_ciudad2= {"ciudades":ciudades2,"llamadas_por_ciudad":llamadas_por_ciudad2}            
        data2 = {"nombre_agente":resultadoAgentes2,"num_motivos_por_agente":num_motivos2,"nombre_motivo":motivo2 ,"gestiones_agente":resultadoAgentesGestiones2,"motivo_total":motivo_total2,"ciudad_llamadas_por_ciudad":ciudad_llamadas_por_ciudad2}  """


if __name__ == "__main__":
    data ={}
    
    finalizar()
    app.run(debug=True)
