const bcryptjs = require('bcryptjs');

const encrypt = async (passwordPlane) =>{        
    const hash = await bcryptjs.hash(passwordPlane, 10);
    return hash;
}

const compare = async (passwordPlane, hashPassword) =>{
    return await bcryptjs.compare(passwordPlane, hashPassword);
}

module.exports = {encrypt, compare};