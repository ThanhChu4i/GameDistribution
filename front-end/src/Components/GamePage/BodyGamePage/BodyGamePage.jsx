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
    language: '',
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
    language: false,
    players: false,
    mobile: false,
  });

  // State cho từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

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
    // Đóng dropdown sau khi chọn
    setDropdownOpen((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  // Hàm để lấy danh sách game dựa trên các bộ lọc
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};

        // Cập nhật params từ bộ lọc và tìm kiếm
        if (filters.genres) params.genres = filters.genres;
        if (filters.development) params.development = filters.development;
        if (filters.language) params.language = filters.language;
        if (filters.players) params.players = filters.players;
        if (filters.mobile) params.mobile = filters.mobile;
        if (filters.no_blood) params.no_blood = filters.no_blood;
        if (filters.child_friendly) params.child_friendly = filters.child_friendly;
        if (filters.ingame_purchases) params.ingame_purchases = filters.ingame_purchases;

        // Thêm từ khóa tìm kiếm vào params
        if (searchQuery) params.search = searchQuery;

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
  }, [filters, searchQuery]);

  return (
    <div className="container">
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-options">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật searchQuery khi người dùng nhập
            />
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
                <button className="dropdownn-button" onClick={() => toggleDropdown('language')}>
                  Language
                </button>
                {dropdownOpen.language && (
                  <div className="dropdownn-content">
                    <select name="language" value={filters.language} onChange={handleFilterChange}>
                      <option value="">All Languages</option>
                      <option value="vietnamese">Vietnamese</option>
                      <option value="japanese">Japanese</option>
                      <option value="korean">Korean</option>
                      <option value="english">English</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="spanish">Spanish</option>
                      <option value="chinese">Chinese</option>
                      <option value="italian">Italian</option>
                      <option value="portuguese">Portuguese</option>
                      <option value="russian">Russian</option>
                      <option value="arabic">Arabic</option>
                      <option value="hindi">Hindi</option>
                      <option value="thai">Thai</option>
                      <option value="indonesian">Indonesian</option>
                      <option value="turkish">Turkish</option>
                      <option value="dutch">Dutch</option>
                      <option value="swedish">Swedish</option>
                      <option value="polish">Polish</option>
                      <option value="danish">Danish</option>
                      <option value="norwegian">Norwegian</option>
                      <option value="finnish">Finnish</option>
                      <option value="greek">Greek</option>
                      <option value="hebrew">Hebrew</option>
                      <option value="hungarian">Hungarian</option>
                      <option value="czech">Czech</option>
                      <option value="slovak">Slovak</option>
                      <option value="romanian">Romanian</option>
                      <option value="ukrainian">Ukrainian</option>
                      {/* Add more languages as needed */}
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
        </div>
      </div>

      {/* Hiển thị danh sách game */}
      <div className='game-list'>
        <div className="games-gridk">
          {loading && <p>Loading games...</p>}
          {error && <p>Error loading games: {error}</p>}
          {!loading && !error && games.length === 0 && <p>No games found.</p>}
          {!loading && !error && games.map((game) => (
            <div key={game.id_game} className="game-cardi">
              <Link to={`/Games/${game._id}`}>
                {game.imagePath && <img src={game.imagePath} alt={game.game_name} />}
                <div className='namegame'><strong>{game.game_name}</strong></div>
                <p>{game.company}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BodyGamePage;
