// "use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

const btnRegister = document.getElementById("cadastrarCliente");
const btnCloseModal = document.getElementById("modalClose");

//Eventos
btnRegister.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

//Método LocalStorage
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("db_client")) ?? []; //Lendo e convertendo db_client em JSON
};

const setLocalStorage = (dbClient) => {
  return localStorage.setItem("db_client", JSON.stringify(dbClient)); //Adicionando no LocalStorage
};

//CRUD - create, read, update e delete

const tempClient = {
  nome: "Vinicius",
  email: "vinicius@gmail.com",
  telefone: "35 997629493",
  cidade: "Brasópolis",
};

//CREATE
const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client); //Adicionando cliente
  setLocalStorage(dbClient);
};

//READ
const readClient = () => {
  return getLocalStorage(); //Lendo dados LocalStorage
};

//UPDATE
const updateClient = (id, client) => {
  const dbClient = readClient();
  dbClient[id] = client;
  setLocalStorage(dbClient);
};

//DELETE
const deleteClient = (id) => {
  const dbClient = readClient();
  dbClient.splice(id, 1);
  setLocalStorage(dbClient);
};
