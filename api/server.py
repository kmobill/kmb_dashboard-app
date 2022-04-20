from sqlite3 import connect
from flask import Flask,request, request_finished
from connect_mysql import *

app = Flask(__name__)


@app.route("/Dashboard")
def dashboard():    
    return {"data":resultadoCampañas}

@app.route("/Consulta",methods=['POST'])
def new_query():   
    request_data = json.loads(request.data)
    if(request_data):
        message_succesfull()
        print(request_data)
    return {"Data":request_data}

@app.route("/Agentes")
def agentes():
    return{"Agentes":resultadoAgentes}

@app.route("/AgentesGestiones")
def agentesGestiones():
    return{"Agentes":resultadoAgentesGestiones}
    
@app.route("/Campañas")
def campañas():
    return{"Campañas":resultadoCampañas}

if __name__ == "__main__":
    resultadoAgentes = consulta("SELECT distinct(Agent) FROM campaniasinbound.trx;")
    resultadoCampañas = consulta("SELECT distinct(Cooperativa) FROM campaniasinbound.trx")
    resultadoAgentesGestiones = consulta("select count(ID) from campaniasinbound.trx where Agent = 'egarcia'")
    
    finalizar()
    app.run(debug=True)
