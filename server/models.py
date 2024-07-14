from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import enum

from config import db


# Models go here! Mock models

    

# Models go here!

class Patient (db.Model, SerializerMixin):
    __tablename__ = 'patients'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String)
    contact = db.Column(db.Integer)
    address = db.Column(db.String) 
    medical_history = db.Column(db.String)
    #relationships
    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')

    # Association proxy to get appointments for this patient through doctors
    appointments = association_proxy('doctors', 'appointment', creator=lambda appointment_obj: Doctor(appointment=appointment_obj))

    def __repr__(self):
        return f'<Patient {self.id}, {self.name}, {self.age}, {self.gender}, {self.contact}, {self.address}, {self.medical_history}>'
    
class Doctor(db.Model):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String)
    contact = db.Column(db.Integer)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    availability = db.Column(db.Boolean, nullable=False)
    #relationships
    appointments = db.relationship('Appointment', back_populates='doctor', cascade='all, delete-orphan')

    #validations
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name is required')
        elif Doctor.query.filter_by(name = name).first():
            raise ValueError('Name must be unique')
        return name
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Invalid Email format')
        return email

    def __repr__(self):
        return f'Doctor {self.id}, {self.name}, {self.specialization}, {self.contact}, {self.email}, {self.password}, {self.availability}>'
    
    class Appointment(db.Model):
        __tablename__ = 'appointments'

        id = db.Column(db.Integer, primary_key=True)
        patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
        doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))
        appointment_date = db.Column(db.DateTime, nullable=False)
        appointment_time = db.Column(db.Time, nullable=False)
        reason_for_visit = db.Column(db.String, nullable=False)
        status = db.Column(enum('Scheduled', 'Completed', 'Cancelled'), default='Scheduled')
        # Relationships
        patient = db.relationship('Patient', back_populates='appointments')
        doctor = db.relationship('Doctor', back_populates='appointments')

        def __repr__(self):
            return f'Appointment {self.id}, {self.appointment_date}, {self.appointment_time}, {self.reason_for_visit}, {self.status}>'
