const users = [
  {
    email: "john@mail.com",
    password: "password",
    firstName: "John",
    lastName: "Smith",
    isPro: false
  },
  {
    email: "jane@mail.com",
    password: "password",
    firstName: "Jane",
    lastName: "Smith",
    isPro: true
  }
]

const badUsers = [
  {
    email: "bad@mail",
    password: "password",
    firstName: "Bad",
    lastName: "Email",
    isPro: false
  },
  {
    password: "password",
    firstName: "No",
    lastName: "Email",
    isPro: false
  },
  {
    email: "bad@mail.com",
    password: "bad",
    firstName: "Bad",
    lastName: "Password",
    isPro: true
  },
  {
    email: "bad@mail.com",
    firstName: "No",
    lastName: "Password",
    isPro: true
  },
  {
    email: "bad@mail.com",
    password: "password",
    lastName: "BadFirst",
    firstName: "",
    isPro: false
  },
  {
    email: "bad@mail.com",
    password: "password",
    lastName: "NoFirst",
    isPro: false
  },
  {
    email: "bad@mail.com",
    password: "password",
    lastName: "",
    firstName: "BadLast",
    isPro: false
  },
  {
    email: "bad@mail.com",
    password: "password",
    firstName: "Nolast",
    isPro: true
  },
  {
    email: "bad@mail.com",
    password: "password",
    firstName: "No",
    lastName: "Proflag"
  }
]

module.exports = {
  users,
  badUsers
}