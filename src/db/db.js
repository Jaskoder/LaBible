class DB {
    constructor(name) {
        this.name = name;
        this.version = 2;
        this.db = null;
    }

    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this.version);

            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(e.target.result);
            }

            request.onerror = (e) => reject(e.target.error);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;

                
                if (!db.objectStoreNames.contains('marked-verses')) {
                    db.createObjectStore('marked-verses', {
                        keyPath: 'id',
                        autoIncrement: false
                    });
                }
            }
        });
    }

    async put(store, data) {
        if (!this.db) await this.open();

        
        if (this.db.objectStoreNames.contains(store)) {
            const transaction = this.db.transaction([store], 'readwrite');
            const objectStore = transaction.objectStore(store); 

            return new Promise((resolve, reject) => {
                const putRequest = objectStore.put(data);

                putRequest.onsuccess = () => resolve(true);
                putRequest.onerror = (e) => {
                    console.log(e);
                    reject(false);
                }
            });
        }
        return false;
    }

    async fetchall(store) {
        if (!this.db) await this.open();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([store], 'readonly');
            const objectStore = transaction.objectStore(store); 

            const request = objectStore.getAll();

            request.onsuccess = (e) => resolve(e.target.result); 
            request.onerror = (e) => reject(e.target.error);
        });
    }
}

const db = new DB('bible_app_db');
export default db;
