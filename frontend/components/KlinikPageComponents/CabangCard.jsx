import * as React from 'react';
import styled from "styled-components";
import { CardActionArea, Card, CardContent, Typography } from '@mui/material';

const CSS = styled.div`
  justify-content: center;
  align-items: center;

  .actionarea {
    width: 100%;
    height: 100%;
  }

  #title {
    font-size: 3em;
  }

  #form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0;
    width: 100%;
  }

  #card {
    margin: 10px;
  }
`;

export default function CabangCard({ location, klinik }) {
  return (
    <CSS>
      <Card sx={{ width: '12em', mb: '1em', maxHeight: '10em' }}>
        <CardActionArea className={'actionarea'}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" noWrap={true}>
              {klinik}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap={true}>
              {location}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </CSS>
  );
}
