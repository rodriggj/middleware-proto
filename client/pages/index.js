import axios from 'axios';
 
const LandingPage = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>Hello, {currentUser?.email ?? 'user'}</h1>;
};
 
export const getServerSideProps = async ({ req }) => {
    let res;
    if (typeof window === 'undefined') {
        res = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
            {
                withCredentials: true,
                headers: req.headers
            }
        );
    } else {
        res = await axios.get('/api/users/currentuser');
    }
    return { props: res.data };
};
 
export default LandingPage; 