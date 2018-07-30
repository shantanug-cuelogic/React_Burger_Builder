import axios from 'axios';

const instance =axios.create({
    baseURL:'https://burgerbuilder-41477.firebaseio.com/'
})

export default instance;