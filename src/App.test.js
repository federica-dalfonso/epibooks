import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";
import WelcomeAlert from "./components/WelcomeAlert/WelcomeAlert";
import AllBooks from './components/Main/AllBooks';
import jsonData from "./data/fantasy.json";
import { ThemeContext } from './context/ThemeContextProvider';

test("viene montato correttamente il componente WelcomeAlert", () => {
    render(<WelcomeAlert/>);

    const welcomeMessage = screen.getByText("Benvenuti nella mia prima app React!");
    expect(welcomeMessage).toBeInTheDocument();
}); 

// test("numero cards bootstrap uguale a libri del json utilizzato", async () => {
//     render (
//         <ThemeContext.Provider value={{ theme: 'light' }}>
//             <AllBooks/>
//         </ThemeContext.Provider>
//         );

//         let numberOfCards;
//         await waitFor(() => {
//             numberOfCards = screen.getAllByTestId("book-card").length;
//             expect(numberOfCards).toBe(jsonData.length);
//         });
// })