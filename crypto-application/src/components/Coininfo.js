import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line, Chart } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../Context";
import { useParams } from "react-router-dom";
import Coinstats from '../components/Coinstats';
import annotationPlugin from 'chartjs-plugin-annotation';



// const canvas = document?.getElementById('canvas');
// const ctx = canvas?.getContext('2d');
// const gradient = ctx?.createLinearGradient(0,0, 0,400);
// gradient?.addColorStop(0, 'green');   
// gradient?.addColorStop(1, 'white');

const Coininfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);
  const { id } = useParams();
  

  // chart background color
  const canvas = document?.getElementById('canvas');
  const ctx = canvas?.getContext('2d');
  const gradientGreen = ctx?.createLinearGradient(0,0,0,600);
  gradientGreen?.addColorStop(0, 'rgba(27,159,113,255)');   
  gradientGreen?.addColorStop(1, 'white');

  const gradientRed = ctx?.createLinearGradient(0,0,0,600);
  gradientRed?.addColorStop(0, 'rgba(224,50,56,255)');   
  gradientRed?.addColorStop(1, 'white');

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "105%",
        marginTop: 30,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(historicData)

  // const lastItem = historicData?.pop
  // console.log(lastItem)

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


  
  

  Chart.register(annotationPlugin);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="coinpage">
      <div className={classes.container}>
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "black" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              id='canvas'
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12} PM`
                      : `${date.getHours()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price in ${currency}`,
                    pointBorderWidth: '0',
                   
                    pointHoverRadius: '3',
                    borderWidth: "1.5",
                    borderColor: historicData.at(-1)[1] > historicData[0][1] ? '#1b9f71' : '#de262c',
                    pointHoverRadius: 3,
                    // backgroundColor: historicData.at(-1)[1] > historicData[0][1] ? 'rgba(209,236,227,255)' : 'rgba(249,212,213,255)',
                    backgroundColor: historicData.at(-1)[1] > historicData[0][1] ? gradientGreen : gradientRed,
                    fill: true,
                  },
                ],
              }}
              options={
                {
                interaction: {
                  intersect: false,
                  mode: 'index',
              },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    grid: {
                      display: true,
                      beginAtZero: true
                    }
                  }
                },
                tooltips: {
                  mode: 'x',
                  intersect: false,
                  position: 'cursor',
                  axis: 'x'
                },
                elements: {
                  point: {
                    radius: 0,
                  },
                },
                plugins: {
                  tooltip: {
                    yAlign:'bottom',
                    titleFont: 'Poppins',
                  },
                  autocolors: true,
                  annotation: {
                    annotations: {
                      line1: {
                        type: 'line',
                        yMin: historicData.at(-1)[1],
                        yMax: historicData.at(-1)[1],
                        borderColor: 'black',
                        borderWidth: 0.5,
                        borderDash: [2],
                        display: true,
                        label:{
                          backgroundColor: 'black',
                          enabled: true,
                          content: historicData.at(-1)[1].toFixed(2),
                          font: {
                            family: "Poppins",
                            weight: 200,
                          },
                          position: 'start',
                          xAdjust: -10
                        }
                      },
                      point1: {
                        type: 'point',
                        xValue: 'end',
                        yValue: historicData.at(-1)[1],
                        backgroundColor: historicData.at(-1)[1] > historicData[0][1] ? '#1b9f71' : '#de262c',
                        radius: 5,
                        xAdjust: -3
                      }
                    }
                  },
                  beforeDraw: chart => {
                    if (chart.tooltip?._active?.length) {
                        let x = chart.tooltip._active[0].element.x;
                        let yAxis = chart.scales.y;
                        let ctx = chart.ctx;
                        // console.log(x);
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(x, yAxis.top);
                        ctx.lineTo(x, yAxis.bottom);
                        // ctx.setLineDash([5, 7]);
                        // ctx.moveTo(x, chart.chartArea.top);
                        // ctx.lineTo(x, chart.tooltip._active[0].element.y);
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = 'black';
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                }
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "center",
                width: "60%",
                border: '1px solid black',
                borderRadius: 5
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
      <Coinstats />
      </div>
    </ThemeProvider>
  );
};

export default Coininfo;