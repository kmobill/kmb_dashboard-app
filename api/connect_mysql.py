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
    


def consulta(operation):
    print("Empezando consulta...")            
    cursor = connection.cursor()
    #operation= "SELECT count(ID) FROM campaniasinbound.trx"
    cursor.execute(operation)
    result = cursor.fetchall()
    return result

def finalizar():
    if connection.is_connected():
        connection.close()
        print("Conexion finalizada")
def message_succesfull():
    print('exito!')