import axios from 'axios';

const API_KEY = '71d2662347c54142a01bb0d3adc24021';
const BASE_URL = 'https://newsapi.org/v2';

const getTopHeadlines = async (category, page) => {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
            apiKey: API_KEY,
            category,
            page,
            pageSize: 10,
            country: 'in',
        },
    });
    return response.data;
};

export { getTopHeadlines };