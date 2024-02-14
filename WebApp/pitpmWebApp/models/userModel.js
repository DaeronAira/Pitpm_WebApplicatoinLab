// Подключение модуля для работы с SQLite
const sqlite3 = require('sqlite3');

// Создание объекта для взаимодействия с базой данных SQLite
const db = new sqlite3.Database('./db.sqlite');

// Определение модели пользователя
const userModel = {
    // Метод для создания нового пользователя в базе данных
    createUser(firstName, lastName, middleName, city, role) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (firstName, lastName, middleName, city, role) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, middleName, city, role],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                });
        });
    },

    // Метод для поиска пользователей по роли
    findByRole(role) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users WHERE role = ?', [role], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    // Метод для получения всех пользователей из базы данных
    getAllUsers() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    // Метод для поиска пользователя по имени и фамилии
    findUserByName(firstName, lastName) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE firstName = ? AND lastName = ?', [firstName, lastName], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
};

// Экспорт модели пользователя для использования в других модулях
module.exports = userModel;