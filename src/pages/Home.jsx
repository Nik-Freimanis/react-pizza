import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../Pagination";


function Home( {searchValue} ) {

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryID, setCategoryID] = React.useState(555)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    })


    React.useEffect(() => {

        const category = categoryID > 0 ? `&category=${categoryID}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desk'

        setIsLoading(true)
        fetch(`https://63da2f7c19fffcd620c2b9a5.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((resp) => {
            return resp.json()
        }).then((arr) => {
            setItems(arr)
            setIsLoading(false)
        })
        // window.scrollTo(0, 0)
    }, [categoryID, sortType, searchValue, currentPage])

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [... new Array(4)].map((_, index) => <Skeleton key={index} />)


    return (
        <div className="container">
        <div className="content__top">
            <Categories value={categoryID} onChangeCategory={(index) => setCategoryID(index)} />
            <Sort value={sortType} onChangeSort={(index) => setSortType(index)}/>
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