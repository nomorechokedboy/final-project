from flask_restful import Api, Resource
from flask import Flask, jsonify
from flask_swagger import swagger as Swagger
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

class HelloWorld(Resource):
    def get(self):
        """Return a hello world message"""
        return {'message': 'Hello World!'}

api.add_resource(HelloWorld, '/hello')

# Swagger documentation route
@app.route('/swagger')
def get_swagger():
    swag = Swagger(app)
    swag['info']['version'] = "1.0"
    swag['info']['title'] = "My API"
    return jsonify(swag)

# Swagger UI route
SWAGGER_URL = '/docs'
API_URL = '/swagger'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "My API"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

