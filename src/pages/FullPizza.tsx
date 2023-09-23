import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  //FC - это функциональный компонент, гарантированно нам вернёт функциональный компонент
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    //в useState мы храним/получаем объект. котоырй хранит поля, теперь они строго типизированны
    imageUrl: string;
    title: string;
    price: number;
  }>();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://637fa1022f8f56e28e925aec.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Произошла ошибка');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <span>{pizza.price}</span>
    </div>
  );
};

export default FullPizza;
