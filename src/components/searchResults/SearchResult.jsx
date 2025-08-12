import React from 'react';
import styled from 'styled-components';
import { BASE_URL, Button } from '../../App';

const SearchResult = ({ data: foods }) => {
  return (
    <FoodCardContainer>
      <FoodCards>
        {foods?.map((food) => (
          <FoodCard key={food.name}>
            <div className="food_image">
              <img src={BASE_URL + food.image} alt={food.name} />
            </div>
            <div className="food_info">
              <div className="info">
                <h4>{food.name}</h4>
                <p>{food.text}</p>
              </div>
              <Button>${food.price.toFixed(2)}</Button>
            </div>
          </FoodCard>
        ))}
      </FoodCards>
    </FoodCardContainer>
  );
};

export default SearchResult;


const FoodCardContainer = styled.section`
  min-height: 100vh;
  background-image: url("/bg.png");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

const FoodCard = styled.div`
  width: 340px;
  height: 167px;
  border-radius: 20px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
  color: white;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  .food_image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
  }

  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-left: 16px;

    .info h4 {
      margin: 0;
      font-size: 18px;
    }

    .info p {
      margin: 4px 0 10px;
      font-size: 14px;
      color: #ddd;
    }
  }
`;
