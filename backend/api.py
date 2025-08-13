from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import os

app = Flask(__name__)
CORS(app)

base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, 'svm_model.pkl')
vectorizer_path = os.path.join(base_dir, 'tfidf_vectorizer.pkl')

try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
except FileNotFoundError:
    print("Error: File model atau vectorizer tidak ditemukan.")
    print("Pastikan Anda sudah menjalankan 'train_model.py' dan file berada di direktori yang benar.")
    exit()

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

@app.route('/detect-tense', methods=['POST'])
def detect_tense():
    data = request.get_json()
    
    if not data or 'sentence' not in data:
        return jsonify({'error': 'Missing "sentence" in request body'}), 400
    
    sentence = data['sentence']
    
    cleaned_sentence = preprocess_text(sentence)
    
    vectorized_sentence = vectorizer.transform([cleaned_sentence])
    
    prediction = model.predict(vectorized_sentence)
    
    raw_result = prediction[0]

    if raw_result != 'Tense tidak terdeteksi':
        formatted_result = f"{raw_result.title()} Tense"
    else:
        formatted_result = raw_result
    
    return jsonify({'tense': formatted_result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)