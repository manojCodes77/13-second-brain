import { Outlet } from 'react-router-dom'
import ContentList from './ContentList'
import Header from './Header'

const Content = () => {
    return (
        <>
            <div className=" col-start-2 col-end-6 bg-gray-100 px-10 overflow-y-auto flex   flex-col gap-4">
                <Header />
                <ContentList />
                <Outlet />
            </div>
        </>
    )
}

export default Content
