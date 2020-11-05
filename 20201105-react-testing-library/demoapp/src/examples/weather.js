import useSWR from 'swr'

export default function Weather(props) {
  const { city } = props;
  const { data, error } = useSWR(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49daf8ec16cca2b69d5777cd9f8690d9`);

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!data) { 
    return <p>Loading...</p>;
  }

  return (
    <p>Weather in {city}: {data.weather[0].main}</p>
  );
}

