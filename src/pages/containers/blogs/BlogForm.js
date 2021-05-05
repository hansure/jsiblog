import React, { useState, useEffect } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Textarea from '@material-ui/core/TextareaAutosize'
import Input from '../../components/controls/Input'
import Button from '../../components/controls/Button'
import Transport from '../../api/Transport'
import { Form, useForm } from '../../components/useForm'
import UploadFiles from '../../components/UploadFiles'

const initialFValues = {
  id: 0,
  name: '',
  email: '',
  title:'',
  description:''
}
const useStyles = makeStyles((theme) => ({
  root: {
   '& .MuiFormControl-root':{
    width:'80%',
    margin:theme.spacing(1)
   }
  },
}))

const BlogForm = (props) => {
  const { addOrEdit, recordForEdit } = props
  const classes = useStyles()
  const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('title' in fieldValues)
            temp.title = fieldValues.title.length > 0 ? "" : "Title is required."
        if ('description' in fieldValues)
            temp.description =
              fieldValues.description.length != 0
                ? ''
                : 'This field is required.'
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

  const {
    values,
    errors,
    setErrors,
    resetForm,
    setValues,
    handleInputChange,
  } = useForm(initialFValues, true, validate)
  useEffect(() => {
    if(recordForEdit != null){
      setValues({
        ...recordForEdit,
      })
    }
  }, [recordForEdit])

  const handleSubmit = e => {
    e.preventDefault()
    if(validate())
      {
      addOrEdit(values, resetForm)
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Input
            label='Full Name'
            name='name'
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Input
            label='Email'
            value={values.email}
            name='email'
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            label='Title'
            value={values.title}
            name='title'
            onChange={handleInputChange}
            error={errors.title}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            value={values.description}
            name='description'
            label='Description'
            multiline
            rows={10}
            columns={30}
            onChange={handleInputChange}
            error={errors.description}
            defaultValue='Please write here the description'
          />
          <div>
            <Button type='submit' text='Submit' />
            <Button text='Reset' color='default' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}

export default BlogForm
