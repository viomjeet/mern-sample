import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default function HomeComponents() {
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(json => setTodos(json))
  }, [])
  return (
    <>
      <div className='homebanner d-flex justify-content-between align-items-center'>
        <Container>
          <div className="d-flex">
            <h1 className="me-auto p-2 bd-highlight texting w-50 display-6">
              All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
            </h1>
            <div className="d-flex align-items-end justify-content-start">
              <Link to='/todos' className='btn btn-light rounded-4 px-4 mr-2'>Todos</Link>&nbsp;
              <Link to='/movies' className='text-white btn btn-dark rounded-4 px-4'>Movies</Link>
            </div>
          </div>
        </Container>
      </div>
      <div className='height50'></div>
      <Container>
        <div className='d-flex'>
          <div className='me-auto p-2 bd-highlight texting w-50'>
            <h3>What is Lorem Ipsum?</h3>
            <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
          </div>
          <div className='panelRight d-flex align-self-center'>
            <Link to='/' className='text-white btn btn-dark rounded-4 px-4'>CONTACT US</Link>
          </div>
        </div>
        <div className="todosList">
          {todos.map((item: any) => (
            <div key={item.id} className="list">
              <div className="listin">
                <div className="item-top">
                  <h6>{item.title.substring(1, 20)}</h6>
                  <div className="amount d-flex align-items-center justify-content-start">
                    <h2>${(item.id * 2545 / 100)}</h2> <span className='mx-1'>PER ITEMS</span>
                  </div>
                </div>
                <div className="item-end">
                  <Link to='/' className='btn rounded-1 px-4'>PRINT PARTS</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}