// Component Side Rendering
const LandingPage = ({ color }) => {
    console.log(`I am in the component. Color ${color} `)
    return <h1>Landing Page</h1>
}

// Server Side Rendering
// Here we can define initial Server Side props that we can pass to the component
LandingPage.getInitialProps = () => {
    console.log('I am on the server.')

    return { color: 'red' }
}

export default LandingPage