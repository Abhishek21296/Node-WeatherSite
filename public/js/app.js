const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message1')
const messahe2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);

    var url = 'http://localhost:3000/weather?search=' + encodeURIComponent(location);
    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error){
                message1.textContent = data.error;
            } else{
                message1.textContent = data.place;
                message2.textContent = dataContent(data.forecast.current);
            }
        })
    })

})

function dataContent(forecast){
    return 'Weather Report:\n' + forecast.weather_descriptions[0] + '. The temperature outside is ' + forecast.temperature + ', but it feels like ' + forecast.feelslike;
}