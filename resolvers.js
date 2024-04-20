// resolvers.js
const Book = require('./models/book');

const resolvers = {
    Query: {
        book: async (_, { id }) => {
            try
            {
                return await Book.findById(id);
            } catch (error)
            {
                throw new Error('Book not found');
            }
        },
        books: async () => {
            try
            {
                return await Book.find();
            } catch (error)
            {
                throw new Error('Error fetching books');
            }
        },
        bookByTitle: async (_, { title }) => {
            try
            {
                return await Book.findOne({ title: { $regex: new RegExp(title, "i") } });
            } catch (error)
            {
                throw new Error('Book not found');
            }
        },
    },
    Mutation: {
        addBook: async (_, { title, author, genre }) => {
            try
            {
                const book = new Book({ title, author, genre });
                await book.save();
                return book;
            } catch (error)
            {
                throw new Error('Error adding book');
            }
        },
    },
};

module.exports = resolvers;
