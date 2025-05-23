import { Form, redirect, useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Submit from '../icons/SubmitIcon'
import CancelIcon from '../icons/CancelIcon'
import Button from '../components/ui/Button'
import { LinkIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const NewContent = () => {
    const navigate = useNavigate();
    const handleCancelButton = () => {
        navigate('/');
    }
    return (
        <Modal>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Content</h2>
                    <p className="text-sm text-gray-600 mt-1">Share your thoughts with the community</p>
                </div>

                {/* Form Content */}
                <div className="px-8 py-8">
                    <Form method='post' className="space-y-6">
                        {/* Title Section */}
                        <div className="space-y-3">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                                Enter the Title
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    name='title'
                                    placeholder="Enter an engaging title for your content"
                                    type='text'
                                />
                            </div>
                        </div>

                        {/* Link Section */}
                        <div className="space-y-3">
                            <label htmlFor="link" className="block text-sm font-semibold text-gray-800">
                                Link of the Content
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    placeholder="https://example.com/your-content"
                                    name='link'
                                    type='url'
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <LinkIcon />
                                </div>
                            </div>
                        </div>

                        {/* Platform Section */}
                        <div className="space-y-3">
                            <label htmlFor="type" className="block text-sm font-semibold text-gray-800">
                                Platform
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    defaultValue=""
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 shadow-sm 
                                        focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
                                        transition-all duration-300 bg-gradient-to-br 
                                        from-gray-50 to-gray-100 text-gray-800
                                        hover:border-indigo-300 hover:shadow-md appearance-none cursor-pointer
                                        focus:outline-none focus:bg-white"
                                >
                                    <option value="" disabled>Select a platform</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                text="Cancel"
                                startIcon={<CancelIcon />}
                                size="lg"
                                onClick={handleCancelButton}
                            />
                            <Button
                                type="submit"
                                variant="submit"
                                text="Create Content"
                                startIcon={<Submit />}
                                size="lg"
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default NewContent

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const link = formData.get('link') as string;
    const type = formData.get('type') as string;

    if (!title || !link || !type) {
        return redirect('/new-content');
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/content/`, {
            title,
            link,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        toast.success(response.data.message);
        return redirect('/');
    } catch (error) {

        toast.error('Error creating content. Please try again.');
        return redirect('/new-content');

    }
}