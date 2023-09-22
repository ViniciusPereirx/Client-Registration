// "use strict";
import { getLocalStorage, setLocalStorage } from "./db_client.js";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

const btnRegister = document.getElementById("cadastrarCliente");
const btnCloseModal = document.getElementById("modalClose");
const btnSaveClient = document.getElementById("saveClient");

//Validando Inputs do Formulário
const isValidFields = () => {
  const form = document.getElementById("form");

  return form.reportValidity();
};

//Limpando Inputs do Formulário pelo valor da Classes
const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => {
    field.value = "";
  });
};

//Interação com Usuário
const saveClient = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;

  if (isValidFields()) {
    const client = {
      name: name,
      email: email,
      phone: phone,
      city: city,
    };
    createClient(client);
    closeModal();
  }
};

//CRUD - create, read, update e delete

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

clientList(); //////////////////////////////////////////

//Eventos
btnRegister.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
btnSaveClient.addEventListener("click", saveClient);
