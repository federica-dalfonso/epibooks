import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import WelcomeAlert from "./components/WelcomeAlert/WelcomeAlert";
import CommentArea from "./components/CommentArea/CommentArea";
import { ThemeContext } from './context/ThemeContextProvider';

test("viene montato correttamente il componente WelcomeAlert", () => {
    render(<WelcomeAlert/>);

    const welcomeMessage = screen.getByText("Benvenuti nella mia prima app React!");
    expect(welcomeMessage).toBeInTheDocument();
}); 

test ("il componente comment area viene renderizzato correttamente", () => {
    render(<ThemeContext.Provider value={{ theme: 'light' }}>
            <CommentArea/>
        </ThemeContext.Provider>
    );

    const commentArea = screen.getByTestId("comment-area");
    expect(commentArea).toBeInTheDocument();

})


