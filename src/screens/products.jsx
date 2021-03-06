import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Card, Modal, Form, Image, InputGroup } from 'react-bootstrap';
import { Form as FinalForm, Field as FinalFormField } from 'react-final-form';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import Toggle from 'react-toggle';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '../fb_app';

import { Navbar } from '../components/navbar';

const options = {
  url: '/api/products/',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const Products = ({ navigate }) => {
  const [modalShow, setModalShow] = useState(false);
  const [postModalShow, setPostModalShow] = useState(false);
  const [postModalMessage, setPostModalMessage] = useState('');
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [filteredDishes, setFilteredDishes] = useState(null);
  const [sides, setSides] = useState(null);
  const [seasonal, setSeasonal] = useState(null);
  const [filteredSeasonal, setFilteredSeasonal] = useState(null);

  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);

  const dishesFilterOnChange = (event) => {
    const inputValue = event.target.value;
    let _filteredDishes = dishes.filter(dish => {
      return dish.product_name.toLowerCase().includes(inputValue.toLowerCase())
    });
    setFilteredDishes(!inputValue.length ? dishes : _filteredDishes);
  };

  const closeModals = () => {
    setPostModalShow(false);
    setModalShow(false);
  };

  const seasonFilterOnChange = (event) => {
    const inputValue = event.target.value;
    let _filteredSeasonal = seasonal.filter(dish => {
      return dish.product_name.toLowerCase().includes(inputValue.toLowerCase())
    });
    setFilteredSeasonal(!inputValue.length ? seasonal : _filteredSeasonal);
  };

  const prepareProduct = (id) => {
    let product = products.find(p => p.product_id === id);
    setProduct({name: product.product_name, description: product.description, category: product.category, id: product.product_id, price: product.price, active: product.active, measure: product.measure, filename: product.filename});
    setModalShow(true);
  }

  const closeFormModal = () => {
    setProduct(null);
    setModalShow(false);
  }

  const onSubmitDeleteProduct = (id) => {
    const options = {
      url: `/api/products/${id}`,
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    axios(options).then((response) => {
      setPostModalMessage('Producto eliminado con éxito.');
      setPostModalShow(true);
      setTimeout(() => window.location.reload(), 2000);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        setPostModalMessage('Ha habido un error. Por favor, intenta más tarde.');
        setPostModalShow(true);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

  const onSubmitUpdateProduct = (values) => {
    const getImageFile = new Promise((resolve, reject) => {
      if (values.image) {
        const storageRef = storage.ref();
        const image = values.image[0];
        const extension = image.name.split('.').pop();
        const imageNewPath = uuidv4() + '.' + extension;
        let imageRef = storageRef.child(imageNewPath);
        imageRef.put(image).then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            resolve(url);
          })
        });
      }else{
        resolve(values.filename);
      }
    });

    getImageFile.then(url => {
      console.log(url);
      let product = {
        product_name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        measure: values.measure,
        active: values.active,
        filename: url,
      }
      const options = {
        url: `/api/products/${values.id}`,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: product
      };
      axios(options).then((response) => {
        setPostModalMessage('El producto se ha actualizado con éxito.');
        setPostModalShow(true);
        setTimeout(() => window.location.reload(), 2000);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          setPostModalMessage('Ha habido un error. Por favor, intenta más tarde.');
          setPostModalShow(true);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    });
  }

  const onSubmitCreateProduct = async (values) => {
    const storageRef = storage.ref();
    const image = values.image[0];
    const extension = image.name.split('.').pop();
    const imageNewPath = uuidv4() + '.' + extension;
    let imageRef = storageRef.child(imageNewPath);

    imageRef.put(image).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        let product = {
          product_name: values.name,
          description: values.description,
          category: values.category,
          price: values.price,
          measure: values.measure,
          active: values.active,
          filename: url,
        }
        const options = {
          url: '/api/products/',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          data: product
        };
        axios(options).then((response) => {
          setPostModalMessage('El nuevo producto se ha guardado con éxito.');
          setPostModalShow(true);
          setTimeout(() => window.location.reload(), 2000);
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            setPostModalMessage('Ha habido un error. Por favor, intenta más tarde.');
            setPostModalShow(true);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      })
    });
  };

  useEffect(() => {
    axios(options).then(response => {
      const _products = response.data.products;
      const _dishes = _products.filter(p => p.category === 'main')
      const _sides = _products.filter(p => p.category === 'side')
      const _seasonal = _products.filter(p => p.category === 'seasonal')
      setDishes(_dishes);
      setFilteredDishes(_dishes);
      setSides(_sides);
      setSeasonal(_seasonal);
      setFilteredSeasonal(_seasonal);
      setProducts(_products);
      setReady(true);
    }).catch(error => {
      setReady(true);
    });


  }, []);


  return ready && (
    <>
      <Navbar />

      {/* Post success or failure modal */}
      <Modal size='sm' centered show={postModalShow} onHide={() => setPostModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title><BsFillInfoCircleFill />&nbsp;&nbsp;Aviso</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <p>{postModalMessage}</p>
            </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => closeModals()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

      {/* New product form modal */}
      <FinalForm onSubmit={product ? onSubmitUpdateProduct : onSubmitCreateProduct} initialValues={product ? product : {category: 'main', measure: 'kg', active: true}}>
        {({ handleSubmit, submitting, values }) => (
          <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={modalShow} onHide={closeFormModal}>
            <Modal.Header closeButton> <Modal.Title id='contained-modal-title-vcenter'> { product ? 'Editar producto' : 'Añadir un nuevo producto'} </Modal.Title> </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col lg={12}>
                    <h3>Información del producto</h3>
                  </Col>
                  <Col lg={6}><Row>
                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <FinalFormField name='name'>
                          {({ input }) => ( <Form.Control {...input} type='text' placeholder='i.e. Chicharrón en salsa verde' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>

                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <FinalFormField name='description'>
                        {({ input }) => ( <Form.Control {...input} type='text' /> )}
                        </FinalFormField>
                      </Form.Group>
                    </Col>  

                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Imagen</Form.Label>
                        <FinalFormField name='image'>
                          {({input: { value, onChange, ...input } }) => {
                            const handleChange = ({ target }) => {
                              onChange(target.files);
                              setImage(URL.createObjectURL(target.files[0]));
                            }
                            return ( <Form.File {...input} onChange={handleChange} label='' data-browse='Encontrar imagen' custom />)
                          }}
                        </FinalFormField>
                      </Form.Group>
                    </Col>  
                  </Row></Col>

                  <Col lg={6}>
                    { image 
                      ? (<><Form.Label className='sign-label full-width'>Imagen</Form.Label><Image src={image} fluid rounded className='cs-product' /></>) 
                      : product && product.filename && (<><Form.Label className='sign-label full-width'>Imagen</Form.Label><Image src={product.filename} fluid rounded className='cs-product' /></>)
                    }
                    
                  </Col>

                  <Col lg={8}>
                    <Form.Group>
                      <Form.Label>Categoría</Form.Label>
                      <FinalFormField name='category' component='select'>
                        {({ input }) => (
                          <Form.Control {...input} as='select' custom>
                            <option value='main'>Plato fuerte</option>
                            <option value='side'>Complemento</option>
                            <option value='seasonal'>Platillo de temporada</option>
                          </Form.Control>
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={4} className='mb-3'>  
                    <Form.Group>
                      <Form.Label>Mostrar en plataforma</Form.Label>
                      <FinalFormField name='active' type='checkbox'>
                        {({ input }) => <Row><Col><Toggle {...input} /></Col></Row>}
                      </FinalFormField>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>Precio</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FinalFormField name='price'>
                        {({ input }) => ( <Form.Control {...input} type='text' placeholder='i.e. 150' /> )}
                      </FinalFormField>
                      </InputGroup>
                      
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label>por (unidad medida)</Form.Label>
                      <FinalFormField name='measure'>
                        {({ input }) => (
                          <Form.Control {...input} as='select'>
                            <option value='kg'>kilogramos</option>
                            <option value='lt'>litros</option>
                            <option value='orden'>órden(es)</option>
                            <option value='pz'>piezas</option>
                          </Form.Control>
                        )}
                      </FinalFormField>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={closeFormModal}> Cancelar </Button>
              { product && (<Button variant='danger' onClick={() => onSubmitDeleteProduct(values.id)}> Borrar producto </Button>)}
              <Button variant='success' onClick={handleSubmit}> { product ? 'Editar producto' : 'Crear producto'} </Button>
            </Modal.Footer>
          </Modal>
        )}
      </FinalForm>
      
      
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <h1>Productos</h1>
          </Col>
          <Col lg={6} md={6} className='align-right'>
            <Button variant='primary' size='lg' onClick={() => setModalShow(true)}>
              Nuevo producto
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={8}>
            <Row>
              <Col lg={6}>
                <h3>Platillos tradicionales</h3>
              </Col>

              <Col lg={6} className='align-right'>
              <Form.Group>
                <Form.Control type='text' placeholder='Buscar un plato fuerte' onChange={dishesFilterOnChange} />
              </Form.Group>
              </Col>
            </Row>

            <Accordion defaultActiveKey='0'>
              { filteredDishes && filteredDishes.map((product, index) => (
                <Card key={index}>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    <Row>
                      <Col lg={8}>
                        <h4>{product.product_name}</h4>
                      </Col>
                      <Col className='align-right' lg={4}>
                        <h5>$ {product.price} por {product.measure}</h5>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>
                      <Row>
                        <Col lg={6}>
                          <p>
                            {product.description}
                          </p>
                        </Col>
                        <Col lg={6}>
                          <Image src={product.filename} fluid rounded className='cs-product'/>
                        </Col>
                        <Col lg={12}><hr/></Col>
                        <Col lg={6}>
                          <h4>Precio por {product.measure}</h4>
                        </Col>
                        <Col lg={6} className='align-right'>
                          <h4>$ {product.price}</h4>
                        </Col>
                        <Col lg={12} className='align-right'>
                          <Button variant='primary' size='sm' onClick={() => prepareProduct(product.product_id)}> Editar producto </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
            
            <Row className='mt-5'>
              <Col lg={6}>
                <h3>Platillos de temporada</h3>
              </Col>

              <Col lg={6} className='align-right'>
              <Form.Group>
                <Form.Control type='text' placeholder='Buscar un plato de temporada' onChange={seasonFilterOnChange} />
              </Form.Group>
              </Col>
            </Row>
            <Accordion defaultActiveKey='0'>
              { filteredSeasonal && filteredSeasonal.map((product, index) => (
                <Card key={index}>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    <Row>
                      <Col lg={8}>
                        <h4>{product.product_name}</h4>
                      </Col>
                      <Col className='align-right' lg={4}>
                        <h5>$ {product.price} por {product.measure}</h5>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>
                      <Row>
                        <Col lg={6}>
                          <p>
                            {product.description}
                          </p>
                        </Col>
                        <Col lg={6}>
                          <Image src={product.filename} fluid rounded className='cs-product'/>
                        </Col>
                        <Col lg={12}><hr/></Col>
                        <Col lg={6}>
                          <h4>Precio por {product.measure}</h4>
                        </Col>
                        <Col lg={6} className='align-right'>
                          <h4>$ {product.price}</h4>
                        </Col>
                        <Col lg={12} className='align-right'>
                          <Button variant='primary' size='sm' onClick={() => prepareProduct(product.product_id)}> Editar producto </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
              
          </Col>

          <Col lg={4}>
            <h3>Complementos</h3>
            <Accordion defaultActiveKey='0'>
              { sides && sides.map((product, index) => (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    <Row>
                      <Col>
                        <h5>{product.product_name}</h5>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>
                      <Row>
                        <Col lg={12}>
                          <Image src={product.filename} rounded fluid className='mb-3 cs-product'/>
                          <p>
                            {product.description}
                          </p>
                        </Col>
                        <Col lg={8}>
                          <h6>Precio por {product.measure}</h6>
                        </Col>
                        <Col lg={4} className='align-right'>
                          <h6>$ {product.price}</h6>
                        </Col>

                        <Col lg={12} className='align-right'>
                          <Button variant='primary' size='sm' onClick={() => prepareProduct(product.product_id)}> Editar complemento </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </Col>

        </Row>

        <hr />
        <Row className='pt-1 pb-5'>
          <Col >
            {' '}
          </Col>
        </Row>
      </Container>
    </>
  );
};
