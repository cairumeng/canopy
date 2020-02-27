/**
 * 格式化用户信息
 * @param {User} user
 */
const UserResource = user => {
  // 单个对象
  return {
    id: user.id,
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    avatar: user.avatar,
    description: user.description,
  }
}

//   const UserCollection = (users, { count, pageIndex, pageSize }) => {
//     return {
//       count,
//       lastPage: parseInt(Math.ceil(count / pageSize)) - 1,
//       pageIndex: parseInt(pageIndex),
//       pageSize: parseInt(pageSize),
//       users: users.map(user => UserResource(user)),
//     }
//   }

module.exports = {
  UserResource,
  // UserCollection,
}
