
echo "Creating .env file from .env.example for backend..."
cp ./backend/.env_example ./backend/.env

echo "Creating .env file from .env.example for frontend..."
cp ./frontend/.env_example ./frontend/.env


docker compose up --build