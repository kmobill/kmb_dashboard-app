from glob import glob
from sqlite3 import connect
from flask import Flask,request, request_finished
from connect_mysql import *
from unittest import result
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)


#funcion para conectar


@app.route("/Fecha",methods=['POST','GET'])
def new_date():
    global aux
    if request.method == 'POST':   
        request_data_date = json.loads(request.data)
        print("data date",request_data_date)
        aux = "dasdasd"
    return {"date":aux}

@app.route("/DataCompleta")
def data():    
    return {"data":data}

if __name__ == "__main__":  
    #string= "SELECT distinct(Agent) FROM campaniasinbound.trx where (StartedManagement BETWEEN '{dateI}' AND '{dateE}')".format(dateI = dateInit, dateE= dateEnd)
    """ print("la operacion ejecutandose es:",string) """
    resultadoAgentes = consulta("SELECT distinct(Agent) FROM campaniasinbound.trx ")
    resultadoCampañas = consulta("SELECT distinct(Cooperativa) FROM campaniasinbound.trx")
    resultadoAgentesGestiones = consulta_gestiones(resultadoAgentes)
    resultadoAgentes_final = {"nombre_agente":resultadoAgentes,"gestiones_agente":resultadoAgentesGestiones}
    motivo = consulta("SELECT distinct(MotivoLlamada) FROM campaniasinbound.trx;")
    num_motivos = consulta_gestiones_motivo(resultadoAgentes,motivo)
    resultadoMotivos_final = {"nombre_agente":resultadoAgentes,"motivos":num_motivos}
    motivo_total = consulta_motivo_total(motivo)    
    ciudades = consulta("SELECT distinct(CiudadCliente) from campaniasinbound.trx where CiudadCliente REGEXP'\D'")
    llamadas_por_ciudad= formatear_arreglo(consulta_gestion_ciudad(ciudades))
    ciudad_llamadas_por_ciudad= {"ciudades":ciudades,"llamadas_por_ciudad":llamadas_por_ciudad}
    """ print(ciudades) """
    data = {"nombre_agente":resultadoAgentes,"num_motivos_por_agente":num_motivos,"nombre_motivo":motivo ,"gestiones_agente":resultadoAgentesGestiones,"motivo_total":motivo_total,"ciudad_llamadas_por_ciudad":ciudad_llamadas_por_ciudad}
    finalizar()
    app.run(debug=True)
