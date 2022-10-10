import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
/*       console.log('subscribing')
      const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate()) */
      store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))

/*       return () => {
          console.log('unsubscribing')
          users.unsubscribe()
      } */
  }, [])

  return <Outlet />
}
export default Prefetch