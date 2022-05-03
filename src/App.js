import { CookieTwoTone } from "@mui/icons-material";
import { Autocomplete, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [getCounty, setCounty] = useState([]);
  const [getState, setState] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        // console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  // console.log(country);

  // console.log(data);

  const handleCountry = (event, value) => {
    let states = data.filter((state) => state.country === value);
    states = [...new Set(states.map((item) => item.name))];
    states.sort();

    setState(states);
  };

  return (
    <Container>
      <Typography>Dependent Select Field</Typography>
      <Autocomplete
        onChange={(event, value) => handleCountry(event, value)}
        id="country"
        getOptionLabel={(country) => `${country}`}
        options={country}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText={"No Available Data"}
        renderOption={(props, country) => (
          <Box component="li" {...props} key={country} value={getCounty}>
            {country}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <Autocomplete
        id="city"
        getOptionLabel={(getState) => `${getState}`}
        options={getState}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText={"No Available User"}
        renderOption={(props, getState) => (
          <Box component="li" {...props} key={getState}>
            {getState}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
      {/* <Autocomplete /> */}
    </Container>
  );
}

export default App;
