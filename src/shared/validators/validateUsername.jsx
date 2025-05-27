export const validateUsername = (username) => {
    const regex = /^[A-Za-z0-9_.]{3,16}$/;
    return regex.test(username);
};

export const validateUsernameMessage = 'El username debe contener entre 3 y 16 caracteres, sin espacios';