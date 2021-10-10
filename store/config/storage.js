import createWebStorage from "redux-persist/lib/storage/createWebStorage";

//Cannot access and create local storage in nodejs at server side rendered
// So to do this to create storage
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve();
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
