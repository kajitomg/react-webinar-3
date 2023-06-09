/**
 * Форматирование дат
 * @param users {Array}
 * @param id {Number}
 * @returns {String}
 */
export default function searchUser(users,id) {
  let response = null
  users.forEach((user) => {
    if(user._id === id){
      return response = user
    }
  })
  return response
}
