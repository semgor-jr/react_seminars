import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Container, Stack, ThemeProvider, createTheme } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useState } from 'react';


// Интерфейс для описания структуры статьи
interface Article {
  title: string;
  content: string;
}

// Массив отображаемых статей
const articles: Article[] = [
  { title: 'Здравствуй, читатель!', content: 'Очень интерсная статья!' },
  { title: 'Самая интересная статья', content: 'Интереснее этой статьи вы ещё не читали!!!' },
  { title: 'Интересная статья?', content: 'Тут уже не так интересно(' },
  { title: 'Продам гараж', content: 'Продам гараж, дорого.' },
  { title: 'Куплю гараж', content: 'Куплю гараж, денег нет. Но гараж очень хочется. За дорого не возьму.' },
];


const App: React.FC = () => {
  // Состояние для управления темной/светлой темой
  const [darkMode, setDarkMode] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  // Тема для светлого режима
  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: 'white',
      },
      text: {
        primary: 'white'
      }
    },
  });
  // Тема для темного режима
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#303030',
      },
      text: {
        primary: 'white'
      }
    },
  });


  // Хэндлер изменения темы
  const handleThemeChange = (event: Event, newValue: number | number[]) => {
    setDarkMode(newValue === 1);
    setSliderValue(newValue === 1 ? 1 : 0);
  };

  return (
    <>
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      {/* Контейнер для ограничения ширины */}
      <Container sx={{ backgroundColor: darkMode ? '#303030' : 'white'}} >
      {/* Ползунок для переключения тем, до конца адекватно не доделал */}
      <Slider
        defaultValue={0}
        onChange={handleThemeChange}
        value={sliderValue} 
        step={1}
        sx={{
          width: '5%',
        }}
      />
        {/* Стек для вертикального расположения */}
        <Stack spacing={2} sx={{ width: '100%' }}>
          {/* рендеринг каждого элемента массива статей */}
          {articles.map((article, index) => (
            <Accordion key={index} sx={{ backgroundColor: index % 2 === 0 ? 'black' : 'blue',  '&:hover': { border: '2px solid red' } }}>
              {/* чередуем цвет фона */}
              <AccordionSummary
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography variant="h6">{article.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ fontSize: '2em', color: 'red' }}>{article.content.charAt(0)}</span> 
                  {/* Первая буква увеличена и красного цвета */}
                  {article.content.slice(1)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </ThemeProvider>
    </>
  );
};

export default App;