from sqlite3 import connect
from flask import Flask,request, request_finished
from connect_mysql import *

app = Flask(__name__)


@app.route("/Dashboard")
def dashboard():    
    return {"data":resultadoCampañas}

@app.route("/DataCompleta")
def data():    
    return {"data":data}

""" @app.route("/Consulta",methods=['POST'])
def new_query():   
    request_data = json.loads(request.data)
    if(request_data):
        message_succesfull()
        print(request_data)
    return {"Data":request_data} """

@app.route("/Fecha",methods=['POST','GET'])
def new_date():
    
    if request.method == 'POST':   
        request_data = json.loads(request.data)
        message_succesfull()
        print("dentro de fecha",request_data['dateEnd']['value2'])

        return {"Dates":request_data['dateEnd']['value2']}
    else:
        return {"Dates":None}

@app.route("/Agentes")
def agentes():
    return{"Agentes":resultadoAgentes_final}

""" @app.route("/AgentesGestiones")
def agentesGestiones():
    return{"Agentes":resultadoAgentesGestiones}
    
@app.route("/Campañas")
def campañas():
    return{"Campañas":resultadoCampañas} """

if __name__ == "__main__":
    
    resultadoAgentes = consulta("SELECT distinct(Agent) FROM campaniasinbound.trx;")
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
    print(ciudades)
    data = {"nombre_agente":resultadoAgentes,"num_motivos_por_agente":num_motivos,"nombre_motivo":motivo ,"gestiones_agente":resultadoAgentesGestiones,"motivo_total":motivo_total,"ciudad_llamadas_por_ciudad":ciudad_llamadas_por_ciudad}
    finalizar()
    app.run(debug=True)
