FROM python:3.10-slim

WORKDIR /app

# Install necessary system dependencies, including the MySQL client
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    libssl-dev \
    pkg-config \
    default-mysql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy necessary directories explicitly
COPY static /app/static
COPY templates /app/templates
COPY dataset /app/dataset
COPY vector_db /app/vector_db

# Copy other necessary files
COPY app.py model.py requirements.txt ./
COPY .env .env

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the Flask app's port
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
