import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';

function usePageTitle(title: string) {
    // const { pathname } = useLocation();

    useEffect(() => {
        document.title = title;
    }, [title]);
}
export default usePageTitle;
