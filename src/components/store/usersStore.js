import axios from "axios"
import { makeAutoObservable } from "mobx"
import { API_URL } from "../../constants"

class UsersStore {

    users = []
    limit = 3
    page = 1
    pageCount = 1
    usersPerPage = 3
    initialValues={ id: null, name: '', email: '', phone: '', age: '', gender: '' }
    isCancelled = false

    constructor() {
        makeAutoObservable(this)
    }

    onChange(num) {
        this.page = num
        this.fetchUsers(num)
    } 

    handleDeleteClick(userData) {
        if (window.confirm(`Delete ${userData.name} ?`)) {
            axios.delete(`${API_URL}/${userData.id}`)
            this.users = this.users.filter(u => u.id !== userData.id)
        }      
    }
    
    fetchUsers(page) {
        axios(`${API_URL}?_page=${page}&_limit=${this.limit}`)
        .then(res => {
            this.users = [...res.data]
            this.pageCount = Math.ceil(res.headers.get('X-Total-Count') / this.usersPerPage)    
        })
    }
    
    handlerUser(values) {
        axios.post(API_URL, {
            name: values.name,
            email: values.email,
            phone: values.phone,
            age: values.age,
            gender: values.gender
          })
          .then(response  => {
            // navigate(`/mobx/?page=${values.id}`)
          })
    }

    fetchUserById(id) {
        axios(`${API_URL}/${id}`)
        .then(res => { 
            this.initialValues = res.data             
        })
    }

    resetUserId = () => {
        this.initialValues.id = null
    }

    handleEditUser = (values, navigate) => {
        axios.patch(`${API_URL}/${values.id}`, values)
        .then(res => navigate(`/mobx/?page=${values.id}`))
    }
    
}
export default new UsersStore()