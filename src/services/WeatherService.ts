import axios from "axios";

const API_KEY = "<INSERT KEY>"
const baseUrl = `https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,daily&appid=${API_KEY}`

const getWeather = async (lat: number, lon: number) => {
    const request = axios.get(`${baseUrl}&lat=${lat}&lon=${lon}`)
    const response = await request
    
    return response.data
}

const weatherService = {getWeather}

export default weatherService