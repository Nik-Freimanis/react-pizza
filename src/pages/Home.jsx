import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

function Home() {

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryID, setCategoryID] = React.useState(555)
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    })

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://63da2f7c19fffcd620c2b9a5.mockapi.io/items?${
            categoryID > 0 ? `category=${categoryID}` : ''
        }&sortBy=${sortType.sortProperty}&order=desc`
        )
            .then((resp) => {
            return resp.json()
        }).then((arr) => {
            setItems(arr)
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [categoryID, sortType])

    return (
        <div className="container">
        <div className="content__top">
            <Categories value={categoryID} onChangeCategory={(index) => setCategoryID(index)} />
            <Sort value={sortType} onChangeSort={(index) => setSortType(index)}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {isLoading
                ? [... new Array(6)].map((_, index) => <Skeleton key={index} />)
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)}
        </div>
        </div>
    )
}

export default Home