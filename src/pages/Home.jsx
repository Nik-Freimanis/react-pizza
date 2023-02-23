import React from "react";
import {useDispatch, useSelector} from "react-redux";

import { setCategoryId } from '../redux/slices/filterSlice'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";
import { SearchContext } from "../App";


function Home( ) {
    const dispatch = useDispatch()
    const {categoryId, sort} = useSelector(state => state.filter)

    const onChangeCategory = (categoryId) => {
        dispatch(setCategoryId(categoryId))
    }


    const { searchValue } = React.useContext(SearchContext)

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)



    React.useEffect(() => {

        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desk'

        setIsLoading(true)
        fetch(`https://63da2f7c19fffcd620c2b9a5.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((resp) => {
            return resp.json()
        }).then((arr) => {
            setItems(arr)
            setIsLoading(false)
        })
        // window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [... new Array(4)].map((_, index) => <Skeleton key={index} />)


    return (
        <div className="container">
        <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {isLoading ? skeletons : pizzas }
        </div>
            <Pagination onChangePage={ (number) => setCurrentPage(number)}/>
        </div>
    )
}

export default Home