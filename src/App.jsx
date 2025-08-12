import './App.css';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SearchResult from './components/searchResults/SearchResult';

export const BASE_URL = "http://localhost:9000";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch (error) {
        setError("Unable to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilteredData(data);
      return;
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="search">
          <input
            onChange={searchFood}
            type="text"
            placeholder='Search Food'
          />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button onClick={() => filterFood("all")}>All</Button>
        <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
        <Button onClick={() => filterFood("lunch")}>Lunch</Button>
        <Button onClick={() => filterFood("dinner")}>Dinner</Button>
      </FilterContainer>

      <SearchResult data={filteredData} />
    </Container>
  );
}

export default App;

// Styled Components
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
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
`;
