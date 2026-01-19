from flask import Flask, request, render_template, session
from model import run_agent

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session management

@app.route('/')
def home():
    # Clear conversation when reloading the page
    session['conversation'] = []
    return render_template('chat.html', conversation=session['conversation'], initial=True)

@app.route('/query', methods=['POST'])
def query():
    user_query = request.form.get('query')  # Get the query from the form
    if not user_query:
        return "No query provided!", 400

    # Generate the AI response
    response = run_agent(user_query)

    # Add the user query and AI response to the session
    session['conversation'].append({'type': 'human', 'message': user_query})
    try:
        session['conversation'].append({'type': 'ai', 'message': response['output']})
    except:
        session['conversation'].append({'type': 'ai', 'message': "Sorry, I could not process your query."})
    session.modified = True  # Mark session as modified

    return render_template('chat.html', conversation=session['conversation'], initial=False)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
