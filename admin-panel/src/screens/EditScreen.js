import React,{useState, useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import './Products.css'
import {useHttp} from '../hooks/http.hook'
import {baseUrl} from '../global'
import {Button} from '@material-ui/core'

function Edit(props) {

  const {request} = useHttp()

    
  let {product} = React.useMemo(()=>props.location.state ? props.location.state : {},[props.location.state])

    const id = product?.product_id

    const[form, setForm] = useState({
        name: product?.product_name,
        title: product?.product_title,
        description: product?.product_description,
        brand: product?.product_brand,
        os: product?.product_os,
        size: product?.product_size,
        resolution: product?.product_resolution,
        ram: product?.product_ram,
        memory: product?.product_memory,
        camera:product?.product_camera,
        sim: product?.product_sim,
        cost: product?.product_cost,
        category: product?.category,
        image: product?.product_thumb
    })

    const editInfo=async()=>{
      try {
        
        await request(`${baseUrl}/api/products/editItem`,'PUT',{...form, id})
  
      } catch (error) {
        
      }
    }


    const changeHandler=event=>{
      setForm({...form, [event.target.name]: event.target.value})
    }


  return (
    <div>
      <div>

      </div>
    
    <div className='input'>
      <TextField
          id="outlined-full-width"
          label="Product name"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          onChange={changeHandler}
          name='name'
          value={form.name}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product title"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          onChange={changeHandler}
          name='title'
          value={form.title}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product description"
          size='small'
          multiline={true}
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='description'
          value={form.description}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product brand"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='brand'
          value={form.brand}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product os"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='os'
          value={form.os}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product size"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='size'
          value={form.size}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product resolution"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='resolution'
          value={form.resolution}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product RAM"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='ram'
          value={form.ram}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product memory"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='memory'
          value={form.memory}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product camera"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='camera'
          value={form.camera}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product SIM"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='sim'
          value={form.sim}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product cost"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='cost'
          value={form.cost}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product category"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='category'
          value={form.category}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Product image"
          size='small'
          style={{ margin: 8 }}
          placeholder="Type to edit..."
          margin="normal"
          fullWidth
          name='image'
          value={form.image}
          onChange={changeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <div className='searchBtn'>
          <Button variant='contained' color='primary' onClick={()=>editInfo()}>Edit item</Button>
        </div>
        <div className='deleteBtn'>
          <Button variant='contained' color='secondary' onClick={()=>editInfo()}>Delete item</Button>
        </div>
    </div>
    
    </div>
  );
}

export default Edit;