import MyNav from '../components/MyNav/MyNav.jsx';
import WelcomeAlert from '../components/WelcomeAlert/WelcomeAlert.jsx';
import AllBooks from '../components/Main/AllBooks.jsx';
import Footer from '../components/Footer/Footer.jsx';


export default function Homepage ({ results, text, onSearchChange }) {

    return (
        <>
            <MyNav text={text} onSearchChange={onSearchChange}/>
            <WelcomeAlert/>
            <AllBooks results={results}/>
            <Footer />
        </>        
    )
}