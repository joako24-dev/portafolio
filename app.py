import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GMAIL_USER     = os.getenv('GMAIL_USER')
GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD')
MAIL_TO        = os.getenv('MAIL_TO')


@app.route('/')
def health():
    return 'OK', 200


@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()

    name    = data.get('name', '').strip()
    email   = data.get('email', '').strip()
    subject = data.get('subject', 'Sin asunto').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'error': 'Faltan campos requeridos'}), 400

    try:
        msg = MIMEMultipart()
        msg['From']    = GMAIL_USER
        msg['To']      = MAIL_TO
        msg['Subject'] = f'[Portafolio] {subject}'

        body = f"""
Nuevo mensaje desde tu portafolio:

Nombre:  {name}
Email:   {email}
Asunto:  {subject}

Mensaje:
{message}
        """
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(GMAIL_USER, GMAIL_PASSWORD)
            server.sendmail(GMAIL_USER, MAIL_TO, msg.as_string())

        return jsonify({'ok': True}), 200

    except Exception as e:
        print(f'Error al enviar email: {e}')
        return jsonify({'error': 'Error interno'}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
