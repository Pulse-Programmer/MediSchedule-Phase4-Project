
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import enum

from config import db, bcrypt


# Models go here! Mock models

    

# Models go here!

class Patient (db.Model, SerializerMixin):
    __tablename__ = 'patients'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String)
    dateOfBirth = db.Column(db.String)
    contact = db.Column(db.Integer)
    address = db.Column(db.String) 
    medical_history = db.Column(db.String)
    #relationships
    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')
    
    #serialize_rules
    serialize_rules = ('-appointments.patient',)

    # Association proxy to get doctors for this patient through appointments
    # doctors = association_proxy('appointments', 'doctor', creator=lambda doctor_obj: Appointment(doctor=doctor_obj))
    

    def __repr__(self):
        return f'<Patient {self.id}, {self.name}, {self.age}, {self.gender}, {self.contact}, {self.address}, {self.medical_history}>'
    
class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    speciality = db.Column(db.String)
    email = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column(db.String(100))
    # availability = db.Column(db.Boolean, nullable=False)
    #relationships
    appointments = db.relationship('Appointment', back_populates='doctor', cascade='all, delete-orphan')
    #serialize_rules
    serialize_rules = ('-appointments.doctor',)
    # Association proxy to get patients for this doctor through appointments
    patients = association_proxy('appointments', 'patient', creator=lambda patient_obj: Appointment(patient=patient_obj))
   

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

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password is not readable')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash.encode('utf-8'), password.encode('utf-8'))

    def __repr__(self):
        return f'Doctor {self.id}, {self.name}, {self.specialization}, {self.contact}, {self.email}, {self.password}, {self.availability}>'
    
class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))
    date = db.Column(db.String, nullable=False)
    time = db.Column(db.String, nullable=False)
    reason = db.Column(db.String, nullable=False)
        # status = db.Column(enum('Scheduled', 'Completed', 'Cancelled'), default='Scheduled')
        # Relationships
    patient = db.relationship('Patient', back_populates='appointments')
    doctor = db.relationship('Doctor', back_populates='appointments')
        
    # serialize_rules
    serialize_rules = ('-patient.appointments', '-doctor.appointments')

    def __repr__(self):
        return f'Appointment {self.id}, {self.date}, {self.time}, {self.reason}, {self.status}>'
