from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_URL = "API URL"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send():
    data = request.json
    question = data['message']
    try:
        #向API發送POST請求
        response = requests.post(API_URL, json={"question": question})
        response.raise_for_status()  # 檢查請求是否成功
        # 如果成功，提取'text'字段
        return jsonify({'text': response.json().get('text')})
    except requests.RequestException as e:
        # 處理請求失敗的情況
        return jsonify({'text': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
