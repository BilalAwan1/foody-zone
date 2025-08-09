import './App.css'
import styled from 'styled-components';
import { useState, useEffect } from 'react';

function App() {
  const BASE_URl = "http://localhost:9000";
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchFoodData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URl);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError("Unable to fetch data");
    } finally {
      setLoading(false);
    }
  }
    fetchFoodData();
  }, []);

  console.log(data)
  
  if (error) return <div>(error)</div>
  if (loading) return <div>loading...</div>


  return (
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="search">
          <input
            type="text"
            placeholder='Search Food'
          />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>

      <FoodCardContainer>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && data.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
            {/* Render your food card UI here */}
          </div>
        ))}
      </FoodCardContainer>
    </Container>
  )
}

export default App

const TopContainer = styled.div`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;  
    }
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
`;

const FoodCardContainer = styled.section`
  height: calc(120vh - 210px);
  background-image: url("/bg.png");
  background-size: cover;
`;
