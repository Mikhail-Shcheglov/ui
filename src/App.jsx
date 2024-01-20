import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { NumberInput } from './components';
import { grey } from './constants';
import './App.css';
import { IconUsdt } from './assets/icons/usdt';
import { IconRuble } from './assets/icons/ruble';
import { IconArrowLeft } from './assets/icons/arrow-left';
import { IconBaht } from './assets/icons/baht';
import { useState } from 'react';
import { Input } from '@mui/base';
import { rountNumber } from './utils';

const InputAdornment = styled('div')(
  ({ theme }) => `
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[500] : grey[700]};
`,
);



function App() {
  const [initialCurrency, setInitialCurrency] = useState(0);
  const [cryptoValue, setCryptoValue] = useState(0);
  const [resultCurrencyRatio, setResultCurrencyRatio] = useState(0);
  const [commision, setCommisiono] = useState(0);

  const usdtAmount = rountNumber(initialCurrency / cryptoValue || 0, 2);
  const result = rountNumber(usdtAmount * resultCurrencyRatio, 2);
  const commisionSum = rountNumber((result / 100) * commision, 2);
  const userLeft = result - commisionSum;

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td style={{ textAlign: 'right' }}><Typography variant='overline'>1. Initial currency: </Typography></td>
            <td>
              <Input
                id="outlined-start-adornment"
                startAdornment={<InputAdornment><IconRuble /></InputAdornment>}
                value={initialCurrency}
                onChange={e => {
                  const value = e.target.value;
                  const num = value.replace(/\D/g, '');

                  setInitialCurrency(Number(num) || 0);
                }}
              />
            </td>
            <td>{initialCurrency.toLocaleString()}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right' }}><Typography variant='overline'>2. Buy USDT by RUB: </Typography></td>
            <td>       
              <Input
                id="outlined-start-adornment"
                startAdornment={
                  <InputAdornment>
                    <IconRuble /> <IconArrowLeft /> <IconUsdt />
                  </InputAdornment>
                }
                value={cryptoValue}
                onChange={e => setCryptoValue(e.target.value)}
              />
            </td>
            <td>{usdtAmount.toLocaleString()}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right' }}><Typography variant='overline'>3. Sell USDT to BUHT: </Typography></td>
            <td>
              <Input
                id="outlined-start-adornment"
                startAdornment={
                  <InputAdornment>
                    <IconUsdt /> <IconArrowLeft /> <IconBaht />
                  </InputAdornment>
                }
                value={resultCurrencyRatio}
                onChange={e => setResultCurrencyRatio(e.target.value)}
              />
            </td>
            <td>{result.toLocaleString()}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right' }}><Typography variant='overline'>4. Your commision: </Typography></td>
            <td>
              <Input
                id="outlined-start-adornment"
                startAdornment={
                  <InputAdornment>
                    %
                  </InputAdornment>
                }
                value={commision}
                onChange={e => setCommisiono(e.target.value)}
              />
            </td>
            <td>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {userLeft.toLocaleString()}&nbsp;<Typography color='red'>-{commisionSum.toLocaleString()}</Typography>
              </Box>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
