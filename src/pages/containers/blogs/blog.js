import React, { useState, useContext } from 'react'
import BlogForm from './BlogForm'
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@material-ui/core'
import SideMenu from '../../components/SideMenu'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import AddIcon from '@material-ui/icons/Add'
import useTable from '../../components/useTable'
import Transport from '../../api/Transport'
import Input from '../../components/controls/Input'
import Button from '../../components/controls/Button'
import ActionButton from '../../components/controls/ActionButton'
import { Search } from '@material-ui/icons'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Popup from '../../components/Popup'
import ConfirmDialog from '../../components/ConfirmDialog'
import Notification from '../../components/Notification'
import { useAuth } from '../../api/config/auth'


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}))

const headCells = [
  { id: 'fullName', label: 'Bloger Name' },
  { id: 'email', label: 'Email' },
  { id: 'title', label: 'Title' },
  { id: 'descritption', label: 'Description', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

const Blog = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const [records, setRecords] = useState([])
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })
  const [openPopup, setOpenPopup] = useState(false)
  Transport.HTTP.getAllData()
    .then((res) => setRecords(res.data))
    .catch((err) => console.log(err))
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn)
  const handleSearch = (e) => {
    let target = e.target
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          )
      },
    })
  }
  const addOrEdit = (values, resetForm) => {
    if (!values.uuid) Transport.HTTP.createEventReq(values).then((res) => {})
    else Transport.HTTP.updateEventReq(values.uuid, values).then((res) => {})
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    Transport.HTTP.getAllData().then((res) => setRecords(res.data))
    setNotify({
      isOpen: true,
      message: 'Submited Successfully',
      type: 'success',
    })
  }

  const onDelete = (uuid) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    Transport.HTTP.deleteReqByID(uuid)
    Transport.HTTP.getAllData().then((res) => setRecords(res.data))
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    })
  }

  const openInPopup = (item) => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 15,
          padding: 10,
          color: '#fff',
        }}
      >
        <SideMenu />
        <Paper className={classes.pageContent}>
          <PageHeader
            title="Bloger's page "
            subTitle='Jsi blog page'
            icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
          />
          {/* <BlogForm /> */}
          <Toolbar>
            <Input
              label='Search Blogs'
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <Button
              text='Add New'
              variant='outlined'
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true)
                setRecordForEdit(null)
              }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {records &&
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.uuid}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell style={{ display: 'flex' }}>
                      <ActionButton
                        color='primary'
                        onClick={() => {
                          openInPopup(item)
                        }}
                      >
                        <EditOutlinedIcon fontSize='small' />
                      </ActionButton>
                      <ActionButton
                        color='secondary'
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this item?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item.uuid)
                            },
                          })
                          //onDelete(item.uuid)
                        }}
                      >
                        <DeleteForeverIcon fontSize='small' />
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
          <Popup
            title='Blog Form'
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <BlogForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>

          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </Paper>
      </div>
    </>
  )
}

export default Blog
