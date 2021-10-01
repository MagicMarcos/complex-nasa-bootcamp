document.querySelector('button').addEventListener('click', getLocations);

// const input = document.querySelector('input');

function getLocations() {
	const url = 'https://data.nasa.gov/resource/gvk9-iz74.json';

	fetch(url)
		.then(res => res.json())
		.then(data => getWeather(data))
		.catch(err => console.log(`error ${err}`));
}

function getWeather(data) {
	for (let i = 0; i < data.length; i++) {
		let facilityName = data[i].facility;
		let location = data[i].city;
		let latitude = data[i].location.latitude;
		let longitude = data[i].location.longitude;
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
		fetch(url)
			.then(res => res.json())
			.then(result => {
				let temp = result.current_weather.temperature;
				let weatherCode = result.current_weather.weathercode;
				let weatherDesc = weatherDecoder(weatherCode);
				showResult(facilityName, location, temp, weatherDesc);
			})
			.catch(err => console.log(err));
	}
	console.log(data);
}

const weatherCodes = {
	0: 'clear skies',
	1: 'mainly clear',
	2: 'partly cloudy',
	3: 'overcast',
	45: 'foggy',
	48: 'foggy',
	51: 'light drizzle',
	53: 'moderate drizzle',
	55: 'heavy drizzle',
	56: 'freezing drizzle',
	57: 'freezing drizzle',
	61: 'light rain',
	63: 'moderate rain',
	65: 'heavy rain',
	66: 'freezing rain',
	67: 'heavy freezing rain',
	71: 'light snow',
	73: 'moderate snow',
	75: 'heavy snow',
	77: 'light snow',
	80: 'light rain showers',
	81: 'moderate rain showers',
	82: 'violent rain showers',
	85: 'light snow showers',
	86: 'heavy snow showers',
	95: 'thunderstorms',
	96: 'light thunderstorms with hail',
	99: 'heavy thunderstorms with hail',
};

function weatherDecoder(weatherCode) {
	return weatherCodes[weatherCode];
}

function showResult(facilityName, location, temp, weatherDesc) {
	let nasaList = document.querySelector('ul');
	let listItem = document.createElement('li');
	let nameHTML = document.createElement('h2');
	let locationHTML = document.createElement('p');
	let tempHTML = document.createElement('p');
	let weatherHTML = document.createElement('p');
	nameHTML.innerText = facilityName;
	locationHTML.innerText = `at ${location}`;
	tempHTML.innerText = `${temp} celsius`;
	weatherHTML.innerText = weatherDesc;
	nasaList.appendChild(listItem);
	listItem.appendChild(nameHTML);
	listItem.appendChild(locationHTML);
	listItem.appendChild(tempHTML);
	listItem.appendChild(weatherHTML);

	console.log(facilityName, location, temp, weatherDesc);
}

// ///////////////////////////////////////////////////////////////////////
// function shuffle(arr) {
// 	let j, x, index;
// 	for (index = arr.length - 1; index > 0; index--) {
// 		j = Math.floor(Math.random() * (index + 1));
// 		x = arr[index];
// 		arr[index] = arr[j];
// 		arr[j] = x;
// 	}
// 	return arr;
// }

// const contributors = [
// 	'Bethel',
// 	'Ciara',
// 	'Daniel',
// 	'Daphny',
// 	'Ernest',
// 	'Gabrielle',
// 	'Julie',
// 	'Marcos',
// 	'Monica',
// 	'Shana',
// 	'Tarafinah',
// ];
// const shuffledContributors = shuffle(contributors);
// const contributors2 = shuffledContributors.slice(
// 	Math.ceil(shuffledContributors.length / 2)
// );
// const contributors1 = shuffledContributors.slice(
// 	0,
// 	Math.ceil((shuffledContributors.length - 1) / 2)
// );

// let str = '';
// let table = `table1`;
// for (const name of contributors1) {
// 	str += `${name}, `;
// }
// str = str.substring(0, str.length - 2);
// console.log(`${table} ${str}`);

// str = '';
// table = `table2`;
// for (const name of contributors2) {
// 	str += `${name}, `;
// }
// str = str.substring(0, str.length - 2);
// console.log(`${table} ${str}`);

// console.log(`DEAR LEADER: ${shuffledContributors[5]}`);

// let vice = Math.floor(Math.random() * shuffledContributors.length);

// console.log(`VP: ${shuffledContributors[vice]}`);
