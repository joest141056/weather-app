const apiKey='3a0819afddeea6b522690de8814e9020'; // 
let language='zh', unit='metric';

function setLanguage(lang){ language=lang; getLocation(); }
function toggleUnit(){ unit=unit==='metric'?'imperial':'metric'; getLocation(); }

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else { document.getElementById('location').innerText=language==='zh'?"浏览器不支持地理定位。":"Geolocation not supported."; }
}

function showWeather(position){
    const lat=position.coords.latitude, lon=position.coords.longitude;
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&lang=${language}&appid=${apiKey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${unit}&lang=${language}&appid=${apiKey}`;

    fetch(weatherUrl).then(r=>r.json()).then(data=>{
        document.getElementById('location').innerText=`${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText=`${Math.round(data.main.temp)}°${unit==='metric'?'C':'F'}`;
        document.getElementById('description').innerText=data.weather[0].description;
        document.getElementById('icon').src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        setWeatherBackground(data.weather[0].main.toLowerCase(), data.dt, data.sys.sunrise, data.sys.sunset);
        localStorage.setItem('lastWeather', JSON.stringify(data));
    }).catch(()=>{ 
        const cached=JSON.parse(localStorage.getItem('lastWeather'));
        if(cached){
            document.getElementById('location').innerText=`${cached.name}, ${cached.sys.country}`;
            document.getElementById('temperature').innerText=`${Math.round(cached.main.temp)}°${unit==='metric'?'C':'F'}`;
            document.getElementById('description').innerText=cached.weather[0].description;
            document.getElementById('icon').src=`https://openweathermap.org/img/wn/${cached.weather[0].icon}@2x.png`;
        }
    });

    fetch(forecastUrl).then(r=>r.json()).then(data=>{
        const forecastDiv=document.getElementById('forecast');
        forecastDiv.innerHTML=`<h3>${language==='zh'?'未来两天':'Next 2 Days'}</h3>`;
        for(let i=1;i<=2;i++){
            const day=new Date(data.daily[i].dt*1000);
            const temp=Math.round(data.daily[i].temp.day);
            const desc=data.daily[i].weather[0].description;
            const icon=data.daily[i].weather[0].icon;
            forecastDiv.innerHTML+=`<div class="day">${day.toLocaleDateString()} - ${temp}°${unit==='metric'?'C':'F'} - ${desc}<br><img src="https://openweathermap.org/img/wn/${icon}.png"></div>`;
        }

        const hourlyDiv=document.getElementById('hourly');
        hourlyDiv.innerHTML=`<h3>${language==='zh'?'每小时天气':'Hourly Weather'}</h3>`;
        data.hourly.slice(0,12).forEach(h=>{
            const hour=new Date(h.dt*1000).getHours();
            const temp=Math.round(h.temp);
            const desc=h.weather[0].description;
            const icon=h.weather[0].icon;
            hourlyDiv.innerHTML+=`<div class="hour">${hour}:00<br>${temp}°${unit==='metric'?'C':'F'}<br>${desc}<br><img src="https://openweathermap.org/img/wn/${icon}.png"></div>`;
        });
    });
}

function setWeatherBackground(weather,currentTime,sunrise,sunset){
    document.querySelectorAll('.rain,.snow,.sun-glow').forEach(el=>el.remove());
    let isNight=currentTime<sunrise||currentTime>sunset;
    switch(weather){
        case 'clear':document.body.style.background=isNight?'linear-gradient(to bottom,#0d1b2a,#1e2a38)':'linear-gradient(to bottom,#87CEEB,#f0f8ff)';
        if(!isNight){const sun=document.createElement('div');sun.className='sun-glow';document.body.appendChild(sun);} break;
        case 'clouds':document.body.style.background=isNight?'#2e3b4e':'#d3d3d3';break;
        case 'rain':
        case 'drizzle':document.body.style.background=isNight?'linear-gradient(to bottom,#1e2a38,#3a4d6b)':'linear-gradient(to bottom,#4a6fa5,#a0c4ff)';for(let i=0;i<100;i++){const drop=document.createElement('div');drop.className='rain';drop.style.left=Math.random()*100+'vw';drop.style.animationDuration=(Math.random()*0.5+0.5)+'s';drop.style.height=(Math.random()*20+10)+'px';document.body.appendChild(drop);} break;
        case 'snow':document.body.style.background=isNight?'#1c1c1c':'#dbe9f4';for(let i=0;i<100;i++){const snow=document.createElement('div');snow.className='snow';snow.style.left=Math.random()*100+'vw';snow.style.animationDuration=(Math.random()*5+5)+'s';snow.style.width=snow.style.height=(Math.random()*5+5)+'px';document.body.appendChild(snow);} break;
        case 'thunderstorm':document.body.style.background=isNight?'#101010':'#373737';break;
        default:document.body.style.background=isNight?'#0d1b2a':'#87CEEB';
    }
}

function showError(){document.getElementById('location').innerText=language==='zh'?"无法获取位置。":"Unable to get location.";}
getLocation();
