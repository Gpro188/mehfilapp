import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ChartSection = ({ charts }) => {
  return (
    <ChartsContainer>
      {charts.map((chart, index) => {
        const chartProps = {
          data: chart.data,
          title: chart.title,
          height: chart.height || '300px'
        };
        
        return (
          <Card key={index} title={chart.title}>
            {chart.type === 'bar' && <BarChart {...chartProps} color={chart.color} />}
            {chart.type === 'pie' && <PieChart {...chartProps} />}
            {chart.type === 'line' && <LineChart {...chartProps} color={chart.color} />}
          </Card>
        );
      })}
    </ChartsContainer>
  );
};

export default ChartSection;