export function getRoot(req, res) {
    const endpoints = {
        root: 'http://localhost:4000/api',
        login: 'http://localhost:4000/api/login',
        get_users: 'http://localhost:4000/api/users',
        create_user: 'http://localhost:4000/api/users',
        update_user: 'http://localhost:4000/api/users',
        delete_user: 'http://localhost:4000/api/users',
        get_books: 'http://localhost:4000/api/books',
        create_book: 'http://localhost:4000/api/books',
        update_book: 'http://localhost:4000/api/books',
        delete_book: 'http://localhost:4000/api/books'
    }
    res.json(endpoints);
}