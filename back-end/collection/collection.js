  const mongoose = require('mongoose');

  // Định nghĩa Schema cho bảng (collection) User
  const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    country: { type: String },
    company: { type: String },
    website: { type: String },
    created_in: { type: Date, default: Date.now },
    update_in: { type: Date, default: Date.now },
    publisher: { type: Boolean, default: false },
    developer: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
  });

  const User = mongoose.model('User', userSchema);

  // Định nghĩa Schema cho bảng (collection) Game
  const gameSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', /*required: true*/ },
    game_name: { type: String, required: true },
    game_description: { type: String },
    instruction: { type: String },
    date_release: { type: Date, default: Date.now },
    play_count: { type: Number, default: 0 },
    play_number: { type: Number, default: 0 },
    no_blood: { type:Boolean },
    child_friendly: { type: Boolean },
    imagePath: { type: String, require :true },
    ingame_purchases: { type: Boolean },
    gamePath: {type:String, require: true }
  });

  const Game = mongoose.model('Game', gameSchema);

  // Định nghĩa Schema cho bảng (collection) Game History
  const gameHistorySchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    play_time: { type: Date, default: Date.now }
  });

  const GameHistory = mongoose.model('GameHistory', gameHistorySchema);

  // Định nghĩa Schema cho bảng (collection) Like Tab
  const likeTabSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    like_check: { type: Boolean, default: false }
  });

  const LikeTab = mongoose.model('LikeTab', likeTabSchema);

  // Định nghĩa Schema cho bảng (collection) Review
  const reviewSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    created_in: { type: Date, default: Date.now },
    comment: { type: String }
  });

  const Review = mongoose.model('Review', reviewSchema);

  // Định nghĩa Schema cho bảng (collection) Genre
  const genreSchema = new mongoose.Schema({
    name_genres: { type: String, required: true },
    description: { type: String }
  });

  const Genre = mongoose.model('Genre', genreSchema);

  // Định nghĩa Schema cho bảng (collection) Game Genre
  const gameGenreSchema = new mongoose.Schema({
    id_game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    id_genres: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true }
  });

  const GameGenre = mongoose.model('GameGenre', gameGenreSchema);

  // Xuất các model
  module.exports = {
    User,
    Game,
    GameHistory,
    LikeTab,
    Review,
    Genre,
    GameGenre
  };
