import React, { useState, useMemo } from 'react'
import TextField from '@material-ui/core/TextField'
import '../components/Card.css'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import { Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

function Add(props) {
    const { request } = useHttp()

    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        brand: '',
        os: '',
        size: '',
        resolution: '',
        ram: '',
        memory: '',
        camera: '',
        sim: '',
        cost: '',
        category: '',
        image: '',
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addItem = async () => {
        try {
            const flag = await request(
                `${baseUrl}/api/products/addItem`,
                'POST',
                { ...form }
            )
            if (flag) {
                alert('Successfully added')
            } else {
                alert('Something went wrong')
            }
        } catch (error) {}
    }

    return (
        <div>
            <div className="infotext">
                <h1>Add product</h1>
            </div>
            <div className="addBtn">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItem()}
                >
                    Add item
                </Button>
            </div>
            <div className="input">
                <TextField
                    id="outlined-full-width"
                    label="Product name"
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    onChange={changeHandler}
                    name="name"
                    value={form.name}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="Product title"
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    onChange={changeHandler}
                    name="title"
                    value={form.title}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="Product description"
                    size="small"
                    multiline={true}
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="description"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="brand"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="os"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="size"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="resolution"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="ram"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="memory"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="camera"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="sim"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="cost"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="category"
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
                    size="small"
                    style={{ margin: 8 }}
                    placeholder="Type to edit..."
                    margin="normal"
                    fullWidth
                    name="image"
                    value={form.image}
                    onChange={changeHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </div>
        </div>
    )
}

export default Add
