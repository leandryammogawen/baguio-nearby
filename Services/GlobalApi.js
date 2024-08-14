import axios from 'axios'

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
const API_KEY = "AIzaSyD_w-htZhqtYo6BOkN55ENrrTdFJY8vD-U"

const nearByPlace = (lat, lng, type) => axios.get(BASE_URL, {
    params: {
        location: lat + "," + lng,
        radius: 1500,
        type: type,
        key: API_KEY
    }
})

const searchByText = (searchText) => axios.get(BASE_URL, {
    params: {
        query: searchText,
        key: API_KEY
    }
});

export default { nearByPlace, searchByText }
