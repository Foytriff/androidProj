import * as SQLite from 'expo-sqlite'
import ScoreEntry from './ScoreEntry'

const db = SQLite.openDatabase("scores.db")


export const initialDb = () => {
    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(

                `CREATE TABLE IF NOT EXISTS score (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    value INTEGER NOT NULL
                )`, [],
                 (_, res) => resolve(res),
                  (_, err) => reject(err)

            )
        })
    })
}


export const saveToDb = (score) => {
    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(

                `INSERT INTO score (name, value)
                VALUES (?, ?)`, [score.name, score.value],
                 (_, res) => resolve(res),
                  (_, err) => reject(err)

            )
        })
    })
}

export const findAll = () => {
    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(

                `SELECT * FROM score`, [],
                 (_, res) => resolve(res.rows._array.map(row => new ScoreEntry(row.id, row.name, row.value))),
                  (_, err) => reject(err)

            )
        })
    })
}