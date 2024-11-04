import React, { useEffect, useState } from 'react';
import './BodyGamePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BodyGamePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho các bộ lọc
  const [filters, setFilters] = useState({
    genres: '',
    development: '',
    languages: '',
    players: '',
    mobile: '', 
    no_blood: false,
    child_friendly: false,
    ingame_purchases: false,
  });

  // State cho trạng thái mở/đóng của từng dropdown
  const [dropdownOpen, setDropdownOpen] = useState({
    genres: false,
    development: false,
    languages: false,
    players: false,
    mobile: false,
  });

  // Hàm để bật/tắt dropdown
  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // Hàm xử lý khi thay đổi các bộ lọc
  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Hàm để lấy danh sách game dựa trên các bộ lọc
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (filters.genres) params.genres = filters.genres;
        if (filters.development) params.development = filters.development;
        if (filters.languages) params.languages = filters.language;
        if (filters.players) params.players = filters.players;
        if (filters.mobile) params.mobile = filters.mobile;
        if (filters.no_blood) params.no_blood = filters.no_blood;
        if (filters.child_friendly) params.child_friendly = filters.child_friendly;
        if (filters.ingame_purchases) params.ingame_purchases = filters.ingame_purchases;

        const response = await axios.get('http://localhost:8081/api/games', { params });
        setGames(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters]);

  return (
    <div className="container">
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-options">
          {/* Dropdown Genres */}
          <div className="dropdownn">
            <button className="dropdownn-button" onClick={() => toggleDropdown('genres')}>
              Genres
            </button>
            {dropdownOpen.genres && (
              <div className="dropdownn-content">
                <select name="genres" value={filters.genres} onChange={handleFilterChange}>
                  <option value="">All Genres</option>
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="strategy">Strategy</option>
                  {/* Thêm các genres khác tùy ý */}
                </select>
              </div>
            )}
          </div>

          {/* Dropdown Development */}
          <div className="dropdownn">
            <button className="dropdownn-button" onClick={() => toggleDropdown('development')}>
              Development
            </button>
            {dropdownOpen.development && (
              <div className="dropdownn-content">
                <select name="development" value={filters.development} onChange={handleFilterChange}>
                  <option value="">All Development</option>
                  <option value="indie">Indie</option>
                  <option value="AAA">AAA</option>
                  <option value="mobile">Mobile</option>
                  {/* Thêm các loại phát triển khác tùy ý */}
                </select>
              </div>
            )}
          </div>

          {/* Dropdown Languages */}
          <div className="dropdownn">
            <button className="dropdownn-button" onClick={() => toggleDropdown('languages')}>
              Language
            </button>
            {dropdownOpen.languages && (
              <div className="dropdownn-content">
                <select name="languages" value={filters.languages} onChange={handleFilterChange}>
                  <option value="">All Languages</option>
                  <option value="vietnamese">Vietnamese</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="english">English</option>
                  {/* Thêm các ngôn ngữ khác tùy ý */}
                </select>
              </div>
            )}
          </div>

          {/* Dropdown Players */}
          <div className="dropdownn">
            <button className="dropdownn-button" onClick={() => toggleDropdown('players')}>
              Players
            </button>
            {dropdownOpen.players && (
              <div className="dropdownn-content">
                <select name="players" value={filters.players} onChange={handleFilterChange}>
                  <option value="">All Players</option>
                  <option value="single">Single Player</option>
                  <option value="multi">Multiplayer</option>
                  <option value="coop">Co-op</option>
                  {/* Thêm các tùy chọn chơi khác tùy ý */}
                </select>
              </div>
            )}
          </div>

          {/* Dropdown Mobile Compatible */}
          <div className="dropdownn">
            <button className="dropdownn-button" onClick={() => toggleDropdown('mobile')}>
              Mobile Compatible
            </button>
            {dropdownOpen.mobile && (
              <div className="dropdownn-content">
                <select name="mobile" value={filters.mobile} onChange={handleFilterChange}>
                  <option value="">All Compatibility</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Checkbox Filters */}
        <div className="checkbox-filters">
          <div className="input-group checkbox">
            <label>
              <input
                type="checkbox"
                name="no_blood"
                checked={filters.no_blood}
                onChange={handleFilterChange}
              />
              No Blood
            </label>
          </div>
          <div className="input-group checkbox">
            <label>
              <input
                type="checkbox"
                name="child_friendly"
                checked={filters.child_friendly}
                onChange={handleFilterChange}
              />
              Child Friendly
            </label>
          </div>
          <div className="input-group checkbox">
            <label>
              <input
                type="checkbox"
                name="ingame_purchases"
                checked={filters.ingame_purchases}
                onChange={handleFilterChange}
              />
              In-Game Purchases
            </label>
          </div>
        </div>
      </div>

      {/* Hiển thị danh sách game */}
      <div className='game-list'>
        <div className="games-grid">
          {loading && <p>Loading games...</p>}
          {error && <p>Error loading games: {error}</p>}
          {!loading && !error && games.length === 0 && <p>No games found.</p>}
          {!loading && !error && games.map((game) => (
            <div key={game.id_game} className="game-card">
              <Link to={`/Games/${game._id}`}>
                {game.imagePath && <img src={game.imagePath} alt={game.game_name} />}
                <h4>{game.game_name}</h4>
              </Link>
              <p>{game.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BodyGamePage;
