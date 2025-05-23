const LoadingBar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-1 bg-gradient-to-r from-orange-500 to-pink-400 animate-loading-bar"></div>
        </div>
    );
};

export default LoadingBar;