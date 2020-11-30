import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import Card from '../components/Card'
import './Products.css'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

function Products() {
    const { request } = useHttp()

    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])

    const renderList = async () => {
        try {
            const data = await request(
                `${baseUrl}/api/products/renderAll`,
                'POST'
            )
            console.log(data)
            setList(data)
            setSearchList(data)
            setIsLoading(false)
        } catch (error) {}
    }

    const searchHandler = async () => {
        try {
            if (search.length > 0) {
                setSearchList([])
                const data = await request(
                    `${baseUrl}/api/search/search`,
                    'POST',
                    { search }
                )
                setSearchList(data)
            } else {
                setSearchList(list)
            }
        } catch (error) {}
    }

    useEffect(() => {
        renderList()
    }, [])

    return (
        <div className="container">
            <div className="input row">
                <TextField
                    id="outlined-full-width"
                    label="Search"
                    style={{ margin: 8 }}
                    placeholder="Type to search..."
                    fullWidth
                    margin="normal"
                    onChange={(event) => setSearch(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <div className="row">
                    <Button onClick={() => searchHandler()} variant="contained">
                        Search
                    </Button>
                    <Link to="/add">
                        <Button variant="contained" color="primary">
                            Add item
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                {searchList.map((item) => {
                    return (
                        <>
                            <Link
                                to={{
                                    pathname: '/edit',
                                    state: { product: item },
                                }}
                            >
                                <Card item={item} />
                            </Link>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Products
