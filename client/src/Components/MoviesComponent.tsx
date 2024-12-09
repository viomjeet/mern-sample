import React, { useEffect } from 'react'
import { Button, ButtonGroup, Container, Form, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function MoviesComponent() {
    const [genreList, setGenreList] = React.useState<any>([
        { id: 1, label: "animation", name: "Animation", isActive: true },
        { id: 2, label: "classic", name: "Classic", isActive: false },
        { id: 3, label: "comedy", name: "Comedy", isActive: false },
        { id: 4, label: "drama", name: "Drama", isActive: false },
        { id: 5, label: "horror", name: "Horror", isActive: false },
        { id: 6, label: "family", name: "Family", isActive: false },
        { id: 7, label: "mystery", name: "Mystery", isActive: false },
        { id: 8, label: "western", name: "Western", isActive: false }
    ])
    const [movieData, setMovieData] = React.useState<any>([]);
    const [defMData, setDefMData] = React.useState<any>([]);
    const [search, setSearch] = React.useState<any>('');

    const loadMovieList = async (label: any = '') => {
        try {
            const resp = await fetch(`https://api.sampleapis.com/movies/${label === "" ? "animation" : label}`);
            const data = await resp.json();
            setMovieData(data/*.filter((o: any) => o.title.toLowerCase().includes(search.toLowerCase().trim()))*/);
            setDefMData(data);           
        } catch (err) {

        }
    }

    React.useEffect(() => {
        loadMovieList("");
    }, [])

    const handleFilter = (item: any) => {
        genreList.map((o: any) => (o.isActive = o.id === item.id));
        setGenreList([...genreList])
        loadMovieList(item.label);
        setSearch("");
    }

    const handleSearch = (e: any) => {
        let result = e.target.value;
        setSearch(result);
        let filterList: any = [];
        if (result !== "") {
            filterList = defMData.filter((o: any) => o.title.toLowerCase().includes(result.toLowerCase().trim()));
        } else {
            filterList = defMData;
        }
        setMovieData([...filterList]);
    }

    return (
        <Container>
            <h1 className="page-header">Movies List</h1>
            <div className='cusBtnGroupHeader'>
                <ButtonGroup aria-label="Basic example">
                    {genreList.map((item: any) => (
                        <Button key={item.id} className={item.isActive ? "active" : ""} variant='dark' onClick={() => handleFilter(item)}>{item.name}</Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className='pt-4 w-25'>
                <Form.Control className="RobotoCondensed300" type="text" value={search} placeholder='Search...' onChange={(e: any) => handleSearch(e)}></Form.Control>
            </div>
            <div className='todosList pt-4'>
                {movieData.length > 0 ? (movieData || []).map((item: any) => (
                    <div key={item.id} className='list'>
                        <div className="listin">
                            <div className="item-top">
                                <img src={item.posterURL} alt={item.title} />
                            </div>
                            <div className="item-end">
                                <h6>{item.title}</h6>
                                <Link target='_blank' to={`https://www.imdb.com/title/${item.imdbId}/`} className='btn rounded-1 px-4'>OPEN</Link>
                            </div>
                        </div>
                    </div>
                )) : (<div className='text-center'>........NO DATA........</div>)}
            </div>
        </Container>
    )
}