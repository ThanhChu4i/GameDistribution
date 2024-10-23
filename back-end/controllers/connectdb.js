const mongoose = require('mongoose');

// Kết nối tới MongoDB (thay URI bằng URI thật của bạn)
const uri = process.env.uri;  // URI tới MongoDB cục bộ hoặc MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Kết nối thành công tới MongoDB!');
});