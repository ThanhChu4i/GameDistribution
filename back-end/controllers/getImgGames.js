// // Import các thư viện cần thiết
// const db = require('./connectdb');
// // Tạo route để lấy dữ liệu ảnh
// const getImgGames = (req, res) => {
//     const gameId = req.params.id_game;

//     // Truy vấn đường dẫn ảnh từ bảng game trong database
//     db.query('SELECT file_path FROM game WHERE id = ?', [gameId], (err, result) => {
//         if (err) {
//             return res.status(500).send('Lỗi truy vấn database.');
//         }

//         if (result.length === 0) {
//             return res.status(404).send('Không tìm thấy trò chơi.');
//         }

//         // Lấy file_path từ kết quả truy vấn
//         const filePath = result[0].file_path;

//         // Trả ảnh về từ folder bằng cách sử dụng res.sendFile()
//         const fullImagePath = __dirname + '/uploads/' + filePath;
//         res.sendFile(fullImagePath, (err) => {
//             if (err) {
//                 res.status(500).send('Lỗi khi gửi file ảnh.');
//             }
//         });
//     });
// };
// module.exports = { getImgGames };

