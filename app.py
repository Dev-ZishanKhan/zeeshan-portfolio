from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

# Database configuration
if os.environ.get('DATABASE_URL'):
    # Production (Render PostgreSQL)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
else:
    # Development (SQLite)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')
mail = Mail(app)

# Database model
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

# Create tables
with app.app_context():
    db.create_all()

# Routes remain the same
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.json.get('name')
    email = request.json.get('email')
    message = request.json.get('message')
    
    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'All fields are required'}), 400
    
    try:
        new_message = ContactMessage(name=name, email=email, message=message)
        db.session.add(new_message)
        db.session.commit()
        
        msg = Message(
            subject=f"New message from {name}",
            recipients=[os.getenv('MAIL_USERNAME')],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(msg)
        
        return jsonify({'status': 'success', 'message': 'Message sent successfully!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'status': 'error', 'message': f'Error: {str(e)}'}), 500

@app.route('/admin/messages')
def admin_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return render_template('admin_messages.html', messages=messages)

@app.route('/static/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('static/images', filename)

if __name__ == '__main__':
    app.run(debug=True)