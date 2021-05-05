import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Fab } from '@material-ui/core'

const UploadFiles = () => {
  return (
    <>
      <label htmlFor='upload-file'>
        <input
          style={{ display: 'none' }}
          id='upload-file'
          name='upload-file'
          type='file'
        />
        <Fab
          color='secondary'
          size='small'
          component='span'
          aria-label='add'
          variant='extended'
        >
          <AddIcon /> Upload file
        </Fab>
      </label>
    </>
  )
}

export default UploadFiles