from sqlite3 import connect
from flask import Flask
from connect_mysql import *

app = Flask(__name__)


@app.route("/Dashboard")
def dashboard():    
    return {"data":resultado}

if __name__ == "__main__":
    resultado = consulta("""SELECT ID FROM campaniasinbound.trx
where  Cooperativa = 'Cooperativa gañansol'""")
    json_dump = json. dumps(resultado)
    json_object = json. loads(json_dump)
    print("resultado",resultado)
    print("json_dump",json_dump)
    print("json_object",json_object)
    finalizar()
    app.run(debug=True)
