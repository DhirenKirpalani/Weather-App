"use client"

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import {IoMdSunny, IoMdCloudy, IoMdRainy, IoMdSnow, IoMdThunderstorm, IoMdSearch} from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudFog } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';
import toast, { Toaster } from 'react-hot-toast';

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_APIKEY
console.log(apiKey)

export default function Home() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Jakarta");
  const [input, setInput] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    if(input !== "") {
      setLocation(input)
    }
    
    const inputValue = document.querySelector("input")

    if(inputValue.value === "") {
      setAnimate(true)
      setTimeout(() => {
        setAnimate(false)
      }, 500)
    }
    
    inputValue.value = "";
    
    e.preventDefault()
  }

  useEffect(() => {
    setLoading(true)
    
    async function fetchData() {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        console.log(response.data)
        
        
        setData(response.data);
        setLoading(false)
       
      } catch (error) {
        toast.error(`${error.response.data.message}`)
        setLoading(false)
        setErrorMessage(error.response.data.message)
        
      }
      }
    fetchData()
  }, [location])

  if(!data) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-violet-600 to-indigo-600 bg-no-repeat bg-cover bg-center 
      flex flex-col items-center justify-center">
        <div>
          <ImSpinner8 className="text-5xl text-white animate-spin" />
        </div>
      </div>
    )
  }

  let weather = data.weather[0].main
  let icon

  switch (weather) {
    case "Clouds":
      icon = <IoMdCloudy />
      break;
      case "Haze":
      icon = <BsCloudHaze2Fill />
      break;
      case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]"/>
      break;
      case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]"/>
      break;
      case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]"/>
      break;
      case "Snow":
      icon = <IoMdSnow />
      break;
      case "Thunderstorm":
      icon = <IoMdThunderstorm />
      break;
      case "Fog":
      icon = <BsCloudFog />
      break;
  
    default:
      break;
  }

  const date = new Date()
  
  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-600 to-indigo-600 bg-no-repeat bg-cover bg-center 
    flex flex-col items-center justify-center px-4 lg:px-0">
      <Toaster position="top-center" />
      <form className={`${animate ? "animate-shake" : "animate-none"} h-16 w-full bg-black/30 max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className="h-full relative flex items-center justify-between p-2">
          <input onChange={(e) => handleInput(e)}
          className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px]
          font-light pl-6 h-full"
          type="text" 
          placeholder="Search by city or country" />
          <button onClick={(e) => handleSubmit(e)}
          className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex items-center justify-center transition">
            <IoMdSearch className="text-2x text-white"/>
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px]
      rounded-[32px] px-6 py-12">
        {loading ? (
        <div className="w-full h-full flex items-center justify-center ">
          <ImSpinner8 className="text-white text-5xl animate-spin"/>
        </div>
      ) : (
          <div>
        <div className="flex items-center gap-x-5">
          <div className="text-[87px]">{icon}</div>
          <div>
          <div className="text-2xl font-semibold">{data.name}, {data.sys.country}</div>
          <div>
            {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
          </div>
          </div>
        </div>
        <div className="my-20">
          <div className="flex items-center justify-center">
            <div className="text-[144px] leading-none font-light">{parseInt(data.main.temp)}</div>
            <div className="text-4xl">
              <TbTemperatureCelsius />
          </div>
          </div>
          <div className="capitalize text-center">{data.weather[0].description}</div>
        </div>
        <div>
          <div className="flex flex-col max-w-[378px] mx-auto gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsEye /></div>
                <div className="ml-2">Visibility <span>{data.visibility / 1000} km</span></div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsThermometer /></div>
                <div className="flex">Feels like 
                <div className="flex ml-2">
                  {parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius />
                </div>
              </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsWater /></div>
                <div className="ml-2">Humidity <span>{data.main.humidity} %</span></div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]"><BsWind /></div>
                <div>Wind <span className="ml-2">{data.wind.speed} m/s</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
        )}
      </div>
    </div>
  );
}
