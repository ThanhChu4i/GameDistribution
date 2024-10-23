import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Danh sách game mẫu
const gameList = [
  { id: 1, name: "Game 1", description: "This is Game 1", content: "Welcome to Game 1!" },
  { id: 2, name: "Game 2", description: "This is Game 2", content: "Welcome to Game 2!" },
  { id: 3, name: "Game 3", description: "This is Game 3", content: "Welcome to Game 3!" },
];

const GameDetails = () => {
  const { id } = useParams(); // Lấy id game từ URL
  const navigate = useNavigate(); // Điều hướng người dùng khi chọn game
  const game = gameList.find((g) => g.id === parseInt(id)); // Tìm game tương ứng với id

  // Xử lý khi người dùng chọn một game từ danh sách
  const handleGameSelect = (gameId) => {
    navigate(`/Games/${gameId}`);
  };

  return (
    <div className="game-page">
      {/* Khung bên trái hiển thị nội dung game */}
      <div className="game-display">
        {game ? (
          <>
            <h1>{game.name}</h1>
            <p>{game.content}</p>
            <p>{game.description}</p>
          </>
        ) : (
          <h2>Select a game from the list.</h2>
        )}
      </div>

      {/* Khung bên phải là danh sách các trò chơi */}
      <div className="game-list">
        <h2>Games List</h2>
        <ul>
          {gameList.map((game) => (
            <li key={game.id} onClick={() => handleGameSelect(game.id)}>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameDetails;
