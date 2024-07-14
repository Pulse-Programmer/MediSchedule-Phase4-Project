#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Doctor, Patient, Appointment

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Doctors(Resource):
    def get(self):
        doctors = Doctor.query.all()
        return make_response(jsonify([doctor.to_dict() for doctor in doctors]), 200)
    
    def post(self):
        data = request.get_json()
        doctor = Doctor(name=data['name'], specialty=data['specialty'])
        
        db.session.add(doctor)
        db.session.commit()
        
        response_body = doctor.to_dict()
        
        return make_response(response_body, 201)
    
api.add_resource(Doctors, '/doctors')

class DoctorById(Resource):
    def get(self, doctor_id):
        doctor = Doctor.query.filter_by(doctor_id=id).first()
        return make_response(jsonify(doctor.to_dict()), 200)

    def delete(self, id):
        doctor = Doctor.query.filter_by(id=id).first()
        db.session.delete(doctor)
        db.session.commit()
        
        response_body = {"message":"Doctor successfully deleted"}
        
        return make_response(response_body, 200)
    
api.add_resource(DoctorById, '/doctors/<int:id>')

class Appointments(Resource):
    def get(self):
        appointments = Appointment.query.all()
        return make_response(jsonify([appointment.to_dict() for appointment in appointments]), 200)
    
    def post(self):
        data = request.get_json()
        appointment = Appointment(doctor_id=data['doctor_id'], patient_id=data['patient_id'], date=data['date'], time=data['time'])
        
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
        patient = Patient(name=data['name'], dob=data['dob'], gender=data['gender'], address=data['address'])
        
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

