import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void; // функция ничего не вернёт (TS) типизация функции
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясная', 'Вегетерианская', 'Гриль', 'Остыре', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
