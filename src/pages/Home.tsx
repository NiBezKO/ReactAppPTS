import React from 'react';
//import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate, Link } from 'react-router-dom';

//import { SearchContext } from '../App';

import { selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false); //поиска нет по умолчанию тоже нчиего нет
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const items = useSelector(selectPizzaData);
  const isMounted = React.useRef(false);

  //const sortType = useSelector((state) => state.filter.sort.sortProperty);

  //const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  //const [currentPage, setCurrentPage] = React.useState(1);

  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sortProperty: '',
  // });

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // const setCategoryId2 = (id) => {
  // return { type: filters/setCategoryId, payload: id}
  //}

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    // fetch(
    //   `https://637fa1022f8f56e28e925aec.mockapi.io/items?page=${pageCount }&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });

    // await axios
    //   .get(
    //     `https://637fa1022f8f56e28e925aec.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   });

    try {
      dispatch(
        //@ts-ignore
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage,
        }),
      );
    } catch (error) {
      alert('Что то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  //Если был первый рендер и изменены параметры
  React.useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //если был первый рендер, то проверяем url-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    // const sortBy = sort.sortProperty.replace('-', '');
    // const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    // const category = categoryId > 0 ? `&category=${categoryId}` : '';
    // const search = searchValue ? `search=${searchValue}` : '';

    // // fetch(
    // //   `https://637fa1022f8f56e28e925aec.mockapi.io/items?page=${pageCount }&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    // // )
    // //   .then((res) => res.json())
    // //   .then((arr) => {
    // //     setItems(arr);
    // //     setIsLoading(false);
    // //   });

    // axios
    //   .get(
    //     `https://637fa1022f8f56e28e925aec.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   });
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj: any) => (
              <Link key={obj.id} to={`/pizza/${obj.id}`}>
                <PizzaBlock {...obj} />
              </Link>
            ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
