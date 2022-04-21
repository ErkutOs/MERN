import TopNav from '../components/TopNav'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'


const App = ({Component, pageProps}) => {
    return (
    <>
        <TopNav/>
        <Component {...pageProps}/>
    </>
    )
}

export default App