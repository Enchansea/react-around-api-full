const editProfilePopup = document.querySelector(".popup__edit-profile");
const addCardPopupWindow = document.querySelector(".popup__add-card");
const addCardForm = editProfilePopup.querySelector(".popup__form");
const editProfileForm = addCardPopupWindow.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__avatar-overlay");
const profileAvatar = document.querySelector(".profile__img");
const avatarImageInput = document.querySelector(".popup__input_card-url");
const submitButton = document.querySelector(".popup__submit-button");
const myId = "9f87343e26d7981e15bb8b00";


//card array containing name and link
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

// obj defaultConfig array, used in FormValidator.js
const defaultConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

const containerSelector = ".card";
const templateSelector = ".card-template";

export { defaultConfig, addCardForm, editProfileForm, profileName, profileAbout, buttonEdit, buttonAdd, initialCards, containerSelector, templateSelector, profileImage, profileAvatar, avatarImageInput, submitButton, myId };
