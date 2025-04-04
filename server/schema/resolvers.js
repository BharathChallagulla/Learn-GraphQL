const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      return _.find(UserList, { id });
    },

    //Movie Resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;

      return _.find(MovieList, { name });
    },
  },

  User: {
    favouriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      console.log(user);

      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let updatedUser;

      UserList.forEach((user) => {
        if (user.id == id) {
          user.username = newUsername;
          updatedUser = user;
        }
      });
      return updatedUser;
    },

    deleteUser: (parent, args) => {
      const id = args.id;

      _.remove(UserList, (user) => user.id == id);
      return null;
    },
  },
};

module.exports = { resolvers };
