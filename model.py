import os 
import requests
import mysql.connector

from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS 
from langchain.document_loaders import TextLoader
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.chains import RetrievalQA
from langchain_community.utilities import SQLDatabase
from langchain.agents import Tool
from langchain.agents import create_react_agent, AgentExecutor
from dotenv import load_dotenv
from langchain_groq import ChatGroq


load_dotenv()

os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")
weather_api_key = os.getenv("WEATHER_API_KEY")


model_name = "BAAI/bge-small-en-v1.5"
persistant_directory = os.getcwd() + '\\db\\'
documents = []
file_name = os.getcwd() + "/dataset/odyssey.txt"
embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
llm = ChatGroq(model="Llama-3.3-70b-Versatile")

# Reading the txt file 
def load_txt_file(file_path):  
    loader = TextLoader(file_path, encoding = 'UTF-8')
    book_docs = loader.load()
    return book_docs

# Splitting the txt file into chunks of 250 character with 50 character_overlap
def split_doc_into_chunks(file_path):
    documents = load_txt_file(file_path)

    text_splitter = CharacterTextSplitter(chunk_size=250, chunk_overlap=50)
    docs = text_splitter.split_documents(documents)
    return docs

def save_embeddings_to_db(folder_path, model_name):

    faiss_index_path = os.getcwd() + "\vector_db\index.faiss"
    faiss_pkl_path = os.getcwd() + "\vector_db\index.pkl"

    if os.path.exists(faiss_index_path) and os.path.exists(faiss_pkl_path):
        return f"FAISS vector store already exists in {folder_path}. Skipping save."
    else:
        # Initialize Llama embeddings using Hugging Face
        embeddings = HuggingFaceEmbeddings(model_name=model_name)
        
        docs = split_doc_into_chunks(file_name)
        # Generate embeddings and create FAISS vector store
        vector_store = FAISS.from_documents(docs, embeddings)
        
        # Save the FAISS vector store locally in the vector_db folder
        os.makedirs(folder_path, exist_ok=True)
        vector_store.save_local(folder_path)
        return f"FAISS vector store saved in {folder_path}. Skipping save."
    
def create_rag_retrieval_chain():
    """
    Initializes the RAG Retrieval QA chain with the FAISS index from the 'vector_db' folder.
    """
    # Load the FAISS index
    embedding = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    db = FAISS.load_local("vector_db", embedding, allow_dangerous_deserialization=True)

    # Define the retriever
    retriever = db.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"k": 3, "score_threshold": 0.1}
    )

    # Define the prompt
    prompt_template = """Read the Question twice based on the provided context, respond to the question below while adhering to these guidelines:
    1. If the answer is not found, do not speculate. Instead, state, "I do not know the answer."
    2. If the answer is found, provide a clear and concise response in no more than ten sentences.

    {context}

    Question: {question}

    Answer:
    """
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

    # Create the Retrieval QA chain
    retriever_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )

    return retriever_chain

def get_current_weather(city_name: str) -> str:
    """
    Get current weather for a city
    units: metric (Celsius) or imperial (Fahrenheit)
    """
    endpoint = f"http://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city_name,
        "appid": weather_api_key,
        "units": "metric"
    }
    
    try:
        response = requests.get(endpoint, params=params)
        response.raise_for_status()  # Raise exception for bad status codes
        data = response.json()
        
        return {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "feels_like": data["main"]["feels_like"],
            "humidity": data["main"]["humidity"],
            "description": data["weather"][0]["description"],
            "wind_speed": data["wind"]["speed"]
        }
        
    except requests.exceptions.RequestException as e:
        return f"Error fetching weather data: {e}"

# def get_schema(_):
#     """Fetches schema information for the employee_management database."""
#     db_url = "mysql+mysqlconnector://root:123@db:3306/telecom_db"
#     db = SQLDatabase.from_uri(db_url)
#     return db.get_table_info()

def get_schema(_): 
    """Fetches schema information for the employee_management database."""
    connection = mysql.connector.connect(
        user="root",
        password="123",
        host="db",
        port="3306",  # Default MySQL port
        database="telecom_db"
    )

    output = "DB connected\n\n"

    cursor = connection.cursor()

    # Get all table names from the database
    cursor.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'telecom_db'")
    tables = cursor.fetchall()

    # Iterate through each table
    for (table_name,) in tables:
        output += f"Processing table: {table_name}\n\n"
        
        # Fetch the schema of the table
        cursor.execute(f"SHOW CREATE TABLE {table_name}")
        schema = cursor.fetchone()[1]  # Retrieve the CREATE TABLE statement
        output += f"{schema}\n\n"
        
        # Fetch sample rows from the table
        cursor.execute(f"SELECT * FROM {table_name} LIMIT 3")
        rows = cursor.fetchall()
        
        # Fetch column names
        cursor.execute(f"SHOW COLUMNS FROM {table_name}")
        columns = [column[0] for column in cursor.fetchall()]
        
        # Append sample rows to output
        output += "/*\n"
        output += f"3 rows from {table_name} table:\n"
        output += "\t".join(columns) + "\n"
        for row in rows:
            output += "\t".join(map(str, row)) + "\n"
        output += "*/\n\n"

    # Close the connection
    connection.close()

    # Print the accumulated output
    return output


# def run_query(query):
#     """Executes a given SQL query on the employee_management database."""
#     # db_url = "mysql+mysqlconnector://root:123@db:3306/telecom_db"
#     db_url = "mysql+mysqlconnector://root:1234@localhost:3306/telecom_db"
#     db = SQLDatabase.from_uri(db_url)
#     return db.run(query) 

def run_query(query): 
    # Connect to the database
    connection = mysql.connector.connect(
        user="root",
        password="123",
        host="db",
        port="3306",  # Default MySQL port
        database="telecom_db"
    )

    cursor = connection.cursor()

    try:
        # Execute the query
        cursor.execute(query)
        # Fetch all rows from the query result
        result = cursor.fetchall()
        return result
    except Exception as e:
        # Handle errors and return the error message
        return f"An error occurred: {str(e)}"
    finally:
        # Close the connection
        connection.close()


def get_table_information(table_query: str) -> str:
    """
    Generates a natural language response to questions about database tables by:
    1. Converting the question to SQL.
    2. Executing the SQL query.
    3. Converting the SQL results to natural language.

    Args:
        table_query (str): The user's question about the database.

    Returns:
        str: Natural language response based on the SQL query results.
    """
    schema_template = """
    Based on the table schema below, write a valid SQL query that answers the user's question:
    NOTE: Ensure the query is syntactically correct and does not include markdown or extraneous text.
    {schema}

    Question: {question}
    SQL Query:
    """
    schema_prompt = ChatPromptTemplate.from_template(schema_template)

    sql_chain = (
        RunnablePassthrough.assign(schema=get_schema)
        | schema_prompt
        | llm
        | StrOutputParser()
    )

    response_template = """
    Based on the table schema, user's question, SQL query, and query results, write a concise and accurate natural language response:
    {schema}

    Question: {question}
    SQL Query: {query}
    SQL Response: {response}
    Response:
    """
    response_prompt = ChatPromptTemplate.from_template(response_template)

    full_chain = (
        RunnablePassthrough.assign(query=sql_chain).assign(
            schema=get_schema,
            response=lambda x: run_query(x["query"])
        )
        | response_prompt
        | llm
    )

    return full_chain.invoke({"question": table_query})


# Defining all the tools
tools = [
    Tool(
        name="rag_answer",
        func=lambda query: create_rag_retrieval_chain().invoke(query),
        description="""Use this tool to answer questions about the loaded storybook.
        Input should be a question about the story's content, characters, plot, or themes.
        This tool uses Retrieval Augmented Generation (RAG) to provide accurate answers."""
    ),
    Tool(
        name="current_weather",
        func=get_current_weather,
        description="Use this tool to get current weather information for any city. Input should be a city name."
    ),
    Tool(
        name="query_database",
        func=get_table_information,
        description="""Use this tool to query the employee management database and get information in natural language.
        The tool can handle questions about:
        - Employee details (name, salary, position, department, hire date)
        - Department information (name, location, budget, manager)
        - Statistical queries (averages, counts, grouping)
        
        Example questions:
        - "How many employees are in the Engineering department?"
        - "What is the average salary by department?"
        - "Who are the most recently hired employees?"
        - "List all departments and their managers"
        - "Show me employees with salaries above 70000"
        
        Input should be a natural language question about employee or department data.
        The tool will convert your question to SQL, execute it, and return a human-readable response."""
    )
]

# Creating React PromptTemplate
template = '''Answer the following questions as best you can. You have access to the following tools:
{tools}

Use the following format:
Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
(this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

BEGIN!
Question: {input}
Thought:{agent_scratchpad}'''

prompt = PromptTemplate.from_template(template)

agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    
# Defining the run_agent function
def run_agent(query):
    try:
        # Invoke the agent executor
        agent_ans = agent_executor.invoke({"input": query})
    except Exception as e:
        print(f"Error occurred: {e}")
        return "Sorry, I could not process your query."

    return agent_ans

# run_agent("average call duration")
