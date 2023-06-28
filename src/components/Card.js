import React from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {


    let options = props.options;
    let priceOptions = Object.keys(options)

    const handleCart =()=>{

    }
    
    return (
        <div>


            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.imgSrc} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        {/* <p className="card-text">this is some important text </p> */}
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' name="" id="">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}
                                        </option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded' name="" id="">
                                {priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    )
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                total price
                            </div>

                        </div>
                        <hr />
                        <button className='btn btn-success justify-center mx-2' onClick={handleCart}>add to cart</button>
                    </div>
                </div>
            </div>




        </div>
    )
}
