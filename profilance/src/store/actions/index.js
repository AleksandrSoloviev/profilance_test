export function toggleModal() {
    return {
        type: "TOGGLE"
    }
}

export function auth(login, password) {
    const admin = {login: "admin", password: "admin"};
    const user = {login: "user", password: "user"};

    if(admin.password === password && admin.login ===login) {
        return {
            type: "AUTH",
            isAuth: true,
            rights: 'admin'
        }
    } else if(user.password === password && user.login ===login) {
        return {
            type: "AUTH",
            isAuth: true,
            rights: 'user'
        }
    }
    return {
        type: "AUTH",
        isAuth: false,
        rights: 'none'
    }
}

export function addNews(data) {
    return {
        type: "ADD_NEWS",
        data
    }
}

export function deleteNews(data) {
    return {
        type: "DELETE_NEWS",
        data
    }
}

export function filteredNews(data) {
    return {
        type: "FILTERED_NEWS",
        data
    }
}
