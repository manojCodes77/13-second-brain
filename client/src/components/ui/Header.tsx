import PlusIcon from '../../icons/PlusIcon'
import ShareIcon from '../../icons/ShareIcon'
import Button from './Button'
import { Outlet, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const handleAddContentButton = () => {
        navigate("/create-content")
    }
    return (
        <header className="flex flex-row gap-4 items-center justify-between ">
            <div className=' absolute'>
            <Outlet />
            </div>
            <p className=' text-2xl font-bold'>All Notes</p>
            <div className="buttons flex flex-row gap-4 p-4">
                <Button variant="primary" size="lg" text="Add Content" onClick={handleAddContentButton} startIcon={<PlusIcon size="lg" />} />
                <Button variant="secondary" size="lg" text="Share Brain" onClick={() => alert("Button Clicked")} startIcon={<ShareIcon size="lg" />} />
            </div>
        </header>
    )
}

export default Header
