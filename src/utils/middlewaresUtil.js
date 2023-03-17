const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNTH_REQUEST_STATUS = 401;

function validateEmail(email) {
    const mailFormat = /\S+@\S+\.\S+/;
    if (email.match(mailFormat)) {
      return true;
    } 
      return false;
  }

  function validatePassword(pass) {
    if (pass !== undefined) {
      if (pass.length >= 6) {
        return true;
      } 
        return false;
    } 
      return true;
  }

  const validateLogin = (_request, response, next) => {
    const { email, password } = _request.body;
  
    if (!validatePassword(password)) {
      response.status(HTTP_BAD_REQUEST_STATUS)
        .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } else if (email === undefined) {
      response.status(HTTP_BAD_REQUEST_STATUS)
        .send({ message: 'O campo "email" é obrigatório' });
    } else if (password === undefined) {
      response.status(HTTP_BAD_REQUEST_STATUS)
        .send({ message: 'O campo "password" é obrigatório' });
    } else if (!validateEmail(email)) {
      response.status(HTTP_BAD_REQUEST_STATUS)
        .send({ message: 'O "email" deve ter o formato "email@email.com"' });
    } else {
      next();
    }
  };

  const validationToken = (_request, response, next) => {
    const { authorization } = _request.headers;

    if (!authorization) {
        return response.status(HTTP_UNTH_REQUEST_STATUS).send({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return response.status(HTTP_UNTH_REQUEST_STATUS).send({ message: 'Token inválido' });
    }

    next();
};

    const validationName = (_request, response, next) => {
        const { name } = _request.body;

        if (!name) {
            return response.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O campo "name" é obrigatório' });
        }
        if (name.length < 3) {
            return response.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
        }
        next();
    };

    const validationAge = (_request, response, next) => {
        const { age } = _request.body;
        if (!age) {
            return response.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O campo "age" é obrigatório' });
        }
        if (age < 18 || !Number.isInteger(Number(age))) {
            return response.status(HTTP_BAD_REQUEST_STATUS).json(
                { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
    );
        }
        next();
    };

    const validationTalk = (_request, response, next) => {
        const { talk } = _request.body;

        if (!talk) {
            return response.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O campo "talk" é obrigatório' });
        }
    
        next();
    };

    const validationWatched = (req, res, next) => {
        const { watchedAt } = req.body.talk;

        const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(20[0-9]{2}|[3-9][0-9])$/i;
    
        if (!watchedAt) {
            return res.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O campo "watchedAt" é obrigatório' });
        }
    
        if (!regexDate.test(watchedAt)) {
            return res.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        }
        next();
    };

    const checkNum = (num) => !Number.isInteger(Number(num)) || (num < 1 || num > 5);

    const validationRate = (req, res, next) => {
        const { rate } = req.body.talk;

        if (!rate && rate !== 0) {
            return res.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O campo "rate" é obrigatório' });
        }
        if (checkNum(rate)) {
            return res.status(HTTP_BAD_REQUEST_STATUS)
            .send({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
        }
        next();
    };

  module.exports = {
    validateLogin,
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationWatched,
    validationRate,
  };