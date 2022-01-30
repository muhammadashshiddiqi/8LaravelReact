import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { URL_API, URL_STORE } from '../config/constants.js';
import Header from './Header.js';

function Product() {
    const [allPrd, setallPrd] = useState([]);
    const [idprd, setIdprd] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [fileImg, setfileImg] = useState('');
    const [price, setPrice] = useState('');
    const [keyCari, setKeyCari] = useState('');
    const [Addmodals, setAdd] = useState(false);
    const [Editmodals, setEdit] = useState(false);

    useEffect(() => {
      getProduct();
    }, []);
    
    const getProduct = async () => {
        let dataall = await fetch(URL_API +'allProduct', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "application/json"
            }
        });
        dataall = await dataall.json();
        setallPrd(dataall);
    };

    const addProduct = async () => {
        let form = new FormData();
        form.append('file_image', fileImg); 
        form.append('name', name); 
        form.append('description', desc); 
        form.append('price', price); 

        let savedata = await fetch(URL_API + 'addProduct', {
            method: "POST",
            body: form
        });
        savedata = savedata.json();
        if (savedata) {
            Swal.fire({
                title: 'Successfuly!',
                text: savedata.message,
                icon: 'success',
                timer: 2000
            });

            ModalClose();
            setName('');
            setDesc('');
            setfileImg('');
            setPrice('');

            getProduct();
        }
    };

    const deleteProduct = (prdid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let item = {"id" : prdid};

                let check = fetch(URL_API+'deleteProduct', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(item)
                });
                check.then( res => {
                    console.log(res);
                    Swal.fire(
                        'Deleted!',
                        res.message,
                        'success'
                    )
                    getProduct();
                })
            }
        })
    };

    const editProduct = async (prdid) => {

        let item = { "id": prdid };
        let check = fetch(URL_API + 'showProduct', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })
        .then(r => r.json())
        .then(r => {
            console.log(r);

            setIdprd(r[0].id)
            setName(r[0].name)
            setDesc(r[0].description)
            setPrice(r[0].price)
            EModalShow();
        });


    };

    const updateProduct = async () => {
        let form = new FormData();
        form.append('file_image', fileImg);
        form.append('id', idprd);
        form.append('name', name);
        form.append('description', desc);
        form.append('price', price);

        let savedata = await fetch(URL_API + 'updateProduct', {
            method: "POST",
            body: form
        });
        savedata = savedata.json();
        if (savedata) {
            Swal.fire({
                title: 'Successfuly!',
                text: savedata.message,
                icon: 'success',
                timer: 2000
            });

            EModalClose();
            setIdprd('');
            setName('');
            setDesc('');
            setfileImg('');
            setPrice('');

            getProduct();
        }
    };

    const handleCari = async (e) => {
        if (e.charCode == 13) {
            setKeyCari(e.target.value);
            let dataCari = e.target.value;
            e.preventDefault();

            if (dataCari != ''){
                console.log('okemasuk');
                let item = { 'key': dataCari};
                let x = await fetch(URL_API + 'allProduct/cari', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body : JSON.stringify(item)
                });
                x = await x.json();
                console.log(x);
                setallPrd(x);
            }else {
                let x = await fetch(URL_API + 'allProduct', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                x = await x.json();
                setallPrd(x);
            }
            
        }

        
    };

    const ModalClose = () => setAdd(false);
    const ModalShow = () => setAdd(true);

    const EModalClose = () => setEdit(false);
    const EModalShow = () => setEdit(true);
    const setFunc = (data) => {
        setPrice(data); 
        return data.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    return (
        <div>
            <Header />
            <Container className='mt-4'>
                <Row>
                    <Col md="9">
                        <Button variant='success' onClick={() => ModalShow()} className='mb-3'>Add Product</Button>
                    </Col>
                    <Col md="3">
                        <input className="form-control" type="text" placeholder="Search...." onKeyPress={(e) => handleCari(e) } />
                    </Col>
                </Row>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th width="5%">No</th>
                            <th width="10%">Image</th>
                            <th width="15%">Name</th>
                            <th width="30%">Description</th>
                            <th width="20%">Price</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPrd.map((prd, index) => (
                            <tr key={prd.id}>
                                <td>{index+1}</td>
                                <td><img src={URL_STORE + prd.file_path} alt="image product" className='imgPrd'/> </td>
                                <td>{prd.name}</td>
                                <td>{prd.description}</td>
                                <td>{prd.price.toLocaleString(navigator.language, { maximumFractionDigits: 2 })}</td>
                                <td><Button onClick={() => editProduct(prd.id)} variant='info'> Edit </Button>{" "}
                                    <Button onClick={() => deleteProduct(prd.id)} variant='danger'> Hapus </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal
                show={Addmodals}
                onHide={ModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb-3">
                        <label className='form-label'>Product Name</label>
                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <label className='form-label'>Description</label>
                        <textarea className='form-control' defaultValue={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label className='form-label'>Price</label>
                        <input className="form-control" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label className='form-label'>Upload Image</label>
                        <input className="form-control" type="file" onChange={(e) => setfileImg(e.target.files[0])} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ModalClose}>
                        Batal
                    </Button>
                    <Button onClick={() => addProduct()} variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={Editmodals}
                onHide={EModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb-3">
                        <label className='form-label'>Product Name</label>
                        <input className="form-control" type="hidden" value={idprd} onChange={(e) => setIdprd(e.target.value)} />
                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label className='form-label'>Description</label>
                        <textarea className='form-control' defaultValue={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label className='form-label'>Price</label>
                        <input className="form-control" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label className='form-label'>Upload Image</label>
                        <input className="form-control" type="file" onChange={(e) => setfileImg(e.target.files[0])} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={EModalClose}>
                        Batal
                    </Button>
                    <Button onClick={() => updateProduct()} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Product;
