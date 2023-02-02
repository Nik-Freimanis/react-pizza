import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

function Home() {

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://63da2f7c19fffcd620c2b9a5.mockapi.io/items').then((resp) => {
            return resp.json()
        }).then((arr) => {
            setItems(arr)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
        <div className="content__top">
            <Categories />
            <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {isLoading
                ? [... new Array(6)].map((_, index) => <Skeleton key={index} />)
                : items.map((obj) => <PizzaBlock key={obj.id} {... obj}/>)}
        </div>
        </>
    )
}

export default Home