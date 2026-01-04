const DB_NAME = 'offline-ai-db';
const DB_VERSION = 1;
const STORE_NAME = 'conversations';

export interface ChatSession {
       id: string;
       title: string;
       timestamp: number;
       messages: unknown[]; // Using unknown to avoid circular dependencies, ideally shared type
}

class StorageService {
       private db: IDBDatabase | null = null;

       async init(): Promise<void> {
              return new Promise((resolve, reject) => {
                     const request = indexedDB.open(DB_NAME, DB_VERSION);

                     request.onerror = () => reject(request.error);
                     request.onsuccess = () => {
                            this.db = request.result;
                            resolve();
                     };

                     request.onupgradeneeded = (event) => {
                            const db = (event.target as IDBOpenDBRequest).result;
                            if (!db.objectStoreNames.contains(STORE_NAME)) {
                                   db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                            }
                     };
              });
       }

       async saveConversation(session: ChatSession): Promise<void> {
              if (!this.db) await this.init();
              return new Promise((resolve, reject) => {
                     const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
                     const store = transaction.objectStore(STORE_NAME);
                     const request = store.put(session);

                     request.onerror = () => reject(request.error);
                     request.onsuccess = () => resolve();
              });
       }

       async getConversation(id: string): Promise<ChatSession | undefined> {
              if (!this.db) await this.init();
              return new Promise((resolve, reject) => {
                     const transaction = this.db!.transaction([STORE_NAME], 'readonly');
                     const store = transaction.objectStore(STORE_NAME);
                     const request = store.get(id);

                     request.onerror = () => reject(request.error);
                     request.onsuccess = () => resolve(request.result);
              });
       }

       async getAllConversations(): Promise<ChatSession[]> {
              if (!this.db) await this.init();
              return new Promise((resolve, reject) => {
                     const transaction = this.db!.transaction([STORE_NAME], 'readonly');
                     const store = transaction.objectStore(STORE_NAME);
                     const request = store.getAll();

                     request.onerror = () => reject(request.error);
                     request.onsuccess = () => resolve(request.result);
              });
       }
}

export const storageService = new StorageService();
