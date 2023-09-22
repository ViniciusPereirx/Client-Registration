//Método LocalStorage
export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("db_client")) ?? []; //Lendo e convertendo db_client em JSON
};

export const setLocalStorage = (dbClient) => {
  return localStorage.setItem("db_client", JSON.stringify(dbClient)); //Adicionando no LocalStorage
};
