import SQLite from 'react-native-sqlite-storage';
import { useEffect, useState } from 'react';

const db = SQLite.openDatabase(
  {
    name: 'MerekaDB',
    location: 'default',
  },
  () => console.log('Database opened'),
  error => console.error('Error opening database:', error)
);

export function useOfflineStorage() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    try {
      await db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS cards (
            id TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at INTEGER NOT NULL
          );`
        );
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS sync_queue (
            id TEXT PRIMARY KEY,
            action TEXT NOT NULL,
            data TEXT NOT NULL,
            created_at INTEGER NOT NULL
          );`
        );
      });
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  const saveCard = async (id: string, data: any) => {
    if (!isInitialized) return;
    try {
      await db.transaction(tx => {
        tx.executeSql(
          'INSERT OR REPLACE INTO cards (id, data, updated_at) VALUES (?, ?, ?)',
          [id, JSON.stringify(data), Date.now()]
        );
      });
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const getCard = async (id: string) => {
    if (!isInitialized) return null;
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM cards WHERE id = ?',
          [id],
          (_, results) => {
            if (results.rows.length > 0) {
              resolve(JSON.parse(results.rows.item(0).data));
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };

  const queueSync = async (action: string, data: any) => {
    if (!isInitialized) return;
    try {
      await db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO sync_queue (id, action, data, created_at) VALUES (?, ?, ?, ?)',
          [Date.now().toString(), action, JSON.stringify(data), Date.now()]
        );
      });
    } catch (error) {
      console.error('Error queuing sync:', error);
    }
  };

  const getSyncQueue = async () => {
    if (!isInitialized) return [];
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM sync_queue ORDER BY created_at ASC',
          [],
          (_, results) => {
            const queue = [];
            for (let i = 0; i < results.rows.length; i++) {
              queue.push({
                ...results.rows.item(i),
                data: JSON.parse(results.rows.item(i).data),
              });
            }
            resolve(queue);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };

  const clearSyncQueue = async () => {
    if (!isInitialized) return;
    try {
      await db.transaction(tx => {
        tx.executeSql('DELETE FROM sync_queue');
      });
    } catch (error) {
      console.error('Error clearing sync queue:', error);
    }
  };

  return {
    isInitialized,
    saveCard,
    getCard,
    queueSync,
    getSyncQueue,
    clearSyncQueue,
  };
}