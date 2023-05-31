const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('html');

const searchCity = async () =>{
	const APIKey = '80d05622c29d5db460f72812cea32f0d';
		const city = document.querySelector('.search-box input').value;
		
		if (city === '') {
			return;
		}
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
			const json = await response.json();
			const body = document.querySelector("body");
			if (json.cod === '404') {
				container.style.height = '400px';
				weatherBox.style.display = 'none';
				weatherDetails.style.display = 'none';
				error404.style.display = 'block';
				error404.classList.add('fadeIn');
				return;
			}

			error404.style.display = 'none';
			error404.classList.remove('fadeIn');

			const image = document.querySelector('.weather-box img');
			const temperature = document.querySelector('.weather-box .temperature');
			const temperature_min = document.querySelector('.weather-box .temperature_min');
			const temperature_max = document.querySelector('.weather-box .temperature_max');
			const description = document.querySelector('.weather-box .description');
			const humidity = document.querySelector('.weather-details .humidity span');
			const wind = document.querySelector('.weather-details .wind span');
			const pressure = document.querySelector('.weather-details .pressure span');
			const direction = document.querySelector('.weather-details .direction span');
			const rotation = document.querySelector('.weather-details .direction i')
			switch (json.weather[0].main) {
				case 'Clear':
					image.src = '../assets/clear.png';
					body.style.background = "#f1c40f"
					break;

				case 'Rain':
					image.src = '../assets/rain.png';
					body.style.background = "#ecf0f1"
					break;

				case 'Snow':
					image.src = '../assets/snow.png';
					body.style.background = "#3498db"
					break;

				case 'Clouds':
					image.src = '../assets/cloud.png';
					body.style.background = "#95a5a6"
					break;

				case 'Haze':
					image.src = '../assets/mist.png';
					body.style.background = "#f1c40f"
					break;

				default:
					image.src = '';
			}
			temperature_min.innerHTML = `${parseInt(json.main.temp_min)}<span>°C</span>`;
			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
			temperature_max.innerHTML = `${parseInt(json.main.temp_max)}<span>°C</span>`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
			pressure.innerHTML = `${parseInt(json.main.pressure)}Pa`;
			let deg = parseInt(json.wind.deg);
			let texte;
			switch (true) {
				case (deg >= 157.5 && deg < 202.5):
					texte = "N";
					break;
				case (deg >= 202.5 && deg < 247.5):
					texte = "NO";
					break;
				case (deg >= 247.5 && deg < 292.5):
					texte = "E";
					break;
				case (deg >= 292.5 && deg < 337.5):
					texte = "SO";
					break;
				case (deg >= 337.5 || deg < 22.5):
					texte = "S";
					break;
				case (deg >= 22.5 && deg < 67.5):
					texte = "SE";
					break;
				case (deg >= 67.5 && deg < 112.5):
					texte = "O";
					break;
				case (deg >= 112.5 && deg < 157.5):
					texte = "NO";
					break;
			}


			rotation.style.transform = `rotate(${deg}deg)`;
			direction.innerHTML = `${texte}`;

			weatherBox.style.display = '';
			weatherDetails.style.display = '';
			weatherBox.classList.add('fadeIn');
			weatherDetails.classList.add('fadeIn');
			container.style.height = '65rem';

		} catch (error) {
			console.log(error)
		}

}
const alea = document.querySelector('.fa-solid.fa-shuffle');
const t = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille'];

search.addEventListener('click', searchCity);

alea.addEventListener('click', () => {
	const randomIndex = Math.floor(Math.random() * t.length);
	const randomCity = t[randomIndex];
	console.log(randomCity)
	document.querySelector('.search-box input').value = `${randomCity}`;
	console.log(search.value)
	searchCity();
});

input.addEventListener('keyup', (event) => {
 if (event.key === 'Enter') {
 searchCity();
 }
});