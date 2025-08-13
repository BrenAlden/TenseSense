import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer 
from sklearn.svm import SVC 
from sklearn.metrics import accuracy_score
import re
import joblib

try:
    df = pd.read_csv('tense.csv')
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print("Error: The file 'tense.csv' was not found.")
    exit()

df.columns = df.columns.str.strip()

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

df['sentence_clean'] = df['sentence'].apply(preprocess_text)

vectorizer = TfidfVectorizer(ngram_range=(1, 2)) 
X = vectorizer.fit_transform(df['sentence_clean'])
y = df['tense']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = SVC(kernel='linear')
model.fit(X_train, y_train)

print("Model SVM berhasil dilatih.")

joblib.dump(model, 'svm_model.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
print("Model SVM dan TF-IDF Vectorizer berhasil disimpan.")

# --- Evaluasi Model ---
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"\n----------------------------------------------------")
print(f"Akurasi Model SVM: {accuracy:.4f}")
print(f"----------------------------------------------------")