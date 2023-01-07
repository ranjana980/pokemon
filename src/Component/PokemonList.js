import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Spinner
} from 'reactstrap';
export default function PokemonList() {
    const [dataList, setDataList] = useState([])
    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getpokemonInfo(page)
    }, [page])

    const getpokemonInfo = async (page) => {
        setLoader(true)
        const result = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${10}`)
        const list = dataList.concat(result.data.data);
        setDataList(list)
        setLoader(false)
    }

    return (
        <div className='bg-primary scroll-btn' style={{ height: '45rem', overflowY: 'scroll', scrollBehavior: 'smooth' }} onScroll={() => setPage(page + 1)}>
            <div className='container  bg-primary'>
                <div className='row ' >
                    {dataList.map((item,index) => (
                        <div key={index} className='card col-lg-3  col-sm-1 ml-2 mt-2 justify-content-start'>
                            <img src={item.images.small} className='mt-2 ' />
                            <div className='d-flex justify-content-between'>
                                <b style={{ textAlign: 'start' }}>{item.name}</b>
                                <b>HP: <span>{item.hp}</span></b>
                            </div>
                            <b style={{ textAlign: 'start', fontSize: '13px' }}>Attacks</b>
                            <div style={{ textAlign: 'start' }}>
                                {item.attacks != undefined ?
                                    <div className='d-flex '>
                                        {item.attacks.map((item1) => (
                                            <span>{item1.name},</span>
                                        ))}
                                    </div> : <p>N/A</p>}
                            </div>
                            <b style={{ textAlign: 'start', fontSize: '13px' }}>Abilities</b>
                            <div style={{ textAlign: 'start' }}>
                                {item.abilities != undefined ? <>
                                    <div className='d-flex '>
                                        {item.abilities.map((item2) => (
                                            <span>{item2.name},</span>
                                        ))}
                                    </div>
                                </> : <p>N/A</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                {loader ? <h5 className='text-white'>Loading...</h5> : ""}
            </div>
        </div>
    )
}
