import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Card from '../Card'
// import Carousel from '../Carousel'
import { useEffect, useState } from 'react'

export default function Home() {

    const [search, setsearch] = useState("");
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json();
        // console.log(response[0] , response[1]);

        setfoodItem(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>



                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300x300/?pasta" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300x300/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


            </div>
            <div className='container'>

                {
                    foodCat.length !== 0
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItem.length !== 0
                                            ? foodItem.filter((item) => (item.CategoryName === data.CategoryName ) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-2'>
                                                            {/* <Card foodName={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img} /> */}
                                                            <Card foodItems={filterItems} options={filterItems.options[0]}  />

                                                        </div>
                                                    )
                                                }) :
                                            <div>no such data exists</div>
                                    }
                                </div>
                            )

                        }) :
                        ""
                }

                {/* <Card /> */}
            </div>
            <div>
                <h5>body</h5>
            </div>
            <div><Footer /></div>
        </>
    )
}
