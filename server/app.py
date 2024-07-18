#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session, render_template
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Doctor, Patient, Appointment

# Views go here!
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

class Doctors(Resource):
    def get(self):
        doctors = Doctor.query.all()
        return make_response(jsonify([doctor.to_dict(rules=('-_password_hash',)) for doctor in doctors]), 200)
    
    def post(self):
        data = request.get_json()
        doctor = Doctor(name=data.get('name'), speciality=data.get('speciality'), email=data.get('email'))
        # doctor.password_hash = data.get('password')
        db.session.add(doctor)
        db.session.commit()
        
        response_body = doctor.to_dict()
        
        return make_response(response_body, 201)
    
api.add_resource(Doctors, '/doctors')

class DoctorById(Resource):
    def get(self, id):
        doctor = Doctor.query.filter_by(id=id).first()
        return make_response(jsonify(doctor.to_dict()), 200)
    
    def patch(self, id):
        data = request.get_json()
        doctor = Doctor.query.filter_by(id=id).first()
        
        for attr in data:
            setattr(doctor, attr, data.get(attr))
        # doctor.password_hash = data.get('password')
        db.session.add(doctor)
        db.session.commit()
        
        response_body = doctor.to_dict()
        
        return make_response(response_body, 200)
    def delete(self, id):
        doctor = Doctor.query.filter_by(id=id).first()
        db.session.delete(doctor)
        db.session.commit()
        
        response_body = {"message":"Doctor successfully deleted"}
        
        return make_response(response_body, 200)
    
api.add_resource(DoctorById, '/doctors/<int:id>')

class PatientsByDoctor(Resource):
    def get(self, id):
        doctor = Doctor.query.filter_by(id=id).first()
        patients = doctor.patients
        return make_response(jsonify([patient.to_dict() for patient in patients]), 200)

api.add_resource(PatientsByDoctor, '/doctors_patients/<int:id>')

class Appointments(Resource):
    def get(self):
        appointments = Appointment.query.all()
        return make_response(jsonify([appointment.to_dict() for appointment in appointments]), 200)
    
    def post(self):
        data = request.get_json()
        patient = Patient.query.filter_by(id=data['patientId']).first()
        doctor = Doctor.query.filter_by(id=data.get('user_id')).first()
        appointment = Appointment(patient=patient, doctor=doctor, date=data['date'], time=data['time'], reason=data['reason'])
        
        db.session.add(appointment)
        db.session.commit()
        
        response_body = appointment.to_dict()
        
        return make_response(response_body, 201)
    

api.add_resource(Appointments, '/appointments')

class AppointmentById(Resource):
    def get(self, id):
        appointment = Appointment.query.filter_by(id=id).first()
        return make_response(jsonify(appointment.to_dict()), 200)
    
    
    def patch(self, id):
        data = request.get_json()
        appointment = Appointment.query.filter_by(id=id).first()
        
        for attr in data:
            setattr(appointment, attr, data.get(attr))
        
        db.session.add(appointment)
        db.session.commit()
        
        response_body = appointment.to_dict()
        
        return make_response(response_body, 200)
    
    
    def delete(self, id):
        appointment = Appointment.query.filter_by(id=id).first()
        db.session.delete(appointment)
        db.session.commit()
        
        response_body = {"message":"Appointment successfully deleted"}
        
        return make_response(response_body, 200)
    
api.add_resource(AppointmentById, '/appointments/<int:id>')

class Patients(Resource):
    def get(self):
        patients = Patient.query.all()
        return make_response(jsonify([patient.to_dict() for patient in patients]), 200)
    
    def post(self):
        data = request.get_json()
        patient = Patient(name=data['name'], age=data['age'], gender=data['gender'], dateOfBirth=data['dateOfBirth'], contact=data['contact'], address=data['address'], medical_history=data['medicalHistory'])
        
        db.session.add(patient)
        db.session.commit()
        
        response_body = patient.to_dict()
        
        return make_response(response_body, 201)
    
api.add_resource(Patients, '/patients')

class PatientById(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id=id).first()
        return make_response(jsonify(patient.to_dict()), 200)
    
    def patch(self, id):
        data = request.get_json()
        patient = Patient.query.filter_by(id=id).first()
        
        for attr in data:
            setattr(patient, attr, data.get(attr))
        
        db.session.add(patient)
        db.session.commit()
        
        response_body = patient.to_dict()
        
        return make_response(response_body, 200)
    
    def delete(self, id):
        patient = Patient.query.filter_by(id=id).first()
        db.session.delete(patient)
        db.session.commit()
        
        response_body = {"message":"Patient successfully deleted"}
        
        return make_response(response_body, 200)
    
api.add_resource(PatientById, '/patients/<int:id>')

class Signup(Resource):
    def post(self):
        data = request.get_json()
        
        name = data.get('name')
        password = data.get('password')
        speciality = data.get('speciality')
        # contact = data.get('contact')
        email = data.get('email')
        
        if not name or not password:
            return make_response(jsonify({"message": "Missing required fields"}), 400)
        
        doctor = Doctor(name=name, speciality=speciality, email=email)
        doctor.password_hash = password
        
        db.session.add(doctor)
        db.session.commit()
        
        session['user_id'] = doctor.id
        
        response_body = doctor.to_dict(rules=('-_password_hash',))
        
        return make_response(response_body, 201)
    
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            doctor = Doctor.query.filter_by(id=session.get('user_id')).first()
            return make_response(doctor.to_dict(rules=('-_password_hash',)), 200)
        else:
            return make_response({"message": "Unauthorized"}, 401)
    
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    def post(self):
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return make_response(jsonify({"message": "Missing required fields"}), 400)
        
        doctor = Doctor.query.filter_by(email=email).first()
        
        if doctor and doctor.authenticate(password):
            session['user_id'] = doctor.id
            return make_response(jsonify(doctor.to_dict(rules=('-password',))), 200)
        else:
            return make_response(jsonify({"message": "Invalid credentials"}), 401)

api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session.pop('user_id')
            return make_response(jsonify({"message": "Successfully logged out"}), 200)
        else:
            return make_response(jsonify({"message": "Unauthorized"}), 401)
        
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

