import * as React from "react";
import { useState } from "react";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { Star, LocationOn } from '@mui/icons-material';

// Update the Outlet interface to include an image property
interface Outlet {
  name: string;
  location: string;
  rating: number;
  chutnies: string[];
  googleMapsLink: string;
  image: string; // New property for the image URL
}

// Define the type for the idlyOutlets object
interface IdlyOutlets {
  [city: string]: Outlet[];
}

// Update the idlyOutlets data to include image URLs
const idlyOutlets: IdlyOutlets = {
  Hyderabad: [
    {
      name: "Lingaiah Tiffin Center",
      location: "Asif Nagar, Nampally",
      rating: 5,
      chutnies: ["Coconut", "Tomato", "Peanut"],
      googleMapsLink: "https://maps.app.goo.gl/L2jpZ88zw8or3qZv5",
      image: "https://lh3.googleusercontent.com/p/AF1QipP4fBdJQqi3ZIrPs3P8vV5UhTZY4Ikfw_9cpR_r=s1360-w1360-h1020",
    },
  ],
  Bengaluru: [
    {
      name: "Iyer Idly",
      location: "Vignan Nagar",
      rating: 5,
      chutnies: ["Coconut"],
      googleMapsLink: "https://maps.app.goo.gl/q9U6eEJBbH4aBckt5",
      image: "https://lh3.googleusercontent.com/p/AF1QipMFzwE1AKrWVTpwWKngr3BSBqzFMf0oIfkb7ciV=s1360-w1360-h1020",
    },
    {
      name: "The Filter Coffee",
      location: "Kundalahalli",
      rating: 5,
      chutnies: ["Coconut", "Tomato"],
      googleMapsLink: "https://maps.app.goo.gl/L1JGUPuKy2VfN48SA",
      image: "https://lh3.googleusercontent.com/p/AF1QipPpEbmpr7kUO4Q68CZ5DeXnGVYIDkLvzBsj5xhB=s1360-w1360-h1020",
    },
    {
      name: "The Rameshwaram Cafe",
      location: "Brookfield",
      rating: 1,
      chutnies: ["Coconut"],
      googleMapsLink: "https://maps.app.goo.gl/U1mVm6zbyu9uua2s5",
      image: "https://lh3.googleusercontent.com/p/AF1QipPdb1spHF3THuNL0yH_jXV7qOIJPRc3bFsALqeJ=s1360-w1360-h1020",
    },
  ],
};

// StarRating Component (unchanged)
const StarRating = ({ rating }: { rating: number }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <Box display="flex" alignItems="center">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          sx={{
            color: index < filledStars ? '#FF9800' : index === filledStars && halfStar ? 'rgba(255, 152, 0, 0.5)' : '#ccc',
            fontSize: '1.2rem',
          }}
        />
      ))}
    </Box>
  );
};

function App() {
  const [selectedCity, setSelectedCity] = useState<string>("Hyderabad");

  // Handle city change
  const handleCityChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue) {
      setSelectedCity(newValue);
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        padding: 2,
      }}
    >
      {/* Title */}
      <Typography
        level="h1"
        textAlign="center"
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#FF5722',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '1rem',
        }}
      >
        Best Idlies
      </Typography>

      {/* Select Box */}
      <Select
        defaultValue="Hyderabad"
        onChange={handleCityChange}
        color="neutral"
        placeholder="City"
        variant="soft"
        size="lg"
        sx={{
          width: '250px',
        }}
      >
        <Option value="Hyderabad">Hyderabad</Option>
        <Option value="Bengaluru">Bengaluru</Option>
      </Select>

      {/* Display Idly Outlets */}
      <Box sx={{ width: '80%', maxWidth: '800px', marginTop: '2rem' }}>
        {idlyOutlets[selectedCity]?.map((outlet, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{ 
              marginBottom: '1rem', 
              padding: '1rem', 
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            {/* Outlet Image */}
            <Box
              component="img"
              src={outlet.image}
              alt={outlet.name}
              sx={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginRight: '1rem',
              }}
            />

            {/* Outlet Details */}
            <Box sx={{ flex: 1 }}>
              {/* Rating and Location Pin */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <StarRating rating={outlet.rating} />
                <a href={outlet.googleMapsLink} target="_blank" rel="noopener noreferrer">
                  <LocationOn sx={{ color: '#FF5722', fontSize: '1.5rem' }} />
                </a>
              </Box>

              {/* Outlet Title */}
              <Typography
                level="h3"
                sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginRight: '6rem', marginBottom: '0.5rem' }}
              >
                {outlet.name}
              </Typography>

              {/* Outlet Subtitle */}
              <Typography
                sx={{ fontSize: '1.1rem', color: '#666', marginBottom: '0.5rem' }}
              >
                Location: {outlet.location}
              </Typography>

              {/* Chutnies */}
              <Typography
                sx={{ fontSize: '1rem', color: '#333' }}
              >
                Chutnies: {outlet.chutnies.join(', ')}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default App;