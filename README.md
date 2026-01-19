# FusionAI - Multi-Agent AI Chatbot System

A powerful multi-capability AI chatbot that combines **Retrieval Augmented Generation (RAG)**, **SQL Database Querying**, and **Weather API Integration** into a single intelligent system. Built with Flask, LangChain, and powered by Groq's Llama-3.3-70b-Versatile model.

## 🚀 Features

- **📚 RAG-based Q&A**: Ask questions about "The Odyssey" using advanced document retrieval
- **🗄️ SQL Database Querying**: Natural language queries on telecom/employee management database
- **🌤️ Weather Information**: Real-time weather data for any city
- **🤖 ReAct Agent**: Intelligent tool selection using LangChain's ReAct pattern
- **💬 Web Interface**: Clean, dark-themed chat interface built with Flask

## 🏗️ Architecture

The system uses a **ReAct (Reasoning + Acting) agent** pattern that intelligently routes user queries to appropriate tools:

1. **RAG Tool**: Retrieves relevant chunks from "The Odyssey" text using FAISS vector database
2. **Database Tool**: Converts natural language to SQL, executes queries, and returns human-readable responses
3. **Weather Tool**: Fetches current weather data from OpenWeatherMap API

## 📋 Prerequisites

- Python 3.10+
- Docker and Docker Compose
- Groq API Key ([Get one here](https://console.groq.com/))
- OpenWeatherMap API Key ([Get one here](https://openweathermap.org/api))

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/manit0700/Fusion-ai-.git
cd Fusion-ai-
```

### 2. Create Environment File

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
WEATHER_API_KEY=your_openweather_api_key_here
```

### 3. Run with Docker (Recommended)

```bash
docker-compose up
```

The application will be available at `http://localhost:5000`

### 4. Manual Setup (Alternative)

```bash
# Install dependencies
pip install -r requirements.txt

# Start MySQL database (if not using Docker)
# Make sure MySQL is running on localhost:3306

# Run the Flask application
python app.py
```

## 📖 Usage Examples

### RAG Queries (The Odyssey)
- "Who is the main character in The Odyssey?"
- "What happened to Odysseus during his journey?"
- "Tell me about the Cyclops encounter"

### Database Queries
- "How many customers are in the database?"
- "What is the average call duration for customer ID 25?"
- "Show me all customers who purchased Plan 5"
- "What's the total revenue from purchases?"

### Weather Queries
- "What's the weather in New York?"
- "How's the temperature in London?"
- "Weather in Tokyo"

## 📁 Project Structure

```
FusionAI-master/
├── app.py                 # Flask web application
├── model.py              # AI agent and tools definition
├── requirements.txt      # Python dependencies
├── Dockerfile           # Container configuration
├── docker-compose.yml   # Multi-container orchestration
├── init.sql            # Database initialization
├── dataset/
│   └── odyssey.txt     # Source text for RAG
├── vector_db/          # FAISS vector store (pre-built)
│   ├── index.faiss
│   └── index.pkl
├── templates/
│   └── chat.html       # Chat interface template
└── static/
    └── css/
        └── style.css   # Styling
```

## 🗄️ Database Schema

The system includes a MySQL database (`telecom_db`) with the following tables:

- **customer_info**: Customer personal information (50 records)
- **service_plans**: Available service plans (50 plans)
- **purchase_info**: Customer purchase records (49 records)
- **call_data_records**: Call history and metrics (50 records)

The database is automatically initialized when using Docker Compose.

## 🔧 Technologies Used

- **Python 3.10**
- **Flask 3.0.3**: Web framework
- **LangChain 0.3.3**: LLM orchestration framework
- **LangChain Groq 0.2.2**: Groq API integration
- **FAISS-CPU 1.9.0**: Vector similarity search
- **MySQL**: Relational database
- **HuggingFace Embeddings**: Text embeddings for RAG

## 🧠 AI Models

- **LLM**: Llama-3.3-70b-Versatile (via Groq API)
- **Embeddings**: BAAI/bge-small-en-v1.5

## 📝 Configuration

### Vector Database Setup

The FAISS vector store is pre-built and located in the `vector_db/` directory. If you need to rebuild it:

```python
from model import save_embeddings_to_db
save_embeddings_to_db("vector_db", "BAAI/bge-small-en-v1.5")
```

### Database Connection

Database credentials are configured in `model.py`:
- Host: `db` (Docker) or `localhost`
- Port: `3306`
- Database: `telecom_db`
- User: `root`
- Password: `123`

⚠️ **Note**: For production use, move credentials to environment variables.

## 🐛 Troubleshooting

### Common Issues

1. **Vector database not found**: Ensure `vector_db/` directory exists with `index.faiss` and `index.pkl`
2. **Database connection failed**: Check if MySQL container is running (`docker-compose ps`)
3. **API key errors**: Verify `.env` file has correct API keys
4. **Path errors on macOS/Linux**: Update path separators in `model.py` (lines 27, 49, 50) to use forward slashes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available for personal and educational use.

## 🔗 Links

- [Groq Console](https://console.groq.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [LangChain Documentation](https://python.langchain.com/)

## 👤 Author

**manit0700**

---

⭐ If you find this project helpful, please consider giving it a star!
