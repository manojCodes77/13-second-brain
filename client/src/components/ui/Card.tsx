import { ExternalLinkIcon, ShareIcon, PlayIcon, MessageCircleIcon, CameraIcon, BriefcaseIcon, LinkIcon, DeleteIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import axios from 'axios';
interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "linkedin" | "other";
    id: string
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const Card = ({ title, link, type, id }: CardProps) => {
    const getTypeConfig = () => {
        switch (type) {
            case 'youtube':
                return {
                    icon: <PlayIcon className="w-5 h-5" />,
                    gradient: 'from-red-500 to-red-600',
                    bgGradient: 'from-red-50 to-red-100',
                    textColor: 'text-red-700',
                    label: 'Video'
                };
            case 'twitter':
                return {
                    icon: <MessageCircleIcon className="w-5 h-5" />,
                    gradient: 'from-blue-400 to-blue-500',
                    bgGradient: 'from-blue-50 to-blue-100',
                    textColor: 'text-blue-700',
                    label: 'Tweet'
                };
            case 'instagram':
                return {
                    icon: <CameraIcon className="w-5 h-5" />,
                    gradient: 'from-pink-500 via-purple-500 to-orange-500',
                    bgGradient: 'from-pink-50 to-purple-100',
                    textColor: 'text-purple-700',
                    label: 'Post'
                };
            case 'linkedin':
                return {
                    icon: <BriefcaseIcon className="w-5 h-5" />,
                    gradient: 'from-blue-600 to-blue-700',
                    bgGradient: 'from-blue-50 to-indigo-100',
                    textColor: 'text-blue-800',
                    label: 'Article'
                };
            default:
                return {
                    icon: <LinkIcon className="w-5 h-5" />,
                    gradient: 'from-gray-500 to-gray-600',
                    bgGradient: 'from-gray-50 to-gray-100',
                    textColor: 'text-gray-700',
                    label: 'Link'
                };
        }
    };

    const config = getTypeConfig();
    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${link}`);
            // Optional: You can add a visual feedback here
            toast.success('Content copied to clipboard!');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = `${link}`;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    };

    const handleDeleteButton = async (id: string) => {
        try {
            // Check if we have an ID
            if (!id) {
                toast.error("Cannot delete: Missing resource ID");
                return;
            }

            // Make a DELETE request to the backend API
            const response = await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            // Show success message
            toast.success(response.data.message);

            // Navigate after successful deletion
            window.location.href = '/';
        } catch (error) {
            toast.error("Something went wrong, please try again later");
        }
    };

    return (
        (
            <div className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out max-w-sm  min-h-[16rem]">
                <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />

                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.bgGradient} border border-white/20 shadow-sm`}>
                            <div className="text-white">
                                <div className={`p-1 rounded-full bg-gradient-to-r ${config.gradient}`}>
                                    {config.icon}
                                </div>
                            </div>
                            <span className={`text-sm font-semibold ${config.textColor}`}>
                                {config.label}
                            </span>
                        </div>

                        {/* Fixed Delete Button with proper z-index and event handling */}
                        <div
                            className="relative z-10"
                            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                        >
                            <Button
                                variant='danger'
                                startIcon={<DeleteIcon />}
                                size='sm'
                                text=''
                                onClick={() => handleDeleteButton(id)}
                                type='button'
                                title="Delete this item"
                            />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-6 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                        {title}
                    </h3>

                    <div className="mb-6">
                        {type === "youtube" && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                                <iframe
                                    className="w-full h-full"
                                    src={link.replace("watch", "embed").replace("?v=", "/")}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        )}

                        {type !== "youtube" && (
                            <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${config.bgGradient} border border-white/20 shadow-inner`}>
                                <div className="text-center">
                                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${config.gradient} shadow-lg mb-4`}>
                                        <div className="text-white">
                                            {config.icon}
                                        </div>
                                    </div>
                                    <p className={`text-sm font-medium ${config.textColor}`}>
                                        Click to view {config.label.toLowerCase()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95`}
                        >
                            <ExternalLinkIcon className="w-4 h-4" />
                            Open
                        </a>
                        <Button
                            onClick={handleCopyToClipboard}
                            variant='outline'
                            text=''
                            title='Copy to clipboard'
                            startIcon={<ShareIcon className="w-4 h-4" />}
                            size='md'
                        />
                    </div>
                </div>

                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                    <div className={`w-full h-full bg-gradient-to-br ${config.gradient} rounded-full blur-3xl`} />
                </div>
            </div>
        )
    );
};

export default Card;
